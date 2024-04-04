import './App.css';
// import React from 'react';
import Column from './components/Column/Column';

function App() {
  return (
    <>
      <main>
        <Column id={1} type={' погоды'} />
        <Column id={2} type={' валют'} />
        <Column id={3} type={'-заметку'} />
      </main>
    </>
  );
}

export default App;
