require("dotenv").config();
const mysql = require("mysql");
const boom = require("@hapi/boom");

class Database {
  constructor() {
    this.client = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: "hospi_app",
    });
  }
  connect() {
    if (!Database.connection) {
      Database.connection = new Promise((resolve, reject) => {
        this.client.connect((error) => {
          if (error) {
            console.log("connection to mysql error");
            reject(error);
          } else {
            console.log("connected succesfully");
            resolve(this.client);
          }
        });
      });
      return Database.connection;
    }
  }
  async query(qstring) {
    return new Promise((resolve, reject) => {
      this.client.query(qstring, (e, data) => {
        if (e) {
          console.log(e);
          reject(boom.badRequest());
        }
        resolve(data);
      });
    });
  }
}

const DBInstance = new Database();

module.exports = DBInstance;
