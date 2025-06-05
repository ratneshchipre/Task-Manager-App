const express = require("express");
const {
  handleUserSignUp,
  handleUserLogIn,
} = require("../controllers/user.controller");
const router = express.Router();

router.post("/sign-up", handleUserSignUp);
router.post("/log-in", handleUserLogIn);

module.exports = router;
