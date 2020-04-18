var express = require("express");
var router = express.Router();
var connectionModel = require("../models/connection");

router.get("/:id", async function (req, res, next) {
  let id = req.params.id;
  const result = await connectionModel.getConnection(id);
  if (!result) {
    res.json({ status: 404, msg: "not found" });
  } else {
    req.io.broadcast.to(result.socketId).emit("child connect", msg);
    res.json(result);
  }
});

router.get("/:id/newstring", async function (req, res, next) {
  let id = req.params.id;
  const result = await connectionModel.newConnectionString(id);
  if (!result) {
    res.json({ status: 404, msg: "not found" });
  } else {
    res.json({ newConnectionString: result });
  }
});

module.exports = router;
