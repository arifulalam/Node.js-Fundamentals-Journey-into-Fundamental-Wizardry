const express = require('express');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const validator = require('validator');

const app = express();

const {Schema} = mongoose;

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

    res
    .status(200)
    .json({
        "status":{
            "code": 200,
            "message": "Success",
        },
        "Message": 'Registration successful' + ((!passwordStrengh) ? ' with unsecure password.' : '.')
    });
});

app.listen(8000, () => {
    console.log('Express started.');
});