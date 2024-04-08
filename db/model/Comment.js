const mongoose = require("..")
const { USER } = require("../../constant/dbContants")

const commmentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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
        default: Date.now,
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