import {ReactNode, useState} from "react";
import {useLocalStorage} from "usehooks-ts";
import {DEFAULT_BOARD, STORE_KEY} from "@/lib/data.ts";
import {TBoard} from "@/lib/context/app/AppCtx.ts";
import {AppCtx} from "@/lib/context/app/AppCtx.ts";

export function AppCtxProvider({children}: {
    children: ReactNode;
}) {
    const [username, setUsername] = useLocalStorage<string | null>(STORE_KEY.username, null);
    const [boards, setBoards] = useLocalStorage<TBoard[]>(STORE_KEY.boards, [DEFAULT_BOARD]);
    const [selectedBoard, setSelectedBoard] = useLocalStorage<TBoard | null>(STORE_KEY.currentBoard, DEFAULT_BOARD);
    const [showBoardsWindow, setShowBoardsWindow] = useState(false);

    console.log("SELECTED", selectedBoard);

    return (
        <AppCtx.Provider value={{
            username, setUsername,
            boards, setBoards,
            selectedBoard, setSelectedBoard,
            showBoardsWindow, setShowBoardsWindow,
        }}>
            {children}
        </AppCtx.Provider>
    );
}