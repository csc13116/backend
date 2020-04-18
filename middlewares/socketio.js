var io = require("socket.io")();
const nsp = io.of("/connect");
var connectionModel = require("../models/connection");
//
nsp.on("connection", (sockets) => {
  sockets.on("both connected", (data) => {
    connectionModel.removeConnection(data);
  });
  sockets.on("parent wait", async (data) => {
    let connectionString = await connectionModel.setConnection(
      data,
      sockets.id
    );
    sockets.emit("wait connect", connectionString);
  });
  sockets.on("child wait", async (data) => {
    const result = await connectionModel.getConnection(data);
    sockets.broadcast.to(result.socketId).emit("child connect", null);
  });
  // sockets.on("new connection", async (data) => {
  //   const result = await connectionModel.newConnectionString(data);
  //   sockets;
  // });
});
module.exports = nsp;
