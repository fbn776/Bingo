import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Logger from "./lib/Logger";
import WebSocket from "ws";
import initGame from "./game/main";

require('dotenv').config();

const PORT = parseInt(process.env.PORT || '');
if (!PORT)
    throw new Error('No PORT specified');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const WS_PORT = parseInt(process.env.WS_PORT || '');
if (!WS_PORT)
    throw new Error('No WS_PORT specified');

const wss = new WebSocket.Server({ port:  WS_PORT });

initGame(wss);

app.get("/", (req, res) => {
    res.send("Hello World");
});


app.listen(PORT, async () => {
    Logger.success(`Server started on port ${PORT}`);
    Logger.info(`http://localhost:${PORT}`);
});
