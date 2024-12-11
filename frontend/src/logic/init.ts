import EventEmitter from "@/lib/events.ts";

type TGameData = {
    type: string
}

export const gameEvents = new EventEmitter<TGameData, 'created-and-ack' | 'created'>();
