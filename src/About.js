import React, { useState } from "react";



const About = () => {

    const [aboutBlack, setAboutBlack] = useState(false);
    const [aboutBro, setAboutBro] = useState(false);

    return (
        <div className="about-container">
            {!aboutBlack && !aboutBro &&
                <div className="about-button-container">
                    <button className='beginning-button'> About Blackjack</button>
                    <button className='beginning-button'>About BlackjackBro</button>
                </div>}
            {aboutBlack ? <h1>About BlackjackBro</h1> : <h1>About Blackjack</h1>}
            {aboutBlack && <div className="about-graphs">
                <p>Blackjack is the most </p>
            </div>}
            {aboutBro && <div className="about-graphs">
                <p>BlackjackBro is a Blackjack game app created using Javascript and the React framework. To learn about Blackjack, follow this link. </p>
                <p>This game is played using two decks that are shuffled at the start of each game. The current versiom of the game allows a player to play 1:1 vs a dealer, or to add a computer player--who does not affect the user's game (remember, in a game of Blackjack, it's each player vs the dealer; read more about the rules here)</p>
                <p>The game also offers tips for players based on basic strategy (read more about basic strategy here).</p>
                <p>For questions, comments, bugs, or anything else, please email james.j.diffee@gmail.com</p>
            </div>}
        </div>
    )
}

export default About;