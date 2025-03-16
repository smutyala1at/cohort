"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let userCount = 0;
let allSockets = [];
wss.on("connection", (socket) => {
    allSockets.push(socket);
    userCount += 1;
    socket.on("message", (message) => {
        allSockets.forEach((s) => {
            s.send(`Message: ${message.toString()} from User ${userCount}`);
        });
    });
});
