
const Review = require('../models/reviewModel');
// const catchAsync = require("../utils/catchAsync");
const factory = require('./handlerFactoryController');




// pre-create review middleware; adds this Review's IDs to associated project and user documents
//   - decoupled from and specific to creation & not in factory creation method, then passes this method (next()) should check be valid
const setUserProjectIds = (req, res, next) => {
    if(!req.body.user)
        req.body.user = req.params.userId;
    if(!req.body.project)
        req.body.project = req.project.id; // req.project comes from the protect (authController) middleware on the route
    
    next();
}

// endpoint =>  getting all reviews
const getAllReviews = factory.getAll(Review);

const getReview = factory.getOne(Review);

// endpoint => create new review
const createReview = factory.createOne(Review);

const updateReview = factory.updateOne(Review); // factory method updates a Review document by ID, takes whole Review obj (req.body...)

const deleteReview = factory.deleteOne(Review); // factory method deletes a Review document by ID, takes whole Review obj (req.body...)


module.exports = { getAllReviews, setUserProjectIds, getReview, createReview, updateReview, deleteReview }