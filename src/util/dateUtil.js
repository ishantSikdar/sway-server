const { DateTime } = require('luxon');
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

exports.formatDateToddMMyyHHMM = (date) => {
    let year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
    let month = ('0' + (date.getMonth() + 1)).slice(-2); // Month is zero-indexed, so add 1
    let day = ('0' + date.getDate()).slice(-2);
    let hours = ('0' + date.getHours()).slice(-2);
    let minutes = ('0' + date.getMinutes()).slice(-2);
    
    // Constructing the formatted date string
    let formattedDate = `${day}/${month}/${year} - ${hours}:${minutes}`;
    
    return formattedDate;
}

exports.convertToIST = (date) => {
    let istOffset = 5.5 * 60 * 60 * 1000; // in milliseconds
    let istDate = new Date(date.getTime() + istOffset);
    
    return istDate;
}


exports.convertToISTddMMyyyyHHMM = (date) => {
    const utcDateTime = DateTime.fromJSDate(date, { zone: 'utc' });
    const istDateTime = utcDateTime.setZone('Asia/Kolkata');
    const formatted = istDateTime.toFormat('dd/MM/yyyy - HH:mm');
    return formatted;
}
