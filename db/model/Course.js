const mongoose = require("..");
const { DB_COURSE: COURSE, DB_COMMENTS: COMMENTS } = require("../../constant/dbContants");

const courseSchema = new mongoose.Schema({
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
                interaction: {
                    rating: {
                        type: Number,
                        default: 0,
                        required: true,
                    }, 
                    comments: [{
                        type: mongoose.Schema.Types.ObjectId,
                        ref: COMMENTS,
                    }],
                },
            }]
        }]
    },
    interaction: {
        rating: {
            type: Number,
            default: 0,
            required: true,
        }, 
        reviews: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: COMMENTS,
        }],
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
});

const Course = mongoose.model(COURSE, courseSchema);
module.exports = Course;