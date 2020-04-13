const { dbs } = require("../dbs");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const USERS = "users";
const CHILDREN = "childrens";
const POSITION = "positions";

exports.detail = async (id) => {
  const results = await dbs.production
    .collection(USERS)
    .find({
      _id: ObjectId(id),
    })
    .toArray();
  return results[0];
};

exports.get = async (username) => {
  return await dbs.production.collection(USERS).findOne({
    username,
  });
};

module.exports.add = async (user) => {
  return await dbs.production.collection(USERS).insertOne(user);
};

exports.verify = async (username, password) => {
  const user = await dbs.production.collection(USERS).findOne({
    username: username,
  });
  if (user) return undefined;
  // verify password
  // ...
  return results[0];
};

exports.validPassword = async function (username, password) {
  const user = await this.get(username);
  if (!user) return false;
  return await bcrypt.compare(password, user.password);
};

exports.check = async (username) => {
  const user = await dbs.production.collection(USERS).findOne({
    username,
  });
  if (user) return true;
  return false;
};

module.exports.getChildrenPos = async (id) => {
  console.log(id);
  const children = await dbs.production
    .collection(CHILDREN)
    .find({ user: ObjectId(id) })
    .toArray();
  if (children.length === 0) {
    return false;
  }
  let position = [];
  let temp = null;
  for (let index = 0; index < children.length; index++) {
    temp = await dbs.production
      .collection(POSITION)
      .find({ children: ObjectId(children[index]._id) })
      .toArray();
    position.push(temp);
  }
  return position;
};
