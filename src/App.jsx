import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [user, setUser] = useState('Aidan')

  useEffect(() => {
    fetch(`http://localhost:3000/`)
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

  return (
    <>
      <div>{data.message}</div>
    </>
  )
}

export default App
