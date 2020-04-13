var express = require("express");
var router = express.Router();
var childrenModel = require("../models/children");

router.post("/ping", async function (req, res, next) {
  let body = req.body;
  const result = await childrenModel.getPing(body);
  res.json(result);
});

module.exports = router;
