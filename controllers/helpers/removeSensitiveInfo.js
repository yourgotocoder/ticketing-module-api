const removeSensitiveInfo = (userData) => ({
    ...userData,
    password: "",
    secret_key: "",
});

module.exports = removeSensitiveInfo;
