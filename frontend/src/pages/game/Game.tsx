import {useSearchParams} from "react-router";
import {CreateGame} from "@/components/CreateGame.tsx";
import {JoinGame} from "@/components/JoinGame.tsx";
import {useState} from "react";
import {GameCreateDialog} from "@/components/GameCreateDialog.tsx";
import {MainGame} from "@/components/MainGame.tsx";
import Spinner from "@/components/ui/spinner.tsx";
import useSocket from "@/lib/hooks/useSocket.ts";
import sendMsg from "@/lib/utils.ts";
import {ICreateMsg} from "../../../../common/types.ts";
import {useGameCtx} from "@/lib/context/GameCtx.ts";
import {AskForName} from "@/components/AskForName.tsx";
import {DEFAULT_BOARD} from "@/lib/data.ts";
import {gameEvents} from "@/logic/init.ts";

export default function Game() {
    const [searchParams, setSearchParams] = useSearchParams();
    let type = searchParams.get("type") as ('create' | 'join' | 'start');
    if (type !== "create" && type !== "start")
        type = "join";

    const [dialogOpen, setDialogOpen] = useState(false);
    const [gameData, setGameData] = useState({title: "", gameID: ""});
    const {username, selectedBoard} = useGameCtx();

    const {
        ws,
        socketConnectionStatus,
        gameStatus
    } = useSocket(gameEvents);


    async function onCreate(title: string, gameID: string) {
        sendMsg<ICreateMsg>(ws!, {
            type: 'create',
            gameID: gameID,
            hostName: username!,
            gameTitle: title,
            board: selectedBoard?.board || DEFAULT_BOARD
        });

        await gameEvents.waitFor('created-and-ack');

        setDialogOpen(true);
        setSearchParams({type: "start"});
        setGameData({title, gameID});
    }

    function onJoin(gameID: string) {
        setSearchParams({type: "start"});
        console.log(gameID);
    }

    return <>
        <main className="size-full">
            {socketConnectionStatus !== "connected" &&
                <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center flex-col">
                    <Spinner
                        className={`${socketConnectionStatus === "error" ? 'fill-red-500' : 'fill-blue-500'} size-[70px]`}/>
                    <h1 className="text-white text-opacity-60 text-xl mt-5">
                        {socketConnectionStatus === "error" ? "An error occurred :(" : "Connecting to server..."}
                    </h1>
                </div>}

            {dialogOpen && <GameCreateDialog setClose={setDialogOpen} gameData={gameData}/>}

            {type === "create" && <CreateGame gameStatus={gameStatus} onCreate={onCreate}/>}
            {type === "join" && <JoinGame onJoin={onJoin} code={searchParams.get('gameID')}/>}
            {type === "start" && <MainGame/>}
        </main>
        <AskForName/>
    </>
}