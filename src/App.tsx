import React from 'react';
import logo from './logo.svg';
import './App.css';
import SoundPlayer from './components/sound-player/sound-player';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div>
        <div className="bg-artwork">
          <div className="player-container">
            <SoundPlayer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
