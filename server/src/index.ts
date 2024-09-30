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
});

// list of users
const users: { [key: string]: string } = {
    "sdfvs432": "spectropaws",
    "sdf432": "vedantRaut",
    "fvs432": "Borikar",
    "sfvs432": "Parate",
};

io.on("connection", async (socket: Socket) => {
    console.log("User connected: " + socket.id);

    socket.on("joinroom", (username: string) => {
        users[socket.id] = username;
        io.emit("memberconnect", {user: username});
    });

    socket.on("message", (message: { user: string, message: string }) => {
        socket.broadcast.emit("message", message);
    });

    socket.on("typing", (isTyping: boolean) => {
        socket.broadcast.emit("typing", isTyping);
    });

    socket.on("disconnect", () => {
        io.emit("memberDisconnect", {user: users[socket.id]});
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
