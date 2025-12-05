// Imports in the order: Third party libraries, React Tools, utilities, App specific components.
import { GiphyFetch } from "@giphy/js-fetch-api";
import { useState, useEffect } from "react";
import { adaptGIFsToLightWeight, shuffleArray } from "./utils";
import { GameHeader } from "./Header";
import { SoccerGameBoard } from "./GameBoard";

function SoccerMemoryCardGameHouse() {
    const [soccerPhotoCards, setSoccerPhotoCards] = useState([]);
    const [scores, setScores] = useState({ currentScore: 0, bestScore: 0 });

    // Fetch cards on load
    useEffect(() => {
        let ignore = false;

        async function fetchGIFs() {
            const gifAPI = new GiphyFetch("cdV83dbgRL2VFc2iNoBozLAQFezGJQY6");
            const { data: soccerGIFs } = await gifAPI.search("soccer", { limit: 50, type: "stickers", });

            if (!ignore && soccerGIFs) {
                const lightSoccerGIFs = adaptGIFsToLightWeight(soccerGIFs);
                const uniqueMap = new Map();
                lightSoccerGIFs.forEach((gif) => {
                    if (!uniqueMap.has(gif.caption)) uniqueMap.set(gif.caption, gif);
                });

                const uniqueLightSoccerGIFs = Array.from(uniqueMap.values());
                setSoccerPhotoCards(shuffleArray(uniqueLightSoccerGIFs));
            }
        }

        fetchGIFs();
    
        return () => { ignore = true; };
    }, []);

    // Restart Handler
    const handleRestart = () => {
        setSoccerPhotoCards((prev) =>
        shuffleArray(prev.map((card) => ({ ...card, clicked: false }))));
        setScores((prev) => ({ ...prev, currentScore: 0 }));
    };

    return (
        <div className="soccer-memory-house">
            <GameHeader scores={scores} />
            <SoccerGameBoard soccerGIFs={soccerPhotoCards} scores={scores} onSoccerPhotoCardsChange={setSoccerPhotoCards}
                onScoresChange={setScores} onRestartGame={handleRestart} />
        </div>
    );
}

export { SoccerMemoryCardGameHouse };