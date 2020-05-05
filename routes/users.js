const express = require("express");
const router = express.Router();
const userModel = require("../models/users");
const middlewareAuth = require('../middlewares/auth');

const isAuth = middlewareAuth.isAuth;

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/getchildrenping", isAuth, async function (req, res) {
  const userId = req.user._id;
  const positions = await userModel.getChildrenPos(userId);
  return res.json(positions);
});

router.post("/rename", async function (req, res, next) {
  const body = req.body;
  const result = await userModel.updateName(body);
  res.json(result);
});

module.exports = router;