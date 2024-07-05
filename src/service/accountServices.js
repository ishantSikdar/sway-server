const { MongoError } = require('mongodb'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { logger } = require('../config/logger');
const User = require("../db/model/User");
const { formatDateToEng } = require("../util/dateUtil");
const { ObjectId } = require('mongodb');
const { uploadFileToS3 } = require('../util/s3Util');
const { ENTITY_USERS } = require('../constant/appConstants');

exports.signUp = async (req) => {
    const jsonRequest = JSON.parse(JSON.parse(req.body.json));

    const existingUser = await User.findOne({
        $or: [
            { username: jsonRequest.username },
            { email: jsonRequest.email },
            { mobile: jsonRequest.mobile }
        ]
    });

    if (existingUser) {
        let conflictKey = '';
        if (existingUser.username === jsonRequest.username) {
            conflictKey = 'username';
        } else if (existingUser.email === jsonRequest.email) {
            conflictKey = 'email'
        } else if (existingUser.mobile === jsonRequest.mobile) {
            conflictKey = 'mobile number';
        }

        req.status = 409;
        throw new Error(`User already exists ${conflictKey && `by ${conflictKey}` }`);
    }

    const userId = new ObjectId();

    let profilePicUrl;
    if (req.file) {
        profilePicUrl = await uploadFileToS3(`${ENTITY_USERS}/${userId.toHexString()}`, req.file, 'profilePic.png');
    }
    
    const newUser = new User({
        _id: userId,
        name: jsonRequest.name,
        username: jsonRequest.username,
        email: jsonRequest.email,
        photo: profilePicUrl,
        password: await bcrypt.hash(jsonRequest.password, 10),
        mobile: jsonRequest.mobile,
    });

    const user = await newUser.save();
    logger.info(`User ${user._id} Registered`);
}

exports.signIn = async (req) => {
    const user = await User.findOne({
        $or: [
            { username: req.body.username },
            { email: req.body.username },
            { mobile: req.body.username }
        ]
    });
    
    if (!user) {
        req.status = 404;
        throw new Error('User not found');
    }
    
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

    if (!isPasswordValid) {
        req.status = 401;
        throw new Error('Invalid Username or Password');
    }

    return jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
}

exports.getUserDetails = async (req) => {
    const user = await User.findById(req.userId);

    if (!user) {
        req.status = 404;
        throw new Error('User not found');

    } else {
        return {
            username: user.username,
            photoUrl: user.photo && `${process.env.IMAGE_CDN_BASE_URL}${user.photo}`,
            bannerUrl: user.banner && `${process.env.IMAGE_CDN_BASE_URL}${user.banner}`,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            interests: user.interests,
            enrolled: user.coursesEnrolled,
            joined: formatDateToEng(user.createdAt),
        };
    }
}

exports.editUserDetails = async (req) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            req.status = 404;
            throw new Error('User not found');

        } else {
            const newUser = JSON.parse(JSON.parse(req.body.json));

            for (const key in newUser) {
                if (newUser[key] !== undefined && newUser[key] !== "") {
                    user[key] = newUser[key];
                }
            }
            await user.save();
        }
    } catch (error) {

        if (error instanceof MongoError && error.code === 11000) {
            let conflictKeyMessage = '';

            if (error.keyPattern && error.keyValue) {
                const fields = Object.keys(error.keyPattern);
                const conflictingField = fields.find(field => error.keyValue[field]);

                if (conflictingField === 'username') {
                    conflictKeyMessage += 'Username is already taken';
                } else if (conflictingField === 'email') {
                    conflictKeyMessage += 'Email is already taken';
                } else if (conflictingField === 'mobile') {
                    conflictKeyMessage += 'Mobile number is already taken';
                } else {
                    conflictKeyMessage += 'Duplicate user error';
                }
                req.status = 409;
                throw new Error(conflictKeyMessage);
            }

        } else {
            throw error;
        }
    }
}

exports.editProfilePicture = async (req) => {
    const user = await User.findById(req.userId);

    if (!user) {
        req.status = 404;
        throw new Error('User not found');

    } else {
        const photoUrl = await uploadFileToS3(`${ENTITY_USERS}/${user._id.toHexString()}`, req.file, 'profilePic.png');
        user.photo = photoUrl;
        await user.save();
        logger.info(`Update profile pic of user ${req.userId}`);
    }
}

exports.editBannerPicture = async (req) => {
    const user = await User.findById(req.userId);

    if (!user) {
        req.status = 404;
        throw new Error('User not found');

    } else {
        const photoUrl = await uploadFileToS3(`${ENTITY_USERS}/${user._id.toHexString()}`, req.file, 'bannerPic.png');
        user.banner = photoUrl;
        await user.save();
        logger.info(`Update profile pic of user ${req.userId}`);
    }
}