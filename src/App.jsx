import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from './pages/Landing'

const router = createBrowserRouter([
  {
    path: '/',
    Component: Landing,
  }
])

function App() {

  return <RouterProvider router={router} />
}

export default App
