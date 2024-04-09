class ApiResponse {
    constructor(
        requestId,
        message,
        data,
    ) {
        this.requestId = requestId;
        this.timestamp = Date.now;
        this.message = message;
        this.data = data;
    }
}

module.exports = ApiResponse;