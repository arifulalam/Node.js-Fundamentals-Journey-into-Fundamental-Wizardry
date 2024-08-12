const mongoose = require("mongoose");
const User = require("./UserModel");

const {Schema} = mongoose;

const todoSchema = new Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user' 
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        //required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("todo", todoSchema);