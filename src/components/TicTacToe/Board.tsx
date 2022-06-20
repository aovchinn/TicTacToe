import { ReactElement, useState } from "react";

interface BoardPropsI {
    width: number;
    height: number;
}

export const Board = ({ width, height }: BoardPropsI) => {
    const [status] = useState("Next player: X");

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
        <div className="game-board">
            <div className="board-status">{status}</div>
            <div className="board-grid" style={style}>
                {grid}
            </div>
        </div>
    );
};

interface SquarePropsI {
    row: number;
    column: number;
}

export const Square = ({ row, column }: SquarePropsI) => {
    // use myRedux

    return <button>{`${row};${column}`}</button>;
};
