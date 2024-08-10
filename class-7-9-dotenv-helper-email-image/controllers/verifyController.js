const User = require("../models/UserModel");

const verifyController = async (req, res) => {
    const { email } = req.query;
    
    if(email != '' && email != undefined){
        let user = null;
        if(user = await User.findOne({email: email})){
            console.log(user);
            if(await User.findByIdAndUpdate(user._id, {isVerified: true}, {new: true})){
                res.status(200).json({
                    status: {
                        code: 200,
                        message: "OK"
                    },
                    message: "Congratulations! You are now a verified user."
                });
            }else{
                res.status(400).json({
                    status: {
                        code: 400,
                        message: "Bad Request"
                    },
                    message: "Verification failed. Try again later and/or contact support."
                });
            }
        }else{
            res.status(400).json({
                status: {
                    code: 400,
                    message: "Bad Request"
                },
                message: `No email address (${email}) found. Please, be sure you are not spamming.`
            });
        }
    }else{
        res.status(400).json({
            status: {
                code: 400,
                message: "Bad Request"
            },
            message: `Missing email address to verify. Please, be sure you are not spamming.`
        });
    }
}

module.exports = verifyController;