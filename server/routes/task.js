const express = require("express");

const router = express.Router();

const {
  getAllLists,
  createList,
  getList,
  updateList,
  deleteList,
} = require("../controllers/taskUrl");

router.route("/").get(getAllLists).post(createList);
router.route("/:id").get(getList).patch(updateList).delete(deleteList);

module.exports = router;
