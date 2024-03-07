import React from 'react'
import ReactDOM from 'react-dom/client'
import { 
  createBrowserRouter, 
  RouterProvider 
} from 'react-router-dom'
import App from './App.jsx'
import ErrorPage from './error-page.jsx'
import ChessGame from './components/game.jsx'
import Lobby from './components/lobby.jsx'
import CreateGame from './components/create-game.jsx'
import OfflineGame from './components/offline-game.jsx'
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
  },
  {
    path: '/create-game',
    element: <CreateGame />,
  },
  {
    path: '/offline',
    element: <OfflineGame />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
