const { getCurrentDateInIST } = require("../util/dateUtil");
const { generateHttpRequestId } = require("../util/idUtil");

class ApiResponse {
    constructor(
        message,
        data,
    ) {
        this.requestId = generateHttpRequestId();
        this.timestamp = getCurrentDateInIST();
        this.message = message;
        this.data = data;
    }
}

module.exports = { ApiResponse };