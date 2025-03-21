import WebSocket from "ws";
import Logger from "../lib/Logger";
import {IErrorMsg, IMessage} from "../../../common/types";
import sendMsg from "../lib/utils";
import {createGame} from "./logic/createGame";
import {joinGame} from "./logic/joinGame";
import playGame from "./logic/playGame";
import saidBingo from "./logic/saidBingo";
import askForReplay from "./logic/askForReplay";
import cancelReplayRequest from "./logic/cancelReplayRequest";
import setupForGameReplay from "./logic/setupForGameReplay";
import sendReaction from "./logic/sendReaction";
import sendChat from "./logic/send-chat";


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
                    playGame(data);
                    break;
                case "say-bingo":
                    Logger.info(`Player ${data.by} says BINGO`);
                    saidBingo(data);
                    break;
                case "replay-game":
                    Logger.info(`Player ${data.by} asks for a replay`);
                    askForReplay(data);
                    break;
                case "cancel-replay":
                    Logger.info(`Cancelled the replay`);
                    cancelReplayRequest(data);
                    break;
                case "replay-reply":
                    Logger.info(`Player wants to replay`);
                    setupForGameReplay(data);
                    break;
                case "reaction":
                    Logger.info(`Player ${data.by} reacted with ${data.emoji}`);
                    sendReaction(data);
                    break;
                case "chat":
                    Logger.info(`Player ${data.by} says ${data.message}`);
                    sendChat(data);
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