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
    setUsername: StateSetter<string | null>

    /** The boards in storage */
    boards: TBoard[];
    setBoards: StateSetter<TBoard[]>;

    /** The selected board, that is the board which is selected by the player */
    selectedBoard: TBoard | null;
    setSelectedBoard: StateSetter<TBoard | null>;

    /** Whether the board window is shown */
    showBoardsWindow: boolean;
    setShowBoardsWindow: StateSetter<boolean>;

    /** Whether the name window is shown */
    showNameWindow: boolean;
    setShowNameWindow: StateSetter<boolean>;

    /** Whether the special window has been shown or not*/
    shownSpecial: boolean;
    setShownSpecial: StateSetter<boolean>;
}

export const UseAppCtx = createContext<TAppCtx | undefined>(undefined);

/**
 * The main game's context, helps to control the app/game. Controls or stores global data like the
 * `username`, `boards`, window visibility, etc.
 * @returns {TAppCtx} The game context
 */
export const useAppCtx = (): TAppCtx => {
    const context = useContext(UseAppCtx);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};