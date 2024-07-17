const express = require("express");
const mongo = require("mongodb");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const User = require("./models/UserModel");
const Todo = require("./models/ToDoModel");

const { Schema } = mongoose;

//mongo db connection
const db_user = "nodejs";
const db_pass = "oujPdeoKq3SuduLH";
const db_name = "ToDoApp";
const url = `mongodb+srv://${db_user}:${db_pass}@cluster0.ypmrejo.mongodb.net/${db_name}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(url).then(() => {
  console.log("db connected...");
});

const security = require("./middleware/security");
const registrationController = require("./controllers/registrationController");
const loginController = require("./controllers/loginController");

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

app.post("/todo-create/:username", security, async (req, res) => {
  const { title, description = "" } = req.body;
  const { username } = req.params;

  const user = await User.find({ username: username });

  if ((user.length = 1)) {
    let todo = Todo({
      userId: user.id,
      title: title,
      description: description,
    });

    console.log(todo);

    todo.save().then(() => {
      res.status(200).json({
        status: {
          code: 200,
          message: "OK"
        },
        message: "To-DO created successfully.",
        data: todo,
      });
    });
  } else {
    res.status(400).json({
      status: {
        code: 400,
        message: "Bad Request",
      },
      message: "ToDo add failed. User not recognized.",
    });
  }
});

app.put("/todo-edit/:username/:id", (req, res) => {
  const { title, description = "" } = req.body;
  const { username, id } = req.params;
});

app.delete("/todo-delete/:username/:id", (req, res) => {
  const { username, id } = req.params;
});

app.get("/todos/:username/:id", async (req, res) => {
  const { username, id } = req.params;

  const user = await User.find({ username: username });
  let todos = null;

  if (user.length > 0) {
    if (id != undefined && id != "")
      todos = await Todo.find({ userId: user.id, id: id });
    else todos = await Todo.find({ userId: user.id });

    if (todos.length > 0) {
      res.status(200).json({
        status: {
          code: 200,
          message: "Success",
        },
        message: "To do found.",
        todos: todos,
      });
    } else {
      res.status(404).json({
        status: {
          code: 404,
          message: "Not found!",
        },
        message: "No To-Do found.",
        todos: null,
      });
    }
  }
});

app.listen(8000, () => {
  console.log("NodeJS Express Server started successfully.");
});
