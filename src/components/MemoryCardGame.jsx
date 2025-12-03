// Imports in the order: Third party libraries, React Tools, utilities, App specific components.
import { GiphyFetch } from "@giphy/js-fetch-api";
import { useState, useEffect } from "react";
import { adaptGIFsToLightWeight } from './utils';
import { GameHeader } from "./Header";
import { SoccerGameBoard } from "./GameBoard";

function SoccerMemoryCardGameHouse () {
    const [soccerPhotoCards, setSoccerPhotoCards] = useState([]);
    const [scores, setScores] = useState({ currentScore: 0, bestScore: 0 });
    // const [restartFlag, setRestartFlag] = useState(false);
    typeof setScores; 

    useEffect(() => {
        let ignore = false;

        // Fetch Giphy scoccer images.
        async function fetchGIFs() {
            const gifAPI = new GiphyFetch('cdV83dbgRL2VFc2iNoBozLAQFezGJQY6');
            const { data: soccerGIFs } = await gifAPI.search('american soccer', { limit: 30, type: 'stickers'});

            if (!ignore && soccerGIFs) {
                const lightSoccerGIFs = adaptGIFsToLightWeight(soccerGIFs);
                setSoccerPhotoCards(lightSoccerGIFs);
            }
        }

        fetchGIFs();

        return () => { ignore = true };
    }, []);

    return (
        <div className="soccer-memory-house">
            <GameHeader scores={scores} />
            <SoccerGameBoard soccerGIFs={soccerPhotoCards} />
        </div>);
}

export { SoccerMemoryCardGameHouse};