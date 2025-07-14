import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(prev => !prev)

  // Optional: Close menu when a link is clicked (mobile UX)
  const closeMenu = () => setIsOpen(false)

  return (
    <nav className="navbar">
      <img className="logo" alt="Spandan logo" src="/assets/spandan_logo.png" />

      <div className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <ul className={`navitems ${isOpen ? 'open' : ''}`}>
        <li><Link className="navlinks" to="/" onClick={closeMenu}>Home</Link></li>
        <li><Link className="navlinks" to="/about" onClick={closeMenu}>About</Link></li>
        <li><Link className="navlinks" to="/events" onClick={closeMenu}>Events</Link></li>
        <li><Link className="navlinks" to="/register" onClick={closeMenu}>Register</Link></li>
        <li><Link className="navlinks" to="/contact" onClick={closeMenu}>Contact</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar
