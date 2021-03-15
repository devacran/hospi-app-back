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
      
      res.status(200).json(data.map(x=>{
        const {id, patient_id, ...values} = x
        return {
          id,
          patient_id,
          data: values
        }
      }));
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

  router.post("/:patientId/vital-signs", async (req, res)=>{
    const reqData = {
        patientId: req.params.patientId,
        glucoseLevel: req.query.glucoseLevel,
        temp: req.query.temp,
        heartRate: req.query.heartRate,
        bloodPressureS: req.query.bloodPressureS,
        bloodPressureD: req.query.bloodPressureD,
    }
    const {insertId} = await patientsService.createVitalSigns(reqData)
   
    res.status(200).json({vital_signs_id: insertId, status: "OK"})
  })
  app.use("/api/patients", router);
}

module.exports = patientsApi;
