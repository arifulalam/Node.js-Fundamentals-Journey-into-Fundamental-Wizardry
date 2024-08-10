const mongoose = require("mongoose");
const {Schema} = mongoose;

let BlogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdOn: {
        type: Date,
        default: new Date().toUTCString(),
    }
});

module.exports = mongoose.model("Blog", BlogSchema);