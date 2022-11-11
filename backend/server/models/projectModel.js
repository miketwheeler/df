
const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator'); // npm package for validator methods (strings only *see npm/git page for all)
// const User = require('./userModel');

// simple tours schema
const projectSchema = new mongoose.Schema({
    name: { // project name
        type: String,
        required: [true, "A project must have a name!"], // validator
        unique: [true, "There is another project that has that name, try a different one - mayabe a codename for now."], 
        trim: true,
        maxLength: [40, 'A project name must be less than 40 characters long'], // validator
        minLength: [2, 'A project name must be longer than 4 characters'], // validator
        // validator: [validator.isAlpha, 'Project name must only contain characters']
    },
    milestones: { 
        type: Number,
        required: [true, "You must give a quantity of milestones this project will have (can edit later)."]
    },
    currentMilestone: {
        type: Number,
        default: 0,
    },
    slug: String,
    duration: {
        type: Number,
        required: [true, 'A project must have a duration']
    },
    maxTeamSize: {
        type: Number,
        required: [true, 'A project must have a group size']
    },
    difficulty: {
        type: String,
        required: [true, 'A project must have a difficulty'],
        enum: { 
            values: ['entry level', 'junior', 'experienced', 'expert'],
            message: "Difficulty is an estimation of how hard the project will be to complete, as low of level as possible is best. Choose 1 of: entry level, junior, experienced, expert"
        }
    },
    estimatedCost: { // estimated cost of the project
        type: Number,
    },
    summary: {
        type: String,
        trim: true,
        required: [true, "A project must have a summary - the idea is to give a quick idea without revealing sensative info. This will be used when posting up your project for bid or team members (*try taking a snippit of your description)"]
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'A project must have a description, this will only be revealed if you give someone access to it.']
    },
    imageCover: {
        type: String,
        // required: [true, "A project should contain a cover image, this give prospective investors and members a snapshot of your style!"]
    },
    images: [String], // an array of type string
    createdAt: {
        type: Date,
        default: Date.now,
        select: false // never selectable from the client (good for internal use only opporations)
    },
    projectDates: [Date], // an array of dates - [0] => startDate, [1] => endDate
    secretProject: { // invite only setting possibility!!!
        type: Boolean,
        default: false,
    },
    published: {
        type: Boolean,
        default: false,
    },
    startLocation: { // geospacial data (supported in mogodb by defualt) - the start location (default)
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number],
        address: String,
        description: String
    },
    locations: [ // embeded list of locations && the starting location
        {
            type: {
                type: String,
                default: 'Point',
                enum: ['Point'],
            },
            coordinates: [Number],
            address: String,
            description: String,
            day: Number,
        }
    ],
    members: [ // uses built-in mongoose voodoo magic to reference data accross objs in DB, auto-assigns internal gen'd ID val
        { 
            type: mongoose.Schema.ObjectId,
            ref: 'User' // reference to another model to 'ref'
        }
    ],
    deployed: {
        type: Boolean,
        default: false,
    },
    funded: {
        type: Boolean,
        default: false
    },
}, 
{ // OPTIONS passed after the model
    toJSON: { virtuals: true }, // want virtuals when retrieving json data 
    toObject: { virtuals: true } // and as an object
});


// INDEXING 
projectSchema.index({ price: 1, ratingsAverage: -1 }); // indexes by price and ratings avg

projectSchema.index({ slug: 1 })
// for geospacial data - special index for locs on a 2d sphere 
projectSchema.index({ startLocation: '2dsphere' }) // is used to locate given origin, and computing nearby projects into a list (*middleware)

// virtual populate
projectSchema.virtual('durationWeeks')
    .get(function() {
        return this.duration / 7; // gives us in days rather than weeks
    })

projectSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'project',
    localField: '_id'
})


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DOCUMENT MIDDLEWARE: runs before/after & only with .save() or .create() cmds (after the other pre-middlewares have completed)
// [ purpose is to have 'event' driven middleware actions (most typical with the save event(to db))]
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SAVE and CREATE MIDDLEWARE: before (pre-x) & after (post-x) on saving/creation
projectSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

// projectSchema.pre('save', async function(next) {
//     const guidesPromises = this.guides.map(async (id) => await User.findById(id)) // returns an array of promises
//     this.guides = await Promise.all(guidesPromises) // reassigns and overwrites all promises at once by allowing all to resolve
//     next();
// });


// QUERY MIDDLEWARES: functions to run before or after a query 
projectSchema.pre(/^find/, function(next) { // runs b4 query executed
    this.find({ secretProject: { $ne: true } })
    // this.start = Date.now();
    next();
})

// tldr: added .populate later to fill in 'members' param w/ ref'd data from the users w/ 
//      role of guide ad-hoc. populate is essential to know *(does impact fetching qty/performance)
projectSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'members',
        select: '-__v -passwordChangedAt',
    });
    next();
})

projectSchema.post(/^find/, function(docs, next) { // runs after query has completed
    console.log(`query took ${Date.now() - this.start} milliseconds!`)
    console.log(docs)
    next();
})


// AGGREGATION MIDDLEWARES (works as above, but before aggregations)
projectSchema.pre('aggregate', function(next) {
    const geoOpRegex = /^[$]geo[a-zA-Z]*/;

    if(Object.keys(this.pipeline()[0]) == geoOpRegex) {
        // <geoSpacial nearby> ? push secretProjects to the front of the agg-pipeline [] (normal op)
        this.pipeline().unshift({  // pipeline is an array -> use .unshift() to push to the front of the array
            $match: { 
                secretProject: { $ne: true } 
            } 
        });  
    } else { 
        //splice in the secretProject featured project just after the <geoSpacial nearby> in the agg-pipeline
        this.pipeline().splice(1, 0, {
            $match: {
                secretProject: { $ne: true },
            }
        })
    }

    console.log(this.pipeline()); // points to the current aggregation object

    next();
})

// use this project to create new Project 
const Project = mongoose.model('Project', projectSchema)

module.exports = Project;