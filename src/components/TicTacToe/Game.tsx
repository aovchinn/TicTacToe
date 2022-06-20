import { Board } from "./Board";

export const Game = () => {
    return (
        <div className="game">
            <Board height={10} width={15} />
            <div className="game-info">
                <div className=""></div>
            </div>
        </div>
    );
};
