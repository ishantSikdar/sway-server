const { YT_ROOT_URL: YT_BASE_URL } = require("../constant/endpoints");
const Playlist = require("../db/model/Playlist");
const YT_KEY = process.env.YT_KEY;
const axios = require('axios');

exports.getAllSubjects = async (req) => {
    const allSubjects = await Playlist.find();
    const responseList = allSubjects.map((subject) => {
        return {
            id: subject._id,
            name: subject.subject,
            thumbnail: `${process.env.IMAGE_CDN_BASE_URL}${subject.thumbnail}`,
            desc: subject.description,
        }
    });
    return responseList;
}

exports.getSubjectDetails = async (req) => {
    const subjectDetails = await Playlist.findOne({
        _id: req.params.subjectId
    })
    return subjectDetails;
}


exports.getSubjectsByName = async (name) => {
    const isSearchQuery = name && typeof name === 'string' && name.trim() !== '';

    const query = isSearchQuery
        ? [
            {
                $search: {
                    index: "subject_search",
                    text: {
                        query: name,
                        path: "subject",
                        fuzzy: {
                            maxEdits: 2,
                            prefixLength: 1
                        }
                    }
                }
            }
        ]
        : [{ $match: {} }]; // Return all records if no valid name is provided

    const subjects = await Playlist.aggregate(query);

    return subjects.map((subject) => ({
        id: subject._id,
        name: subject.subject,
        thumbnail: `${process.env.IMAGE_CDN_BASE_URL}${subject.thumbnail}`,
        desc: subject.description,
        ai: false
    }));
};


exports.getSubjectById = async (subjectId) => {
    const subject = await Playlist.findOne({ _id: subjectId });
    return {
        _id: subject._id,
        name: subject.subject,
        description: subject.description,
        thumbnailUrl: `${process.env.IMAGE_CDN_BASE_URL}${subject.thumbnail}`,
        topics: subject.topics,
    };
}

exports.getYoutubeVideosByTitle = async (title) => {
    const videoDataResponse = await axios.get(`${YT_BASE_URL}/search?key=${YT_KEY}&q=${title}&safeSearch=strict&type=video&videoEmbeddable=true&part=snippet&videoDuration=medium`);
    return videoDataResponse.data.items;
}