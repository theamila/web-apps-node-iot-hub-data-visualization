const express = require("express");
const { fetchData } = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/sales", async (req, res) => {
    const data = await fetchData();
    res.json(data);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
