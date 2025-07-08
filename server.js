const express = require("express");
const { fetchData } = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (index.html, chart.js, etc.)
app.use(express.static("public"));

// API endpoint to fetch data
app.get("/sales", async (req, res) => {
    try {
        const selectedDate = req.query.date;
        const machineId = req.query.machine_id;

        console.log(`Filtering data for date: ${selectedDate}, machine: ${machineId}`);

        const data = await fetchData(selectedDate, machineId); // Pass both parameters to your logic
        res.json(data);
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).send("Error fetching filtered data");
    }
});
// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
