import EventEmitter from "@/lib/events.ts";
import {IAckMsg, TAckFor} from "../../../common/types.ts";

type TGameData = {
    type: "ack" | "error" | string,
}


export const gameEvents = new EventEmitter<TGameData & IAckMsg, TAckFor>();
