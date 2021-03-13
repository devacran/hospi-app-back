const { query } = require("express");
const DB = require("../lib/db");
class Patients {
  constructor() {
    this.table = "patients";
    this.db = DB;
  }
  async getPatients() {
    try {
      await this.db.connect();
      const patients = await this.db.query(
        "SELECT patient_id as id, nss, name, last_name,type,room FROM patients LIMIT 30"
      );
      return patients;
    } catch (e) {
      console.log(e);
    }
    return [];
  }
  async getPatient(id) {
    try {
      await this.db.connect();
      const patient = await this.db.query(`SELECT 
          a.patient_id, a.name, a.last_name, 
          a.email, a.gender, a.weight, 
          a.height, a.insurance_number, a.user_photo, a.birdthdate, 
          a.nss, a.phone, a.allergies, a.blood_type, a.room, a.type, a.active, b.*
          FROM patients AS a 
          LEFT JOIN addresses AS b
          ON a.address_id = b.address_id
          WHERE patient_id = ${id}
        `);

      return patient[0] || {};
    } catch (e) {
      console.log(e);
    }
    return [];
  }
  async getVitalSigns(id) {
    try {
      await this.db.connect();
      const patient = await this.db.query(
        `SELECT * FROM vital_signs WHERE patient_id = ${id}`
      );
      return patient;
    } catch (e) {
      console.log(e);
    }
    return [];
  }
  async getPatientBill(id) {
    try {
      await this.db.connect();
      const data = await this.db.query(`
        SELECT a.bill_account_id, a.status, a.created_at, b.bill_charge_id, b.concept,b.amount, b.created_at as bill_charge_created_at
        FROM bill_accounts AS a
        LEFT JOIN bill_charges AS b
        ON a.bill_account_id = b.bill_account_id
        WHERE a.patient_id = ${id}
      `);
      const bill = {
        bill_account_id: data[0].bill_account_id,
        status: data[0].status,
        date: data[0].created_at,
        charges: data.map(({ amount, concept, bill_charge_created_at }) => ({
          amount,
          concept,
          date: bill_charge_created_at,
        })),
      };
      return bill;
    } catch (e) {
      console.log(e);
    }
    return {};
  }
}

module.exports = Patients;
