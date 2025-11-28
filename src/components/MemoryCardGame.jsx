import { GameHeader } from "./Header";
import { SoccerGameBoard } from "./GameBoard";

function SoccerMemoryCardGameHouse () {
    return (<div className="soccer-memory-house">
        <GameHeader />
        <SoccerGameBoard />
    </div>);
}

export { SoccerMemoryCardGameHouse};