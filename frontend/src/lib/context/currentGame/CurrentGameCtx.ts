import {createContext, useContext} from "react";
import {StateSetter} from "@/lib/types.ts";

interface ICurrGameCtx {
    gameID: string,
    setGameID: StateSetter<string>,

    gameTitle: string,
    setGameTitle: StateSetter<string>

    host: string,
    setHost: StateSetter<string>

    guest: string,
    setGuest: StateSetter<string>
}

export const CurrGameCtx = createContext<ICurrGameCtx | undefined>(undefined);

/**
 * Custom hook to use the game context
 *
 * @returns {ICurrGameCtx} The game context
 */
export const useCurrGameCtx = (): ICurrGameCtx => {
    const context = useContext(CurrGameCtx);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};