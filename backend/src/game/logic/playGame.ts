import {IInformPlayersMove, IPlayerMove} from "../../../../common/types";
import WebSocket from "ws";
import GameStore from "../store";
import sendMsg from "../../lib/utils";
import getMatchedBingos from "../../lib/getMatchedBingos";

export default function playGame(data: IPlayerMove) {
    let game = GameStore.getGame(data.gameID);

    if (!game)
        return;

    const currState = game.currentState;
    GameStore.setGame(data.gameID, {
        ...game,
        currentTurn: game.currentTurn === "guest" ? "host" : "guest",
        currentState: currState.map((item) => {
            if (item.num === data.selected)
                return {
                    num: item.num,
                    selected: true
                }
            return item
        })
    });

    game = GameStore.getGame(data.gameID)!;

    const host_bingos = getMatchedBingos(game.host?.board!, game.currentState);
    const guest_bingos = getMatchedBingos(game.guest?.board!, game.currentState);

    // Update the game
    GameStore.setGame(data.gameID, {
        ...game,
        host: {
            ...game.host!,
            bingos: host_bingos
        },
        guest: {
            ...game.guest!,
            bingos: guest_bingos,
        }
    })

    // Send update data to HOST
    sendMsg<IInformPlayersMove>(game.host?.ws!, {
        type: 'info-move',
        selected: data.selected,
        currTurn: game.currentTurn!,
        bingos: host_bingos,
        playedBy: data.by
    });

    // Send update data to GUEST
    sendMsg<IInformPlayersMove>(game.guest?.ws!, {
        type: 'info-move',
        selected: data.selected,
        currTurn: game.currentTurn!,
        bingos: guest_bingos,
        playedBy: data.by
    });
}