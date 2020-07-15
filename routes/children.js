var express = require("express");
var router = express.Router();
var childrenModel = require("../models/children");
const { dbs } = require("../dbs");

router.post("/ping", async function (req, res, next) {
  let body = req.body;
  console.log(body);
  const result = await childrenModel.getPing(body);
  res.json(result);
});

router.get("/:id/ping", async function (req, res, next) {
  let id = req.params.id;
  const result = await childrenModel.getChildPing(id);
  res.json(result[0]);
});

router.post("/name", async function (req, res, next) {
  const { id, name } = req.body;
  const result = await childrenModel.changeChildName(id, name);
  res.json({ result: result.modifiedCount });
});

router.get("/:id/pings", async function (req, res, next) {
  let id = req.params.id;
  let results = await childrenModel.getChildPings(id);
  console.log(results.length);
  let previousPos = results[0];
  let filterResult = [previousPos];
  for (let index = 1; index < results.length; index++) {
    let currentPos = results[index];
    if (
      currentPos.latitude !== previousPos.latitude ||
      currentPos.longitude !== previousPos.longitude
    ) {
      filterResult.push({ ...currentPos });
      previousPos = currentPos;
    }
  }
  res.json(filterResult);
});

module.exports = router;
