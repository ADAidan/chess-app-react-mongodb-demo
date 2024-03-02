import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ErrorPage from './error-page.jsx'
import { 
  createBrowserRouter, 
  RouterProvider 
} from 'react-router-dom'
import ChessGame from './components/game.jsx'
import Lobby from './components/lobby.jsx'
import './index.css'

const router = createBrowserRouter([
  { 
    path: '/', 
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: '/lobby',
    element: <Lobby />,
  },
  {
    path: '/chess',
    element: <ChessGame />,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
