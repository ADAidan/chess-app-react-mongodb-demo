const BotDifficulty = ({ setDifficulty }) => {

	const handleClick = (difficulty) => {
		setDifficulty(difficulty);
	};

	return (
		<div className='offline-game-container'>
			<h1>Offline Game</h1>
			<h2>Play a game of chess against the computer</h2>
			<div className='difficulty-container'>
				<h3>Chose Difficulty:</h3>
				<div className='buttons-container'>
					<button 
					className='easy-button'
					onClick={() => handleClick('easy')}>Easy</button>
					<button 
					className='medium-button'
					onClick={() => handleClick('medium')}>Medium</button>
					<button 
					className='hard-button'
					onClick={() => handleClick('hard')}>Hard</button>
				</div>
			</div>
		</div>
	)
};

export default BotDifficulty;