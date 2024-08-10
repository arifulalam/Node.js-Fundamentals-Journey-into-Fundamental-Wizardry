const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const transporter = require("../helper/mail_transporter");

const User = require("../models/UserModel");

const email_template = require("../helper/email_template");
const renderTemplate = require("../helper/renderTemplate")

const salt = bcrypt.genSaltSync(10);

let registrationController = async (req, res) => {
    const {name, email, password} = req.body;

    if(name == '' || name == undefined) 
        res.status(400).json({status:{code: 400, message: "Bad Request."}, message: "Name is required."});

    else if(email == '' || email == undefined) 
        res.status(400).json({status:{code: 400, message: "Bad Request."}, message: "Email is required."});

    else if(password == '' || password == undefined) 
        res.status(400).json({status:{code: 400, message: "Bad Request."}, message: "Password is required."});

    else {
        const hash = bcrypt.hashSync(password, salt);

        let user = new User({
            name: name,
            email: email,
            password: hash
        });

        if(await User.findOne({email:email})){
            res.status(400).json({
                status: {
                    code: 400,
                    message: "Bad Request",
                },
                message: `${email} already exists. Try another.`
            });
        }else{
            user.save().then(async (u) => {
                let html = renderTemplate(email_template, {fullname: u.name, email: u.email})

                await transporter.sendMail({
                    from: '"Ariful Alam" <aatuhin@gmail.email>', // sender address
                    to: `${u.email}`, // list of receivers
                    subject: `Welcome! ${u.name}`, // Subject line
                    //text: "Hello world?", // plain text body
                    html: html, // html body
                })
                .catch((err) => {
                    console.log('Error');
                    console.log(err);
                    console.error;
                })
                .then((result) => {
                    console.log(result.messageId);
                    let { accepted, rejected } = result;
                    console.log(accepted, rejected);
                });

                res.status(200).json({
                    status: {
                        code: 200, 
                        message: "OK"
                    }, 
                    message: "Registration done.",
                    data: {
                        id: u._id,
                        user: u.name,
                        email: u.email,
                    }
                });
            });
        }
    }
}

module.exports = registrationController