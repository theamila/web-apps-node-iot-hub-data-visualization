const sql = require("mssql");
require("dotenv").config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: { encrypt: true, trustServerCertificate: false }
};

async function fetchData() {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query("SELECT * FROM sales");
        return result.recordset;
    } catch (err) {
        console.error("Database error:", err);
        return [];
    }
}

module.exports = { fetchData };
