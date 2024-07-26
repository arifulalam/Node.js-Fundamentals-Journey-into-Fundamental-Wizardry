require('dotenv').config()
const express = require("express");
const mongo = require("mongodb");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const dbConnection = require("./helpers/dbConnection");
dbConnection();

const User = require("./models/UserModel");
const Todo = require("./models/ToDoModel");


const security = require("./middleware/security");
const registrationController = require("./controllers/registrationController");
const loginController = require("./controllers/loginController");
const {
  createTodoController,
  editTodoController,
  deleteTodoController,
  viewTodoController
} = require("./controllers/todoController");

//encryption-descryption setting
const salt = bcrypt.genSaltSync(10);
//const hash = bcrypt.hashSync(password, salt);
//bcrypt.compareSync(password, hash); // true

//Express
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  console.log("Home API");
  res.status(200).send("To-Do List App");
});

app.post("/registration", registrationController);

/*
ariful-alam = W0r1d@#1
arshaduzzaman = W0r1d$#Bangla
*/
app.post("/login", loginController);

app.post("/todo-create/:username", security, createTodoController);

app.put("/todo-edit/:username/:id", security, editTodoController);

app.delete("/todo-delete/:username/:id", security, deleteTodoController);

app.get("/todos/:username/:id", viewTodoController);

app.listen(8000, () => {
  console.log("NodeJS Express Server started successfully.");
});
