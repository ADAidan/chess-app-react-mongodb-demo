const gameOver = (gameEnd) => {
    switch (true) {
        case gameEnd.isCheckmate():
            console.log('checkmate');
            break;
        case gameEnd.isDraw():
            console.log('draw');
            break;
        case gameEnd.isStalemate():
            console.log('stalemate');
            break;
        case gameEnd.isThreefoldRepetition():
            console.log('threefold repetition');
            break;
        case gameEnd.isInsufficientMaterial():
            console.log('insufficient material');
            break;
        default:
            console.log('game over');
    }
};

export default gameOver;