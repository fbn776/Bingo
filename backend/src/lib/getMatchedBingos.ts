import {TLocalBoardCell} from "../../../common/types";

/** The indexes of the board that will make a bingo */
const winPatternsIndex = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20]
]

/**
 * Returns the consecutive cells selected in the board (horizontal, vertical, or, diagonal)
 * @param board The array of numbers, representing the board
 * @param selected The array of objects each with a number from 1 to 25 and if selected or not. (NOTE In this order. It matters because, the check depends on this order)
 */
export default function getMatchedBingos(board: number[], selected: TLocalBoardCell[]): number[][] {
    let bingos: number[][] = [];
    for (const pattern of winPatternsIndex) {
        const isWin = pattern.every((index) => {
            return selected[board[index] - 1].selected;
        });

        if (isWin) {
            bingos.push(pattern);
        }
    }

    return bingos;
}