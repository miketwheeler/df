
// imports
const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// REVIEWS: test retrieving users' reviews
const reviewRouter = require('../routes/reviewRoutes');

// routes ->
const router = express.Router();

// REVIEWS: nested routing config
router.use('/:userId/reviews', reviewRouter);

// Open routes to all ////////////////////////////////
// SIGNUP (account creation, login, password actions)
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
// router.post('/logout', authController.logout);


// Route Protection (here down) //////////////////////
// router.use(authController.protect); // <-- protects all routes after this point

router.patch('/updateMyPassword', authController.updatePassword);
router.get(
    '/me',  
    userController.getMe, 
    userController.getUser
);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);


// ADMIN only (here down) ////////////////////////////
// router.use(authController.restrictTo('admin'))

// USERS
router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

router.route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;