import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './game-card.css';

const GameCard = ({gameData}) => {
	const [player1, setPlayer1] = useState();
	const [player2, setPlayer2] = useState();

	useEffect(() => {
		if (!gameData) return;
		if (!gameData.player1) return;

		const fetchPlayer1Data = async () => {
			const playerData = await getPlayerData(gameData.player1);
			setPlayer1(playerData);
		};

		fetchPlayer1Data();

		if (!gameData.player2) return;

		const fetchPlayer2Data = async () => {
			const playerData = await getPlayerData(gameData.player2);
			setPlayer2(playerData);
		};

		fetchPlayer2Data();
	}, []);

	const getPlayerData = async (username) => {
        const response = await fetch(`http://localhost:3000/users/${username}`);
        const data = await response.json();

		if (!data.user) return;

		const player = {
			name: data.user.username,
			elo: data.user.elo,
		};

		return player;
    }

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
						<p>{player1 && `${player1.name} - ${player1.elo}`}</p>
						<p>{player2 && `${player2.name} - ${player2.elo}`}</p>
					</div>
				</div>
			</div>
		</>
	)
};

export default GameCard;