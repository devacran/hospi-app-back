const express = require("express");
const patientsApi = require("./routes/patients");
const config = require("./config");
const cors = require("cors");
const app = express();
//Routes
app.use(cors());
patientsApi(app);

app.listen(config.port, function () {
  console.log(`Listening on http://localhost:${config.port}`);
});
