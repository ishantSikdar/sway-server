const mongoose = require("..");
const { PLAYLIST } = require("../../constant/dbContants");

const playlistSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    topics: [{
        type: String,
    }],
    thumbnail: {
        type: String,
        required: false,
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

const Playlist = mongoose.model(PLAYLIST, playlistSchema);
module.exports = Playlist;