
const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator'); // npm package for validator methods (strings only *see npm/git page for all)
// const User = require('./userModel');



const postSchema = new mongoose.Schema({
    title: {
        type: String,
        // required: [true, "A post must have a title."],
        maxLength: [200, "A post title cannot exceed 200 characters"],
        minLength: [2, "Your post title is too short."]
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // select: false // never selectable from the client (good for internal use only opporations)
    },
    updatedAt: Date,
    text: {
        type: String,
        required: [true, "A post must have some text with it."],
        maxLength: [1200, "A post cannot exceed 1200 characters"],
        minLength: [2, "Your post is way too short, it's not really a post at all!"]
    },
    // numLikes: Number,
    // numComments: Number,
    // authoredBy: {
    //     // ref to user who has posted this post
    // }
},
{ // OPTIONS passed after the model - allows display of .virtual attrs crtd/mnpltd w/in the User
    toJSON: { virtuals: true }, // want virtuals when retrieving json data 
    toObject: { virtuals: true } // and as an object
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;