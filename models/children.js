const { dbs } = require("../dbs");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const USERS = "users";
const CHILDREN = "childrens";
const POSITION = "positions";

exports.ping = async (body) => {
  const ping = {
    latitude: body.latitude,
    longitude: body.longitude,
    children: ObjectId(body.children),
    time: new Date(),
  };
  await dbs.production.collection(POSITION).insertOne(ping);
  return ping;
};

exports.newChild = async (userId) => {
  let child = {
    name: "Temp",
    user: ObjectId(userId),
  };
  return await dbs.production.collection(CHILDREN).insertOne(child);
};

exports.updateName = async (data) => {
  return await dbs.production.collection(CHILDREN).updateOne(
    { _id: ObjectId(data.id) },
    {
      $set: {
        name: data.name,
      },
    }
  );
};
