const Task = require("../models/task");

const getAllLists = async (req, res) => {
  try {
    const tasks = await Task.find({});
    return res.status(200).json({ tasks });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const createList = async (req, res) => {
  const body = req.body;
  try {
    const createdTask = await Task.create(body);
    return res.status(200).json({ createdTask });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const getList = async (req, res) => {
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

const updateList = async (req, res) => {
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

const deleteList = async (req, res) => {
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
  getAllLists,
  createList,
  getList,
  updateList,
  deleteList,
};
