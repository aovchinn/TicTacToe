import { useCallback, useReducer } from "react";

import { Board } from "./Board";
import {
    TicTacToeContext,
    ticTacToeReducer,
    getInitialState,
    Action,
} from "./state/ticTacToeContext";

export const Game = () => {
    const [state, regularDispatch] = useReducer(
        ticTacToeReducer,
        undefined,
        getInitialState
    );

    const dispatchThunk = useCallback(
        (action: Action | Function) => {
            if (typeof action === "function") {
                console.log("game: dispatch got function");
                action(state, regularDispatch);
            } else {
                console.log("game: dispatching regular action");
                regularDispatch(action);
            }
        },
        [state] //always recreated ? getState ?
    );

    console.log("render Game");
    return (
        <TicTacToeContext.Provider value={{ state, dispatch: dispatchThunk }}>
            <Board />
        </TicTacToeContext.Provider>
    );
};
