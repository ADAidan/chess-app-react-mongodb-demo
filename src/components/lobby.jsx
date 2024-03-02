import React from "react";
import GameCard from './game-card';
import './lobby.css';

const Lobby = () => {
	return (
		<>
			<div className='lobby-container'>
				<GameCard />
			</div>
		</>
	)
};

export default Lobby;