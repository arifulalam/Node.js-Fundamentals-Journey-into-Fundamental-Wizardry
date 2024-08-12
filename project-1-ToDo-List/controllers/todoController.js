const User = require("../models/UserModel");
const Todo = require("../models/ToDoModel");

let createTodoController = async (req, res) => {
  const { title, description = "" } = req.body;
  const { username } = req.params;
  let image = req.file.path;

  if (username != undefined && username != "") {
    let user = await User.findOne({ username: username }).select(
      "_id username"
    );

    if ((user.length = 1)) {
      let todo = Todo({
        userId: user._id,
        title: title,
        image: image,
        description: description,
      });

      todo.save().then((result) => {
        result.userId = user;

        res.status(200).json({
          status: {
            code: 200,
            message: "OK",
          },
          message: "To-DO created successfully.",
          data: result,
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

  if(username != undefined && username != ''){
    let user = await User.findOne({ username: username });

    if(id != undefined && id != ''){
      let todo = await Todo.find({ userId: user._id.toString(), _id: id});

      if(todo != undefined){
        await Todo.findByIdAndUpdate({_id: id, update: {title: title, description: description}}, {new: true}).then((result) => {
          res.status(200).json({
            status: {
              code: 200,
              message: "Ok",
            },
            message: "ToDo updated.",
            data: result
          })
        }).catch((e) => {
          res.status(400).json({
            status: {
              code: 400,
              message: "Bad Request",
            },
            message: `ToDo update failed. Error: ${e}`,
          });
        });
      }else{
        res.status(400).json({
          status: {
            code: 400,
            message: "Bad Request",
          },
          message: "No todo found to edit. Try again.",
        });
      }
    }else{
      res.status(400).json({
        status: {
          code: 400,
          message: "Bad Request",
        },
        message: "To-Do not passed. Try again.",
      });    }

  }else{
    res.status(400).json({
      status: {
        code: 400,
        message: "Bad Request",
      },
      message: "Username not passed. Try again.",
    });
  }
};

let deleteTodoController = async (req, res) => {
  const { username, id } = req.params;

  let user = await User.findOne({ username: username }).select("_id username");

  if (id == undefined || id == "") {
    res.status(400).json({
      status: {
        code: 400,
        message: "Bad Request",
      },
      message: "No To-Do key passed to delete. Please, check and try again.",
    });
  } else {
    let todo = await Todo.findById(id);

    if (todo != undefined) {
      console.log(todo.userId.toString(), user._id.toString());
      if (todo.userId.toString() == user._id.toString()) {
        await Todo.deleteOne({ _id: id })
          .then((result) => {
            res.status(200).json({
              status: {
                code: 200,
                message: "OK",
              },
              message: "To-Do delete successfully.",
            });
          })
          .catch((e) => {
            res.status(400).json({
              status: {
                code: 400,
                message: "Bad Request",
              },
              message: `Error: ${e.message}`,
            });
          });
      } else {
        res.status(400).json({
          status: {
            code: 401,
            message: "Unauthorized.",
          },
          message:
            "You are not authorize to delete the To-Do. If it is wrong, please, contact administrator",
        });
      }
    } else {
      res.status(400).json({
        status: {
          code: 400,
          message: "Bad Request.",
        },
        message: "No To-Do found.",
      });
    }
  }
};

let viewTodoController = async (req, res) => {
  const { username, id } = req.params;

  console.log(username, id);

  let todos = null;

  if (username != undefined && username != "") {
    const user = await User.findOne({ username: username });

    if (user != undefined) {
      console.log(user);

      if (id != undefined && id != "")
        todos = await Todo.find({ userId: user._id.toString(), _id: id }).populate({path: "userId", select: "_id username"});
      else todos = await Todo.find({ userId: user._id.toString() }).populate({path: "userId", select: "_id username"});

      if (todos != undefined) {
        res.status(200).json({
          status: {
            code: 200,
            message: "Success",
          },
          message: `${todos.length} To-Do found.`,
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
    todos = await Todo.find().populate({path: "userId", select: '_id, username'});

    res.status(200).json({
      status: {
        code: 200,
        message: "Ok",
      },
      message: `${todos.length} To-Do found.`,
      todos: todos,
    });
  }
};

module.exports = {
  createTodoController,
  editTodoController,
  deleteTodoController,
  viewTodoController,
};
