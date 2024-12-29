import {IInformPlayersMove, IPlayerMove} from "../../../../common/types";
import WebSocket from "ws";
import GameStore from "../store";
import sendMsg from "../../lib/utils";
import getNoOfBingos from "../../lib/getNoOfBingos";

export default function playGame(data: IPlayerMove, ws: WebSocket) {
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

    const host_noOfBingo = getNoOfBingos(game.host?.board!, game.currentState);
    const guest_noOfBingo = getNoOfBingos(game.guest?.board!, game.currentState);

    // Update the game
    GameStore.setGame(data.gameID, {
        ...game,
        host: {
            ...game.host!,
            noOfBingo: host_noOfBingo
        },
        guest: {
            ...game.guest!,
            noOfBingo: guest_noOfBingo
        }
    })

    // Send update data to HOST
    sendMsg<IInformPlayersMove>(game.host?.ws!, {
        type: 'info-move',
        selected: data.selected,
        currTurn: game.currentTurn!,
        noOfBingo: host_noOfBingo,
        playedBy: data.by
    });

    // Send update data to GUEST
    sendMsg<IInformPlayersMove>(game.guest?.ws!, {
        type: 'info-move',
        selected: data.selected,
        currTurn: game.currentTurn!,
        noOfBingo: guest_noOfBingo,
        playedBy: data.by
    });
}