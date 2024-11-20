import React from 'react'
import './NavBar.css'

const NavBar = () => {
  return (
    <div className='nav-container'>
        <h1>iTask</h1>
        <nav>
            <ul>
                <li>Home</li>
                <li>Your Tasks</li>
            </ul>
        </nav>
    </div>
  )
}

export default NavBar
