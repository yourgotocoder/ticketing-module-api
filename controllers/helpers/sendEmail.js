const nodemailer = require("nodemailer");

const sendEmail = (sendMailTo, contentOfMail, subjectOfMail) => {
    let mailerConfig = {
        host: "smtpout.secureserver.net",
        secureConnection: true,
        port: 587,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    };

    let transporter = nodemailer.createTransport(mailerConfig);

    let mailOptions = {
        from: mailerConfig.auth.user,
        to: sendMailTo,
        subject: subjectOfMail,
        html: contentOfMail,
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error);
            throw new Error(`Error sending email.`);
        } else {
            console.log(`Email sent successfully`);
        }
    });
};

module.exports = sendEmail;
