const { format, toZonedTime } = require('date-fns-tz');

exports.getCurrentDateInIST = () => {
    const now = new Date();
    const istDate = toZonedTime(now, 'Asia/Kolkata');
    return format(istDate, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
};