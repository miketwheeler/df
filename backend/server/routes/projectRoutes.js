
// imports
const express = require('express');
const projectController = require('../controllers/projectController');
const authController = require('../controllers/authController');
// const reviewController = require('../controllers/reviewController');
// const reviewRouter = require('../routes/reviewRoutes')

// routers ->
const router = express.Router();

// **** nested routing config for more intuitive access to these types of routes (common real world)
// instead of above - import the whole router for this nested route in /projects
// router.use('/:projectId/reviews', reviewRouter);


// param middleware
// router.param('id', projectController.checkId);
// router.param('body'), projectController.checkBody
router.route('/top-5')
    .get(
        projectController.aliasTopProjects, 
        projectController.getAllProjects
    );

router.route('/project-stats')
    .get(projectController.getProjectStats);

router.route('/monthly-plan/:year')
    .get(
        authController.protect, 
        authController.restrictTo('admin', 'team-lead', 'member'),
        projectController.getMonthlyPlan
    );

// geospacial searching
router.route('/projects-within/:distance/center/:latlng/unit/:unit')
    .get(projectController.getProjectsWithin)

//
router.route('/distances/:latlng/unit/:unit')
    .get(projectController.getDistances)

router.route('/')
    .get(projectController.getAllProjects)
    .post(
        authController.protect, 
        authController.restrictTo('admin', 'team-lead'),
        projectController.createProject
    )

router.route('/:id')
    .get(projectController.getProject)
    .patch(
        authController.protect, 
        authController.restrictTo('admin', 'team-lead'), 
        projectController.updateProject
    )
    .delete(
        authController.protect, 
        authController.restrictTo('admin', 'team-lead'), 
        projectController.deleteProject
    )

// routes ->
// const router = express.Router();

// // Open routes to all
// // SIGNUP (account creation, login, password actions)
// router.post('/signup', authController.signup);
// router.post('/login', authController.login);
// router.post('/forgotPassword', authController.forgotPassword);
// router.patch('/resetPassword/:token', authController.resetPassword);


// // Route Protection (here down)
// // router.use(authController.protect); // <-- protects all routes after this point

// router.patch('/updateMyPassword', authController.updatePassword);
// router.get(
//     '/me',  
//     userController.getMe, 
//     userController.getUser
// );
// router.patch('/updateMe', userController.updateMe);
// router.delete('/deleteMe', userController.deleteMe);


// // ADMIN only (here down)
// // router.use(authController.restrictTo('admin'))

// // USERS
// router.route('/')
//     .get(userController.getAllUsers)
//     .post(userController.createUser);

// router.route('/:id')
//     .get(userController.getUser)
//     .patch(userController.updateUser)
//     .delete(userController.deleteUser);



module.exports = router;