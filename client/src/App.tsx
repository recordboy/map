import React from 'react';
import './App.css';


const getPasswords = () => {
  // Get the passwords and store them in state
  fetch('/api/passwords')
    .then(res => res.json())
    .then((passwords) => {
      console.log(passwords);
    });
}

function App() {
  return (
    <div className="App">
      <button type="button" onClick={() => {
        getPasswords();
      }}>click</button>
    </div>
  );
}

export default App;
