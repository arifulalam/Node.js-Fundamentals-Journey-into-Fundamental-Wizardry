require('dotenv').config();
const express = require("express");
const nodemailer = require("nodemailer");
const transporter = require("./helper/mail_transporter");

const email_template = require("./helper/email_template");

const app = express();

const security = require('./middleware/security');

const dbConnection = require('./helper/dbConnection');
dbConnection();

const registrationController = require("./controllers/registrationController");
const loginController = require("./controllers/loginController");
const verifyController = require("./controllers/verifyController");

app.use(express.json());

app.get('/', async (req, res) => {
    console.log('API');

    let email = email_template.replace('#_fullname', 'Ariful Alam').replace('#_email_address', 'ariful-alam@hotmail.com');
    res.send(email);

    await transporter.sendMail({
        from: '"Ariful Alam 👻" <aatuhin@gmail.email>', // sender address
        to: "ariful-alam@hotmail.com, pagla@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        //text: "Hello world?", // plain text body
        html: email, // html body
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

    /*
    {
        accepted: [ 'ariful-alam@hotmail.com', 'pagla@gmail.com' ],
        rejected: [],
        ehlo: [
            'SIZE 35882577',
            '8BITMIME',
            'AUTH LOGIN PLAIN XOAUTH2 PLAIN-CLIENTTOKEN OAUTHBEARER XOAUTH',
            'ENHANCEDSTATUSCODES',
            'PIPELINING',
            'CHUNKING',
            'SMTPUTF8'
        ],
        envelopeTime: 1202,
        messageTime: 1085,
        messageSize: 371,
        response: '250 2.0.0 OK  1722002949 d2e1a72fcca58-70ead89e53fsm2739898b3a.187 - gsmtp',
        envelope: {
            from: 'aatuhin@gmail.email',
            to: [ 'ariful-alam@hotmail.com', 'pagla@gmail.com' ]
        },
        messageId: '<91e4e1e7-d297-176d-ada9-4e1c390f4bc4@gmail.email>'
    }
    */
});

app.get('/verify', verifyController);

app.post('/registration', security, registrationController)

app.post('/login', security, loginController)

app.listen(8000, () => {
    console.log('NodeJS Server started...');
})