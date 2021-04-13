const DB = require("../lib/db");
class Medicines {
  constructor() {
    this.table = "medicines";
    this.db = DB;
  }
  async getMedicines() {
    try {
      await this.db.connect();
      const medicines = await this.db.query(
        `SELECT medicine_id as id,compound, unit_price, concentration FROM medicines WHERE active = 1 LIMIT 30`
      );
      return medicines;
    } catch (e) {
      console.log(e);
    }
    return [];
  }
}

module.exports = Medicines;
