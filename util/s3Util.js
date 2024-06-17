const s3Accessor = require('../config/s3Config');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { getFileExtension } = require('./stringUtil');

exports.uploadFileToS3 = async (path, file, fileName) => {
    try {
        const entityKey = `${path}/${fileName}.${getFileExtension(file.originalname)}`;
        const uploadedEntity = await s3Accessor.send(new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: entityKey,
            Body: file.buffer
        }));
        return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${entityKey}`;

    } catch (error) {
        console.error(`Failed to upload file -> ${file.originalname} to S3, ${error.message}`);
        throw error;
    }
}