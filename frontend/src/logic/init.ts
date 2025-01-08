import EventEmitter from "@/lib/events.ts";
import {IAckMsg, TAckFor} from "../../../common/types.ts";

type TGameData = {
    type: "ack" | "error" | "game-event" | string,
    data: unknown,
    subtype?: string,
    msg?: string
}


export const gameEvents = new EventEmitter<TGameData | IAckMsg, TAckFor | "test" | "ask-replay" | "cancel-replay" | "reset-game" | "reaction">();
