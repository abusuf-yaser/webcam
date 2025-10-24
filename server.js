const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// تقديم ملفات HTML من المجلد الحالي
app.use(express.static(path.join(__dirname)));

// Socket.io
io.on("connection", (socket) => {
  console.log("✅ متصل:", socket.id);

  socket.on("offer", (offer) => socket.broadcast.emit("offer", offer));
  socket.on("answer", (answer) => socket.broadcast.emit("answer", answer));
  socket.on("candidate", (candidate) => socket.broadcast.emit("candidate", candidate));
});

server.listen(3000, () => {
  console.log("🚀 السيرفر شغال على http://127.0.0.1:3000");
});
