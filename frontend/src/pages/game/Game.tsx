import {useSearchParams} from "react-router";
import {CreateGame} from "@/components/CreateGame.tsx";
import {JoinGame} from "@/components/JoinGame.tsx";


export default function Game() {
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type") === "create" ? "create" : "join";

    return <main className="size-full">
        {
            type === "create" ? <CreateGame/> : <JoinGame/>
        }


    </main>
}