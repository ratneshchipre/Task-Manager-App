const Task = require("../models/task.model");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });

    if (!tasks) {
      return res.status(200).json({
        success: true,
        tasks: [],
        message: "No tasks found",
      });
    }

    return res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error("Error occured:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Error fetching the tasks.",
    });
  }
};

const createTask = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Title is required",
    });
  }

  try {
    const createdTask = await Task.create({
      title,
      user: req.user._id,
    });

    if (!createdTask) {
      return res.status(401).json({
        success: false,
        message: "Failed to create task.",
      });
    }

    return res.status(200).json({
      success: true,
      createdTask,
    });
  } catch (error) {
    console.error("Error occured:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Error during task creation.",
    });
  }
};

const getTask = async (req, res) => {
  const { id: taskID } = req.params;

  try {
    const task = await Task.findOne({
      _id: taskID,
      user: req.user._id,
    });

    if (!task)
      return res.status(404).json({
        success: false,
        message: `No task with ID: ${taskID} was found`,
      });

    return res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.error("Error occured:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Error getting the task.",
    });
  }
};

const updateTask = async (req, res) => {
  const { id: taskID } = req.params;
  const { title, status } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      { _id: taskID, user: req.user._id },
      { title, status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!taskID)
      return res.status(404).json({
        success: false,
        message: `No task with ID: ${taskID} was found`,
      });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: `Failed to update task`,
      });
    }

    return res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.error("Error occured:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Error during task updation",
    });
  }
};

const deleteTask = async (req, res) => {
  const { id: taskID } = req.params;

  try {
    const task = await Task.findOneAndDelete({
      _id: taskID,
      user: req.user._id,
    });

    if (!taskID)
      return res.status(404).json({
        success: false,
        message: `No task with ID: ${taskID} was found`,
      });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: `Failed to delete task`,
      });
    }

    return res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.error("Error occured:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Error during deleting task.",
    });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
