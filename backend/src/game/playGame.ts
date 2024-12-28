import {IInformOtherPlayersMove, IPlayerMove} from "../../../common/types";
import WebSocket from "ws";
import GameStore from "./store";
import sendMsg from "../lib/utils";

export default function playGame(data: IPlayerMove, ws: WebSocket) {
    const game = GameStore.getGame(data.gameID);

    if(!game)
        return;

    const currState = game.currentState;
    GameStore.setGame(data.gameID, {
        ...game,
        currentState: currState.map((item) => {
            if(item.num === data.selected)
                return {
                    num: item.num,
                    selected: true
                }

            return item
        })
    });

    sendMsg<IInformOtherPlayersMove>((data.by === "guest" ? game.host?.ws : game.guest?.ws)!, {
        type: 'info-move',
        selected: data.selected
    });

    console.log(data);
}