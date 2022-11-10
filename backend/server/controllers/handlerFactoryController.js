

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures.js');


const createOne = (Model) => catchAsync(async (req, res, next) => {
    const document = await Model.create(req.body);

    res.status(201).json({
        status: 'Successful creation of record.',
        data: {
            data: document
        }
    })
});

const getOne = (Model, popOptions) => catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    
    if(popOptions) 
        query = query.populate(popOptions);

    const document = await query;

    if(!document) {
        return next(new AppError('There is no record with that id.', 404))
    }

    res.status(200).json({
        status: 'Successful fetch of record.',
        data: {
            data: document
        }
    })
});

const getAll = (Model) => catchAsync(async (req, res, next) => {
    // to allow for nested getReviews on /projects (hacky way of implementing this)
    let filter = {}
    if(req.params.projectId) 
        filter = { project: req.params.projectId }; 
    
    const features = new APIFeatures(Model.find(filter), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const document = await features.query;

    // Response
    res.status(200).json({
        status: 'Successful retrieval of all records.',
        results: document.length,
        data: {
            data: document
        }
    })
});

const updateOne = (Model) => catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });    

    if(!document) {
        // item not found, then early return 
        return next(new AppError('There is no record with that id to update.', 404))
    }

    res.status(200).json({
        status: 'Successful update to record.',
        data: {
            data: document
        }
    })
});

const deleteOne = (Model) => catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);  
    
    if(!document) {
        // item not found early return 
        return next(new AppError('There is no record with that id to delete.', 404))
    }

    res.status(204).json({
        status: 'Successful deletion from record.',
        data: null
    })
})

module.exports = { createOne, getOne, getAll, updateOne, deleteOne }