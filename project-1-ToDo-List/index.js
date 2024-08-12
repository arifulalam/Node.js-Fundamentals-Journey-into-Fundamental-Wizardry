require('dotenv').config();
const express = require("express");
const mongo = require("mongodb");
const multer = require("multer");
const uuid = require("uuid");
const path = require("path");
const bcrypt = require("bcrypt");

const mongoose = require("mongoose");
const validator = require("validator");

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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = uuid.v4();
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  console.log("Home API");
  res.status(200).send("To-Do List App");
});

app.post("/registration", registrationController);

/*
ariful-alam = W0r1d@#1
arshaduzzaman = W0r1d@#1
*/
app.post("/login", loginController);

app.post("/todo-create/:username", security, upload.single("image"), createTodoController);

app.put("/todo-edit/:username?/:id?", security, editTodoController);

app.delete("/todo-delete/:username/:id?", security, deleteTodoController);

app.get("/todos/:username?/:id?", viewTodoController);

app.listen(8000, () => {
  console.log("NodeJS Express Server started successfully.");
});
