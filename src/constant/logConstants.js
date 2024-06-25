exports.API_REQ_LOG = (requestId, status, message, URI) => {
    return `ID: ${requestId}, Status: ${status} => ${message} [URI: ${URI}]`;
}