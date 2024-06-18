const { ApiResponse } = require("../../classes/ApiResponse");

exports.validateBodyMiddleware = (requestSchema) => {
    return (req, res, next) => {
        try {
            requestSchema.parse(req.body);
            next();
        } catch(error) {
            return res.status(400).json(
                new ApiResponse(`${error.errors[0].message}`)
            );
        }
    }
}

exports.validateStringifiedBodyMiddleware = (requestSchema) => {
    return (req, res, next) => {
        try {
            console.log(req.body)
            requestSchema.parse(JSON.parse(JSON.parse(req.body.json)));
            next();
        } catch(error) {
            return res.status(400).json(
                new ApiResponse(`${error.errors[0].message}`)
            );
        }
    } 
}