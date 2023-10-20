import logo from './logo.svg';
import './App.css';
import React from 'react';

import { useState } from 'react';

import BlackJack from './blackjack';

import Basic from './Basic';

import Rules from './Rules';

import About from './About';

function App() {

  const [learnRules, setLearnRules] = useState(false);
  const [learnBasic, setLearnBasic] = useState(false);
  const [playBlackjack, setPlayBlackjack] = useState(false);
  const [about, setAbout] = useState(false);

  function handleRules() {
    setLearnRules(true);
  }

  function handleBasic() {
    setLearnBasic(true);
  }

  function handlePlay() {
    setPlayBlackjack(true);
  }

  function handleAbout(){
    setAbout(true);
  }


  return (
    <div className="App">
      <div className='theWholeDamnImage'></div>
      <div className='front-app-container'>
        {!learnBasic && !playBlackjack && !learnRules && !about ? <h1>Welcome to BlackjackBro(TM)!</h1> : null}
        {!learnBasic && !playBlackjack && !learnRules && !about ? <h2>What Do You Wanna Do?</h2> : null}
        <div className='front-app-button-div'>
          {!playBlackjack && !learnBasic && !learnRules && !about ? <button className='beginning-button' onClick={handlePlay}>Play Blackjack!</button> : null}
          {!learnBasic && !playBlackjack && !learnRules && !about ? <button className='beginning-button' onClick={handleBasic}>Review Basic Strategy!!!</button> : null}
          {!learnBasic && !playBlackjack && !learnRules && !about ? <button className='beginning-button' onClick={handleRules}>Go Over The Rules!!!!!!!!!!!!!!!!!!</button> : null}
          {!learnBasic && !playBlackjack && !learnRules && !about ? <button className='beginning-button' onClick={handleAbout}>About BlackjackBro</button> : null}

        </div>
      </div>


      {learnRules && <Rules />}
      {learnBasic && <Basic />}
      {about && <About/>}
      {playBlackjack && <BlackJack />}

      {/* <BlackJack /> */}


    </div>
  );
}

export default App;
