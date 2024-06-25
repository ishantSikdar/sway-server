let httpRequestId = 0;

exports.generateHttpRequestId = () => {
    httpRequestId = ++httpRequestId;
    return httpRequestId;
}