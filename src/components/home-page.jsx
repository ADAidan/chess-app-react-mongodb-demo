import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { isValidUsername, checkIfUsernameExists } from '../utils/validation'

const HomePage = () => {
  const [data, setData] = useState([])
  const [username, setUsername] = useState('')

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/hello`)
      .then((response) => {
        console.log('Fetching data', response)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((jsonData) => {
        setData(jsonData)
        console.log('Data:', jsonData)
      })
      .catch((error) => {
        console.error('Error fetching data', error)
      })
  }, [])

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
    <>
      <div>{data.message}</div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Next</button>
      </form>
    </>
  )
}

export default HomePage