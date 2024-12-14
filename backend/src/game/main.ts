import WebSocket from "ws";
import Logger from "../lib/Logger";
import {IErrorMsg, IMessage} from "../../../common/types";
import sendMsg from "../lib/utils";
import {createGame} from "./createGame";
import {joinGame} from "./joinGame";


export default function initGame(wss: WebSocket.Server) {
    wss.on('connection', (ws) => {
        console.log('New WebSocket connection');

        ws.on('message', (message: string) => {
            const data= JSON.parse(message.toString());
            console.log(data);

            switch (data.type) {
                case 'join':
                    Logger.info('JOIN request');
                    joinGame(data, ws);
                    break;
                case 'create':
                    Logger.info('CREATE request');
                    createGame(data, ws);
                    break;
                default:
                    sendMsg<IErrorMsg>(ws, {
                        type: 'error',
                        msg: 'Data type invalid'
                    });
                    break;
            }
        });

        ws.on('close', () => {
            console.log('Connection closed');
        });
    });
}