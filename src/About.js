import React, { useState } from "react";



const About = () => {

    const [aboutBlack, setAboutBlack] = useState(false);
    const [aboutBro, setAboutBro] = useState(false);

    function setBlack() {
        setAboutBro(false);
        setAboutBlack(true);
    }

    function setBro() {
        setAboutBlack(false);
        setAboutBro(true);
    }


    return (
        <div className="about-container">

            <div className="about-button-container">
                <button className='beginning-button' onClick={setBlack}> About Blackjack</button>
                <button className='beginning-button' onClick={setBro}>About BlackjackBro</button>
            </div>
            {aboutBlack ? <h1>About Blackjack</h1> : <h1>About BlackjackBro</h1>}
            {aboutBlack && <div className="about-graphs">
                <p>Blackjack is the most widely played casino banking game in the world (banking games = games where players play against the "bank"(the dealer)). The goal of Blackjack is to have a hand that totals higher than the dealer's hand, but does not go above 21. </p>
                <p>It uses decks of 52 cards, often with more than one deck at a time. Players are give two cards, face-down.  </p>
                <p><b>At the casino table,</b> </p>
            </div>}
            {aboutBro && <div className="about-graphs">
                <p>BlackjackBro is an app created using Javascript and the React framework.</p>
                <p>Two decks are shuffled at the start of each game. Players can play 1:1 vs the dealer or add a computer player--who does not affect the user's game (remember, in a game of Blackjack, it's each player vs the dealer; read more about the rules here)</p>
                <p>The game also offers tips for players based on basic strategy (read more about basic strategy here). The current logic for basic tips is...basic. But improving!</p>
                <p>For questions, comments, if you find bugs, or for anything else related to BlackjackBro, please email james.j.diffee@gmail.com</p>
            </div>}
        </div>
    )
}

export default About;