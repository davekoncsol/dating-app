import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar/NavBar'
import Body from './components/Body/Body'

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <NavBar />
      </header>
      <Body />
       <footer />

    </div>

  );
}

export default App;
