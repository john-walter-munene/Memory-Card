import { shuffleArray, getCreatorName } from "./utils";

// Individual Card item.
function SoccerCard({ cardObject }) {
    const creatorName = getCreatorName(cardObject.caption);

    return (
        <div className="card">
            <img src={cardObject.url} alt={`Photo by ${creatorName}`} />
            <p>{creatorName}</p>
        </div>
    );
}

function SoccerGameBoard({ soccerGIFs }) {
    if (!soccerGIFs || soccerGIFs.length === 0) return null;

    
    // Purely rendering logic.
    const uniqueGIFsMap = new Map();
    soccerGIFs.forEach(gif => {
        if (!uniqueGIFsMap.has(gif.id)) uniqueGIFsMap.set(gif.id, gif);
    });

    const uniqueGIFs = Array.from(uniqueGIFsMap.values());
    const shuffled = shuffleArray(uniqueGIFs.slice());
    const selectedGIFs = shuffled.slice(0, 12);

    return (
        <div className="soccer-board">
            {selectedGIFs.map(card => (<SoccerCard key={card.id} cardObject={card} />))}
        </div>
    );
}

export { SoccerGameBoard };