import React from 'react';
import './App.css';

const getData = () => {
  fetch(`http://localhost:5000/api/greeting`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

function App() {
  return (
    <div className="App">
      <button type="button" onClick={() => {
        getData();
      }}>test</button>
    </div>
  );
}

export default App;
