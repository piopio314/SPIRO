import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('Witaj w SPIRO!');

  useEffect(() => {
    // Tutaj możemy dodać efekty przy montowaniu komponentu
    document.title = 'SPIRO - Interaktywna Aplikacja';
  }, []);

  return (
    <div style={{
      padding: '2rem',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        marginBottom: '1rem',
        fontFamily: 'Poppins, sans-serif'
      }}>
        {message}
      </h1>
      <button
        onClick={() => setMessage('SPIRO jest gotowe do rozbudowy!')}
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1.1rem',
          backgroundColor: 'white',
          color: '#6366f1',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={e => e.target.style.transform = 'scale(1)'}
      >
        Kliknij mnie!
      </button>
    </div>
  );
}

export default App;