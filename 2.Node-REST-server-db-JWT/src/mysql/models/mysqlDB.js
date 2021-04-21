const mysql = require("mysql2");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve("../../../.env") });

const dbHost = process.env.MYSQL_HOST;
const dbUser = process.env.MYSQL_USER;
const dbPassword = process.env.MYSQL_PASSWORD;
const dbPort = process.env.MYSQL_PORT;

const con = mysql.createConnection({
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    port: dbPort
});

con.connect((err) => {
    if (err) {
        throw err;
    }

    console.log("Connected to mysql database!");
});

module.exports = con;