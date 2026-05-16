import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from './pages/Landing'
import Record from './pages/Progress_Record'
import Place_QuestSelect from "./pages/Place_QuestSelect";
import SectionCreate from "./pages/SectionCreate";
import CompletionCard from './pages/Completion_Card'

const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: '/record',
    Component: Record,
  },
  {
    path: "/place-quest-select",
    Component: Place_QuestSelect,
  },

  {
    path: "/sectioncreate",
    Component: SectionCreate,
  },
  {
    path: "/completion",
    Component: CompletionCard,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
