const { dbs } = require("../dbs");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const USERS = "users";
const CHILDREN = "childrens";
const POSITION = "positions";

module.exports.getPing = async (body) => {
  let ping = {
    latitude: body.latitude,
    longitude: body.longitude,
    children: ObjectId(body.id),
    time: new Date(),
  };
  return await dbs.production.collection(POSITION).insertOne(ping);
};

module.exports.newChild = async (userId) => {
  let child = {
    name: "Temp",
    user: ObjectId(userId),
  };
  return await dbs.production.collection(CHILDREN).insertOne(child);
};

module.exports.getChildPing = async (childId) => {
  return await dbs.production
    .collection(POSITION)
    .find({ children: ObjectId(childId) })
    .sort({ time: -1 })
    .limit(1)
    .toArray();
};
