const router = require("express").Router();
const generateOTP = require("../helpers/generateOTP");
const jwt = require("jsonwebtoken");
const responseData = require("../helpers/responseData");
const UserModel = require("../../db/models/userSchema.model");
const emailValidate = require("../helpers/emailValidation");
const passwordValidate = require("../helpers/passwordValidation");

router.post("/generate-otp", async (req, res) => {
    try {
        const { email } = req.body;
        if (!emailValidate(email)) {
            throw new Error("Invalid email type");
        }
        const foundUser = await UserModel.findOne({ email });
        if (!foundUser) {
            throw new Error("Email not found");
        } else if (foundUser) {
            const sercretKey = foundUser.secret_key;
            const OTP = generateOTP(6);
            const token = jwt.sign({ otp: OTP }, sercretKey, {
                expiresIn: "600s",
            }); //Might refactor how  I do this later
            res.json(
                responseData(false, "OTP generated successfully", {
                    token,
                    otp: OTP,
                })
            );
        }
    } catch (err) {
        res.json(responseData(true, "Error encountered", err.message));
    }
});

//
router.post("", async (req, res) => {
    try {
        const { email, otp, token, newPassword } = req.body;
        if (!emailValidate(email)) {
            throw new Error("Invalid email type");
        }
        const foundUser = await UserModel.findOne({ email });
        const secretKey = foundUser.secret_key;
        const verifyToken = jwt.verify(token, secretKey);

        if (verifyToken.otp !== otp) {
            throw new Error("OTP does not match");
        } else if (verifyToken.otp === otp) {
            const hashedPassword = await passwordValidate(
                secretKey,
                newPassword
            );
            foundUser.password = hashedPassword;
            await foundUser.save();
            res.json(
                responseData(false, "Password reset successfully", verifyToken)
            );
        }
    } catch (err) {
        res.json(
            responseData(true, "Error resetting the password", err.message)
        );
    }
});

module.exports = router;
