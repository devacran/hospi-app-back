const express = require("express");
const MedicinesService = require("../services/medicines");

function medicinesApi(app) {
  const router = express.Router();

  const medicinesService = new MedicinesService();

  router.get("/", async (req, res) => {
    try {
      const medicines = await medicinesService.getMedicines();
      res.status(200).json({ data: medicines });
    } catch (e) {
      console.log(e);
    }
  });

  app.use("/api/medicines", router);
}

module.exports = medicinesApi;
