const express = require("express");
const patientsApi = require("./routes/patients");
const medicinesApi = require("./routes/medicines");
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
const DB = require("./lib/db");
//Routes
app.use(cors());
patientsApi(app);
medicinesApi(app);

io.on("connect", (socket) => {
  socket.on("suscribeVitalSigns", (dataFromFrontend) => {
    console.log("suscribed");
    let lastRegistry;
    setInterval(async () => {
      const patientId = dataFromFrontend.patientId;
      try {
        const data = await DB.query(
          `SELECT vital_signs_id FROM vital_signs WHERE patient_id = ${patientId} AND active = 1 ORDER BY vital_signs_id DESC LIMIT 1`
        );
        if (lastRegistry !== data[0].vital_signs_id) {
          lastRegistry = data[0].vital_signs_id;
          socket.emit("VitalSignsChanged");
        }
      } catch (error) {
        console.log("error con la query");
      }
    }, 5000);
  });
});

server.listen(config.port, function () {
  console.log(`Listening on http://localhost:${config.port}`);
});
