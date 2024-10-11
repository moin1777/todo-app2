const mongoose = require("mongoose");

mongoose.connect("your_mongo_db_url");

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: {
    type: Boolean,
    default: false
  }
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;