const Task = require("../models/task.model");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    return res.status(200).json({ tasks });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  const body = req.body;
  try {
    const createdTask = await Task.create({ body, createdBy: req.user._id });
    return res.status(200).json({ createdTask });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });

    if (!task)
      return res
        .status(404)
        .json({ msg: `No task with ID: ${taskID} was found` });

    return res.status(200).json({ task });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const body = req.body;
    const task = await Task.findByIdAndUpdate({ _id: taskID }, body, {
      new: true,
      runValidators: true,
    });

    if (!task)
      return res
        .status(404)
        .json({ msg: `No task with ID: ${taskID} was found` });

    return res.status(200).json({ task });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });

    if (!task)
      return res
        .status(404)
        .json({ msg: `No task with ID: ${taskID} was found` });

    return res.status(200).json({ task });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
