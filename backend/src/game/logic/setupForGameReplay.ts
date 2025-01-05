import {IContinueToReplay, IErrorMsg, IReplayGameAck} from "../../../../common/types";
import GameStore from "../store";
import sendMsg from "../../lib/utils";
import {DEFAULT_BOARD_STATE} from "../../lib/data";


export default function setupForGameReplay(data: IReplayGameAck) {
    const game = GameStore.getGame(data.gameID);

    const otherPlayerWS = (data.by === "host" ? game?.guest?.ws : game?.host?.ws)!;
    const askedPlayerWS = (data.by === "guest" ? game?.guest?.ws : game?.host?.ws)!;

    if(!game) {
        sendMsg<IErrorMsg>(askedPlayerWS, {
            type: "error",
            msg: "Game doesnt exists"
        })
        return
    }

    const wonBy = game.wonBy;

    // Reset the game
    GameStore.setGame(data.gameID, {
        ...game,

        host: {
            ...game.host!,
            bingos: [] as number[][],
        },

        guest: {
            ...game.guest!,
            bingos: [] as number[][]
        },
        gameOver: false,
        wonBy: undefined,
        currentTurn: wonBy,
        currentState: DEFAULT_BOARD_STATE,
    });

    sendMsg<IContinueToReplay>(otherPlayerWS, {
        type: "continue-replay",
        to: data.by === "guest" ? "host" : "guest",
        currTurn: wonBy!
    })

    sendMsg<IContinueToReplay>(askedPlayerWS, {
        type: "continue-replay",
        to: data.by,
        currTurn: wonBy!
    })
}