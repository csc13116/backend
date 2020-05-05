const {
  dbs
} = require("../dbs");
const ObjectId = require("mongodb").ObjectId;
const CONNECTION = "connections";
const usersModel = require("../models/users");

exports.setConnection = async (id, socketId) => {
  let parent = await usersModel.checkById(id);
  if (parent) {
    let newConnection = {
      parent: ObjectId(id),
      connectionString: Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0"),
      socketId,
      time: new Date(),
    };
    const connections = await dbs.production
      .collection(CONNECTION)
      .insertOne(newConnection);
    if (connections.nInserted === 0) {
      return false;
    }
    return newConnection.connectionString;
  } else {
    return false;
  }
};

exports.newConnectionString = async (id) => {
  let newConnectionString = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");

  let connectionString = await dbs.production.collection(CONNECTION).updateOne({
    parent: ObjectId(id)
  }, {
    $set: {
      connectionString: newConnectionString,
      time: new Date(),
    },
  });
  if (connectionString) {
    return newConnectionString;
  }
};

exports.getConnection = async (connectionString) => {
  const connection = await dbs.production
    .collection(CONNECTION)
    .findOne({
      connectionString
    });
  if (!connection) {
    return false;
  }
  return connection;
};

exports.checkConnection = async (parentId) => {
  const connection = await dbs.production
    .collection(CONNECTION)
    .findOne({
      parent: ObjectId(parentId)
    });
  if (!connection) {
    return false;
  }
  return true;
};

exports.removeConnection = async (connectionString) => {
  const connection = await dbs.production
    .collection(CONNECTION)
    .deleteOne({
      connectionString
    });
  if (!connection) {
    return false;
  }
  return connection;
};