const User = require("../models/UserModel");
const Todo = require("../models/ToDoModel");

let createTodoController = async (req, res) => {
  const { title, description = "" } = req.body;
  const { username } = req.params;

  if (username != undefined && username != "") {
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
            message: "OK",
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
  } else {
    res.status(400).json({
      status: {
        code: 400,
        message: "Bad Request",
      },
      message: "ToDo create failed.",
    });
  }
};

let editTodoController = async (req, res) => {
  const { title, description = "" } = req.body;
  const { username, id } = req.params;
};

let deleteTodoController = async (req, res) => {
  const { username, id } = req.params;
};

let viewTodoController = async (req, res) => {
  const { username, id } = req.params;

  let todos = null;

  if (username != undefined && username != "") {
    const user = await User.find({ username: username });

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
  } else {
    todos = await Todo.find();
  }
};

module.exports = {
  createTodoController,
  editTodoController,
  deleteTodoController,
  viewTodoController,
};
