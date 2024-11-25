import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Logger from "./lib/Logger";
import WebSocket from "ws";

require('dotenv').config();

const PORT = parseInt(process.env.PORT || '');
if (!PORT)
    throw new Error('No PORT specified');

const WS_PORT = parseInt(process.env.WS_PORT || '');
if (!WS_PORT)
    throw new Error('No WS_PORT specified');

const app = express();
const wss = new WebSocket.Server({ port:  WS_PORT });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) => {
    res.send("Hello World");
});


const players = new Map<string, WebSocket>();

wss.on('connection', (ws) => {
    console.log('New WebSocket connection');

    ws.on('message', (message) => {
        const data = JSON.parse(message.toString());

        switch (data.type) {
            case 'join': {
                players.set(data.playerID, ws);

                // Broadcast message to all clients
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({
                            type: 'message',
                            message: `player ${data.playerID} joined`
                        }));
                    }
                });
                break;
            }

            case 'message': {
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({
                            type: 'message',
                            message: data.message,
                            from: data.playerID
                        }));
                    }
                });
                break;
            }
        }
    });

    ws.on('close', () => {
        console.log('Connection closed');
    });
});

app.listen(PORT, async () => {
    console.log(wss)
    Logger.success(`Server started on port ${PORT}`);
    Logger.info(`http://localhost:${PORT}`);
});
