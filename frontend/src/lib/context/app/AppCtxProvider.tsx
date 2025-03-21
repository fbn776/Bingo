import {ReactNode, useEffect, useState} from "react";
import {useLocalStorage} from "usehooks-ts";
import { STORE_KEY} from "@/lib/data.ts";
import {TBoard, UseAppCtx} from "@/lib/context/app/useAppCtx.ts";

export function AppCtxProvider({children}: {
    children: ReactNode;
}) {
    const [username, setUsername] = useLocalStorage<string | null>(STORE_KEY.username, null);
    const [boards, setBoards] = useLocalStorage<TBoard[]>(STORE_KEY.boards, []);
    const [selectedBoard, setSelectedBoard] = useLocalStorage<TBoard | null>(STORE_KEY.currentBoard, null);
    const [showBoardsWindow, setShowBoardsWindow] = useState(false);
    const [showNameWindow, setShowNameWindow] = useState(false);
    const [shownSpecial, setShownSpecial] = useLocalStorage(STORE_KEY.hasShowSpecial, false);

    useEffect(() => {
        if (!boards.some((board) => {
            return selectedBoard?.id === board.id;
        })) {
            setSelectedBoard(boards[0]);
        }
    }, [boards, selectedBoard?.id, setSelectedBoard]);

    return (
        <UseAppCtx.Provider value={{
            username, setUsername,
            boards, setBoards,
            selectedBoard, setSelectedBoard,
            showBoardsWindow, setShowBoardsWindow,
            showNameWindow, setShowNameWindow,
            shownSpecial, setShownSpecial
        }}>
            {children}
        </UseAppCtx.Provider>
    );
}