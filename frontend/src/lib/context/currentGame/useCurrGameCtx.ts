import {createContext, useContext} from "react";
import {StateSetter} from "@/lib/types.ts";

export interface ICurrGame {
    youAre: "guest" | "host" | null,
    gameID: string,
    gameTitle: string,
    host: string,
    guest: string,
}

interface ICurrGameCtx extends ICurrGame {
    setCurrCtx: StateSetter<ICurrGame>,
}

export const CurrGameCtx = createContext<ICurrGameCtx | undefined>(undefined);

/**
 * Custom hook to use the game context
 *
 * @returns {ICurrGameCtx} The game context
 */
const useCurrGameCtx = (): ICurrGameCtx => {
    const context = useContext(CurrGameCtx);
    if (!context) {
        throw new Error("use ctx must be used within the ctx provider");
    }
    return context;
};

export default useCurrGameCtx;