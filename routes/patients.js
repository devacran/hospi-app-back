const express = require("express");

const PatientsService = require("../services/patients");
const { reqValidator } = require("../utils/middleware/reqValidator");
const {
  createVitalSignsSchema,
  updatePrescriptionSchema,
  createPatientSchema,
} = require("../utils/schemas/schemaPatients");

function patientsApi(app) {
  const router = express.Router();
  const patientsService = new PatientsService();

  router.get("/", async function (req, res, next) {
    try {
      const patients = await patientsService.getPatients();
      res.status(200).json({
        data: patients,
        message: "patients listed",
      });
    } catch (e) {
      next(e);
    }
  });

  router.post(
    "/",
    reqValidator(createPatientSchema, "query"),
    async function (req, res, next) {
      try {
        const params = {
          doctorId: "1",
          name: req.query.name,
          lastName: req.query.lastName,
          birthdate: new Date(req.query.birthdate).toLocaleDateString(),
          address: req.query.address,
          gender: req.query.gender,
          weight: req.query.weight,
          height: req.query.height,
          allergies: req.query.allergies,
          bloodType: req.query.bloodType,
          nss: req.query.nss,
          insuranceNumber: req.query.insuranceNumber,
          telephone: req.query.telephone,
          photoUrl: req.query.photoUrl,
        };
        const data = await patientsService.createPatient(params);
        res.status(200).json({ id: data.insertId, message: "OK" });
      } catch (e) {
        next(e);
      }
    }
  );

  router.get("/:patientId", async function (req, res, next) {
    try {
      const { patientId } = req.params;
      const patients = await patientsService.getPatient(patientId);
      res.status(200).json({ data: patients, message: "patient retrieved" });
    } catch (e) {
      next(e);
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
      next(e);
    }
  });

  router.get("/:patientId/vital-signs-last", async function (req, res, next) {
    try {
      const { patientId } = req.params;
      const data = await patientsService.getVitalSignsLast(patientId);

      res.status(200).json({
        data: data.map((x) => {
          const { id, patient_id, ...values } = x;
          return {
            id,
            patient_id,
            data: values,
          };
        })[0],
        message: "Last Vital Sign Retrieved",
      });
    } catch (e) {
      next(e);
    }
  });

  router.post(
    "/:patientId/vital-signs",
    reqValidator(createVitalSignsSchema),
    async (req, res, next) => {
      try {
        const reqData = {
          patientId: req.params.patientId,
          glucoseLevel: req.body.glucoseLevel,
          temp: req.body.temp,
          heartRate: req.body.heartRate,
          bloodPressureS: req.body.bloodPressureS,
          bloodPressureD: req.body.bloodPressureD,
        };
        const data = await patientsService.createVitalSigns(reqData);
        res.status(200).json({ id: data.insertId, message: "OK" });
      } catch (e) {
        next(e);
      }
    }
  );

  router.delete("/:patientId/vital-signs", async (req, res) => {
    const reqData = {
      patientId: req.params.patientId,
      id: req.query.id,
    };
    try {
      const data = await patientsService.deleteVitalSigns(reqData);
      res.status(200).json({ id: data.insertId, message: "Delete OK!" });
    } catch (e) {
      next(e);
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
    try {
      const data = await patientsService.updateVitalSigns(reqData);
      res.status(200).json({ id: data.insertId, status: "Delete OK!" });
    } catch (e) {
      next(e);
    }
  });

  router.get("/:patientId/bill-account", async function (req, res, next) {
    try {
      const { patientId } = req.params;
      const patients = await patientsService.getPatientBill(patientId);
      res
        .status(200)
        .json({ data: patients, message: "Bill Account Retrieved" });
    } catch (e) {
      next(e);
    }
  });

  router.get("/:patientId/prescriptions", async function (req, res, next) {
    try {
      const { patientId } = req.params;
      const prescriptions = await patientsService.getPrescriptions(patientId);
      res
        .status(200)
        .json({ data: prescriptions, message: "Prescriptions retrieved" });
    } catch (e) {
      next(e);
    }
  });

  router.post("/:patientId/prescriptions", async function (req, res, next) {
    try {
      const data = {
        patientId: req.params.patientId,
        doctorId: 1,
        dosis: req.query.dosis,
        frequency: req.query.frequency,
        medicine_id: req.query.medicine_id,
        via_admin: req.query.via_admin,
      };
      const response = await patientsService.addPrescription(data);
      res.status(200).json({ id: response.insertId, message: "Inserted OK!" });
    } catch (e) {
      next(e);
    }
  });

  router.put(
    "/:patientId/prescriptions",
    reqValidator(updatePrescriptionSchema, "query"),
    async function (req, res, next) {
      try {
        const data = {
          patientId: req.params.patientId,
          prescription_id: req.query.prescription_id,
          doctorId: 1,
          dosis: req.query.dosis,
          frequency: req.query.frequency,
          via_admin: req.query.via_admin,
        };
        await patientsService.updatePrescription(data);
        res
          .status(200)
          .json({ id: req.query.prescription_id, message: "Updated OK!" });
      } catch (e) {
        next(e);
      }
    }
  );

  router.delete("/:patientId/prescriptions", async (req, res) => {
    const reqData = {
      patientId: req.params.patientId,
      id: req.query.id,
    };
    try {
      const data = await patientsService.deletePrescription(reqData);
      res.status(200).json({ id: data.insertId, message: "Delete OK!" });
    } catch (e) {
      next(e);
    }
  });

  app.use("/api/patients", router);
}

module.exports = patientsApi;
