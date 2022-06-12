// Colyseus + Express
import { Server } from "colyseus";
import { createServer } from "http";
import express from "express";
import { GameRoom } from './rooms/Room.js'
import { monitor } from "@colyseus/monitor";
const port = Number(process.env.port) || 3000;

const app = express();
app.use(express.json());
app.use('/colyseus', monitor());

const gameServer = new Server({
  server: createServer(app)
});

gameServer.define("gameroom", GameRoom)
gameServer.listen(port);