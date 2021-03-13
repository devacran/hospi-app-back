const express = require("express");

const PatientsService = require("../services/patients");

function patientsApi(app) {
  const router = express.Router();

  const patientsService = new PatientsService();

  router.get("/", async function (req, res, next) {
    try {
      const patients = await patientsService.getPatients();
      res.status(200).json({ data: patients });
    } catch (e) {
      console.log(e);
    }
  });

  router.get("/:patientId", async function (req, res, next) {
    try {
      const { patientId } = req.params;
      const patients = await patientsService.getPatient(patientId);
      res.status(200).json({ data: patients });
    } catch (e) {
      console.log(e);
    }
  });
  router.get("/:patientId/vital-signs", async function (req, res, next) {
    try {
      const { patientId } = req.params;
      const patients = await patientsService.getVitalSigns(patientId);
      res.status(200).json({ data: patients });
    } catch (e) {
      console.log(e);
    }
  });
  router.get("/:patientId/bill-account", async function (req, res, next) {
    try {
      const { patientId } = req.params;
      const patients = await patientsService.getPatientBill(patientId);
      res.status(200).json({ data: patients });
    } catch (e) {
      console.log(e);
    }
  });

  app.use("/api/patients", router);
}

module.exports = patientsApi;
