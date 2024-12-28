import {StateSetter} from "@/lib/types.ts";
import {useLocation} from "react-router";
import {useEffect} from "react";
import {copyText} from "@/lib/utils.ts";
import CopyIcon from "@/components/icons/CopyIcon.tsx";
import useCurrGameCtx from "@/lib/context/currentGame/useCurrGameCtx.ts";

export function GameCreateDialog({setClose}: {
    setClose: StateSetter<boolean>
}) {
    const {gameID} = useCurrGameCtx();

    const location = useLocation();
    const baseURL = window.location.origin;
    const currentURL = `${baseURL}${location.pathname}/join/${gameID}`;

    useEffect(() => {
        const closeIfEscape = (e: KeyboardEvent) => {
            if (e.code === "Escape")
                setClose(false);
        }

        window.addEventListener('keydown', closeIfEscape);

        return () => {
            window.removeEventListener('keydown', closeIfEscape);
        }
    }, [setClose])

    return <div className="fixed z-50 bg-black bg-opacity-60 inset-0 flex items-center justify-center">
        <div className="bg-white rounded-lg p-5 w-[500px] max-sm:w-[350px]">
            <h1 className="text-2xl mb-4">Game Created Successfully</h1>
            <hr/>

            <div className="mt-6">
                Share the code
                <div className="mt-2 flex w-fit bg-gray-100 overflow-hidden rounded-lg p-2 gap-2 select-all border-2">
                    {gameID}
                    <button type="button" className="opacity-60 hover:text-blue-800"
                            onClick={() => copyText(gameID)}>
                        <CopyIcon/>
                    </button>
                </div>
            </div>

            <br/>
            <div className="flex items-center justify-center gap-3 w-full text-gray-400">
                <hr className="w-full"/>
                OR
                <hr className="w-full"/>
            </div>
            <br/>

            <div>
                Share the web link
                <div className="mt-2 flex bg-gray-100 overflow-hidden rounded-lg p-2 gap-2 select-all border-2">
                    <a className="hover:underline text-blue-700 truncate w-full" href={currentURL}>{currentURL}</a>
                    <button type="button" className="opacity-60 hover:text-blue-800"
                            onClick={() => copyText(currentURL)}>
                        <CopyIcon/>
                    </button>
                </div>
            </div>
            <br/>
            <button className="mt-4 px-4 py-2 rounded-lg w-full bg-red-600 text-white" onClick={() => {
                setClose(false);
            }}>Close
            </button>
        </div>
    </div>
}