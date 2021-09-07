const Joi = require("joi");

const createVitalSignsSchema = Joi.object({
  glucoseLevel: Joi.number().min(1).max(1000).required(),
  temp: Joi.number().min(1).max(1000).required(),
  heartRate: Joi.number().min(1).max(1000).required(),
  bloodPressureS: Joi.number().min(1).max(1000).required(),
  bloodPressureD: Joi.number().min(1).max(1000).required(),
});
const updatePrescriptionSchema = Joi.object({
  prescriptionId: Joi.number().required(),
  dosis: Joi.string().min(1).max(30),
  frequency: Joi.string().min(1).max(30),
  via_admin: Joi.string().min(1).max(30),
});

module.exports = {
  createVitalSignsSchema,
  updatePrescriptionSchema,
};
