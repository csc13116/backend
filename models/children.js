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

module.exports.changeChildName = async (id, name) => {
  console.log(id);
  return await dbs.production
    .collection(CHILDREN)
    .updateOne({ _id: ObjectId(id) }, { $set: { name } });
};

module.exports.getChildren = async (parentId) => {
  let result = await dbs.production
    .collection(CHILDREN)
    .find({ user: ObjectId(parentId) })
    .toArray();
  let getPing = await this.getChildPing(result[0]._id);

  result[0].defaultPing = getPing;

  return result;
};

/**
 *
 * @param {string} childId
 */

module.exports.getChildPings = async (childId) => {
  return await dbs.production
    .collection(POSITION)
    .find({ children: ObjectId(childId) })
    .sort({ time: -1 })
    .limit(2160)
    .toArray();
};
