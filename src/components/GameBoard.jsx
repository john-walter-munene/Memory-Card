// Individual Card item.
function SoccerCard({ cardIndex}) {
    return (<div>
        <img src="" alt={`This is image number ${cardIndex}`} />

        <p>Soccer Image {cardIndex}</p>
    </div>);
}

// Soccer game cards holder and controller.
function SoccerGameBoard() {
    const buildCards = [];

    for (let counter = 0; counter < 10; counter++) {
        buildCards.push(<SoccerCard cardIndex={counter + 1} />);
    }

    return (<div>{buildCards}</div>);
}

export { SoccerGameBoard };