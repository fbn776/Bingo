import {useEffect, useState} from "react";
import {WEBSOCKET_URL} from "@/lib/data.ts";
import {gameEvents} from "@/logic/init.ts";
import {IInformPlayersMove, IMessage, IWonBingo} from "../../../../common/types.ts";
import useCurrGameCtx from "@/lib/context/currentGame/useCurrGameCtx.ts";
import {toast} from "sonner";


export default function useSocket(events: typeof gameEvents) {
    const [socketConnectionStatus, setSocketConnectionStatus] = useState<'disconnected' | 'connected' | 'error'>('disconnected');
    const [ws, setWs] = useState<WebSocket | null>(null);
    const {youAre, setCurrCtx} = useCurrGameCtx();

    useEffect(() => {
        const ws = new WebSocket(WEBSOCKET_URL);
        setWs(ws);

        ws.onopen = () => {
            setSocketConnectionStatus('connected');
        }

        ws.onmessage = (e) => {
            const data = JSON.parse(e.data);

            switch (data.type as IMessage["type"]) {
                case 'ack':
                    events.emit(data.ack_for, data);
                    break;
                case 'player-joined':
                    toast.success(`${data.guestName} joined`);
                    setCurrCtx(prevState => {
                        return {...prevState, guest: data.guestName}
                    })
                    break;
                case "info-move": {
                    const infoMoveData = data as IInformPlayersMove;

                    setCurrCtx(prev => ({
                        ...prev,
                        currentTurn: infoMoveData.currTurn,
                        currBoardState: prev.currBoardState.map((item) => {
                            if (item.num === infoMoveData.selected) {
                                return {
                                    num: item.num,
                                    selected: true,
                                }
                            }

                            return item;
                        }),
                        noOfBingo: infoMoveData.noOfBingo
                    }))
                    break;
                }
                case "won-bingo": {
                    const wonData = data as IWonBingo;
                    console.log("WON DATA", wonData, "YOU ARE:", youAre);
                    if (wonData.won === data.to) {
                        toast.success("You won");
                    } else {
                        toast.error("You lost");
                    }

                    break;
                }
                default:
                    console.error("Undefined type");
                    toast.error(data.message || "Invalid data");
                    break;
            }


        };

        ws.onclose = () => {
            console.log("disconnected from websocket");
            setSocketConnectionStatus('disconnected');
        }

        ws.onerror = (e) => {
            setSocketConnectionStatus('error');
            console.log(e);
        }

        return () => {
            ws.close();
        };
    }, []);


    return {
        ws, setWs,
        socketConnectionStatus, setSocketConnectionStatus,
    }
}