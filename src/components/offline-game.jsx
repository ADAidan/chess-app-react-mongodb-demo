import React, { useState } from 'react';
import BotDifficulty from './bot-difficulty';
import Game from './game';
import './offline-game.css';

const OfflineGame = () => {
	const [difficulty, setDifficulty] = useState('');

	return (
		<>
			{!difficulty ? 
			<BotDifficulty setDifficulty={setDifficulty} /> : 
			<Game isOffline={true} botDifficulty={difficulty}/>}
		</>
	);
};

export default OfflineGame;