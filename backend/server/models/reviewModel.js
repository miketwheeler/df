
const mongoose = require('mongoose');
const User = require('./userModel')

// review / rating / createdAt / ref to tour / ref to user
const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        // required: [true, 'You must have a little bit to say about this tour!'],
        trim: true,
        maxLength: [500, 'Please keep your feedback under 500 characters.'], // validator
        minLength: [2, 'If you want to provide feedback, your review must at least 4 characters.'], // validator
    },
    rating: {
        type: Number,
        required: [true, 'Please leave a rating for this user.'],
        default: 5,
        min: [0, 'Ratings are between 0-5 stars.'],
        max: [5, 'Ratings are between 0-5 stars.']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // select: false // never selectable from the client (good for internal use only opporations)
    },
    // this review holds both a ref to a project and a user *(by ids)
    project: {
        type: mongoose.Schema.ObjectId,
        ref: 'Project',
        required: [true, 'Review must be corellate to a Project!']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a user!']
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// unique indexing sort-of by joining 2 fields
// reviewSchema.index({ project: 1, user: 1 }, { unique: true }) // by&ascending && by&ascending, then options of unique to true!

// MIDDLEWARES
// this makes 2 request queries - 1 to the Users doc, 1 to the Projects to get this information on 'find'
reviewSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'user',
        select: 'name'
    });
    next();
})

// static model methods -- aggregate of all average ratings
reviewSchema.statics.calcAverageRatings = async function(userId) {
    const stats = await this.aggregate([
        {
            $match: { user: userId },
        },
        {
            $group: {
                _id: '$user',
                nRating: { $sum: 1 },
                avgRating: { $avg: '$rating' }
            }
        }
    ]);

    if(stats.length > 0) {
        await User.findByIdAndUpdate(userId, {
            ratingsQuantity: stats[0].nRating,
            ratingsAverage: stats[0].avgRating
        })
    } else {
        await User.findByIdAndUpdate(userId, {
            ratingsQuantity: 0,
            ratingsAverage: 4.5
        })
    }
};

// run aggregation avg calc with this middleware - runs each time data added
reviewSchema.post('save', function() {
    // this points to current review
    this.constructor.calcAverageRatings(this.user);
})

// NEXT 2 --> work together on a findOneAndXXXX func to push updates/deletes this review 
reviewSchema.pre(/^findOneAnd/, async function(next) {
    this.r = await this.findOne() // save this to the query variable (this, value is r (as a placeholder for the trans))
    next();
})
reviewSchema.post(/^findOneAnd/, async function() {
    // 2 step process - setup (pre) then after(post) execution
    await this.r.constructor.calcAverageRatings(this.r.user);
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;


