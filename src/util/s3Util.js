const s3Accessor = require('../config/s3Config');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { logger } = require('../config/logger');

exports.uploadFileToS3 = async (path, file, fileName) => {
    try {
        const entityKey = `${path}/${fileName}`;
        const uploadedEntity = await s3Accessor.send(new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: entityKey,
            Body: file.buffer
        }));

        
        if (uploadedEntity.$metadata.httpStatusCode === 200) {
            logger.info(`Uploaded File to S3 successfully\n  ->Filename: ${file.originalname}\n  ->Size: ${file.size}`)
            return `/${entityKey}`;
        
        } else {
            logger.error(uploadedEntity);
            throw new Error(uploadedEntity);
        }

    } catch (error) {
        logger.error(`Failed to upload file\n  ->${file.originalname} to S3, ${error.message}`);
        logger.error(error)
        throw error;
    }
}