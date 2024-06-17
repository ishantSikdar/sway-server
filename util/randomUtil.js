exports.generateRandomCode = (uniqueId) => {
    // Get the current timestamp and convert to hexadecimal
    const timestamp = Date.now().toString(16).toUpperCase();
    const timestampPart = timestamp.slice(-5); // Get the last 5 characters of the hexadecimal timestamp

    // Use a part of the unique identifier (last 3 characters)
    const uniqueIdPart = uniqueId.slice(-5).toUpperCase();

    // Combine parts to create an 8 character long code
    const code = (timestampPart + uniqueIdPart).slice(0, 10);

    return code;
}