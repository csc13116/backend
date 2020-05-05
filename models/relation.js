const { dbs } = require("../dbs");
const ObjectId = require("mongodb").ObjectId;
const RELATIONS = "RELATIONS";

module.exports.insertRelation = async (body) => {
  let relation = {
    parent: ObjectId(body.parentId),
    child: ObjectId(body.childId),
    rooms: "",
    online: false,
  };
  return await dbs.production.collection(RELATIONS).insertOne(relation);
};

module.exports.getMessages = async (relationId) => {
  return await dbs.production
    .collection(MESSAGES)
    .find({ relation: ObjectId(relationId) })
    .toArray();
};

module.exports.online = async (data) => {
  return await dbs.production.collection(relation).updateOne(
    { _id: ObjectId(data.id) },
    {
      $set: {
        room: data.roomId,
        online: true,
      },
    }
  );
};

module.exports.getRelation = async (id) => {
  let relation = await dbs.production
    .collection(relation)
    .findOne({ _id: ObjectId(id) });
  return relation;
};
