import {ReactNode, useState} from "react";
import {CurrGameCtx} from "@/lib/context/currentGame/CurrentGameCtx.ts";


export function CurrentGameCtxProvider({children}: {
    children: ReactNode;
}) {
    const [host, setHost] = useState('');
    const [gameID, setGameID] = useState('');
    const [gameTitle, setGameTitle] = useState('');
    const [guest, setGuest] = useState('');


    return (
        <CurrGameCtx.Provider value={{
            host, setHost,
            gameID, setGameID,
            gameTitle, setGameTitle,
            guest, setGuest
        }}>
            {children}
        </CurrGameCtx.Provider>
    );
}