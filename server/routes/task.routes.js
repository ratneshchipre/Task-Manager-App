const express = require("express");
const router = express.Router();

const checkForAuthentication = require("../middlewares/auth.middleware");

const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

router.use(checkForAuthentication());

router.route("/").get(getAllTasks).post(createTask);
router.route("/edit-task/:id").get(getTask).patch(updateTask);
router.route("/:id").delete(deleteTask);

module.exports = router;
