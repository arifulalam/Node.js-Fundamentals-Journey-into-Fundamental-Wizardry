const bcrypt = require("bcrypt");
const User = require("../models/UserModel")

const salt = bcrypt.genSaltSync(10);

const loginController = async (req, res) => {
    const {email, password} = req.body;

    if(email == '' || email == undefined) 
        res.status(400).json({status:{code: 400, message: "Bad Request."}, message: "Email is required."});

    else if(password == '' || password == undefined) 
        res.status(400).json({status:{code: 400, message: "Bad Request."}, message: "Password is required."});

    else {
        let user = null;
        if(user = await User.findOne({email: email}))
        {
            if(user.isVerified){
                if(bcrypt.compareSync(password, user.password)){
                    res.status(200).json({
                        status: {
                            code: 200,
                            message: "OK"
                        },
                        message: `Welcome! ${user.name}. Login successful.`,
                        data: {
                            id: user._id,
                            name: user.name,
                            email: user.email
                        }
                    })
                }else{
                    res.status(400).json({
                        status: {
                            code: 400,
                            message: "Bad Request"
                        },
                        message: `Login failed. Try again later`,
                        data: null
                    });
                }
            }else{
                res.status(400).json({
                    status: {
                        code: 400,
                        message: "Bad Request"
                    },
                    message: `Please, verify your email address first.`,
                    data: null
                });
            }            
        }
    }
}

module.exports = loginController