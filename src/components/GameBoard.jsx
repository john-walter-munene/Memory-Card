// GameBoard.jsx
import { shuffleUntilUnclicked } from "./utils";

// Card Component.
function SoccerCard({ cardObject, onClick }) {
    const creatorName = cardObject.caption;

    return (
        <div className="card" onClick={onClick}>
            <img src={cardObject.url} alt={`Photo by ${creatorName}`} />
            <p>{creatorName}</p>
        </div>
    );
}

// Game Board Component
function SoccerGameBoard({ soccerGIFs, scores, onSoccerPhotoCardsChange, onScoresChange, onRestartGame }) {
    if (!soccerGIFs || soccerGIFs.length === 0) return null;

    // Handle Game flow by clicking a card.
    const handleCardClick = (cardId) => {
        // Get card to work with on click.
        const copyOfSoccerGIFs = [...soccerGIFs];
        const index = copyOfSoccerGIFs.findIndex(card => card.id === cardId);
        const card = copyOfSoccerGIFs[index];

        // If Card is clicked already, restart game.
        if (card.clicked) {
            const { currentScore, bestScore } = scores;
            onScoresChange({ bestScore: Math.max(currentScore, bestScore), currentScore: 0 });
            onRestartGame();
            return;
        }

        // Update clicked card in copy of cards
        // Shuffle cards to ensure next slot of cards has at leas one unlciked card.
        // Set a ready to be rendered set of cards.
        copyOfSoccerGIFs[index] = { ...card, clicked: true };
        onSoccerPhotoCardsChange(shuffleUntilUnclicked(copyOfSoccerGIFs, 12));

        // Update scores.
        onScoresChange(prev => ({ ...prev, currentScore: scores.currentScore + 1 }));
    };

    const selectedGIFs = soccerGIFs.slice(0, 12);

    return (
        <div className="soccer-board">
            {selectedGIFs.map(card => (
                <SoccerCard key={card.id} cardObject={card} onClick={() => handleCardClick(card.id)} />
            ))}
        </div>
    );
}

export { SoccerGameBoard }