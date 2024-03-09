import mongoose from 'mongoose';

const JoinableGameSchema = new mongoose.Schema({
    gameID: String,
    player1: String,
    player2: String,
    gameName: String,
    timeLimit: String,
    increment: number,
});

JoinableGameSchema.methods.alert = function() {
    const alertMessage = this.gameName
        ? `New game created: ${this.gameName}!`
        : 'New game ceated!';
    console.log(alertMessage);
}

const JoinableGame = mongoose.model('JoinableGame', JoinableGameSchema);

module.exports = JoinableGame;