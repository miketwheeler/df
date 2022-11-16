/////////////////////////////////////////////////////////////////////////////////////////////////////
// USER MODEL  -> 
/////////////////////////////////////////////////////////////////////////////////////////////////////

const crypto = require('crypto')
const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "You must have a first name, right?"],
        trim: true,
        maxLength: [40, "How is your name that long? Can you shorten it a bit?"],
        minLength: [2, "Acronym? It can't be that short! (no Jr's, Sr's, Ms's or Mr's)"]
    },
    lastName: {
        type: String,
        required: [true, "You must have a last name, right?"],
        trim: true,
        maxLength: [40, "How is your name that long? Can you shorten it a bit?"],
        minLength: [2, "Acronym? It can't be that short! (no Jr's, Sr's, Ms's or Mr's)"]
    },
    // screenName: {
    //     type: String,
    //     trim: true,
    //     unique: [true, "There is another with that same screen name, try something else."],
    //     maxLength: [20, "This is supposed to be a concise & recognizable screen name."],
    //     minLength: [2, "It can't be that short!"]
    // },
    // slug: String,
    email: {
        type: String,
        required: [true, "How do you get your electronic mail?"],
        trim: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "...Something is odd about that email, try agian."]
    },
    photo: {
        type: String,
        // required: [true, 'Add an avatar or photo for team members!']
    },
    role: {
        type: String,
        enum: ["user", "member", "team-lead", "admin"],
        default: "user",
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Because things that are valuable get stolen, we require at least 8 characters per password, don't go cheap on us now!"],
        select: false, // never returns the value if data is retrieved
    },
    passwordConfirm: {
        type: String,
        required: [true, "That's not your password confirmation."],
        validate: {
            // This only works on SAVE or CREATE - not UPDATE!!
            validator: function(el) { // need reg func - b/c needs access to this keyword
                return el === this.password;
            },
            message: "Your password confimation does not match our records!"
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,

    ///////////////////////////////////////////////////////////////////////////
    // TODO: NEED TO WRITE ANY MIDDLEWARES FOR THESE ATTRIBUTES AS NEEDED!!!!
    ///////////////////////////////////////////////////////////////////////////
    userBio: {
        type: String,
        required: [true, "Provide a bit about yourself so others can relate!"]
    },
    available: {
        type: Boolean,
        default: true,
        // select: false, // don't return this field(internal use only)
    },
    devType: {
        type: String,
        required: [true, "You need one specialization!"]
    },
    skillLevel: {
        type: Number,
        default: 5,
        // select: false, // hidden from modification outside the server
    },
    skillsList: {
        type: [String],
        required: [true, "You need at least 1 skill and the idea is to remain truthful about it though (this isn't a job application)."]
    },
    usersLinks: {
        type: [String],
    },
    // teamsList - need to adhoc add them, sustain this record beyond life of Project
    teams: [ // mongoose voodoo magic - associates list of project ID's if user is on them
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Team'
        }
    ],
    projects: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project'
        }
    ],
},
{ // OPTIONS passed after the model - allows display of .virtual attrs crtd/mnpltd w/in the User
    toJSON: { virtuals: true }, // want virtuals when retrieving json data 
    toObject: { virtuals: true } // and as an object
}
);


/////////////////////////////////////////////////////////////////
// VIRTUALS
// userSchema.virtual('screenName') // procedurally returns screenName - using fName(1char)+lName(4char)
//     .get(function () {
//         return this.firstName.slice(0, 1) + this.lastName.slice(0, 5);
//     }
// )
// userSchema.virtual('screenName').get(function() {
//     return this.firstName.slice(0,1) + this.lastName.slice(0,5)
// })
// .set(function(firstName, lastName) {
//     firstName = this.firstName;
//     lastName = this.lastName;
// });

// userSchema.virtual('rating', {
//     ref: 'Review',
//     localField: '_id',
//     foreignField: 'user',
// })

/////////////////////////////////////////////////////////////////
// QUERY MIDDLEWARE on USER
userSchema.pre(/^find/, function(next) {
    // this points to the current query (find, findById, findOne, etc.)
    this.find({ active: { $ne: false } }); // any 'find' query will return all users where active attr is true(not===false)
    next();
});

/////////////////////////////////////////////////////////////////
// DOCUMENT MIDDLEWARE on USER
// =========> trying out pre-save middleware to set screenName
userSchema.pre('save', function(next) {
    if(this.screenName === undefined || this.screenName === null)
        this.screenName = this.firstName.slice(0, 1) + this.lastName.slice(0, 5)
    
    next();
});

userSchema.pre('save', function(next) {
    if (!this.isModified('password') || this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.pre('save', async function(next) {
    // only run this func if password was actually modified
    if(!this.isModified('password')) return next();
    // uses bcrypt to hash the password pre-commit to the DB - string to encrypt and salt=12 (higher the salt, greater the length)
    this.password = await bcrypt.hash(this.password, 12);

    // delete/reset the password confirmation string for next time
    this.passwordConfirm = undefined; 
    next();
});

userSchema.pre('save', function(next) {
    if(!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
})

/////////////////////////////////////////////////////////////////
// INSTANCE METHODS on USER
// *globally callable when verifying PWs
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if(this.passwordChangedAt) {
        // parse the divided (1000 miliseconds per second) in base-10 format => time
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10); 
        // console.log(changedTimestamp, JWTTimestamp)
        return JWTTimestamp < changedTimestamp; // if changed after issued jwt
    }

    // else not changed
    return false;
}

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

    console.log({resetToken}, this.passwordResetToken) // dev only *****

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // now + 10mins *60secnds *1000milliseconds

    return resetToken;
}


const User = mongoose.model('User', userSchema);

module.exports = User;