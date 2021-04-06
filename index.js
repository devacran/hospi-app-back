const express = require("express");
const patientsApi = require("./routes/patients");
const config = require("./config");
const http = require("http");
const cors = require("cors");
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "*",
  },
});
//Routes
app.use(cors());
patientsApi(app);

io.on("connect", (socket) => {
  setInterval(() => {
    socket.emit("FromAPI", "HOLA");
  }, 1000);
});

server.listen(config.port, function () {
  console.log(`Listening on http://localhost:${config.port}`);
});
