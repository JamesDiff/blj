import React from "react";

const Rules = () => {
    return (
        <div className="rules-container">
            <h1>The Rules</h1>
            <ul className="rules-list">
                <li>The dealer faces five to nine players from behind a semicircular table. </li>
                <li>Between one and eight standard decks (52-cards) are shuffled together </li>
                <li>At the start of each round, players place bets in the "betting box" at each position. </li>
                {/*In jurisdictions allowing back betting, up to three players can be at each position.*/} 
                <li>The player whose bet is at the front of the betting box controls the position, and the dealer consults the controlling player for playing decisions; the other bettors "play behind".</li> 
                <li>A player can usually control or bet in as many boxes as desired at a single table, but an individual cannot play on more than one table at a time or place multiple bets within a single box.</li> 
                <li>In many U.S. casinos, players are limited to playing one to three positions at a table.</li>
            </ul>
        </div>
            

    )

}

export default Rules;