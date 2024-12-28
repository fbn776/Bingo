import {TBoard} from "@/lib/context/app/useAppCtx.ts";
import {generateRandomID} from "@/lib/utils.ts";

export const STORE_KEY = {
    username: "bingo-username",
    boards: "bingo-boards",
    currentBoard: "bingo-current-board"
}

export const WEBSOCKET_URL = import.meta.env.VITE_WS_URL as string;

if (!WEBSOCKET_URL)
    throw new Error('Web socket URL not specified in .env file');


export const DEFAULT_BOARD_NUMS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

export const DEFAULT_BOARD: TBoard = {
    board: DEFAULT_BOARD_NUMS,
    title: "Default",
    timestamp: Date.now(),
    id: generateRandomID()
};