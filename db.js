const sql = require("mssql");
require("dotenv").config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: { encrypt: true, trustServerCertificate: false }
};

async function fetchData(selectedDate, machineId) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input("selectedDate", sql.Date, selectedDate)
            .input("machineId", sql.VarChar, machineId) 
            .query(`
                SELECT DATEADD(MINUTE, -330, rec_time) AS rec_time, 
                       JSON_VALUE(jsondata, '$.instan') AS process_value,
                       JSON_VALUE(jsondata, '$.reg1') AS hot_value
                FROM machines 
                WHERE CAST(rec_time AS DATE) = @selectedDate
                AND mac_name = @machineId
                ORDER BY rec_time ASC
            `);
        return result.recordset;
    } catch (err) {
        console.error("Database error:", err);
        return [];
    }
}

module.exports = { fetchData };
