import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { isValidUsername, checkIfUsernameExists } from '../utils/validation'
import './home-page.css'

const HomePage = () => {
  const [data, setData] = useState([])
  const [username, setUsername] = useState('')

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Submitting form')

    const isValid = await isValidUsername(username)
    if (isValid !== true) {
      console.log('Invalid username:', isValid)
      return
    }

    const usernameExists = checkIfUsernameExists(username);
    if (usernameExists === true) {
      console.log('successfully logged in')
      sessionStorage.setItem('username', username)
      navigate('/lobby');
      return
    }

    // Creates a user
    try {
      const response = await axios.post('http://localhost:3000/signup', {
        username,
        elo: 1000
      })
      sessionStorage.setItem('username', username)

      console.log('Response:', response)
    } catch (error) {
      console.error('Error:', error)
    }
    navigate('/lobby');
  };

  const handleChange = (e) => {
    setUsername(e.target.value)
  };

  return (
    <div className='home-page-container'>
      <h1>Welcome to chess</h1>
      <form className='login-form-container' onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          value={username}
          onChange={handleChange}
          placeholder='Enter username'
        />
        <button type="submit">Next</button>
      </form>
    </div>
  )
}

export default HomePage