

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures.js');

const deleteOne = (Model) => catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);  
    
    if(!document) {
        // item not found early return 
        return next(new AppError('No document found with that ID', 404))
    }

    res.status(204).json({
        status: 'successful deletion of document',
        data: null
    })
})

const updateOne = (Model) => catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });    

    if(!document) {
        // item not found early return 
        return next(new AppError('No document found with that ID', 404))
    }

    res.status(200).json({
        status: 'successful update pushed to document',
        data: {
            data: document
        }
    })
});

const createOne = (Model) => catchAsync(async (req, res, next) => {
    const document = await Model.create(req.body);

    res.status(201).json({
        status: 'successful creation of new Document',
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
        return next(new AppError('No document found with that ID', 404))
    }

    res.status(200).json({
        status: 'successful retrieval of new Document',
        data: {
            data: document
        }
    })
});

const getAll = (Model) => catchAsync(async (req, res, next) => {
    // to allow for nested getReviews on /tours (hacky way of implementing this)
    let filter = {}
    if(req.params.tourId) 
        filter = { tour: req.params.tourId }; 
    
    const features = new APIFeatures(Model.find(filter), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const document = await features.query;

    // Response
    res.status(200).json({
        status: 'successful retrieval of all document',
        results: document.length,
        data: {
            data: document
        }
    })
});

module.exports = { deleteOne, updateOne, createOne, getOne, getAll }