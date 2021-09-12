const Joi = require("joi");

const createPatientSchema = Joi.object({
  doctorId: Joi.number(),
  name: Joi.string().min(1).max(30).required(),
  lastName: Joi.string().min(1).max(30).required(),
  birthdate: Joi.date().required(),
  address: Joi.string().min(1).max(30).required(),
  gender: Joi.string().min(1).max(30).required(),
  weight: Joi.number().required(),
  height: Joi.number().required(),
  allergies: Joi.string().min(1).max(30),
  bloodType: Joi.string().min(1).max(30).required(),
  nss: Joi.number().required(),
  insuranceNumber: Joi.number(),
  telephone: Joi.number().required(),
  photoUrl: Joi.string(),
});

const createVitalSignsSchema = Joi.object({
  glucoseLevel: Joi.number().min(1).max(1000).required(),
  temp: Joi.number().min(1).max(1000).required(),
  heartRate: Joi.number().min(1).max(1000).required(),
  bloodPressureS: Joi.number().min(1).max(1000).required(),
  bloodPressureD: Joi.number().min(1).max(1000).required(),
});
const updatePrescriptionSchema = Joi.object({
  prescription_id: Joi.number().required(),
  dosis: Joi.string().min(1).max(30),
  frequency: Joi.string().min(1).max(30),
  via_admin: Joi.string().min(1).max(30),
});

module.exports = {
  createVitalSignsSchema,
  updatePrescriptionSchema,
  createPatientSchema,
};
