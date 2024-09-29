// index.ts: server entry point

// for __dirname
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// main imports
import express from "express";
import http from "http";
import { Server } from "socket.io";

const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("User connected: " + socket.id);
});

app.get("/", (req, res) => {
    res.send("Hello World!");    
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
