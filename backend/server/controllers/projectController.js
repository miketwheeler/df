

// imports
const Project = require('../models/projectModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactoryController');
// const APIFeatures = require('../utils/apiFeatures');
// const AppError = require('../utils/appError');


// middleware func - checks enforced field values of a project name and price (min requirements) & passes alt query downward
const checkBody = (req, res, next) => {
    if(!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'failed',
            message: 'Missing name or price'
        })
    }
    next();
}

// middleware func - sets query object limit, sort by, and returnable fields & passes alt query downward
const aliasTopProjects = async(req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage';
    req.query.fields = 'name,summary,difficulty' // csv for fields to return
    next();
}


// Project CRUD Operations
const getAllProjects = factory.getAll(Project);

const getProject = factory.getOne(Project, { path: 'reviews' });

const createProject = factory.createOne(Project);

const updateProject = factory.updateOne(Project);

const deleteProject = factory.deleteOne(Project);



const getProjectStats = catchAsync(async (req, res, next) => {
    const stats = await Project.aggregate([
        {
            $match: { ratingsAverage: { $gte: 4.5 } }
        },
        {
            $group: {
                // _id: '$ratingsAverage', 
                _id: { $toUpper: '$difficulty' },
                numProjects: { $sum: 1 },
                numRatings: { $sum: '$ratingsQuantity' },
                avgRating: { $avg: '$ratingsAverage' },
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' }
            }
        },
        {
            $sort: { avgPrice: 1 }
        },
        // ONLY RETURN RESULTS THAT MATCH VALUE - left as an example
        // {
        //     $match: { _id: { $ne: 'EASY' }} // ne = is not equal
        // }
    ]);
    res.status(200).json({
        status: 'successful aggregation of data ops',
        data: {
            stats
        }
    })
});

const getMonthlyPlan = catchAsync(async (req, res, next) => {
    const year = req.params.year *1;
    const plan = await Project.aggregate([
        {
            $unwind: '$startDates' // function for drilling into a list field (in a db doc)
        },
        {
            $match: { 
                startDates: { // get any projects that have date between this full year
                    $gte: new Date(`${2021}-01-01`),
                    $lte: new Date(`${2021}-12-31`)
                }
            }
        },
        {
            $group: {
                _id: { $month: '$startDates' }, // need _id for this obj (1 from db obj to track thru)
                numProjectStarts: { $sum: 1 }, // creates and adds 1 to a rolling count 'var'
                projects: { $push: '$name' }, // want to get by name- push creates an array
            }
        },
        {
            $addFields: { month: '$_id' } // used to create new field & use val of _id
        },
        {
            $project: { 
                _id: 0, // removes _id from displaying in res obj
            }
        },
        {
            $sort: { numProjectStarts: -1 } // descending display of data by project start dates (high->low)
        },
        {
            $limit: 12 // set the qty entries to return in obj res
        }
    ]);
    res.status(200).json({
        status: 'successful aggregation op getting monthly plan',
        data: {
            plan
        }
    })
});

// query params & format => /projects-within/:distance/center/:latlng/unit/:unit
// test latlng: 34.111745,-118.113491
const getProjectsWithin = catchAsync(async (req, res, next) => {
    const { distance, latlng, unit } = req.params;
    const [lat, lng] = latlng.split(','); // use destructuring on latlng -> to array & by splitting on the comma
    
    // gets the distance around earth in km/mi and unit is RADIUS
    const radius = 
        unit === 'mi' 
        ? distance / 3963.2 // miles around earth 
        : distance / 6378.1

    if(!lat || !lng) {
        next(new AppError('Please provide lattitude and longitude in the format lat,lng.', 400))
    }

    const projects = await Project.find(
        { 
            startLocation: { 
                $geoWithin: { 
                    $centerSphere: [
                        [lng, lat],
                        radius
                    ] 
                } 
            } 
        }
    );

    res.status(200).json({
        status: 'Successful fetching of projects near that location.',
        results: projects.length,
        data: {
            data: projects,
        }
    })
});

// get projects within radius given
const getDistances = catchAsync(async (req, res, next) => {
    const { latlng, unit } = req.params;
    const [lat, lng] = latlng.split(','); // use destructuring on latlng -> to array & by splitting on the comma
    
    // will 'convert' meters to kilometers (value is returned by default in meters, don't need to = miles, is close enough)
    const multiplier = unit === 'mi' ? 0.000621371 : 0.001;
    
    if(!lat || !lng) {
        next(new AppError('Please provide lattitude and longitude in the format lat,lng.', 400))
    }

    const distances = await Project.aggregate([
        {
            $geoNear: {
                near: { 
                    type: 'Point',
                    coordinates: [lng * 1, lat * 1]
                },
                distanceField: 'distance',
                distanceMultiplier: multiplier 
            }
        },
        {
            $project: {
                distance: 1,
                name: 1
            }
        }
    ]);

    res.status(200).json({
        status: 'Successful setting of projects close to you.',
        data: {
            data: distances,
        }
    })
})


module.exports = { aliasTopProjects, checkBody, createProject, getAllProjects, getProject, getProjectStats, getMonthlyPlan, getProjectsWithin, getDistances, updateProject, deleteProject }


