var express = require("express");
var router = express.Router();
var childrenModel = require("../models/children");

router.post("/ping", async function (req, res, next) {
  let body = req.body;
  const result = await childrenModel.ping(body);
  res.json(result);
});

router.post("/rename", async function (req, res, next) {
  let body = req.body;
  const result = await childrenModel.updateName(body);
  res.json(result);
});

module.exports = router;
