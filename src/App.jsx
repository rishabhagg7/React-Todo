import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import TaskPage from './components/TaskPage'

function App() {
  return (
    <div className='body-container'>
      <NavBar/>
      <TaskPage/>
    </div>
  )
}

export default App
