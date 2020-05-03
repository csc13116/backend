var io = require("socket.io")();
let socketAPI = {};
const nspConnect = io.of("/connect");
const nspChat = io.of("/chat");
var connectionModel = require("../models/connection");
var childrenModel = require("../models/children");
var relationModel = require("../models/relation");
var messageModel = require("../models/messages");
//
nspConnect.on("connection", (sockets) => {
  sockets.on("parent wait", async (data) => {
    let isConnection = await connectionModel.checkConnection(data);
    if (isConnection) {
      let connectionString = await connectionModel.newConnectionString(data);
      sockets.emit("wait connect", { connectionString });
    } else {
      let connectionString = await connectionModel.setConnection(
        data,
        sockets.id
      );
      sockets.emit("wait connect", { connectionString });
    }
  });
  sockets.on("child wait", async (data) => {
    const result = await connectionModel.getConnection(data);
    if (result) {
      console.log("emit true");
      let child = await childrenModel.newChild(result.parent);
      let relation = await relationModel.insertRelation({
        parentId: result.parent,
        childId: insertedId,
      });
      await connectionModel.removeConnection(data);
      sockets.emit("found", {
        connect: child.insertedId,
        relation: relation.insertedId,
      });
      sockets.broadcast
        .to(result.socketId)
        .emit("child connect", {
          connect: child.insertedId,
          relation: relation.insertedId,
        });
    } else {
      console.log("emit false");
      sockets.emit("found", { connect: false });
    }
  });
});

nspChat.on("connection", (sockets) => {
  let room = "";
  sockets.on("online", async (data) => {
    let relation = relationModel.getRelation(data.id);
    let isOnline = relation.online;
    if (isOnline) {
      sockets.join(relation.room);
      room = relation.room;
    } else {
      data.roomId = sockets.id;
      room = sockets.id;
      relationModel.online(data);
    }
    console.log(room);
    data["page"] = 0;
    let messages = await messageModel.getMessages(data);
    sockets.emit("get msg", messages);
  });
  sockets.on("typing", () => {
    sockets.to(room).emit("typing");
  });
  sockets.on("msg", async (data) => {
    messageModel.insertMessage(data);
    sockets.to(room).emit("new msg", { msg: data.content });
  });
  sockets.on("old msg", async (data) => {
    let oldMessages = await messageModel.getMessages({ data });
    sockets.emit("get old msg", oldMessages);
  });
});

socketAPI.io = io;

module.exports = socketAPI;
