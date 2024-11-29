import {useSearchParams} from "react-router";
import {CreateGame} from "@/components/CreateGame.tsx";
import {JoinGame} from "@/components/JoinGame.tsx";
import {useState} from "react";
import {GameCreateDialog} from "@/components/GameCreateDialog.tsx";
import {MainGame} from "@/components/MainGame.tsx";

export default function Game() {
    const [searchParams, setSearchParams] = useSearchParams();

    let type = searchParams.get("type") as ('create' | 'join' | 'start');
    if(type !== "create" && type !== "start")
        type = "join";

    const [dialogOpen, setDialogOpen] = useState(false);
    const [gameData, setGameData] = useState({title: "", gameID: ""});

    function onCreate(title: string, gameID: string) {
        setSearchParams({type: "start"});
        setGameData({title, gameID});
    }

    function onJoin(gameID: string) {
        setSearchParams({type: "start"});
        console.log(gameID);
    }

    return <main className="size-full">
        {dialogOpen && <GameCreateDialog setClose={setDialogOpen} gameData={gameData}/>}

        {type === "create" && <CreateGame setOpen={setDialogOpen} onCreate={onCreate}/>}
        {type === "join" && <JoinGame onJoin={onJoin}/>}
        {type === "start" && <MainGame/>}
    </main>
}