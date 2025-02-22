import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>SPIRO</h1>
      <div>
        <button onClick={() => setCount(count + 1)}>
          Kliknij mnie
        </button>
        <p>Licznik: {count}</p>
      </div>
    </div>
  )
}

export default App