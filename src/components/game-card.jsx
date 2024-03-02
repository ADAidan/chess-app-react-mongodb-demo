import React from "react";
import { Link } from 'react-router-dom';
import './game-card.css';

const GameCard = ({gameData}) => {
	const p1 = gameData.players.player1;
	const p2 = gameData.players.player2;

	return (
		<>
			<div className='game-card'>
				<div className='game-card-details' style={{
					flex: 1.25,
				}}>
					<div className='game-card-header'>
						<h2>{gameData.gameName}</h2>
					</div>
					<div className='game-card-rules'>
						<p>Time Limit: {gameData.timeLimit}</p>
						<p>Increment: {gameData.increment}s</p>
					</div>
					<div className='game-card-button'>
						<Link to='/chess'>Join Game</Link>
				</div>
				</div>
				<div className='game-card-details' style={{
					flex: 1,
				}}>
					<div className='game-card-header'>
						<h2>Players</h2>
					</div>
					<div className='game-card-players'>
						<p>{p1 && `${p1.name} - ${p1.elo}`}</p>
						<p>{p2 && `${p2.name} - ${p2.elo}`}</p>
					</div>
				</div>
			</div>
		</>
	)
};

export default GameCard;