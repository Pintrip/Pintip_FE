import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from './pages/Landing'
import Record from './pages/Progress_Record'

const router = createBrowserRouter([
  {
    path: '/',
    Component: Landing,
  },
  {
    path: '/record',
    Component: Record,
  }
])

function App() {

  return <RouterProvider router={router} />
}

export default App
