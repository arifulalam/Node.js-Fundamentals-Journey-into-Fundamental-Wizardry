const validator = require("validator");
const bcrypt = require("bcrypt");

//encryption-descryption setting
const salt = bcrypt.genSaltSync(10);
//const hash = bcrypt.hashSync(password, salt);
//bcrypt.compareSync(password, hash); // true

const User = require("../models/UserModel");

let registrationController = async (req, res) => {
    const { username, password } = req.body;
  
    if (validator.isEmpty(username)) {
      res.status(400).json({
        status: {
          code: 400,
          message: "Bad request",
        },
        message: "Username shouldn't be empty. Please, try again,",
      });
    } else if ((await User.find({ username: username })).length != 0) {
      res.status(400).json({
        status: {
          code: 400,
          message: "Bad Request",
        },
        message: `${username} exists and/or not available to use. Please, try again.`,
      });
    } else if (!validator.isLength(password, { min: 6, max: 15 })) {
      res.status(400).json({
        status: {
          code: 400,
          message: "Bad request",
        },
        message:
          "Password (*****) should be between 6 to 15 characters long. Try again.",
      });
    } else if (!validator.isStrongPassword(password)) {
      res.status(400).json({
        status: {
          code: 400,
          message: "Bad request",
        },
        message: "Please, use a strong password.",
      });
    } else {
      const hash = bcrypt.hashSync(password, salt);
      let user = User({
        username: username,
        password: hash,
      });
  
      user.save().then(() => {
        res.status(200).json({
          status: {
            code: 200,
            message: "Success",
          },
          Message: `Welcome ${username}! Your registration completed successfully.`,
          data: user,
        });
      });
    }
  }

  module.exports = registrationController