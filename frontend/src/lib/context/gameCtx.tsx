import { createContext, useContext, ReactNode } from "react";
import {StateSetter} from "@/lib/types.ts";
import {useLocalStorage} from "usehooks-ts";
import {STORE_KEY} from "@/lib/data.ts";

type TBoard = {title: string, board: number[], timestamp: number};
interface TGameCtx {
    username: string | null;
    setUsername: StateSetter<string | null>;

    boards: TBoard[];
    setBoards: StateSetter<TBoard[]>;

    currentBoard: TBoard | null;
    setCurrentBoard: StateSetter<TBoard | null>;
}

const GameCtx = createContext<TGameCtx | undefined>(undefined);


export function GameCtxProvider({ children }: {
    children: ReactNode;
}){
    const [username, setUsername] = useLocalStorage<string | null>(STORE_KEY.username, null);
    const [boards, setBoards] = useLocalStorage<TBoard[]>(STORE_KEY.boards, []);
    const [currentBoard, setCurrentBoard] = useLocalStorage<TBoard | null>(STORE_KEY.currentBoard, null);

    return (
        <GameCtx.Provider value={{
            username, setUsername,

            boards, setBoards,

            currentBoard, setCurrentBoard
        }}>
            {children}
        </GameCtx.Provider>
    );
}

/**
 * Custom hook to use the game context
 *
 * @returns {TGameCtx} The game context
 */
export const useGameCtx = (): TGameCtx => {
    const context = useContext(GameCtx);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
