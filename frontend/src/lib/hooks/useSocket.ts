import {useEffect, useState} from "react";
import {WEBSOCKET_URL} from "@/lib/data.ts";
import {gameEvents} from "@/logic/init.ts";

export type TGameStatus = 'creating' | 'created-and-acked' | 'waiting' | 'on-create' | 'on-join' | 'initial'

export default function useSocket(events: typeof gameEvents) {
    const [socketConnectionStatus, setSocketConnectionStatus] = useState<'disconnected' | 'connected' | 'error'>('disconnected');
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [gameStatus, setGameStatus] = useState<TGameStatus>('initial');

    useEffect(() => {
        const ws = new WebSocket(WEBSOCKET_URL);
        setWs(ws);

        ws.onopen = () => {
            setSocketConnectionStatus('connected');
        }

        ws.onmessage = (e) => {
            const data = JSON.parse(e.data);
            console.log("RECEIVED DATA:", data);

            switch (data.type) {
                case 'ack':
                    events.emit(data.ack_for, data);
                    break;

                default:
                    console.error("Undefined type");
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

        gameStatus, setGameStatus
    }
}