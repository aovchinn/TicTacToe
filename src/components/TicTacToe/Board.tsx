import { useCallback } from "react";
import { ReactElement, useContext } from "react";
import { TicTacToeContext, TicTacToeState } from "./state/ticTacToeContext";

export const Board = () => {
    const { state } = useContext(TicTacToeContext);
    const { players } = state;
    const activeSymbol = players[players.activeId];
    console.log("render Board", activeSymbol);
    const status = `Next player: ${activeSymbol}`;
    return (
        <div className="game-board">
            <div className="board-status">{status}</div>
            <Grid />
        </div>
    );
};

const Grid = () => {
    console.log("render Grid");

    const { state } = useContext(TicTacToeContext);
    const { width, height } = state;

    const grid: ReactElement[] = [];
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const cell = <Square key={`${i};${j}`} row={i} column={j} />;
            grid.push(cell);
        }
    }

    const style: React.CSSProperties = {
        ["--board-grid-height" as string]: height,
        ["--board-grid-width" as string]: width,
    };

    return (
        <div className="board-grid" style={style}>
            {grid}
        </div>
    );
};

interface SquarePropsI {
    row: number;
    column: number;
}

const toggleCell =
    (row: number, column: number) => (state: TicTacToeState, dispatch: any) => {
        if (row < state.height && column < state.width) {
            console.log("toggleCell dispatch");
            return dispatch({
                type: "toggle",
                payload: { row, column },
            });
        }

        throw new Error(`invalid cell ${row}; ${column}`);
    };

export const Square = ({ row, column }: SquarePropsI) => {
    console.log("render Square");

    const { state, dispatch } = useContext(TicTacToeContext);
    const value = state.gridData[row][column];
    const toggle = useCallback(() => {
        console.log("clicked", { row, column });
        dispatch(toggleCell(row, column));
    }, [row, column, dispatch]);

    if (value === undefined) {
        return <button onClick={toggle}>{`${row};${column}`}</button>;
    }

    const activeSymbol = state.players[value];
    return <button>{activeSymbol}</button>;

    // const [getState, dispatch] = useContext
    // if clickable
    // onClick = dispatch(toggle(row,column))
};
