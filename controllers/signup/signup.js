const UserModel = require("../../db/models/userSchema.model");

async function singup(req, res) {
    try {
        const { email } = req;
        const ExistingUser = await UserModel.findOne({ email });
        if (ExistingUser) {
        }
        const { createHmac, randomBytes } = await import("crypto");
        const secretKey = randomBytes(10).toString("hex");
        res.json({
            error: false,
            message: "Signup successfull",
            data: { secretKey },
        });
    } catch (err) {
        res.json({
            error: true,
            message: "Error signing up",
            data: err,
        });
    }
}

module.exports = singup;
