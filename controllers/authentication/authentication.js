//Authentication, I will probably just implement a basic jwt authentication for now
const UserSchema = require("../../db/models/userSchema.model");
const emailValidate = require("../helpers/emailValidation");
const responseData = require("../helpers/responseData");
const passwordValidate = require("../helpers/passwordValidation");

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!emailValidate(email)) {
            throw new Error(`Invalid email`);
        } else if (emailValidate(email)) {
            const foundUser = await UserSchema.findOne({ email });
            if (!foundUser) {
                throw new Error(
                    `Email does not exist, please signup before logging in`
                );
            } else if (foundUser) {
                const sercretKey = foundUser.secret_key;
                const hashdedPassword = await passwordValidate(
                    sercretKey,
                    password
                );
                console.log(hashdedPassword);
                if (hashdedPassword !== foundUser.password) {
                    throw new Error("Password does not match");
                } else if (hashdedPassword === foundUser.password) {
                    res.json(
                        responseData(false, "Logged In Successfully", {
                            ...foundUser._doc,
                            password: "",
                            secret_key: "",
                        })
                    );
                }
            }
        }
    } catch (err) {
        res.json(responseData(true, "Error logging in", err.message));
    }
};

module.exports = login;
