import {ReactNode, useState} from "react";
import {CurrGameCtx, ICurrGame} from "@/lib/context/currentGame/useCurrGameCtx.ts";

export function CurrentGameCtxProvider({children}: {
    children: ReactNode;
}) {
    const [currCtx, setCurrCtx] = useState<ICurrGame>({
        youAre: null,
        host: '',
        gameID: '',
        gameTitle: '',
        guest: '',
    });

    return (
        <CurrGameCtx.Provider value={{...currCtx, setCurrCtx}}>
            {children}
        </CurrGameCtx.Provider>
    );
}