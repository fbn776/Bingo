import {IErrorMsg, IReaction} from "../../../../common/types";
import GameStore from "../store";
import sendMsg from "../../lib/utils";

export default function sendReaction(data: IReaction) {
    const game = GameStore.getGame(data.gameID);
    const otherPlayerWS = (data.by === "host" ? game?.guest?.ws : game?.host?.ws)!;

    if(!game) {
        sendMsg<IErrorMsg>(otherPlayerWS, {
            type: 'error',
            msg: "Game doesn't exists"
        })
        return;
    }

    sendMsg<IReaction>(otherPlayerWS, {
        type: 'reaction',
        emoji: data.emoji,
        gameID: data.gameID,
        by: data.by
    });
}