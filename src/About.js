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
            {!aboutBro ? <h1>About Blackjack</h1> : <h1>About BlackjackBro</h1>}
            {!aboutBro && <div className="about-graphs">
                <p>Blackjack is the most widely played casino banking game in the world (banking games = games where players play against the "bank"(the dealer)). The goal of Blackjack is to have a hand that totals higher than the dealer's hand, but does not go above 21. A "bust" is when a player goes over 21. A "blackjack" is when a player gets 21.</p>
                <p>At casinos, Blackjack is typically played with between one and eight decks.</p>
                <p>The game starts with each player placing a bet--before they recieve their hand.</p>
                <p>After the initial bet, the dealer deals one card face up to each player and themselves. The dealer then deals a second card to each player, face up; finally, the dealer deals themselves a card, face down.</p>
                <p>Cards two through ten are scored using their face value. Kings, Queens, and Jacks are given a value of ten. Aces can be valued at eleven or one.</p>
                <p>Bets are usually paid out immediately. Winning bets are paid even money, meaning you're paid 1:1 on your wager (for every $1 you bet, you'll win $1). A 3:2 payout is typically given when you're dealt a natural blackjack (21).</p>
                {/* <p><b>At the casino table,</b> </p> */}
            </div>}
            {aboutBro && <div className="about-graphs">
                <p>BlackjackBro is an app created using Javascript and the React framework.</p>
                <p>Two decks are shuffled at the start of each game. Players can play 1:1 vs the dealer or add a computer player--who does not affect the player's game (remember, in a game of Blackjack, it's each player vs the dealer; read more about the rules here)</p>
                <p>At present, players begin each hand with a bet of $5. Players can then bet more after their cards are dealt as long as the bet is a multiple of five (a number that is divisible by 5, like 10, 15, 405, etc.).</p>
                <p></p>
                <p>If a player is dealt 21 (a "natural" blackjack), the player automatically wins. Otherwise, the player has the option to hit until they go above 21, or stay.</p>
                <p>The game also offers tips for players based on basic strategy (read more about basic strategy here). The current logic for basic tips is...basic. But improving! <b>FAIR WARNING</b>: following Basic Strategy tips does not guarantee a player will win a hand; read more about basic strategy here.</p>
                <p>For questions, comments, bugs, or anything else related to BlackjackBro, please email james.j.diffee@gmail.com</p>
            </div>}
        </div>
    )
}

export default About;