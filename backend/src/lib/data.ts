import {TLocalBoardCell} from "../../../common/types";

export const DEFAULT_BOARD_STATE: TLocalBoardCell[] = Array.from({length: 25}).map((_, i) => ({num: i + 1, selected: false}));