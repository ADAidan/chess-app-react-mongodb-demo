import './create-game.css';

const CreateGame = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const gameName = e.target[0].value;
    const timeLimit = e.target[1].value;
    const increment = e.target[2].value;
    console.log(gameName, timeLimit, increment);
  };

  return (
    <div className='create-game-container'>
      <h1>Create Game</h1>
      <form className='form-container' onSubmit={handleSubmit}>
        <label htmlFor='game-name'></label>
        <input type='text' id='game-name' placeholder='Game Name' />
        <label htmlFor='time-limit'></label>
        <input type='text' id='time-limit' placeholder='Time Limit' />
        <label htmlFor='increment'></label>
        <input type='text' id='increment' placeholder='Increment' />
        <button type='submit'>Create Game</button>
      </form>
    </div>
  );
};

export default CreateGame;