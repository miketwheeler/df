/////////////////////////////////////////////////////////////////////////////////////////////////////
// USER MODEL  -> 
/////////////////////////////////////////////////////////////////////////////////////////////////////

const crypto = require('crypto')
const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    // name, email, photo, password, passwordConfirm
    name: {
        type: String,
        required: [true, "You must have a name, right?"],
        trim: true,
        maxLength: [40, "How is your name that long? Do you go by a nick-name?"],
        minLength: [2, "Acronym? It can't be that short! (no Jr's, Sr's, Ms's or Mr's)"]
    },
    // slug: String,
    email: {
        type: String,
        required: [true, "How do you get your electronic mail?"],
        trim: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "...Something odd about that email, try agian."],
        // maxLength: [40, "How is your name that long? Do you go by a nick-name?"],
        // minLength: [3, "Acronym? It can't be that short!"]
    },
    photo: {
        type: String,
        // required: [true, 'Show the world your beautiful face!']
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
            validator: function(el) { // need reg func - access to this 
                return el === this.password;
            },
            message: "Your password confimation does not match our records!"
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false, // don't return this field(internal use only)
    }
});

/////////////////////////////////////////////////////////////////
// QUERY MIDDLEWARE on USER
userSchema.pre(/^find/, function(next) {
    // this points to the current query (find, findById, findOne, etc.)
    this.find({ active: { $ne: false } }); // any 'find' query will return all users where active attr is true(not===false)
    next();
})

/////////////////////////////////////////////////////////////////
// DOCUMENT MIDDLEWARE on USER
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

    console.log({resetToken}, this.passwordResetToken)

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // now + 10mins *60secnds *1000milliseconds

    return resetToken;
}


const User = mongoose.model('User', userSchema);

module.exports = User;