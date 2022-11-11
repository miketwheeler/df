

const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

// later have set mergeParams: true to accept nested routes elsewhere to this router (reusability & relationships coupled)
const router = express.Router({ mergeParams: true });


// PROTECT all review routes
router.use(authController.protect);

router.route("/")
    .get(reviewController.getAllReviews)
    .post(
        // authController.restrictTo('member', 'team-lead', 'admin'),
        reviewController.setUserProjectIds,
        reviewController.createReview
    )

router.route('/:id')
    .get(reviewController.getReview)
    .patch(
        authController.restrictTo('member', 'team-lead', 'admin'), 
        reviewController.updateReview
    )
    .delete(
        authController.restrictTo('member', 'team-lead', 'admin'), 
        reviewController.deleteReview
    );


module.exports = router;