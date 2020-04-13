var express = require("express");
var router = express.Router();
var userModel = require("../models/users");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/:id/getchildrenping", async function (req, res, next) {
  let userId = req.params.id;
  let position = await userModel.getChildrenPos(userId);
  if (!position) {
    res.json({ status: 404, msg: "Not Found" });
  } else {
    res.json(position);
  }
});

module.exports = router;
