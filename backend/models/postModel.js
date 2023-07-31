const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    description: {
        type: String,
    },
    image: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    vibetags: [{
        type: String,
    }],
    peopletags: [{
        type: String,
    }],
    likedbyusers: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
            },
        },
    ],
    author:
    {
        _id: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        username: {
            type: String,
            // required: true,
        },
        avatar: {
            public_id: {
                type: String,
                // required: true,
            },
            url: {
                type: String,
                // required: true,
            },
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    location: {
        type: String,
    },
});

module.exports = mongoose.model("Post", postSchema);