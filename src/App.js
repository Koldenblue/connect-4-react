import React from 'react';
import Board from "./components/Board"

function App() {
  return (
    <div className="App">
      <main className='container'>
        <div className='row-md-12'>
          <Board rows={6} columns={7} />
        </div>
      </main>
    </div>
  );
}

export default App;
