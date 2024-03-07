import './offline-game.css';

const OfflineGame = () => {
    return (
        <div className='offline-game-container'>
            <h1>Offline Game</h1>
            <h2>Play a game of chess against the computer</h2>
            <div className='difficulty-container'>
                <p>Chose Difficulty:</p>
                <div className='buttons-container'>
                    <button className='easy-button'>Easy</button>
                    <button className='medium-button'>Medium</button>
                    <button className='hard-button'>Hard</button>
                </div>
            </div>
        </div>
    );
};

export default OfflineGame;