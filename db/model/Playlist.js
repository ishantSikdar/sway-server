import mongoose from "..";
import { PLAYLIST } from "../../constant/dbContants";

const playlistSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    topics: [{
        topicName: {
            type: String,
        },
    }],
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

const Playlist = mongoose.model(PLAYLIST, playlistSchema);
exports.default = Playlist;