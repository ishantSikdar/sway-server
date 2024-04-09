exports.API_REQ_LOG = (requestId, status, message) => {
    return `ID: ${requestId}, Status: ${status} => ${message}`;
}