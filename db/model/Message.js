const mongoose = require("..");
const { MESSAGE } = require("../../constant/dbContants");

const messageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: USER,
        required: true,
    }, 
    time: {
        type: Date,
        default: Date.now,
        required: true,
    },
    content: {
        contentType: {
            type: String,
            default: "text",
            required: true,
        },
        message: {
            type: String,
            default: "",
            required: true,
        }
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
})

const Message = mongoose.model(MESSAGE, messageSchema);
exports.module = Message;