import WebSocket from "ws";

/**
 * Used for delaying the execution of a function
 *
 * **FOR TESTING PURPOSES ONLY**
 * @param ms
 */
export async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default function sendMsg<T>(ws: WebSocket, data: T) {
    ws.send(JSON.stringify(data));
}