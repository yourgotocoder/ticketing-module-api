const passwordValidate = async (secretKey, password) => {
    const { createHmac } = await import("crypto");
    return createHmac("sha256", secretKey).update(password).digest("hex");
};

module.exports = passwordValidate;
