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
      const data = await patientsService.getVitalSigns(patientId);

      res.status(200).json(
        data.map((x) => {
          const { id, patient_id, ...values } = x;
          return {
            id,
            patient_id,
            data: values,
          };
        })
      );
    } catch (e) {
      console.log(e);
    }
  });

  router.post("/:patientId/vital-signs", async (req, res) => {
    const reqData = {
      patientId: req.params.patientId,
      glucoseLevel: req.query.glucose_level,
      temp: req.query.temp,
      heartRate: req.query.heart_rate,
      bloodPressureS: req.query.blood_pressureS,
      bloodPressureD: req.query.blood_pressureD,
    };
    const data = await patientsService.createVitalSigns(reqData);
    if (data) {
      res.status(200).json({ id: data.insertId, status: "OK" });
    } else {
      res.status(400).json({ status: "ERROR" });
    }
  });

  router.delete("/:patientId/vital-signs", async (req, res) => {
    const reqData = {
      patientId: req.params.patientId,
      id: req.query.id,
    };
    const data = await patientsService.deleteVitalSigns(reqData);
    if (data) {
      res.status(200).json({ id: data.insertId, status: "Delete OK!" });
    } else {
      res.status(400).json({ status: "ERROR" });
    }
  });
  router.put("/:patientId/vital-signs", async (req, res) => {
    const reqData = {
      patientId: req.params.patientId,
      id: req.query.id,
      glucoseLevel: req.query.glucose_level,
      temp: req.query.temp,
      heartRate: req.query.heart_rate,
      bloodPressureS: req.query.blood_pressure_s,
      bloodPressureD: req.query.blood_pressure_d,
    };
    const data = await patientsService.updateVitalSigns(reqData);
    if (data) {
      res.status(200).json({ id: data.insertId, status: "Delete OK!" });
    } else {
      res.status(400).json({ status: "ERROR" });
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

  router.get("/:patientId/prescriptions", async function (req, res, next) {
    try {
      const { patientId } = req.params;
      // const reqData = {
      //   patientId: req.params.patientId,
      //   doctorId: "1",
      //   medicineId: req.query.medicine_id,
      //   frequency: req.query.frequency,
      //   dosis: req.query.dosis,
      // };
      const patients = await patientsService.getPatientBill(patientId);
      res.status(200).json({ data: patients });
    } catch (e) {
      console.log(e);
    }
  });

  app.use("/api/patients", router);
}

module.exports = patientsApi;
