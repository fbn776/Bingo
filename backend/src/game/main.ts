import WebSocket from "ws";
import Logger from "../lib/Logger";
import {IErrorMsg, IMessage} from "../../../common/types";
import sendMsg from "../lib/utils";
import {createGame} from "./logic/createGame";
import {joinGame} from "./logic/joinGame";
import playGame from "./logic/playGame";
import saidBingo from "./logic/saidBingo";


export default function initGame(wss: WebSocket.Server) {
    wss.on('connection', (ws) => {
        console.log('New WebSocket connection');

        ws.on('message', (message: string) => {
            const data= JSON.parse(message.toString());
            console.log(data);

            switch (data.type as IMessage["type"]) {
                case 'join':
                    Logger.info('JOIN request');
                    joinGame(data, ws);
                    break;
                case 'create':
                    Logger.info('CREATE request');
                    createGame(data, ws);
                    break;
                case 'move':
                    Logger.info('MOVE request');
                    playGame(data, ws);
                    break;
                case "say-bingo":
                    Logger.info(`Player ${data.by} says BINGO`);
                    saidBingo(data);
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