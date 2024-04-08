const mongoose = require("..")
const { USER } = require("../../constant/dbContants")

const communitySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    communityName: {
        type: String,
        required: true,
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: USER,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: USER,
    }],
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
})