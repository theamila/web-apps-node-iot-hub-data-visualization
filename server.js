const express = require("express");
const { fetchData } = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (index.html, chart.js, etc.)
app.use(express.static("public"));

// API endpoint to fetch data
app.get("/sales", async (req, res) => {
    try {
        const data = await fetchData();
        res.json(data); // Send data to frontend
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).send("Error fetching sales data");
    }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
