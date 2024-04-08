const mongoose = require("../index");
const { COURSE, USER } = require("../../constant/dbContants");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
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
    mobile: {
        type: String,
        unique: true,
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