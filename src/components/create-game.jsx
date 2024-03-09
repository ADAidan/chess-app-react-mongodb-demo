import React from 'react';
import { Link } from 'react-router-dom';
import './create-game.css';

const CreateGame = () => {

  const timer = (minutes, seconds) => {
    switch (true) {
      case minutes === '':
        minutes = 0;
        break;
      case seconds === '':
        seconds = 0;
        break;
      case minutes.length > 2:
        return 'error: minutes too long';
      case seconds.length > 2:
        return 'error: seconds too long';
      case seconds >= 60:
        return 'error: seconds must be less than 60';
      case String(seconds).length <= 1:
        seconds = `0${String(seconds)}`;
        break;
      default:
        break;
    }
    return `${minutes}:${seconds}`
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = sessionStorage.getItem('username');
    const gameName = `${username}'s game`;
    const timeLimitMinutes = e.target[0].value || 10;
    const timeLimitSeconds = e.target[1].value || 0;
    const increment = e.target[2].value || 0;
    const timeLimit = timer(timeLimitMinutes, timeLimitSeconds);
    console.log(gameName, timeLimit, `${increment}s`);
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