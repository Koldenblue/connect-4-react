import React from 'react';
import Board from "./components/Board"

function App() {
  return (
    <div className="App">
          <Board rows={6} columns={7} />
    </div>
  );
}

export default App;
