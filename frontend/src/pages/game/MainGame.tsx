import FilledUserIcon from "@/components/icons/FilledUserIcon.tsx";
import UserIcon from "@/components/icons/UserIcon.tsx";
import ChatIcon from "@/components/icons/ChatIcon.tsx";
import useCurrGameCtx from "@/lib/context/currentGame/useCurrGameCtx.ts";
import Spinner from "@/components/ui/spinner.tsx";
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {GameCreateDialog} from "@/components/GameCreateDialog.tsx";
import useSocketCtx from "@/lib/context/socket/useSocketCtx.ts";
import sendMsg from "@/lib/utils.ts";
import {IPlayerMove} from "../../../../common/types.ts";

function HUD({youAre, guest, host, currentTurn}: {
    youAre: "guest" | "host",
    guest: string,
    host: string,
    currentTurn: "guest" | "host"
}) {
    return <div className="flex items-start justify-between w-full">
        <div className={`rounded-br-xl p-5 w-[40%] ${currentTurn === youAre ? 'bg-blue-200' : 'bg-white'} shadow-xl`}>
            <div className="text-3xl flex items-center gap-1">
                {currentTurn === youAre ? <FilledUserIcon size="30"/> : <UserIcon size="30"/>}
                <span>{youAre === 'guest' ? guest : host}</span>
            </div>
        </div>

        <div className={`rounded-bl-xl p-5 w-[40%] shadow-xl ${currentTurn !== youAre ? 'bg-blue-200' : 'bg-white'}`}>
            <div className="text-3xl flex items-center gap-1 justify-end">
                <span>{youAre === 'guest' ? host : (guest || '-------')}</span>
                {currentTurn !== youAre ? <FilledUserIcon size="30"/> : <UserIcon size="30"/>}
            </div>
        </div>
    </div>

}

export function MainGame() {
    const {currentTurn, guest, host, youAre, gameID, currBoardState, setCurrCtx} = useCurrGameCtx();
    const navigate = useNavigate();
    const [dialogOpen, setDialogOpen] = useState(false);
    const {ws} = useSocketCtx();

    useEffect(() => {
        if (!host) {
            navigate('/game/create');
            return;
        }
    }, []);

    console.log("CURRENT TURN:", currentTurn);

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
            <HUD youAre={youAre!} guest={guest} host={host} currentTurn={currentTurn!}/>
            <div className="game-board grid grid-cols-5 grid-rows-5 relative">
                {currentTurn !== youAre && <div className="absolute size-full z-50 cursor-wait"/>}
                {currBoardState.map((cell, j) => {
                    return <button
                        className={cell.selected ? "selected" : ""} key={j}
                        onClick={() => {
                            if (cell.selected || currentTurn !== youAre)
                                return;

                            setCurrCtx(prev => ({
                                ...prev,
                                currentTurn: prev.currentTurn === "guest" ? "host" : 'guest',
                                currBoardState: prev.currBoardState.map(item => {
                                    if (item.num === cell.num) {
                                        return {
                                            num: item.num,
                                            selected: true
                                        }
                                    }
                                    return item;
                                })
                            }));

                            sendMsg<IPlayerMove>(ws!, {
                                gameID,
                                type: "move",
                                selected: cell.num,
                                by: youAre!
                            });
                        }}
                        disabled={cell.selected || currentTurn !== youAre}
                    >
                        {cell.num}
                    </button>
                })}
            </div>
            {currentTurn !== youAre &&
                <div className="flex absolute bottom-10 bg-white rounded-md shadow px-4 py-2">
                    <Spinner className="mr-2"/>Waiting for <span className="bg-gray-300 rounded-md mx-1 px-1">{(currentTurn === "guest" ? guest : host).trim()}</span> to play
                </div>
            }
            <div className="text-right w-full pb-3 pr-3">
                <button className="rounded-full bg-white p-4 shadow-xl">
                    <ChatIcon/>
                </button>
            </div>
        </div>

        {dialogOpen && <GameCreateDialog setClose={setDialogOpen}/>}
    </>
}