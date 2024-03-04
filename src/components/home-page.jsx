import { useState, useEffect } from 'react'
import axios from 'axios'
import { isValidUsername } from '../utils/validation'

const HomePage = () => {
  const [data, setData] = useState([])
  const [username, setUsername] = useState('')
  const [user, setUser] = useState('Aidan')

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

    const isValid = isValidUsername(username)
    console.log('isValid:', isValid)
    if (isValid !== true) {
      console.log('Invalid username:', isValid)
      return
    }

    

    try {
      const response = await axios.post('http://localhost:3000/signup', {
        username
      })

      console.log('Response:', response)
    } catch (error) {
      console.error('Error:', error)
    }
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