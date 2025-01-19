import {TBoard} from "@/lib/context/app/useAppCtx.ts";
import {generateRandomID} from "@/lib/utils.ts";
import {TLocalBoardCell} from "../../../common/types.ts";

export const STORE_KEY = {
    username: "bingo-username",
    boards: "bingo-boards",
    currentBoard: "bingo-current-board",
    hasShowSpecial: "bingo-shown-special"
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

export const DEFAULT_BOARD_STATE: TLocalBoardCell[] = Array.from({length: 25}).map((_, i) => ({num: i, selected: false}));

export const REACTION_EMOJI: Record<string, string[]> = {
    "🤣": ["laugh1.webp", "laugh2.webp", "laugh3.webp"],
    "🔥": ["fire.webp"],
    "🎉": ["tada.webp"],
    "❤️": ["heart1.webp", "heart2.webp", "heart3.webp", "heart4.webp", "heart5.webp"],
    "🤯": ["exploding_head.webp"],
    "🤔": ["face_with_rolling_eyes.webp"],
    "😎": ["sunglasses.webp"],
    "🎊": ["sparkles.webp"],
    "😅": ["sweat_smile.webp"],
    "🤞": ["crossed_fingers.webp", "four_leaf_clover.webp"],
    "👏": ["clap.webp"],
    "👍": ["thumbs-up.webp"],
    "👎": ["thumbs_down.webp"],
    "🙌": ["raised_hands.webp"],
    "😢": ["cry1.webp", "cry2.webp"],
    "🥇": ["first_place.webp"],
    "🥈": ["second_place.webp"],
    "💔": ["broken_heart.webp"],
    "💪": ["muscle.webp"],
    "⭐": ["star-struck.webp"],
    "🎈": ["balloon.webp"],
    "😍": ["heart_eyes.webp"],
    "🌸": ["flower1.webp", "flower2.webp", "flower3.webp"],
    "💀": ["skull.webp"],
    "😴": ["sleeping.webp"],
};
