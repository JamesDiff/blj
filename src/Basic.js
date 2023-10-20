import React, { useState } from "react";

const Basic = () => {

    const [checked, setChecked] = useState(0);

    function handleCheck() {
        if (checked >= 9) {
            return
        } else {
            setChecked(checked + 1);
        };

        console.log("CHECKED: ", checked)

    }

    return (
        <div className="basic-container">
            {checked === 1 && <div><h1>What is basic strategy? </h1>
            <p className='basic-strategy-graph'>Basic Strategy is, as the name suggests, the basic strategy you need to improve your odds at Blackjack.</p>
            </div>}
            {checked === 2 && <div><h1>Why play with basic strategy? </h1>
                <p>To further improve your odds of winning--or decrease your odds of losing. Basic strategy will NOT guarantee you will win every hand. But if you played every hand using basic strategy, you'd cut the casino's advantage by half or more--to just .5 percent. Also, if you want to learn to count cards, it's essential to know basic strategy first.</p>
            </div>
            }
            {checked === 3 && <div><h1>So... back to the first question: what is basic strategy? </h1>
                <p>Chances are, if you've ever played Blackjack, you've been exposed to a bit of basic strategy. Have you ever heard to stand on 16? That's a basic strategy tip.</p>
                <p>Here are a few basic ideas to get you started:</p>
                <ul className="rules-list">
                    <li><b>Check the dealer's up card.</b> That's the card that you can see; what the dealer is showing is biggest factor in how you should play the hand.</li>
                    <li><b>Check your hand.</b> Obviously. Is it lower than 12? If so, you need to hit. Every time.</li>
                    <li><b>Is your hand 17 or higher? </b>You should stand--almost everytime.</li>
                    <li><b>Is your hand somewhere in the 12-16 range?</b> If the dealer is showing 2-6, stand. For 7 or higher, hit.</li>
                    <li><b>Always split Aces and 8s</b></li>
                </ul>
            </div>
            }
            {checked === 4 && <div><h1>Is that it? </h1>
                <p>No. Basic strategy has a play for every possible combination of your cards and the dealer's up card. There are basic strategy cards you can buy online or at some casinos. Yes, you are allowed to keep your card at the table</p>
                <p>You can also find them online for purchase or to print out for free.</p>
            </div>
            }
            {checked === 5 && <div><h1>So...is <i>that </i>it? </h1>
                <p>More or less. Maybe less. Let's go over a few pairings:</p>
                <ul className="rules-list">
                    <li>Normally, if you had 13 and the dealer was showing a card in then 2-6 range, you would stay. Not so if your hand includes an Ace. That's because the ace's value can be 11 or 1, depending on the rest of the hand. If you have an ace, hit.</li>
                    <li></li>

                    <li></li>

                </ul>
            </div>
            }
            {checked === 10 && <div><h1> So, is <i>that</i> it?</h1>
                <p>Sure. Here's a chart that is hopefully helpful:</p>
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>}
            <button className='basic-button' onClick={handleCheck}>Ok!</button>
            <h1></h1>
        </div>

    )

}

export default Basic