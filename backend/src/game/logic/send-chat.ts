import {IChatMsg, IErrorMsg} from "../../../../common/types";
import GameStore from "../store";
import sendMsg from "../../lib/utils";

export default function sendChat(data: IChatMsg) {
    const game = GameStore.getGame(data.gameID);
    const otherPlayerWS = (data.by === "host" ? game?.guest?.ws : game?.host?.ws)!;

    if(!game) {
        sendMsg<IErrorMsg>(otherPlayerWS, {
            type: 'error',
            msg: "Game doesn't exists"
        })
        return;
    }

    sendMsg<IChatMsg>(otherPlayerWS, {
        type: 'chat',
        gameID: data.gameID,
        by: data.by,
        message: data.message
    });
}