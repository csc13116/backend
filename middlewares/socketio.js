var io = require("socket.io")();
let socketAPI = {};
const nsp = io.of("/connect");
var connectionModel = require("../models/connection");
var childrenModel = require("../models/children");
//
nsp.on("connection", (sockets) => {
  sockets.on("parent wait", async (data) => {
    const { phoneNumber, userId } = data;
    let isConnection = await connectionModel.checkConnection(userId);
    if (isConnection) {
      let connectionString = await connectionModel.newConnectionString(userId);
      sockets.emit("wait connect", { connectionString });
    } else {
      let connectionString = await connectionModel.setConnection(
        userId,
        sockets.id,
        phoneNumber
      );
      sockets.emit("wait connect", { connectionString });
    }
  });
  sockets.on("child wait", async (data) => {
    const result = await connectionModel.getConnection(data);
    if (result) {
      console.log("emit true");
      let child = await childrenModel.newChild(result.parent);
      await connectionModel.removeConnection(data);
      sockets.emit("found", {
        connect: child.insertedId,
        phoneNumber: result.phoneNumber,
      });
      sockets.broadcast
        .to(result.socketId)
        .emit("child connect", { connect: child.insertedId });
    } else {
      console.log("emit false");
      sockets.emit("found", { connect: false });
    }
  });
  // sockets.on("set new connection", async (data) => {
  //   const result = await connectionModel.newConnectionString(data);
  //   if (!result) {
  //     sockets.emit("get new connection", { newConnectionString: result });
  //   } else {
  //     sockets.emit("erro", { msg: "not found" });
  //   }
  // });
});

socketAPI.io = io;

module.exports = socketAPI;
