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
    const [premoves, setPremoves] = useState({ 
        'w': [], 
        'b': [] 
    });
    const [playerData, setPlayerData] = useState({
        player: 'Player',
        playerElo: '1000',
        opponent: 'Opponent',
        opponentElo: '1000',
    });

    useEffect(() => {
        console.log('turn:', game.turn());
        console.log('premoves', premoves);
        if (premoves[game.turn()]) {
            console.log(premoves[game.turn()]);
            const move = premoves[game.turn()].shift();
            console.log('premove', move)
            makeAMove(move, game.fen());
        }
    }, [game]);

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
        if(newGame.turn() === 'b') {
            const possibleMoves = newGame.moves();
            const randomIndex = Math.floor(Math.random() * possibleMoves.length);
            const randomMove = possibleMoves[randomIndex];
            makeAMove(randomMove, newGame.fen());
            setMoveHistory(moveHistory => [...moveHistory, randomMove]);
        }
    }

    const onSquareClick = () => {
        setRightClickedSquares({});
    };

    const onPieceDragBegin = () => {
        setRightClickedSquares({});
    };

    function onSquareRightClick(square) {
        const color = "rgba(235, 97, 80, .8)";
        setRightClickedSquares({
          ...rightClickedSquares,
          [square]:
            rightClickedSquares[square] &&
            rightClickedSquares[square].backgroundColor === colour
              ? undefined
              : { backgroundColor: color },
        });
    }

    function onDrop(sourceSquare, targetSquare, piece) {
        if (piece[0] !== game.turn()) {
            console.log('color:', piece[0]);
            setPremoves(prevPremoves => {
                const newArray = [...prevPremoves[piece[0]]];
                console.log('newArray:', newArray);
                
                newArray.push({
                    from: sourceSquare,
                    to: targetSquare,
                    promotion: piece[1].toLowerCase() ?? "q",
                });
                console.log('newArray after push:', newArray);

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

        console.log(move)

        // illegal move
        if (!move) return false;

        //legal move
        if (move.color === 'w') {
            setMoveHistory(moveHistory => [...moveHistory, move.san]);
            const newGame = new Chess(move.after);
            if (newGame.isGameOver()) {
                gameOver(newGame);
                return;
            } else {
                setTimeout(() => makeRandomMove(newGame), 2500);
                return true;
            }
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
                onSquareRightClick={onSquareRightClick}
                onSquareClick={onSquareClick}
                customSquareStyles={{
                    ...rightClickedSquares,
                }}
                promotionDialogVariant='vertical'
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