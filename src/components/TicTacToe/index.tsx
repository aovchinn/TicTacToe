import { Game } from "./Game";

import "./ticTacToe.css";

export const TicTacToe = () => (
    <>
        <h2>Tic Tac Toe</h2>
        <div className="tic-tac-toe-content">
            <Game />
        </div>
    </>
);
