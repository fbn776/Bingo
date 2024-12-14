import sendMsg from "@/lib/utils.ts";
import {IJoinMsg} from "../../../common/types.ts";
import {DEFAULT_BOARD} from "@/lib/data.ts";
import {gameEvents} from "@/logic/init.ts";
import {toast} from "sonner";
import {useGameCtx} from "@/lib/context/game/GameCtx.ts";
import {useSearchParams} from "react-router";

export function JoinGame({ws, code}: {
    code?: string | null,
    ws: WebSocket | null
}) {
    const {username, selectedBoard} = useGameCtx();
    const [, setSearchParams] = useSearchParams();

    async function onJoin(gameID: string) {
        console.log("Sending msg")
        sendMsg<IJoinMsg>(ws!, {
            type: "join",
            gameID: gameID,
            board: selectedBoard?.board || DEFAULT_BOARD,
            guestName: username!
        });

        const data = await gameEvents.waitFor('join-reply');
        console.log("ack data:", data);

        console.log(data);

        if(data.subtype === "error") {
            toast.error(data.msg);
        } else {
            toast.success("Joined game");
            setSearchParams({type: "start"});
        }
    }

    return <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="p-6 rounded-lg bg-white max-sm:w-[350px] w-[400px]">
            <h1 className="text-2xl mb-2">Join a game</h1>
            <hr/>
            <form className="flex flex-col mt-4" onSubmit={(e) => {
                e.preventDefault();
                const gameID = (e.currentTarget.elements.namedItem("gameID") as HTMLInputElement).value;
                onJoin(gameID);
            }}>
                <label htmlFor="title">Game ID</label>
                <input type="text" name="gameID" className="border-2 px-2 py-3 rounded-lg mt-1 mb-3"
                       placeholder="Enter the game ID" required
                       defaultValue={code || ''}
                />

                <button className="mt-5 button bg-blue-500 hover:bg-blue-700 hover:scale-95">Join</button>
            </form>
        </div>
    </div>
}