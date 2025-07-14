import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '4rem 2rem',
      fontFamily: 'Jost, sans-serif',
    }}>
      <h1 style={{
        color: '#FF194C',
        fontFamily: 'BadaBoom BB, sans-serif',
        fontSize: '3.5rem',
        textAlign: 'center',
        textShadow: '2px 2px 2px black',
        marginBottom: '2rem'
      }}>
        Welcome to Spandan Registration
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        marginTop: '2rem'
      }}>
        {/* Delegate Card Box */}
        <Link to="/delegate-card" style={cardStyle('#FBCA03')}>
          <h2 style={cardTitleStyle}>🎫 Delegate Card</h2>
          <p style={cardDescStyle}>Register for your delegate card</p>
        </Link>

        {/* Event Passes Box */}
        <Link to="/pass-purchase" style={cardStyle('#149CFF')}>
          <h2 style={cardTitleStyle}>🏷️ Event Passes</h2>
          <p style={cardDescStyle}>Buy special event passes</p>
        </Link>
      </div>
    </div>
  )
}

const cardStyle = (accentColor) => ({
  padding: '2rem',
  backgroundColor: '#1f1f1f',
  border: `2px solid ${accentColor}`,
  borderRadius: '1rem',
  textDecoration: 'none',
  color: 'white',
  boxShadow: `0 4px 12px rgba(0,0,0,0.3)`,
  transition: 'transform 0.2s, box-shadow 0.2s',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Jost, sans-serif',
  fontWeight: 400,
  lineHeight: 1.4,
  cursor: 'pointer',
  position: 'relative',
});

const cardTitleStyle = {
  fontSize: '2rem',
  marginBottom: '0.5rem',
};

const cardDescStyle = {
  fontSize: '1.1rem',
  color: '#e0e0e0',
  margin: 0,
};

export default HomePage
