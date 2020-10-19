import React from 'react';
import './App.css';

const getData = () => {
  fetch(`/api/greeting`)
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
      }}>click</button>
      <a className="App-link" href="/api/greeting">
        test
      </a>
    </div>
  );
}

export default App;
