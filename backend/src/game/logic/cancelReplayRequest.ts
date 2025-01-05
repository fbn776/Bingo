import {ICancelledReplay, ICancelReplay, IErrorMsg} from "../../../../common/types";
import GameStore from "../store";
import sendMsg from "../../lib/utils";

export default function cancelReplayRequest(data: ICancelReplay) {
    const game = GameStore.getGame(data.gameID);

    const otherPlayerWS = (data.by === "host" ? game?.guest?.ws : game?.host?.ws)!;
    const askedPlayerWS = (data.by === "guest" ? game?.guest?.ws : game?.host?.ws)!;

    if (!game) {
        sendMsg<IErrorMsg>(askedPlayerWS, {
            type: "error",
            msg: "No game found"
        });
        return;
    }


    sendMsg<ICancelledReplay>(otherPlayerWS, {
        type: "cancelled-replay"
    });
}