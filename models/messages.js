const { dbs } = require("../dbs");
const ObjectId = require("mongodb").ObjectId;
const MESSAGES = "MESSAGES";

module.exports.insertMessage = async (body) => {
  let messages = {
    relation: ObjectId(body.relationId),
    content: body.content,
    person: body.person,
    time: new Date(),
  };
  return await dbs.production.collection(MESSAGES).insertOne(messages);
};

module.exports.getMessages = async (data) => {
  let messages = await dbs.production
    .collection(MESSAGES)
    .find({ relation: ObjectId(data.relationId) })
    .sort({ time: -1 })
    .limt(15)
    .skip(data.page)
    .toArray();
  messages.reverse();
  return messages;
};
