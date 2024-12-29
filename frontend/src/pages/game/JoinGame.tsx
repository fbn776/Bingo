import sendMsg, {mapUserBoardToBoardState} from "@/lib/utils.ts";
import {IJoinMsg} from "../../../../common/types.ts";
import {DEFAULT_BOARD} from "@/lib/data.ts";
import {gameEvents} from "@/logic/init.ts";
import {toast} from "sonner";
import {useAppCtx} from "@/lib/context/app/useAppCtx.ts";
import {useNavigate, useParams} from "react-router";
import useCurrGameCtx from "@/lib/context/currentGame/useCurrGameCtx.ts";
import useSocketCtx from "@/lib/context/socket/useSocketCtx.ts";

export function JoinGame() {
    const {code} = useParams();
    const {username, selectedBoard} = useAppCtx();
    const {setCurrCtx} = useCurrGameCtx();
    const {ws} = useSocketCtx();
    const navigate = useNavigate();

    async function onJoin(gameID: string) {
        console.log("Sending msg")
        sendMsg<IJoinMsg>(ws!, {
            type: "join",
            gameID: gameID,
            board: selectedBoard?.board || DEFAULT_BOARD.board,
            guestName: username!
        });

        const data = await gameEvents.waitFor('join-reply');

        console.log("ack data:", data);


        if (data.subtype === "error") {
            toast.error(data.msg);
        } else {
            toast.success("Joined game");

            setCurrCtx({
                currentTurn: data.data.currentTurn,
                gameID: gameID,
                youAre: 'guest', // Joining the game, so set it to guest
                gameTitle: data.data.gameTitle,
                guest: username!, // You are the guest
                host: data.data.host,
                currBoardState: mapUserBoardToBoardState(selectedBoard!),
                noOfBingo: 0
            });

            navigate('/game');
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