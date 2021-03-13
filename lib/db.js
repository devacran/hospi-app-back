const mysql = require("mysql");

class Database {
  constructor() {
    this.client = mysql.createConnection({
      host: "localhost",
      user: "migue",
      password: "hospiapp",
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

  async query(qstring){
    return new Promise((resolve,reject)=>{
       this.client.query(qstring,(e, data)=>{
        if(e){
         reject('error con la query', e)
        }
        resolve(data)
      })
     })
  }
}

const DBInstance = new Database();
module.exports = DBInstance;
