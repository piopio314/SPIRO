import React, { useState, useEffect, useRef } from 'react';

function App() {
  const canvasRef = useRef(null);
  const [settings, setSettings] = useState({
    mode: 'classic',
    innerRadius: 80,
    outerRadius: 120,
    distance: 60,
    speed: 1,
    color: '#6366f1',
    backgroundColor: '#ffffff'
  });
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    document.title = 'SPIRO - Spirograf Online';
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw reference circle
    ctx.beginPath();
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.arc(canvas.width/2, canvas.height/2, settings.outerRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Draw inner circle
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, settings.innerRadius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.setLineDash([]);
    ctx.lineWidth = 1;

    if (!isDrawing) return;

    let angle = 0;
    let animationFrameId;

    const draw = () => {
      const { innerRadius, outerRadius, distance, speed, color } = settings;
      
      const x = (outerRadius - innerRadius) * Math.cos(angle) +
                distance * Math.cos((outerRadius - innerRadius) * angle / innerRadius);
      const y = (outerRadius - innerRadius) * Math.sin(angle) -
                distance * Math.sin((outerRadius - innerRadius) * angle / innerRadius);

      if (angle === 0) {
        ctx.beginPath();
        ctx.moveTo(canvas.width/2 + x, canvas.height/2 + y);
      } else {
        ctx.lineTo(canvas.width/2 + x, canvas.height/2 + y);
      }

      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
      angle += speed * 0.02;

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDrawing, settings]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div style={{
      padding: '2rem',
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      color: 'white'
    }}>
      <h1 style={{ fontFamily: 'Poppins, sans-serif', marginBottom: '1rem' }}>
        Spirograf Online
      </h1>

      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginBottom: '1rem',
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '1rem',
        borderRadius: '1rem',
        backdropFilter: 'blur(10px)'
      }}>
        <select
          value={settings.mode}
          onChange={(e) => setSettings({ ...settings, mode: e.target.value })}
          style={{
            padding: '0.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            background: 'white',
            color: '#6366f1',
            fontWeight: 'bold'
          }}
        >
          <option value="classic">Klasyczny</option>
          <option value="flower">Kwiatowy</option>
          <option value="star">Gwiaździsty</option>
        </select>

        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          background: 'white',
          padding: '0.5rem',
          borderRadius: '0.5rem'
        }}>
          <span style={{ color: '#6366f1', fontWeight: 'bold' }}>Kolor linii:</span>
          <input
            type="color"
            value={settings.color}
            onChange={(e) => setSettings({ ...settings, color: e.target.value })}
            style={{ 
              width: '40px', 
              height: '30px', 
              padding: '0',
              border: 'none',
              borderRadius: '0.25rem'
            }}
          />
        </div>

        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          background: 'white',
          padding: '0.5rem',
          borderRadius: '0.5rem'
        }}>
          <span style={{ color: '#6366f1', fontWeight: 'bold' }}>Tło:</span>
          <select
            value={settings.backgroundColor}
            onChange={(e) => setSettings({ ...settings, backgroundColor: e.target.value })}
            style={{
              padding: '0.25rem',
              borderRadius: '0.25rem',
              border: 'none',
              background: 'white',
              color: '#6366f1',
              fontWeight: 'bold'
            }}
          >
            <option value="#ffffff">Białe</option>
            <option value="#000000">Czarne</option>
            <option value="custom">Własne</option>
          </select>
          {settings.backgroundColor === 'custom' && (
            <input
              type="color"
              value={settings.backgroundColor}
              onChange={(e) => setSettings({ ...settings, backgroundColor: e.target.value })}
              style={{ 
                width: '40px', 
                height: '30px', 
                padding: '0',
                border: 'none',
                borderRadius: '0.25rem'
              }}
            />
          )}
        </div>

        <button
          onClick={() => setIsDrawing(!isDrawing)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: isDrawing ? '#ef4444' : '#22c55e',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'transform 0.1s',
            transform: isDrawing ? 'scale(1.05)' : 'scale(1)'
          }}
        >
          {isDrawing ? '⏹️ Stop' : '▶️ Start'}
        </button>

        <button
          onClick={clearCanvas}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'white',
            color: '#6366f1',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🧹 Wyczyść
        </button>
      </div>

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem',
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '1rem',
        borderRadius: '1rem',
        backdropFilter: 'blur(10px)',
        width: '80%',
        maxWidth: '600px'
      }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            🔄 Promień wewnętrzny: {settings.innerRadius}
          </label>
          <input
            type="range"
            min="20"
            max="150"
            value={settings.innerRadius}
            onChange={(e) => setSettings({ ...settings, innerRadius: parseInt(e.target.value) })}
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            ⭕ Promień zewnętrzny: {settings.outerRadius}
          </label>
          <input
            type="range"
            min="50"
            max="200"
            value={settings.outerRadius}
            onChange={(e) => setSettings({ ...settings, outerRadius: parseInt(e.target.value) })}
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            ↔️ Odległość: {settings.distance}
          </label>
          <input
            type="range"
            min="20"
            max="100"
            value={settings.distance}
            onChange={(e) => setSettings({ ...settings, distance: parseInt(e.target.value) })}
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            ⚡ Prędkość: {settings.speed}
          </label>
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={settings.speed}
            onChange={(e) => setSettings({ ...settings, speed: parseFloat(e.target.value) })}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        style={{
          backgroundColor: settings.backgroundColor,
          borderRadius: '1rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '2px solid rgba(255, 255, 255, 0.2)'
        }}
      />
    </div>
  );
}

export default App;