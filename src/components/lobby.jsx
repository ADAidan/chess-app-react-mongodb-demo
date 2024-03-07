import React, { useState } from "react";
import { Link } from 'react-router-dom';
import GameCard from './game-card';
import './lobby.css';

const Lobby = () => {
	const [lobbies, setLobbies] = useState([
		{
			gameName: 'ADAidan\'s game',
			timeLimit: '10:00',
			increment: '5',
			players: {
				player1: {
					name : 'ADAidan',
					elo: '1200',
				},
				player2: {
					name: 'Player 2',
					elo: '1150',
				}
			}
		},
		{
			gameName: 'Player 1\'s game',
			timeLimit: '10:00',
			increment: '0',
			players: {
				player1: {
					name : 'Player 1',
					elo: '950',
				},
			}
		},
	]);

	return (
		<>
			<div className='lobby-container'>
				<h1 style={{
					margin: '1rem',
				}}>Joinable Games</h1>
				<div className='lobby-buttons-container'>
					<Link to='/create-game' className='lobby-button'>Create Game</Link>
					<Link to='/offline' className='lobby-button'>Offline Game</Link>
				</div>
				{lobbies.map((lobby, index) => {
					return (
						<GameCard gameData={lobby} key={index} />
					)
				})}
			</div>
		</>
	)
};

export default Lobby;