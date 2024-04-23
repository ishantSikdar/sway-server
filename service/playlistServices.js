const Playlist = require("../db/model/Playlist");

exports.getAllSubjects = async (req) => {
    const allSubjects = await Playlist.find();
    return allSubjects;
}

exports.getSubjectDetails = async (req) => {
    const subjectDetails = await Playlist.findOne({
        _id: req.params.subjectId
    })
    return subjectDetails;
}