import React from 'react';
import Board from "./components/Board"

function App() {
  return (
    <div className="App">
      <main className='container'>
        <Board rows={6} columns={7} />
      </main>
    </div>
  );
}

export default App;
