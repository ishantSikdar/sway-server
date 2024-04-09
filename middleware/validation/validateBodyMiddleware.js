const { ApiResponse } = require("../../classes/ApiResponse");

exports.validateBodyMiddleware = (requestSchema) => {
    return (req, res, next) => {
        try {
            requestSchema.parse(req.body);
            next();
        } catch(error) {
            return res.status(400).json(
                new ApiResponse(`Invalid request body: ${error.errors[0].message}`)
            );
        }
    }
}