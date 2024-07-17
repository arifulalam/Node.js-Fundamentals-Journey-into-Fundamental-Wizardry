const validator = require("validator");
const bcrypt = require("bcrypt");

//encryption-descryption setting
const salt = bcrypt.genSaltSync(10);
//const hash = bcrypt.hashSync(password, salt);
//bcrypt.compareSync(password, hash); // true

const User = require("../models/UserModel");

let loginController = async (req, res) => {
  const { username, password } = req.body;

  //res.send(`Username: ${username} Password: ${password}`);

  if (validator.isEmpty(username) || validator.isEmpty(password)) {
    res.status(400).json({
      status: {
        code: 400,
        message: "Bad request",
      },
      message: "Username and/or password shouldn't be empty. Try again.",
    });
  } else {
    const user = await User.find({ username: username });

    if (user.length == 0) {
      res.status(400).json({
        status: {
          code: 400,
          message: "Bad request",
        },
        message: "No user exists. Try again",
      });
    } else {
      if (!bcrypt.compareSync(password, user[0].password)) {
        res.status(400).json({
          status: {
            code: 400,
            message: "Bad request",
          },
          message: "Username and/or Password is wrong. Try again.",
        });
      } else {
        res.status(200).json({
          status: {
            code: 200,
            message: "Success",
          },
          message: `${username}, you logged in successfully.`,
          data: {
            user: user,
          },
        });
      }
    }
  }
};

module.exports = loginController;
