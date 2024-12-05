import {createContext, useContext} from "react";
import {StateSetter} from "@/lib/types.ts";

/** Represents a board in storage */
export type TBoard = {
    /** The title of the board */
    title: string,
    /** The board data */
    board: number[],
    /** The timestamp of the board */
    timestamp: number,
    /** The ID of the board */
    id: string
};

interface TGameCtx {
    /** The username of the player */
    username: string | null;
    /** Set the username of the player*/
    setUsername: StateSetter<string | null>

    /** The boards in storage */
    boards: TBoard[];
    /** Set the boards in storage */
    setBoards: StateSetter<TBoard[]>;

    /** The selected board, that is the board which is selected by the player */
    selectedBoard: TBoard | null;
    /** Set the selected board */
    setSelectedBoard: StateSetter<TBoard | null>;
}

export const GameCtx = createContext<TGameCtx | undefined>(undefined);

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