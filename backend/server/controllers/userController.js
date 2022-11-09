// imports
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactoryController');


const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((field) => {
        if(allowedFields.includes(field))
            newObj[field] = obj[field];
    })
    return newObj;
}

// route handlers/controllers
const getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};

const updateMe = catchAsync(async (req, res, next) => {
    // create error if user POSTs password data
    if(req.body.password || req.body.passwordConfirm) 
        return next(new AppError('This route is not for password updating. Please use /updateMyPassword', 400))
    // filter out any passed fields that are not allowed to be updated by the user
    const filteredBody = filterObj(req.body, 'name', 'email');
    // update user document
    const updatedUser = await User.findByIdAndUpdate(
        req.user.id, 
        filteredBody, 
        {
            new:true, 
            updateValidators: true 
        }
    )
    res.status(200).json({
        status: 'successful update of your information',
        data: {
            user: updatedUser,
        }
    })
});

const deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
        status: 'successful deletion of account',
        data: null,
    })
});

const createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: "This route is not defined! Please use signup instead."
    })
}

const getUser = factory.getOne(User);
const getAllUsers = factory.getAll(User);
// Dont update password here 
const updateUser = factory.updateOne(User); // factory method - updates a User document by ID, takes whole User obj (req.body)
const deleteUser = factory.deleteOne(User); // factory method - deletes a User document by ID, takes whole User obj (req.body)


module.exports = { getMe, getAllUsers, getUser, createUser, updateUser, deleteUser, updateMe, deleteMe };