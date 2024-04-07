const mongoose = require("..");
const { COURSE } = require("../../constant/dbContants");

const courseSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discountPercentage: {
        type: Number,
        required: false
    },
    content: {
        chapters: [{
            name: String,
            lecture: [{
                name: {
                    type: String,
                    required: true
                },
                video: {
                    type: String,
                    required: true,
                },
            }]
        }]
    },
    createdAt: {
        type: Date,
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

const Course = mongoose.model(COURSE, courseSchema);
module.exports = Course;