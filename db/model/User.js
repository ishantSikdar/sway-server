const mongoose = require("..");
const { COURSE, USER } = require("../../constant/dbContants");

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    interests: [{
        type: String,
        required: false,
    }],
    coursesEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: COURSE,
    }],
    focusTimer: {
        today: {
            duration: Number,
            grade: String,
            breaks: Number,
        }, 
        allTimeBest: {
            duration: Number,
            grade: String,
            breaks: Number,
        }
    },
    mobile: {
        type: String,
        unique: true,
        required: true,
    },
    lastLoginAt: {
        type: Date,
        required: false,
    },
    createdAt: {
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
});

const User = mongoose.model(USER, userSchema);
module.exports = User;