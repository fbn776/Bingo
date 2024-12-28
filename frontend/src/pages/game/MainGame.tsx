import FilledUserIcon from "@/components/icons/FilledUserIcon.tsx";
import UserIcon from "@/components/icons/UserIcon.tsx";
import ChatIcon from "@/components/icons/ChatIcon.tsx";
import useCurrGameCtx from "@/lib/context/currentGame/useCurrGameCtx.ts";
import Spinner from "@/components/ui/spinner.tsx";
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {GameCreateDialog} from "@/components/GameCreateDialog.tsx";
import {useAppCtx} from "@/lib/context/app/useAppCtx.ts";
import {getObjectEntries} from "@/lib/utils.ts";


export function MainGame() {
    const {guest, host, youAre} = useCurrGameCtx();
    const {selectedBoard} = useAppCtx();
    const navigate = useNavigate();
    const [dialogOpen, setDialogOpen] = useState(false);

    /**
     * This maps each cell of the board to a boolean value, which represents whether the cell is checked or not
     */
    const [localBoardMap, setLocalBoardMap] = useState<Record<number, boolean>>({});


    useEffect(() => {
        if (!host) {
            navigate('/game/create');
            return;
        }

        const boardMap: Record<number, boolean> = {};
        for(const item of selectedBoard!.board) {
            console.log("ITEM: ", item)
            boardMap[item] = false;
        }

        console.log("FINAL", boardMap)
        setLocalBoardMap(boardMap);
    }, []);

    return <>
        {!guest &&
            <div className="bg-black fixed z-30 inset-0 flex justify-center items-center bg-opacity-60 flex-col">
                <Spinner className="size-[100px] text-white"/>
                <h1 className="text-white text-2xl mt-10">Waiting for a player to join</h1>
                <button onClick={() => setDialogOpen(true)} className="button bg-blue-500 shadow mt-3">Share Game
                </button>
            </div>
        }
        <div className="size-full flex flex-col justify-between items-center">
            <div className="flex items-start justify-between w-full">
                <div className="rounded-br-xl p-5 w-[40%] bg-blue-200 shadow-xl">
                    <div className="text-3xl flex items-center gap-1">
                        <FilledUserIcon size="30"/> <span>{youAre === 'guest' ? guest : host}</span>
                    </div>
                </div>

                <div className="rounded-bl-xl p-5 w-[40%] shadow-xl bg-white">
                    <div className="text-3xl flex items-center gap-1 justify-end">
                        <span>{youAre === 'guest' ? host : (guest || '-------')}</span><UserIcon size="30"/>
                    </div>
                </div>
            </div>

            <div className="game-board grid grid-cols-5 grid-rows-5">
                {getObjectEntries<number, boolean>(localBoardMap!).map((cell, j) => {
                    console.log(cell)
                    return <button key={j}>{cell[0]}</button>
                })}
            </div>

            <div className="text-right w-full pb-3 pr-3">
                <button className="rounded-full bg-white p-4 shadow-xl">
                    <ChatIcon/>
                </button>
            </div>
        </div>

        {dialogOpen && <GameCreateDialog setClose={setDialogOpen}/>}
    </>
}