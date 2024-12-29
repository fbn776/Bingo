import {IErrorMsg, ISayBingo, IWonBingo} from "../../../../common/types";
import GameStore from "../store";
import sendMsg from "../../lib/utils";

export default function saidBingo(data: ISayBingo) {
    const game = GameStore.getGame(data.gameID);

    if(!game)
        return;

    const player = (data.by === "host" ? game.host : game.guest)!;

    console.log("SAID BY: ", data.by, "AT", Date.now());

    if(player.noOfBingo < 5 && game!.gameOver) {
        sendMsg<IErrorMsg>(player.ws!, {
            type: "error",
            msg: "Invalid move"
        })
        return;
    }

    // Set game over status
    GameStore.setGame(data.gameID, {
        ...game,
        gameOver: true,
        wonBy: data.by
    })

    console.log("WON BY:", data.by);

    // Send message to the player who said bingo
    sendMsg<IWonBingo>(player.ws!, {
        type: 'won-bingo',
        won: data.by,
        to: data.by
    })

    // Send message to the other player
    sendMsg<IWonBingo>((data.by === "guest" ? game.host : game.guest)?.ws!, {
        type: 'won-bingo',
        won: data.by,
        to: data.by === 'host' ? 'guest' : 'host'
    })
}