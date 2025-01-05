import {IAskForReplay, IErrorMsg, IReplayGame} from "../../../../common/types";
import GameStore from "../store";
import sendMsg from "../../lib/utils";


export default function askForReplay(data: IReplayGame) {
    const game = GameStore.getGame(data.gameID);

    const askedPlayerWS = (data.by === "guest" ? game?.guest?.ws : game?.host?.ws)!;
    const otherPlayerWS = (data.by === "host" ? game?.guest?.ws : game?.host?.ws)!;

    if(!game) {
        sendMsg<IErrorMsg>(askedPlayerWS, {
            type: "error",
            msg: "Game doesn't exists"
        });
        return
    }


    sendMsg<IAskForReplay>(otherPlayerWS, {
        type: "ask-for-replay",
        by: data.by
    });
}