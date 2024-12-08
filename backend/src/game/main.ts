import WebSocket from "ws";
import {GameInstance} from "./types";
import Logger from "../lib/Logger";
import {IAckMsg, ICreateMsg, IErrorMsg, IJoinMsg} from "../../../common/types";
import sendMsg from "../lib/utils";


const gameData = new Map<string, GameInstance>();

function createGame(data: ICreateMsg, ws: WebSocket) {
    if (gameData.has(data.gameID)) {
        sendMsg(ws, {
            type: 'error',
            msg: 'GameID already exists'
        } as IErrorMsg);
        return;
    }

    gameData.set(data.gameID, {
        createdAt: Date.now(),
        guest: null,
        host: {
            name: data.hostName,
            ws
        },
        gameTitle: data.gameTitle,
    });

    // Success message back to client
    sendMsg<IAckMsg>(ws, {
        type: 'ack',
        msg: 'Created game'
    })
}

function joinGame(data: IJoinMsg, ws: WebSocket) {
    if (!gameData.has(data.gameID)) {
        Logger.error(`Game with ID: ${data.gameID} doesn't exists`);
        sendMsg<IErrorMsg>(ws, {
            type: 'error',
            msg: 'Game does not exists',
        })
        return;
    }

    const currGame = gameData.get(data.gameID)!;

    if (currGame.guest) {
        Logger.error(`Game with ID: ${data.gameID} has 2 players`);

        sendMsg<IErrorMsg>(ws, {
            type: "error",
            msg: "Game already full",
        })
        return;
    }


    Logger.info(`Guest player(${data.hostName}) has joined game with ID: ${data.gameID}`);
    gameData.set(data.gameID, {
        ...currGame,
        guest: {
            name: data.hostName,
            ws: ws
        }
    });

    sendMsg<IAckMsg>(ws, {
        type: 'ack',
        msg: 'Joined game'
    })
}

export default function initGame(wss: WebSocket.Server) {
    wss.on('connection', (ws) => {
        console.log('New WebSocket connection');

        ws.on('message', (message: string) => {
            const data = JSON.parse(message.toString());
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