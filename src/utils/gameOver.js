const gameOver = (gameEnd) => {
    switch (true) {
        case gameEnd === 'resign':
            console.log('resign');
            break;
        case gameEnd === 'draw agreed':
            console.log('draw agreed');
            break;
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