import {useEffect, useState} from "react";
import {WEBSOCKET_URL} from "@/lib/data.ts";

export default function useSocket() {
    const [socketConnectionStatus, setSocketConnectionStatus] = useState<'disconnected' | 'connected' | 'error'>('disconnected');

    const [ws, setWs] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(WEBSOCKET_URL);
        setWs(ws);

        ws.onopen = () => {
            setSocketConnectionStatus('connected');
        }

        ws.onmessage = (e) => {
            const data = JSON.parse(e.data);

            console.log(data);
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
        socketConnectionStatus, setSocketConnectionStatus
    }
}