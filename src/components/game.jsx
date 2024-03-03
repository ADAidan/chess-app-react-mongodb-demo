import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
            isBot: true,
        }
    });

    const randomMoveDelay = 1000;
    const playerColor = playerData.player.color;

    //makes the first move in the premove queue
    useEffect(() => {
        if (premoves[playerColor]) {
            //first move in queue
            const move = premoves[playerColor][0];
            if (move && game.turn() === playerColor) {
                //removes the highlighted premove
                setPremoveSquares(prevPremoveSquares => {
                    const premoveSquares = { ...prevPremoveSquares };
                    delete premoveSquares[move.from];
                    delete premoveSquares[move.to];
                    return premoveSquares;
                });
                //makes the move and removes it from the queue
                const premove = makeAMove(move, game.fen());
                if(premove) {
                    setPremoves(prevPremoves => {
                        const premoves = { ...prevPremoves };
                        premoves[playerColor].shift();
                        return premoves;
                    });
                };
            }
        }
    }, [game]);

    //highlights the premoves
    useEffect(() => {
        const color = "rgba(235, 97, 80, .8)";
        premoves[playerColor].map((move) => {
            setPremoveSquares(prevPremoveSquares => {
                const premoveSquares = { ...prevPremoveSquares };
                premoveSquares[move.from] = { backgroundColor: color}
                premoveSquares[move.to] = { backgroundColor: color}
                return premoveSquares;
            });
        });
    }, [premoves]);

    //hightlights the last move made in the game
    useEffect(() => {
        const color = "rgba(255, 255, 51, 0.5)";
        setHighlightedSquares({
            [lastMove.from]: { backgroundColor: color },
            [lastMove.to]: { backgroundColor: color },
        });
    }, [lastMove]);

    function makeAMove(move, fen) {
        //creates a copy of the game to mutate
        const gameCopy = new Chess(fen);
        try {
            const result = gameCopy.move(move);
            //checks if the game is over
            if (result) {
                const newGame = new Chess(result.after);
                if (newGame.isGameOver()) {
                    gameOver(newGame);
                }
            }
            //makes a random move for the bot
            if (playerData.opponent.isBot) {
                setTimeout(() => {
                    makeRandomMove(gameCopy);
                }, randomMoveDelay);
            };
            const highlightMove = { 
                'from' : result.from,
                'to' : result.to,
            };
            //adds the moves san to the move history
            setMoveHistory(moveHistory => [...moveHistory, result.san]);
            setGame(gameCopy);
            setLastMove(highlightMove);
            return result;
        } catch (error) {
            //displays the error in the console
            console.log('encountered error:', error);
            setPremoveSquares({});
            setPremoves({ 
                'w': [], 
                'b': [] 
            });
            return false;
        }
    }

    function makeRandomMove(newGame) {
        //checks if it is the bots turn and makes a random move
        if(playerData.opponent.isBot && newGame.turn() === playerData.opponent.color) {
            const possibleMoves = newGame.moves();
            const randomIndex = Math.floor(Math.random() * possibleMoves.length);
            const randomMove = possibleMoves[randomIndex];
            makeAMove(randomMove, newGame.fen());
        }
    }

    function onSquareRightClick(square) {
        //clear premoves after right clicking the board
        if (premoves[playerColor].length ?? premoveSquares) {
            setPremoveSquares({});
            setPremoves({ 
                'w': [], 
                'b': [] 
            });
            return;
        }
        //highlight the square that was right clicked
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
        // check if the piece is the right color
        if (piece[0] !== game.turn()) {
            //adds a premove to the queue
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

        //illegal move will be false
        //legal move will be the move object
        return move;
    }

    //clear the right clicked squares when a square is clicked or dragged
    const onSquareClick = () => {
        setRightClickedSquares({});
    };

    const onPieceDragBegin = () => {
        setRightClickedSquares({});
    };

    return (
        <div className='game-container'>
            <div className='home-button-container'>
                <Link to='/lobby'>Chess</Link>
            </div>
            <div className='chessboard-container'>
                <div>{playerData.opponent.name ?? 'Opponent'} {playerData.opponent.elo ? `(${playerData.opponent.elo})` : ''}</div>
                <Chessboard 
                position={game.fen()} 
                boardOrientation={playerData.player.color === 'w' ? 'white' : 'black'}
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