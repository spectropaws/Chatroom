// index.ts: server entry point

// for __dirname
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// main imports
import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";

const port: string | Number = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({
    "origin": ["http://localhost:3000", "http://127.0.0.1:3000"],
}));

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
        methods: ["GET", "POST"],
    },
    allowEIO3: true,
    transports: ["websocket", "polling"],
});

// list of users
const users: { [key: string]: string } = {};

io.on("connection", async (socket: Socket) => {
    console.log("User connected: " + socket.id);


    socket.on("joinroom", (username: string) => {
        users[socket.id] = username;
        io.emit("memberconnect", { user: username });
        console.log(username);
    });

    socket.on("message", (message: { user: string, message: string }) => {
        socket.broadcast.emit("message", message);
    });

    socket.on("typing", (user: { username: string }) => {
        socket.broadcast.emit("typing", user);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected: " + socket.id);
        io.emit("memberDisconnect", { user: users[socket.id] });
        delete users[socket.id];
    })
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/getAllUsers", (req, res) => {
    res.send(Object.values(users));
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
