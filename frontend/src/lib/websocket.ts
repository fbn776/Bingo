export default class WebSocketSingleton {
    private static instance: WebSocketSingleton;
    private readonly socket: WebSocket;

    private constructor(url: string) {
        this.socket = new WebSocket(url);
    }

    static getInstance(url: string): WebSocketSingleton {
        if (!WebSocketSingleton.instance) {
            WebSocketSingleton.instance = new WebSocketSingleton(url);
        }
        return WebSocketSingleton.instance;
    }

    getSocket(): WebSocket {
        return this.socket;
    }
}
