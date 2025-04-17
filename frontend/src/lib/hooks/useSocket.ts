import {useEffect, useState} from "react";
import {WEBSOCKET_URL} from "@/data/data.ts";
import {gameEvents} from "@/logic/init.ts";
import {IInformPlayersMove, IMessage, IWonBingo} from "../../../../common/types.ts";
import useCurrGameCtx from "@/lib/context/currentGame/useCurrGameCtx.ts";
import {toast} from "sonner";
import WebSocketSingleton from "@/lib/websocket.ts";

export default function useSocket(events: typeof gameEvents) {
    const [socketConnectionStatus, setSocketConnectionStatus] = useState<'disconnected' | 'connected' | 'error'>('disconnected');
    const {setCurrCtx} = useCurrGameCtx();

    useEffect(() => {
        const wsSingleton = WebSocketSingleton.getInstance(WEBSOCKET_URL);
        const ws = wsSingleton.getSocket();

        const handleOpen = () => setSocketConnectionStatus('connected');
        const handleMessage = (e: MessageEvent) => {
            const data = JSON.parse(e.data);

            switch (data.type as IMessage["type"]) {
                case 'ack':
                    events.emit(data.ack_for, data);
                    break;
                case 'player-joined':
                    toast.success(`${data.guestName} joined`);
                    setCurrCtx(prevState => ({...prevState, guest: data.guestName}));
                    break;
                case "info-move": {
                    const infoMoveData = data as IInformPlayersMove;
                    setCurrCtx(prev => ({
                        ...prev,
                        currentTurn: infoMoveData.currTurn,
                        currBoardState: prev.currBoardState.map((item) =>
                            item.num === infoMoveData.selected ? {num: item.num, selected: true} : item
                        ),
                        noOfBingo: infoMoveData.bingos.length,
                        bingos: infoMoveData.bingos
                    }));
                    break;
                }
                case "won-bingo": {
                    const wonData = data as IWonBingo;
                    if (wonData.won === data.to) {
                        toast.success("You won");
                    } else {
                        toast.error("You lost");
                    }
                    setCurrCtx(prev => ({...prev, wonBy: wonData.won}));
                    break;
                }
                case "ask-for-replay":
                    gameEvents.emit("ask-replay", {data: {by: data.by}, type: "game-event"});
                    break;
                case "cancelled-replay":
                    gameEvents.emit("cancel-replay", {type: 'game-event', data: ''});
                    toast.info("The other player cancelled the replay request");
                    break;
                case "continue-replay":
                    gameEvents.emit('reset-game', {type: 'game-event', data});
                    break;
                case "reaction":
                    gameEvents.emit('reaction', {type: 'game-event', data});
                    break;
                case "chat":
                    gameEvents.emit('chat', {type: 'game-event', data});
                    break;
                default:
                    console.error("Undefined type");
                    toast.error(data.message || "Invalid data");
                    break;
            }
        };

        const handleClose = () => {
            console.log("Disconnected from WebSocket");
            setSocketConnectionStatus('disconnected');
        };

        const handleError = (e: Event) => {
            setSocketConnectionStatus('error');
            console.error("WebSocket error:", e);
        };

        ws.addEventListener("open", handleOpen);
        ws.addEventListener("message", handleMessage);
        ws.addEventListener("close", handleClose);
        ws.addEventListener("error", handleError);

        return () => {
            ws.removeEventListener("open", handleOpen);
            ws.removeEventListener("message", handleMessage);
            ws.removeEventListener("close", handleClose);
            ws.removeEventListener("error", handleError);
        };
    }, []);

    return {
        ws: WebSocketSingleton.getInstance(WEBSOCKET_URL).getSocket(),
        socketConnectionStatus,
    };
}
