import React from 'react';
import './App.css';

const getData = () => {
  fetch(`/api/data`)
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
      }}>get data</button>
    </div>
  );
}

export default App;
