import { createContext } from "react";

type PlayerId = 0 | 1;
type PlayerSymbol = "X" | "O";

export interface TicTacToeState {
    players: {
        activeId: PlayerId;
        0: PlayerSymbol;
        1: PlayerSymbol;
    };
    gridData: (PlayerId | undefined)[][];
    width: number;
    height: number;
}

export const getInitialState: () => TicTacToeState = (
    height = 50,
    width = 100
) => {
    console.log("getInitialState");
    return {
        players: {
            activeId: 0,
            0: "X",
            1: "O",
        },
        gridData: Array(height)
            .fill(null)
            .map((el) => Array(width)),
        width,
        height,
    };
};

type thunkDispatch = (
    state: TicTacToeState,
    dispatch: React.Dispatch<Action>
) => void;

interface TicTacToeContextI {
    state: TicTacToeState;
    dispatch: React.Dispatch<Action | thunkDispatch>;
}

export const TicTacToeContext = createContext<TicTacToeContextI>({
    state: getInitialState(),
    dispatch: () => {
        throw new Error("dispatched early");
    },
});

export interface Action {
    type: string;
    payload: any;
}

export const ticTacToeReducer = (state: TicTacToeState, action: Action) => {
    switch (action.type) {
        case "toggle": {
            const { row, column } = action.payload;
            const newState: TicTacToeState = {
                ...state,
                gridData: [...state.gridData],
                players: { ...state.players },
            };
            newState.gridData[row][column] = state.players.activeId;
            console.log(state.players.activeId, "=>", { row, column });
            newState.players.activeId = state.players.activeId === 0 ? 1 : 0;
            return newState;
        }
        default: {
            throw new Error("he-he default ?");
        }
    }
};
