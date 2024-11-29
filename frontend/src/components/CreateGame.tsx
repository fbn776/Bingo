import {useState} from "react";
import generateGameId from "@/lib/utils.ts";
import {toast} from "sonner";
import CopyIcon from "@/components/icons/CopyIcon.tsx";
import RetryIcon from "@/components/icons/RetryIcon.tsx";

export function CreateGame() {
    const [gameID, setGameID] = useState(generateGameId());

    return <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="p-6 rounded-lg bg-white">
            <h1 className="text-2xl mb-2">Create a game</h1>
            <hr/>
            <form className="flex flex-col mt-4">
                <label>Game name</label>
                <input type="text" className="border-2 px-2 py-3 rounded-lg mt-1 mb-3"
                       placeholder="Enter the game title" required/>

                <label>Game ID</label>
                <div className="flex w-full mt-1 mb-3 bg-gray-100 overflow-hidden rounded-lg">
                    <input type="text" className="border-2 px-2 py-3 rounded-lg rounded-r-none border-r-0"
                           placeholder="Enter the game title" disabled value={gameID}/>

                    <button type="button" className="border-2 px-2 py-3 border-l-0 opacity-60 hover:text-blue-800"
                            onClick={(e) => {
                                e.preventDefault();
                                navigator.clipboard.writeText(gameID).then(r => {
                                    toast.success("Copied to clipboard");
                                    console.log(r)
                                }).catch(e => {
                                    console.log(e);
                                    toast.error("Failed to copy to clipboard");
                                });
                            }}>
                        <CopyIcon/>
                    </button>

                    <button type="button"
                            className="bg-white flex items-center justify-center border-2 rounded-lg w-[50px] border-l-0 rounded-l-none hover:text-blue-800"
                            onClick={(e) => {
                                e.preventDefault();
                                setGameID(generateGameId());
                            }}>
                        <RetryIcon/>
                    </button>
                </div>

                <button className="mt-5 button bg-blue-500 hover:bg-blue-700 hover:scale-95">Create</button>
            </form>
        </div>
    </div>
}