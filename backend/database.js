const mysql = require("mysql2");
const port = process.env.DB_PORT || 3306;
const hostname = process.env.DB_HOST || "localhost";
const username = process.env.DB_USER || "root";
const password = process.env.DB_PASS || "sy123";
const database = process.env.DB_NAME || "syhuynh";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "sy123",
  database: "syhuynh",
  port: "3306",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: "+07:00", // Use the correct timezone offset for Vietnam
});

if (pool) {
  console.log("Connect database succesfull");
} else {
  console.log("Connect database failed");
  throw new Error("DB_ERROR");
}

module.exports = pool;
