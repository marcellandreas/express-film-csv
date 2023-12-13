// import database mysql
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "preview_film",
  password: "",
});

module.exports = pool.promise();
