const { ApiResponse } = require("../classes/ApiResponse");
const { API_REQ_LOG } = require("../constant/logConstants");
import { getAllSubjects } from "../service/playlistServices";

exports.getSubjectsList = async (req, res) => {
    if (!req.searchTag) {
        const allSubjects = await getAllSubjects(req);
    }
}