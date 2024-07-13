const express = require("express");
const mongo = require("mongodb");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const User = require("./models/userModel")

const { Schema } = mongoose;

//mongo db connection
const db_user = "nodejs";
const db_pass = "oujPdeoKq3SuduLH";
const db_name = "mongoDB";
const url = `mongodb+srv://${db_user}:${db_pass}@cluster0.ypmrejo.mongodb.net/${db_name}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(url).then(() => {
  console.log("db connected...");
});

//encryption-descryption setting
const salt = bcrypt.genSaltSync(10);
//const hash = bcrypt.hashSync(password, salt);
//bcrypt.compareSync(password, hash); // true

//Express
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  const data = req.body;
  console.log(data);
  res.send("Application running...");
});

app.post("/registration", async (req, res) => {
  const { firstname, lastname, email, username, password } = req.body;

  if (firstname == undefined)
    res.status(400).json({
      error: {
        code: 400,
        message: "Bad request",
      },
      message: "Invalid request. Please, cross check.",
    });

  if (
    validator.isEmpty(firstname) ||
    validator.isEmail(lastname)
  ) {
    res.status(400).json({
      error: {
        code: 400,
        message: "Bad request",
      },
      message: "First Name and/or Last Name is Empty. Try again.",
    });
  } else if (validator.isEmpty(email)) {
    res.status(400).json({
      error: {
        code: 400,
        message: "Bad request",
      },
      message: "Email address is Empty. Try again.",
    });
  } else if (!validator.isEmail(email)) {
    res.status(400).json({
      error: {
        code: 400,
        message: "Bad request",
      },
      message: email + " is not a valid email address. Try again.",
    });
  } else if (!validator.isLength(password, { min: 6, max: 15 })) {
    res.status(400).json({
      error: {
        code: 400,
        message: "Bad request",
      },
      message:
        "Password (*****) should be between 6 to 15 characters long. Try again.",
    });
  }

  let _user = await User.find({email: email})

  console.log(_user.length == 0);

  if((await User.find({email: email, username: username})).length != 0){
    res
    .status(400)
    .json({
      status: {
        code: 400,
        message: 'Bad Request'
      },
      message: `${email} and/or ${username} may exists. Please, try again.`
    });
  }else{
    let passwordStrengh = validator.isStrongPassword(password);

    const hash = bcrypt.hashSync(password, salt);
    let newUser = User({
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      password: hash,
    });

    console.log(newUser);

    newUser.save();

    res.status(200).json({
      status: {
        code: 200,
        message: "Success",
      },
      Message:
        "Registration successful" +
        (!passwordStrengh ? " with unsecure password." : "."),
      data: newUser,
    });
  }
});

app.put("/update/:id", async (req, res) => {
  const { firstname, lastname, email, username, password = '' } = req.body;
  const {id} = req.params;

  console.log(firstname, lastname, email, username, password, id);

  if (firstname == undefined)
    res.status(400).json({
      error: {
        code: 400,
        message: "Bad request",
      },
      message: "Invalid request. Please, cross check.",
    });

  if (
    validator.isEmpty(firstname) ||
    validator.isEmail(lastname)
  ) {
    res.status(400).json({
      error: {
        code: 400,
        message: "Bad request",
      },
      message: "First Name and/or Last Name is Empty. Try again.",
    });
  } else if (validator.isEmpty(email)) {
    res.status(400).json({
      error: {
        code: 400,
        message: "Bad request",
      },
      message: "Email address is Empty. Try again.",
    });
  } else if (!validator.isEmail(email)) {
    res.status(400).json({
      error: {
        code: 400,
        message: "Bad request",
      },
      message: email + " is not a valid email address. Try again.",
    });
  } else if (!validator.isEmpty(password) && !validator.isLength(password, { min: 6, max: 15 })) {
    res.status(400).json({
      error: {
        code: 400,
        message: "Bad request",
      },
      message:
        "Password (*****) should be between 6 to 15 characters long. Try again.",
    });
  }

  let passwordStrengh = false;
  let hash = '';

  let newUser = User({
    firstname: firstname,
    lastname: lastname,
    username: username,
    email: email,
  });
  
  if(!validator.isEmpty(password)){
    passwordStrengh = validator.isStrongPassword(password);
    hash = bcrypt.hashSync(password, salt);
    newUser.password = hash
  }

  try{
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true});
    console.log(updatedUser);
  }catch(e){
    console.log(e);
  }

  res.status(200).json({
    status: {
      code: 200,
      message: "Success",
    },
    Message: "Update updated successfully.",
    data: newUser,
  });
});

app.delete("/delete/:id", async(req, res) => {
  const {id} = req.params;
  const deletedUser = await User.findByIdAndDelete(id);

  console.log(deletedUser);

  if(deletedUser.username == undefined){
    res
    .status(400)
    .json({
      status: {
        code: 400,
        message: 'Bad Request'
      },
      message: `No user found for the ${id}`,
      user: null
    });
  }else{
    res
    .status(200)
    .json({
      status: {
        code: 200,
        message: 'Success'
      },
      message: `User deleted for the ${id}`,
      user: deletedUser
    })
  }    
});

app.get("/users", async(req, res) => {
  const users = await User.find();

  if(users.length == 0){
    res
    .status(200)
    .json({
      status: {
        code: 200,
        message: 'Ok'
      },
      message: `No user found`,
      users: null
    });
  }else{
    res
    .status(200)
    .json({
      status: {
        code: 200,
        message: 'Success'
      },
      message: `${users.length} user(s) found`,
      user: users
    })
  }  
});

app.listen(8000, () => {
  console.log("eXpress started...");
});
