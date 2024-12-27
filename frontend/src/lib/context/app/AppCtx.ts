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

interface TAppCtx {
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

    /** Whether the board window is shown */
    showBoardsWindow: boolean;
    /** Set whether the board window is shown */
    setShowBoardsWindow: StateSetter<boolean>;
}

export const AppCtx = createContext<TAppCtx | undefined>(undefined);

/**
 * The main game's context, helps to control the app/game. Controls or stores global data like the
 * `username`, `boards`, window visibility, etc.
 * @returns {TAppCtx} The game context
 */
export const useAppCtx = (): TAppCtx => {
    const context = useContext(AppCtx);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};