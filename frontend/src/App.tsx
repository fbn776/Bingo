import {useEffect, useState} from "react";

const playerID = Math.random().toString(36).substring(7);

console.log("PLAYER ID:", playerID);

function sendMessage(ws: WebSocket | null, message: string) {
    if (ws && ws.readyState === ws.OPEN)
        ws.send(message);
}

export default function App() {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<string[]>([]);


    useEffect(() => {
        const ws = new WebSocket("ws://localhost:3001");
        setWs(ws);

        ws.onmessage = (event) => {
            console.log("Received: ", event.data);
            const data = JSON.parse(event.data);

            switch (data.type) {
                case 'message': {
                    setMessages((messages) => [...messages, data.message]);
                    break;
                }
            }

        };

        ws.onclose = () => {
            console.log("disconnected from websocket");
        }

        return () => {
            ws.close();
        };
    }, []);


    return (
        <div className="p-3">
            <h1 className="text-red-500 text-5xl">Bingo</h1><br/>

            <button onClick={() => {
                sendMessage(ws, JSON.stringify({type: "join", playerID}));
            }} className="my-4">JOIN
            </button>

            <form>
                <input className="mr-2" name="message"/>

                <button type="submit" onClick={(e) => {
                    e.preventDefault();
                    const message = e.currentTarget.form?.message.value;
                    sendMessage(ws, JSON.stringify({type: "message", message}));
                }}>
                    Send
                </button>
            </form>

            <div className="p-4 bg-gray-200 rounded my-3">
                {messages.map((message, index) => (
                    <div key={index}>{message}</div>
                ))}
            </div>
        </div>
    );
}