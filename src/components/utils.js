// Convert photo objects to light formats for my application
function adaptGIFsToLightWeight(arrayOfGIFs) {
    return arrayOfGIFs.map(gif => {
        return {
            id: gif.id,
            url: gif.images.original.url,
            caption: getCreatorName(gif.title),
            clicked: false,
        };
    });
}

// Shuffle array items.
function shuffleArray(array) {
    let currentIndex = array.length;

    // While there are remaining elemnts to shuffle.
    while(currentIndex !== 0) {
        // Pick a remaining element.
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

// Ensure that the set of displayed cards contains an unclicked card.
function shuffleUntilUnclicked(cards, displayCount) {

    // End game at max points as user would be forced to click a clicked card, and game resets.
    if (cards.every(card => (card.clicked))) return cards;

    // Shuffle till next visible part has a card that can be clicked!
    let shuffled;
    let hasUnclicked;

    do {
        shuffled = shuffleArray(cards);
        hasUnclicked = shuffled.slice(0, displayCount).some(card => !card.clicked);
    } while (!hasUnclicked);
    
    return shuffled;
}


// Get creator names for caption/photo alt texts.
function getCreatorName(caption) {
    if (!caption || typeof caption !== "string") return "";

    // 1. Remove noise words + symbols
    caption = caption
        .replace(/sticker|gif|animated|hd/gi, "")
        .replace(/#/g, " ")
        .replace(/[^\w\s]/g, " ") 
        .replace(/\s+/g, " ")
        .trim();

    // 2. Prefer name after "by "
    const byIndex = caption.toLowerCase().lastIndexOf("by ");
    if (byIndex !== -1) {
        const rawName = caption.slice(byIndex + 3).trim();
        return enforceTwoWords(normalizeName(autoSplitName(rawName)));
    }

    // 3. Otherwise treat whole caption as candidate
    return enforceTwoWords(normalizeName(autoSplitName(caption)));
}

function autoSplitName(text) {
    if (!text) return "";

    // Split CamelCase
    let split = text.replace(/([a-z0-9])([A-Z])/g, "$1 $2");

    // Handle glued lowercase strings like "mcdonaldsjordan"
    if (!/\s/.test(split)) {
        // Try splitting between word-like segments
        split = split.replace(/([a-z]+)([A-Z][a-z]+)/g, "$1 $2");
        split = split.replace(/([a-z]+)([a-z]{3,})$/, "$1 $2");
    }

    return split.replace(/\s+/g, " ").trim();
}


// Capitalizes properly
function normalizeName(name) {
    return name
        .split(/\s+/)
        .map(word => {
            if (word.length <= 2) return word.toUpperCase(); 
            return word[0].toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(" ");
}


// Always enforce exactly two words
function enforceTwoWords(name) {
    const words = name.split(/\s+/);

    if (words.length === 0) return "";
    if (words.length === 1) return words[0];

    return words.slice(0, 2).join(" ");
}

export { adaptGIFsToLightWeight, shuffleArray, shuffleUntilUnclicked };