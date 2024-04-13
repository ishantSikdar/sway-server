import { logger } from "../config/logger";
import Playlist from "../db/model/Playlist";

exports.getAllSubjects = async (req) => {
    const allSubjects = await Playlist.find();
    logger.info("Fetched all courses");
    return allSubjects;
}

