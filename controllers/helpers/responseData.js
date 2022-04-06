const responseData = (error, message, data) => {
    return { error: error, message: message, data: data };
};

module.exports = responseData;
