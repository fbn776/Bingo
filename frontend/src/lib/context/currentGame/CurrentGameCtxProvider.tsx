import {ReactNode, useState} from "react";
import {CurrGameCtx, ICurrGame} from "@/lib/context/currentGame/useCurrGameCtx.ts";
import {DEFAULT_BOARD_STATE} from "@/data/data.ts";
import {TLocalBoardCell} from "../../../../../common/types.ts";

export function CurrentGameCtxProvider({children}: {
    children: ReactNode;
}) {
    const [currCtx, setCurrCtx] = useState<ICurrGame>({
        youAre: null,
        host: '',
        gameID: '',
        gameTitle: '',
        guest: '',
        currBoardState: DEFAULT_BOARD_STATE,
        currentTurn: null,
        noOfBingo: 0,
        wonBy: null,
        bingos: [],
    });

    function setBoard(board: TLocalBoardCell[]) {
        setCurrCtx(prev => ({
            ...prev,
            currBoardState: board
        }))
    }


    return (
        <CurrGameCtx.Provider value={{...currCtx, setCurrCtx, setBoard}}>
            {children}
        </CurrGameCtx.Provider>
    );
}