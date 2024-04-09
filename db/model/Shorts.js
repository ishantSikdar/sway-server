const mongoose = require("..");
const { USER, COMMENTS, SHORTS } = require("../../constant/dbContants");

const shortsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: USER,
    },
    tags: [{
        type: String,
        required: false,
    }],
    caption: {
        type: String,
        required: false,
    },
    media: {
        thumbnail: {
            type: String,
            required: false,
        },
        short: {
            type: String,
            required: true,
        }
    },
    interactivity: {
        likes: {
            type: Number,
            default: 0,
        },
        dislikes: {
            type: Number,
            default: 0,
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: COMMENTS,
        }]
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    updatedAt: {
        type: Date,
        required: false,
    },
    updatedBy: {
        type: String,
        required: false,
    },
})

const Shorts = mongoose.model(SHORTS, shortsSchema);
module.exports = Shorts;