import React, { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import MoveHistory from './move-history';
import { ResignButton, DrawButton } from './buttons';
import gameOver from '../utils/gameOver';
import './game.css';

const ChessGame = () => {
    const [game, setGame] = useState(new Chess());
    const [moveHistory, setMoveHistory] = useState([]);
    const [rightClickedSquares, setRightClickedSquares] = useState({});
    const [premoveSquares, setPremoveSquares] = useState({});
    const [highlightedSquares, setHighlightedSquares] = useState({});
    const [lastMove, setLastMove] = useState({});
    const [premoves, setPremoves] = useState({ 
        'w': [], 
        'b': [] 
    });
    const [playerData, setPlayerData] = useState({
        player: {
            name: 'Player',
            elo: '1000',
            color: 'w',
        },
        opponent: {
            name: 'Opponent',
            elo: '1000',
            color: 'b',
        }
    });

    useEffect(() => {
        if (premoves['w']) {
            const move = premoves['w'][0];
            if (move && game.turn() === 'w') {
                setPremoveSquares(prevPremoveSquares => {
                    const premoveSquares = { ...prevPremoveSquares };
                    delete premoveSquares[move.from];
                    delete premoveSquares[move.to];
                    return premoveSquares;
                });
                const premove = makeAMove(move, game.fen());
                if(premove) {
                    premoves['w'].shift();
                };
            }
        }
    }, [game]);

    useEffect(() => {
        const color = "rgba(235, 97, 80, .8)";
        premoves['w'].map((move, index) => {
            setPremoveSquares(prevPremoveSquares => {
                const premoveSquares = { ...prevPremoveSquares };
                premoveSquares[move.from] = { backgroundColor: color}
                premoveSquares[move.to] = { backgroundColor: color}
                return premoveSquares;
            });
        });
    }, [premoves]);

    function makeAMove(move, fen, san) {
        const gameCopy = new Chess(fen);
        try {
            const result = gameCopy.move(move);
            const highlightMove = { 
                'from' : result.from,
                'to' : result.to,
            };
            console.log('move:', move)
            setMoveHistory(moveHistory => [...moveHistory, result.san]);
            setGame(gameCopy);
            setLastMove(highlightMove);
            highlightLastMove(highlightMove);
            return result;
        } catch (error) {
            console.log('encountered error:', error);
        }
        return false;
    }

    function makeRandomMove(newGame) {
        if(newGame.turn() === 'b') {
            const possibleMoves = newGame.moves();
            const randomIndex = Math.floor(Math.random() * possibleMoves.length);
            const randomMove = possibleMoves[randomIndex];
            makeAMove(randomMove, newGame.fen());
        }
    }

    const onSquareClick = (square) => {
        setRightClickedSquares({});
    };

    const onPieceDragBegin = (piece, square) => {
        setRightClickedSquares({});
    };

    const highlightLastMove = (move) => {
        const color = "rgba(255, 255, 51, 0.5)";
        if (lastMove) {
            const sourceSquare = move.from;
            const targetSquare = move.to;
            setHighlightedSquares({
                [sourceSquare]: { backgroundColor: color },
                [targetSquare]: { backgroundColor: color },
            });
        }
    };

    function onSquareRightClick(square) {
        if (premoves['w'].length) {
            console.log('premoves:', premoves['w'], premoves)
            setPremoveSquares({});
            setPremoves({ 
                'w': [], 
                'b': [] 
            });
            return;
        }
        const color = "rgba(235, 97, 80, .8)";
        setRightClickedSquares({
          ...rightClickedSquares,
          [square]:
            rightClickedSquares[square] &&
            rightClickedSquares[square].backgroundColor === color
              ? undefined
              : { backgroundColor: color },
        });
    }

    function onDrop(sourceSquare, targetSquare, piece) {
        if (piece[0] !== game.turn()) {
            setPremoves(prevPremoves => {
                const newArray = [...prevPremoves[piece[0]]];
                
                newArray.push({
                    from: sourceSquare,
                    to: targetSquare,
                    promotion: piece[1].toLowerCase() ?? "q",
                });

                return {
                    ...prevPremoves,
                    [piece[0]]: newArray,
                }
            });
            return;
        };
        const move = makeAMove({
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1].toLowerCase() ?? "q",
        }, game.fen());

        // illegal move
        if (!move) return false;

        //legal move
        if (move.color === 'w') {
            const newGame = new Chess(move.after);
            if (newGame.isGameOver()) {
                gameOver(newGame);
                return;
            } else {
                setTimeout(() => makeRandomMove(newGame), 1000);
                return true;
            }
        }
    }

    return (
        <div className='game-container'>
            <div className='chessboard-container'>
                <div>{playerData.opponent.name ?? 'Opponent'} {playerData.opponent.elo ? `(${playerData.opponent.elo})` : ''}</div>
                <Chessboard 
                position={game.fen()} 
                onPieceDrop={onDrop} 
                onPieceDragBegin={onPieceDragBegin}
                onSquareRightClick={onSquareRightClick}
                onSquareClick={onSquareClick}
                customSquareStyles={{
                    ...premoveSquares,
                    ...rightClickedSquares,
                    ...highlightedSquares,
                }}
                promotionDialogVariant='vertical'
                id='BasicBoard'/>
                <div>{playerData.player.name ?? 'Player' } {playerData.player.elo ? `(${playerData.player.elo})` : ''}</div>
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