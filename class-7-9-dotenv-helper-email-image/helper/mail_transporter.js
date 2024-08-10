const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "aatuhin@gmail.com",
        pass: "hbrx ltti lomy wrll"
    }
});

module.exports = transporter