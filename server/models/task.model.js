const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    maxlength: [20, "Title cannot be more than 20 characters"],
  },
  status: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

const Task = mongoose.model("task", taskSchema);

module.exports = Task;
