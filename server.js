const express = require("express");
const { fetchData } = require("./db");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));

io.on("connection", async (socket) => {
    setInterval(async () => {
        const data = await fetchData();
        socket.emit("updateData", data);
    }, 5000); // Sends updated data every 5 seconds
});

server.listen(3000, () => console.log("Server running on port 3000"));
