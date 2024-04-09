const { generateHttpRequestId } = require("../util/IDUtil");

class ApiResponse {
    constructor(
        message,
        data,
    ) {
        this.requestId = generateHttpRequestId();
        this.timestamp = Date.now;
        this.message = message;
        this.data = data;
    }
}

module.exports = ApiResponse;