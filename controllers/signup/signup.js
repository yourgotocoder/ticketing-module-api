const UserModel = require("../../db/models/userSchema.model");

async function singup(req, res) {
    try {
        const {
            email,
            password,
            name,
            mobile_number,
            mobile_number_alternate,
        } = req.body;
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //Verification for valid email, copy pasted the expression from google

        if (!regexEmail.test(email)) {
            throw new Error(`Invalid email`); //Throwing error seems better than sending a response, better error handling
        } else if (regexEmail.test(email)) {
            const ExistingUser = await UserModel.findOne({ email });
            if (ExistingUser) {
                throw new Error(`User with email already exists`);
            } else if (!ExistingUser) {
                const { createHmac, randomBytes } = await import("crypto");
                const secretKey = randomBytes(10).toString("hex");
                const hashedPassword = createHmac("sha256", secretKey)
                    .update(password)
                    .digest("hex");
                const newUser = new UserModel({
                    email,
                    secret_key: secretKey,
                    password: hashedPassword,
                    name,
                    registered_on: new Date().toLocaleString("en-Us", {
                        timeZone: "Asia/Kolkata",
                    }),
                    mobile_number_primary: mobile_number,
                    mobile_number_alternate: mobile_number_alternate,
                });
                const savedUser = await newUser.save();
                res.json({
                    error: false,
                    message: "Signup successfull",
                    data: savedUser,
                });
            }
        }
    } catch (err) {
        res.json({
            error: true,
            message: "Error signing up",
            data: err.message,
        });
    }
}

module.exports = singup;
