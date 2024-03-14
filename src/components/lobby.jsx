import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import GameCard from './game-card';
import './lobby.css';

const Lobby = () => {
	const [lobbies, setLobbies] = useState([]);

	useEffect(() => {
		getJoinableGames();
	}, []);

	//get joinable games from server
	const getJoinableGames = async () => {
		try {
			const response = await fetch('http://localhost:3000/lobby-games');
			const data = await response.json();
			const updatedLobbies = data.games.map((game) => ({
				'gameID': game.gameID,
				'owner': game.player1,
				'player1': game.player1,
				'player2': game.player2,
				'gameName': game.gameName,
				'timeLimit': game.timeLimit,
				'increment': game.increment,
			}));
			setLobbies(updatedLobbies);
		} catch (error) {
			console.log('Error:', error);
		}
	};

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
						<GameCard gameData={lobby} key={index}/>
					)
				})}
			</div>
		</>
	)
};

export default Lobby;