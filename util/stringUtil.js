exports. getFileExtension = (filename) => {
    const dotIndex = filename.lastIndexOf('.');

    if (dotIndex === -1) {
        return ''; // Return an empty string or throw an error as needed
    }

    const extension = filename.substring(dotIndex + 1).toLowerCase();

    return extension;
}