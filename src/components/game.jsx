import React, { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import MoveHistory from './move-history';
import { ResignButton, DrawButton } from './buttons';
import gameOver from '../utils/gameOver';
import './game.css';

const ChessGame = () => {
    const [game, setGame] = useState(new Chess('r1bqk2r/p1ppp1Pp/1p5n/4Pp2/8/1P6/1PPP1P1P/RNB1KBNR w KQkq - 0 10'));
    const [moveHistory, setMoveHistory] = useState([]);
    const [moveFrom, setMoveFrom] = useState("");
    const [moveTo, setMoveTo] = useState("");
    const [rightClickedSquares, setRightClickedSquares] = useState({});
    const [optionSquares, setOptionSquares] = useState({});
    const [playerData, setPlayerData] = useState({
        player: 'Player',
        playerElo: '1000',
        opponent: 'Opponent',
        opponentElo: '1000',
    });

    /* useEffect(() => {
        console.log('moveHistory', moveHistory);
    }, [moveHistory]); */

    function makeAMove(move, fen) {
        const gameCopy = new Chess(fen);
        try {
            const result = gameCopy.move(move);
            setGame(gameCopy);
            return result;
        } catch (error) {
            console.log('encountered error:', error);
        }
        return false;
    }

    function makeRandomMove(newGame) {
        // console.log('makeRandomMove called')

        if(newGame.turn() === 'b') {
            // console.log('making random move')
            const possibleMoves = newGame.moves();
            const randomIndex = Math.floor(Math.random() * possibleMoves.length);
            const randomMove = possibleMoves[randomIndex];
            makeAMove(randomMove, newGame.fen());
            setMoveHistory(moveHistory => [...moveHistory, randomMove]);
        }
    }

    function getMoveOptions(square) {
        const moves = game.moves({
          square,
          verbose: true,
        });
        if (moves.length === 0) {
          return false;
        }
    
        const newSquares = {};
        moves.map((move) => {
          newSquares[move.to] = {
            background:
              game.get(move.to) && game.get(move.to).color !== game.get(square).color
                ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
                : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
            borderRadius: "50%",
          };
          return move;
        });
        newSquares[square] = {
          background: "rgba(255, 255, 0, 0.4)",
        };
        setOptionSquares(newSquares);
        return true;
    }

    function onSquareClick(square) {
        console.log('clicked square', square)
        setRightClickedSquares({});
        let move;

        function resetFirstMove(square) {
            const hasOptions = getMoveOptions(square);
            if (hasOptions) {
                setMoveFrom(square)
            } else {
                setMoveFrom("")
                setOptionSquares({})
            };
        }

        if (!moveFrom) {
            resetFirstMove(square);
            return;
        }

        if (square in optionSquares) {
            // make a function for this
            move = makeAMove({
                from: moveFrom,
                to: square,
                promotion: "q", // always promote to a queen for example simplicity
            }, game.fen());
        }

        // check if the move is legal
        if (!move) {
            resetFirstMove(square);
            return false;
        }
        
        setMoveFrom("");
        setOptionSquares({});
        setMoveHistory(moveHistory => [...moveHistory, move.san]);
        const newGame = new Chess(move.after);
        if (newGame.isGameOver()) {
            gameOver(newGame);
            return;
        } else {
            setTimeout(() => makeRandomMove(newGame), 1000);
            return true;
        }
    };

    function onSquareRightClick(square) {
        const colour = "rgba(235, 97, 80, .8)";
        setRightClickedSquares({
          ...rightClickedSquares,
          [square]:
            rightClickedSquares[square] &&
            rightClickedSquares[square].backgroundColor === colour
              ? undefined
              : { backgroundColor: colour },
        });
    }

    const onPieceClick = (piece) => {
        console.log('clicked piece', piece)
    };

    const onPieceDragBegin = (piece, square) => {
        console.log('dragging', piece, square)
    };

    const onPieceDragEnd = (piece, square) => {
        console.log('dragged', piece, square)
    };

    function onDrop(sourceSquare, targetSquare, piece) {
        console.log('dropped', sourceSquare, targetSquare)
        const move = makeAMove({
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1].toLowerCase() ?? "q",
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

    return (
        <div className='game-container'>
            <div className='chessboard-container'>
                <div>{playerData.opponent ?? 'Opponent'} {playerData.opponentElo ? `(${playerData.opponentElo})` : ''}</div>
                <Chessboard 
                position={game.fen()} 
                onPieceDrop={onDrop} 
                onPieceDragBegin={onPieceDragBegin}
                onPieceDragEnd={onPieceDragEnd}
                onPieceClick={onPieceClick}
                onSquareClick={onSquareClick}
                onSquareRightClick={onSquareRightClick}
                onPromotionPieceSelect={() => {console.log('promote')}}
                customSquareStyles={{
                    ...optionSquares,
                    ...rightClickedSquares,
                }}
                id='BasicBoard'/>
                <div>{playerData.player ?? 'Player' } {playerData.playerElo ? `(${playerData.playerElo})` : ''}</div>
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