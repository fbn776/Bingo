import {useState} from "react";
import sendMsg, {copyText, generateRandomID, mapUserBoardToBoardState} from "@/lib/utils.ts";
import {toast} from "sonner";
import CopyIcon from "@/components/icons/CopyIcon.tsx";
import RetryIcon from "@/components/icons/RetryIcon.tsx";
import Spinner from "@/components/ui/spinner.tsx";
import {ICreateMsg} from "../../../../common/types.ts";
import {DEFAULT_BOARD} from "@/lib/data.ts";
import {gameEvents} from "@/logic/init.ts";
import {useAppCtx} from "@/lib/context/app/useAppCtx.ts";
import useCurrGameCtx from "@/lib/context/currentGame/useCurrGameCtx.ts";
import useSocketCtx from "@/lib/context/socket/useSocketCtx.ts";
import {Link, useNavigate} from "react-router";
import {ArrowLeft} from "lucide-react";


export function CreateGame() {
    const [gameID, setGameID] = useState(generateRandomID());
    const [loading, setLoading] = useState(false);
    const {username, selectedBoard} = useAppCtx();
    const {setCurrCtx} = useCurrGameCtx();
    const {ws} = useSocketCtx();
    const navigate = useNavigate();

    async function onCreate(title: string, gameID: string) {
        sendMsg<ICreateMsg>(ws!, {
            type: 'create',
            gameID: gameID,
            hostName: username!,
            gameTitle: title,
            board: selectedBoard?.board || DEFAULT_BOARD.board
        });

        const data = await gameEvents.waitFor('create-reply') as { data: { currentTurn: "guest" | "host" } };

        console.log("CREATED:", data);

        // Change URL to main game
        navigate('/game');

        // Set info for the game
        setCurrCtx({
            gameID: gameID,
            gameTitle: title,
            youAre: 'host',
            guest: '',
            host: username!,
            currBoardState: mapUserBoardToBoardState(selectedBoard!),
            currentTurn: data.data.currentTurn,
            noOfBingo: 0,
            wonBy: null
        })
    }

    return <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="p-6 rounded-lg bg-white max-sm:w-[350px]">
            <h1 className="text-2xl mb-2 flex gap-2 items-center">
                <Link to="/" className="hover:text-blue-500 hover:scale-110"><ArrowLeft/></Link>
                Create a game
            </h1>
            <hr/>
            <form className="flex flex-col mt-4" onSubmit={(e) => {
                e.preventDefault();
                const title = (e.currentTarget.elements.namedItem("title") as HTMLInputElement).value;

                if (!title) {
                    toast.error("Please enter a title");
                    return;
                }
                setLoading(true);
                onCreate(title, gameID).finally(() => {
                    setLoading(false);
                });
            }}>
                <label htmlFor="title">Game name</label>
                <input type="text" name="title" className="border-2 px-2 py-3 rounded-lg mt-1 mb-3"
                       placeholder="Enter the game title" required/>

                <label>Game ID</label>
                <div className="flex w-full mt-1 mb-3 bg-gray-100 overflow-hidden rounded-lg">
                    <input type="text" className="border-2 px-2 py-3 rounded-lg rounded-r-none border-r-0 w-full"
                           placeholder="Enter the game title" disabled value={gameID}/>

                    <button type="button" className="border-2 px-2 py-3 border-l-0 opacity-60 hover:text-blue-800"
                            onClick={() => copyText(gameID)}>
                        <CopyIcon/>
                    </button>

                    <button type="button"
                            className="bg-white flex items-center justify-center border-2 rounded-lg w-[50px] border-l-0 rounded-l-none hover:text-blue-800"
                            onClick={(e) => {
                                e.preventDefault();
                                setGameID(generateRandomID());
                            }}>
                        <RetryIcon/>
                    </button>
                </div>

                <button
                    className="mt-5 button bg-blue-500 hover:bg-blue-700 hover:scale-95 flex items-center justify-center"
                    disabled={loading}
                >
                    {loading ? <Spinner/> : "Create"}
                </button>
            </form>
        </div>
    </div>
}