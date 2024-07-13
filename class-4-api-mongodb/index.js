const express = require('express');
const mongo = require('mongodb');
//username: nodejs
//password: oujPdeoKq3SuduLH
const mongoose = require('mongoose');
const validator = require('validator');

const User = require("./Model/registrationModel");

//encryption-descryption
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10); 
//const hash = bcrypt.hashSync(password, salt);
//bcrypt.compareSync(password, hash); // true

const mongoURL = "mongodb+srv://nodejs:oujPdeoKq3SuduLH@cluster0.ypmrejo.mongodb.net/mongoDB?retryWrites=true&w=majority&appName=Cluster0";

//database connection
mongoose
.connect(mongoURL)
.then(() => {
    console.log('Mongo DB connected...');
});

const app = express();

/*
    middleware to convert all the data 
    from client to server as json format.
*/
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello NodeJS');    
});

app.post('/registration', (req, res) => {
    const regData = req.body;

    console.clear();
    console.log(regData);

    if(regData.firstname == undefined)
        res
    .status(400)
    .json({
        "error" : {
            "code": 400,
            "message": "Bad request"
        },
        "message": 'Invalid request. Please, cross check.'            
    });

    if(validator.isEmpty(regData.firstname) || validator.isEmail(regData.lastname)){
        res
        .status(400)
        .json({
            "error" : {
                "code": 400,
                "message": "Bad request"
            },
            "message": 'First Name and/or Last Name is Empty. Try again.'            
        });
    } else if(validator.isEmpty(regData.email)){
        res
        .status(400)
        .json({
            "error" : {
                "code": 400,
                "message": "Bad request"
            },
            "message": 'Email address is Empty. Try again.'            
        });
    } else if(!validator.isEmail(regData.email)){
        res
        .status(400)
        .json({
            "error" : {
                "code": 400,
                "message": "Bad request"
            },
            "message": regData.email + ' is not a valid email address. Try again.'            
        });
    } else if(!validator.isLength(regData.password, {min: 6, max: 15})){
        res
        .status(400)
        .json({
            "error" : {
                "code": 400,
                "message": "Bad request"
            },
            "message": 'Password (*****) should be between 6 to 15 characters long. Try again.'            
        });
    }

    let passwordStrengh = validator.isStrongPassword(regData.password);

    const hash = bcrypt.hashSync(regData.password, salt);
    let newUser = User({
        firstname: regData.firstname,
        lastname: regData.lastname,
        username: regData.username,
        email: regData.email,
        password: hash
    });

    console.log(newUser);

    newUser.save()

    res
    .status(200)
    .json({
        "status":{
            "code": 200,
            "message": "Success",
        },
        "Message": 'Registration successful' + ((!passwordStrengh) ? ' with unsecure password.' : '.'),
        "data": newUser
    });
});

app.listen(8000, () => {
    console.log('Express started.');
});