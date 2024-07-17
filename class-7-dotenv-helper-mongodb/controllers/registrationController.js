let registrationController = (req, res) => {
    const {name, email, password} = req.body;

    if(name == '') res.status(400).json({status:{code: 400, message: "Bad Request."}, message: "Name is required."});

    else if(email == '') res.status(400).json({status:{code: 400, message: "Bad Request."}, message: "Email is required."});

    else if(password == '') res.status(400).json({status:{code: 400, message: "Bad Request."}, message: "Password is required."});

    else res.status(200).json({status:{code: 200, message: "OK"}, message: "Registration done."});
}

module.exports = registrationController