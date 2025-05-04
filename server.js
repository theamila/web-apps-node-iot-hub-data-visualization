const express = require("express");
const { fetchData } = require("./db");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));

io.on("connection", async (socket) => {
    console.log("Client connected");

    setInterval(async () => {
        const data = await fetchData();
        console.log("Emitting data:", data); // Logs data before sending
        socket.emit("updateData", data);
    }, 5000);
});

server.listen(3000, () => console.log("Server running on port 3000"));
