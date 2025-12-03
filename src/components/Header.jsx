function GameHeader({ scores }) {
    const { currentScore, bestScore } = scores;
    return (
        <div className="game-header">
            <div className="title-section">
                <h1>Soccer Memory Game</h1>
                <p>Get points by clicking images — but never click the same one twice!</p>
            </div>

            <div className="score-section">
                <h3>Score: {currentScore}</h3>
                <h3>Best Score: {bestScore}</h3>
            </div>
        </div>
    )
}

export { GameHeader };