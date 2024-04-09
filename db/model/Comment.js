const mongoose = require("..")
const { USER, COMMENTS } = require("../../constant/dbContants")

const commmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: USER,
    },
    type: {
        type: String,   // comment/review
        required: true,
    },
    content: {
        comment: {
            type: String,
            required: false,
        },
        review: {
            type: String,
            required: false,
        },
    },
    timestamp: {
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

const Comment = mongoose.model(COMMENTS, commmentSchema);
module.exports = Comment;
