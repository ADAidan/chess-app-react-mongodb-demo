import React, { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import MoveHistory from './move-history';
import { ResignButton, DrawButton } from './buttons';
import './game.css';

const ChessGame = () => {
    const [game, setGame] = useState(new Chess());
    const [moveHistory, setMoveHistory] = useState([]);

    useEffect(() => {
        console.log('moveHistory', moveHistory);
    }, [moveHistory]);

    function makeAMove(move, fen) {
        const gameCopy = new Chess(fen);
        const result = gameCopy.move(move);
        setGame(gameCopy);
        return result; // null if the move was illegal, the move object if the move was legal
    }

    function makeRandomMove(newGame) {
        console.log('makeRandomMove called')

        if(newGame.turn() === 'b') {
            console.log('making random move')
            const possibleMoves = newGame.moves();
            const randomIndex = Math.floor(Math.random() * possibleMoves.length);
            const randomMove = possibleMoves[randomIndex];
            makeAMove(randomMove, newGame.fen());
            setMoveHistory(moveHistory => [...moveHistory, randomMove]);
        }
    }

    function onClick(square) {
        
    };

    function onDrop(sourceSquare, targetSquare) {
        const move = makeAMove({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // always promote to a queen for example simplicity
        }, game.fen());

        console.log(move)

        // illegal move
        if (move === null) return false;
        setMoveHistory(moveHistory => [...moveHistory, move.san]);
        const newGame = new Chess(move.after);
        if (newGame.isGameOver()) {
            gameOver(newGame);
            return;
        } else {
            setTimeout(() => makeRandomMove(newGame), 1000);
            return true;
        }
    }

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

    return (
        <div className='game-container'>
            <div className='chessboard-container'>
                <div>Opponent</div>
                <Chessboard 
                position={game.fen()} 
                onPieceClick={onClick}
                onPieceDrop={onDrop} 
                id='BasicBoard'/>
                <div>Player</div>
            </div>
            <div className='sidebar-container'>
                <MoveHistory history={moveHistory}/>
                <div className='buttons'>
                    <ResignButton />
                    <DrawButton />
                </div>
            </div>
        </div>
    );
};

export default ChessGame;