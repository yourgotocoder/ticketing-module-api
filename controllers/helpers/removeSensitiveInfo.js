const removeSensitiveInfo = (userData) => {
    const data = { ...userData };
    delete data["password"];
    delete data["secret_key"];
    return data;
};

module.exports = removeSensitiveInfo;
