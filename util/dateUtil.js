const { format, toZonedTime } = require('date-fns-tz');

exports.getCurrentDateInIST = () => {
    const now = new Date();
    const istDate = toZonedTime(now, 'Asia/Kolkata');
    return format(istDate, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
};

exports.formatDateToEng = (date) => {
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
}