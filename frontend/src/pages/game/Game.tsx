import {useSearchParams} from "react-router";
import {CreateGame} from "@/components/CreateGame.tsx";
import {JoinGame} from "@/components/JoinGame.tsx";
import {useState} from "react";
import {GameCreateDialog} from "@/components/GameCreateDialog.tsx";
import {MainGame} from "@/components/MainGame.tsx";
import Spinner from "@/components/ui/spinner.tsx";
import useSocket from "@/lib/hooks/useSocket.ts";
import {AskForName} from "@/components/AskForName.tsx";
import {gameEvents} from "@/logic/init.ts";

export default function Game() {
    const [searchParams] = useSearchParams();
    let type = searchParams.get("type") as ('create' | 'join' | 'start');
    if (type !== "create" && type !== "start")
        type = "join";

    const [dialogOpen, setDialogOpen] = useState(false);
    const {
        ws,
        socketConnectionStatus,
    } = useSocket(gameEvents);

    return <>
        <main className="size-full">
            {socketConnectionStatus !== "connected" &&
                <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center flex-col">
                    <Spinner
                        className={`${socketConnectionStatus === "error" ? 'text-red-500' : 'text-white'} size-[70px]`}/>
                    <h1 className="text-white text-opacity-60 text-xl mt-5">
                        {socketConnectionStatus === "error" ? "An error occurred :(" : "Connecting to server..."}
                    </h1>
                </div>}
            {dialogOpen && <GameCreateDialog setClose={setDialogOpen}/>}
            {type === "create" && <CreateGame setDialogOpen={setDialogOpen} ws={ws}/>}
            {type === "join" && <JoinGame ws={ws} code={searchParams.get('gameID')}/>}
            {type === "start" && <MainGame setDialogOpen={setDialogOpen}/>}
        </main>
        <AskForName/>
    </>
}