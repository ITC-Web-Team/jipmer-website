import React from 'react'
import { Link } from 'react-router'

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" style={{
        display: 'inline-block',
        marginTop: '1rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#2563eb',
        color: 'white',
        borderRadius: '0.25rem',
        textDecoration: 'none'
      }}>
        Return to Home
      </Link>
    </div>
  )
}

export default NotFound