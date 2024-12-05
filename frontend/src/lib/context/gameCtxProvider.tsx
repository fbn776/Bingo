import {ReactNode} from "react";
import {useLocalStorage} from "usehooks-ts";
import {STORE_KEY} from "@/lib/data.ts";
import {TBoard} from "@/lib/context/GameCtx.ts";
import {GameCtx} from "@/lib/context/GameCtx.ts";

export function GameCtxProvider({children}: {
    children: ReactNode;
}) {
    const [username, setUsername] = useLocalStorage<string | null>(STORE_KEY.username, null);
    const [boards, setBoards] = useLocalStorage<TBoard[]>(STORE_KEY.boards, []);
    const [selectedBoard, setSelectedBoard] = useLocalStorage<TBoard | null>(STORE_KEY.currentBoard, null);

    return (
        <GameCtx.Provider value={{
            username, setUsername,
            boards, setBoards,
            selectedBoard, setSelectedBoard
        }}>
            {children}
        </GameCtx.Provider>
    );
}