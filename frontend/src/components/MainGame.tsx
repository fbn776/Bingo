import FilledUserIcon from "@/components/icons/FilledUserIcon.tsx";
import UserIcon from "@/components/icons/UserIcon.tsx";
import ChatIcon from "@/components/icons/ChatIcon.tsx";
import {useCurrGameCtx} from "@/lib/context/currentGame/CurrentGameCtx.ts";
import Spinner from "@/components/ui/spinner.tsx";
import {useNavigate} from "react-router";
import {useEffect} from "react";
import {StateSetter} from "@/lib/types.ts";

const arr: number[] = [];

let k = 1;
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        arr.push(k++);
    }
}

export function MainGame({setDialogOpen}: {
    setDialogOpen: StateSetter<boolean>
}) {
    const {guest, host, youAre} = useCurrGameCtx();
    const navigate = useNavigate();


    useEffect(() => {
        if(!host) {
            navigate('/game?type=create');
        }
    })


    return <>
        {!guest &&
            <div className="bg-black fixed z-30 inset-0 flex justify-center items-center bg-opacity-60 flex-col">
                <Spinner className="size-[100px] text-white"/>
                <h1 className="text-white text-2xl mt-10">Waiting for a player to join</h1>
                <button onClick={() => setDialogOpen(true)} className="button bg-blue-500 shadow mt-3">Info </button>
            </div>
        }
        <div className="size-full flex flex-col justify-between items-center">
            <div className="flex items-center justify-between w-full">
                <div className="rounded-br-xl p-5 w-[40%] bg-blue-200 shadow-xl">
                    <div className="text-3xl flex items-center gap-1">
                        <FilledUserIcon size="30"/> <span>{youAre === 'guest' ? guest : host}</span>
                    </div>
                </div>


                <div className="bg-white rounded-bl-xl p-5 w-[40%] text-right shadow-xl">
                    <div className="text-3xl flex items-center gap-1">
                        <span>{youAre === 'guest' ? host : guest}</span><UserIcon size="30"/>
                    </div>
                </div>
            </div>

            <div className="game-board grid grid-cols-5 grid-rows-5">
                {arr.map((cell, j) => {
                    return <button key={j}>{cell}</button>
                })}
            </div>

            <div className="text-right w-full pb-3 pr-3">
                <button className="rounded-full bg-white p-4 shadow-xl">
                    <ChatIcon/>
                </button>
            </div>
        </div>
    </>
}