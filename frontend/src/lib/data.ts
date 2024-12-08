export const STORE_KEY = {
    username: "bingo-username",
    boards: "bingo-boards",
    currentBoard: "bingo-current-board"
}

export const WEBSOCKET_URL = import.meta.env.VITE_WS_URL as string;

if(!WEBSOCKET_URL)
    throw new Error('Web socket URL not specified in .env file');