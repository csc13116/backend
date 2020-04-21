var io = require("socket.io")();
let socketAPI = {};
const nsp = io.of("/connect");
var connectionModel = require("../models/connection");
var childrenModel = require("../models/children");
//
nsp.on("connection", (sockets) => {
  sockets.on("parent wait", async (data) => {
    let connectionString = await connectionModel.setConnection(
      data,
      sockets.id
    );
    sockets.emit("wait connect", { connectionString });
  });
  sockets.on("child wait", async (data) => {
    const result = await connectionModel.getConnection(data);
    if (!result) {
      let child = await childrenModel.newChild(result.parent);
      sockets.emit("found", { connect: child.insertedId });
      sockets.broadcast
        .to(result.socketId)
        .emit("child connect", { connect: child.insertedId });
    } else {
      sockets.broadcast.to(sockets.id).emit("not found", { connect: false });
    }
  });
  sockets.on("set new connection", async (data) => {
    const result = await connectionModel.newConnectionString(data);
    if (!result) {
      sockets.emit("get new connection", { newConnectionString: result });
    } else {
      sockets.emit("erro", { msg: "not found" });
    }
  });
});

socketAPI.io = io;

module.exports = socketAPI;
