import React from 'react';
import { Link } from 'react-router-dom';
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
        <div className='time-limit-container'>
          <label htmlFor='time-limit-minutes'></label>
          <input type='text' id='time-limit-minutes' placeholder='Minutes' />
          <label htmlFor='time-limit-seconds'></label>
          <input type='text' id='time-limit-seconds' placeholder='Seconds' />
          <label htmlFor='increment'></label>
          <input type='text' id='increment' placeholder='Increment' />
        </div>
        <button type='submit'>Create Game</button>
      </form>
      <Link to='/lobby'>Cancel</Link>
    </div>
  );
};

export default CreateGame;