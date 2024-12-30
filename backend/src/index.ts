import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Logger from "./lib/Logger";
import initGame from "./game/main";
import http from "http";
import {Server as WebSocketServer} from "ws";

require('dotenv').config();

const PORT = parseInt(process.env.PORT || '');
if (!PORT)
    throw new Error('No PORT specified');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const server = http.createServer(app);

const wss = new WebSocketServer({server});

initGame(wss);

app.get("/ping", (req, res) => {
    res.send("Ping from server");
});


server.listen(PORT, async () => {
    Logger.success(`Server started on port ${PORT}`);
    Logger.info(`http://localhost:${PORT}`);
});
