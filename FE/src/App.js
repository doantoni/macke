import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Game from './views/game';
import Welcome from './views/welcome'
import './App.css';

function App() {
  return (
    <div className='app'>
      <div className='container'>
        <Routes>
          <Route path='/' element={ <Welcome />} />
          <Route path='/play' element={ <Game />} />
        </Routes>
      </div> 
    </div>
  )
}

export default App;
