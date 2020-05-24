var express = require("express");
var router = express.Router();
var childrenModel = require("../models/children");

router.post("/ping", async function (req, res, next) {
  let body = req.body;
  const result = await childrenModel.getPing(body);
  res.json(result);
});

router.get("/:id/ping", async function (req, res, next) {
  let id = req.params.id;
  const result = await childrenModel.getChildPing(id);
  res.json(result);
});

module.exports = router;
