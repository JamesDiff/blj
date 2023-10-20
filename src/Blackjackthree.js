import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

// import BackCard from '../cards/BACK.png'

import placeBet from "./placeBet";

import Stay from "./Stay";

const BlackJack = () => {

    const [deck, setDeck] = useState([]);
    const [dealerSum, setDealerSum] = useState(0);
    const [playerSum, setPlayerSum] = useState(0);
    const [canHit, setCanHit] = useState(true);
    const [showDealerCard, setShowDealerCard] = useState(false);
    const [hidden, setHidden] = useState(null);
    const [hiddenValue, setHiddenValue] = useState(0);
    const [dealerSecondCard, setDealerSecondCard] = useState(null);
    const [playerCards, setPlayerCards] = useState([]);
    const [dealerCards, setDealerCards] = useState([]);
    const [hitCount, setHitCount] = useState(false);
    const [hitCard, setHitCard] = useState(null);
    const [message, setMessage] = useState("Enjoy the Game!");
    const [playerMoney, setPlayerMoney] = useState(1000);
    const [pot, setPot] = useState(5);
    const [bet, setBet] = useState(5);
    const [betPlaced, setBetPlaced] = useState(false);


    useEffect(() => {
        start();
        // getHiddenValue();
    }, [])

    function buildDeck() {
        let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        let types = ["C", "D", "H", "S"];

        let workingDeck = [];

        for (let i = 0; i < types.length; i++) {
            for (let j = 0; j < values.length; j++) {
                workingDeck.push(values[j] + "-" + types[i]);
            }
        }

        return workingDeck;
    }


    function shuffleDeck(cardArray) {

        for (let i = 0; i < cardArray.length; i++) {
            let j = Math.floor(Math.random() * cardArray.length);
            let temp = cardArray[i];
            cardArray[i] = cardArray[j];
            cardArray[j] = temp;
        }
        return cardArray;
    }


    function start() {
        let newDeck = shuffleDeck(buildDeck());
        getDealerCards(newDeck);
        AssignPlayerCards(newDeck);

    }


    function getDealerCards(cards) {
        let randomIndex = Math.floor(Math.random() * 52);
        let workingHidden = cards[randomIndex];
        cards.splice(randomIndex, 1);

        let randomIndex2 = Math.floor(Math.random() * 52)
        let secondCard = cards[randomIndex2]
        cards.splice(randomIndex2, 1);

        setHidden(workingHidden);
        setDeck(cards);

        setDealerSum(getValue(secondCard) + getValue(workingHidden));

        setDealerCards([secondCard, workingHidden]);

        console.log("WORKING HIDDEN WITHIN GET DEALER CARD: ", workingHidden)

    }



    function AssignPlayerCards(deck) {

        let cards = deck;

        let randomIndex = Math.floor(Math.random() * 52);
        // console.log("RANDOM INDEX within Assign Player Cards: ", randomIndex)

        let card1 = cards[randomIndex];
        console.log("CARD 1 WITHIN ASSIGN PLAYER CARDS: ", card1)
        cards.splice(randomIndex, 1);

        let card2 = cards[randomIndex];
        console.log("CARD 2 FROM WITHIN ASSIGN PLAYER CARDS: ", card2)

        cards.splice(randomIndex, 1);

        //this might be a good place to call reduceAce
        // but I'm kind of wondering if the best way to handle it would be...

        let newPlayerSum = getValue(card1) + getValue(card2);

        setPlayerSum(newPlayerSum);
        console.log("PLAYER SUM: ", playerSum);

        setPlayerCards([card1, card2]);

        setDeck(cards);


        // let firstCardValue = getValue(playerFirstCard);
        // let secondCardValue = getValue(playerSecondCard);

        // console.log("FROM WITHIN ASSIGN PLAYER CARDS, firstCardValue and secondCardValue: ", firstCardValue, secondCardValue);



        console.log("DECK AT END OF ASSIGN PLAYER CARDS: ", deck)

    }


    const reduceAce = (sum, aceCount) => {
        while (sum > 21 && aceCount > 0) {
            for(let i = 0; i < playerCards.length; i++){
                if(playerCards[i][2] === 'A'){
                   sum -= 10;
            // aceCount -= 1; 
                }
            }
            
        }
        return sum;
    }


    const getValue = (card) => {

        let singleCardArray = card.split("-");

        // for (let i = 0; i < 4; i++) {
        //     singleCardArray.push(card[i])
        // }



        console.log("SINGLE CARD ARRAY WITHIN GET VALUE: ", singleCardArray);

        let value = singleCardArray[0];

        console.log("VALUE FROM WITHIN GETVALUE: ", value)

        if (isNaN(value)) {
            if (value == "A") {
                return 11;
            }
            return 10;
        }

        return parseInt(value);
    }


    // const getHiddenValue = () => {
    //     setHiddenValue(getValue(hidden));
    //     console.log("HIDDEN VALUE within getHiddenValue: ", hiddenValue)
    // }



    function dealerHit() {

        console.log("DEALER CARDS AT THE START OF DEALER HIT: ", dealerCards);

        let cards = deck;

        let randomIndex = Math.floor(Math.random() * 52);
        let newCard = cards[randomIndex];
        cards.splice(randomIndex, 1);

        setDealerCards([...dealerCards, newCard]);
        setDealerSum(dealerSum + getValue(newCard))
        setDeck(cards);

        while(playerSum > dealerSum){
            setDealerCards([...dealerCards, newCard]);
            cards.splice(randomIndex, 1);
        }

    }


    const stay = () => {

        if (!betPlaced) {
            setMessage("Place Bet");
            return;
        }


        //the order of things that has to happen
        //check if user wins
        //what are all the conditions to check?
        //what is in state
        //maybe functions that return a value to use rather than state

        if (playerSum > dealerSum && playerSum <= 21) {
            dealerHit();
        }

        console.log("HIDDEN WITHIN STAY: ", hidden)

        setCanHit(false);
        setShowDealerCard(true);

        declareWinner();

    }


    function hit() {

        if (playerSum > 21) {
            return;
        }

        if (!betPlaced) {
            setMessage("Place Bet");
            return;
        }

        let cards = deck;
        let randomIndex = Math.floor(Math.random() * cards.length);
        let randomCard = cards[randomIndex];

        console.log("RANDOM CARD IN HIT: ", randomCard)

        setHitCard(randomCard);
        cards.splice(randomIndex, 1);

        setDeck(cards);

        setPlayerSum(playerSum + getValue(randomCard));

        setHitCount(hitCount + 1);

        setPlayerCards([...playerCards, randomCard]);

        if (playerSum > dealerSum && playerSum <= 21) {
            dealerHit();
        }

        console.log("PLAYERSUM WITHIN HIT: ", playerSum)

        // playerAceCount += checkAce(card);
        // document.getElementById("your-cards").append(cardImg);

        // if(reduceAce(playerSum, playerAceCount) > 21){
        //     canHit = false;
        // }

    }

    function declareWinner(){

        if (playerSum > 21) {
            setMessage("Dealer Wins");
        }
        else if (dealerSum > 21) {
            setMessage("You Win!");
            // addWinnings();
        }
        else if (playerSum == dealerSum) {
            setMessage("Tie");
            returnBet();
        }
        else if (playerSum > dealerSum) {
            setMessage("You Win!");
            addWinnings();
        }
        else if (playerSum < dealerSum) {
            setMessage("Dealer Wins");
        }

    }

    function clearPlayerHands() {
        setPlayerCards([]);
        setHitCard(null);
    }

    function clearDealerCards() {
        setHidden(null);
        setDealerSecondCard(null);
    }

    function clearPlayerSum() {
        setPlayerSum(0);
    }

    function clearDealerSum() {
        setDealerSum(0);
    }


    function newHand() {
        clearPlayerHands();
        clearDealerCards();
        clearPlayerSum();
        clearDealerSum();
        setBetPlaced(false);
        setMessage("Enjoy the game!")
        setPot(5);
        start();
        // AssignPlayerCards();
    }

    function betButton() {
        setBetPlaced(true);
        setPot(parseInt(pot) + parseInt(bet));
        setPlayerMoney(playerMoney - bet);
    }

    function addWinnings() {
        setPlayerMoney(playerMoney + pot);
    }

    function returnBet() {
        setPlayerMoney(playerMoney + bet);
    }


    return (

        <div className="blackjack-container">
            <h1 className="blackjack-head">Blackjack</h1>
            <div>
                {/* <h2>Dealer: {dealerSum}</h2> */}
                <h3 className='dealer-head'>Dealer</h3>
            </div>
            <div id="dealer-cards">
                <img className='back-card' src={!showDealerCard ? `${process.env.PUBLIC_URL}/cards/back.png` : `${process.env.PUBLIC_URL}/cards/${hidden}.png`} />
                {dealerCards.map((card) => {
                    return <img className='card' src={`${process.env.PUBLIC_URL}/cards/${card}.png`} />
                })}
            </div>
            <div>
                <div className='you-and-money-div'>
                    <div className='your-total-div'>
                        <h2 className='your-total-head'>Your Total:</h2>
                        <h3>{playerSum}</h3>
                    </div>

                    {/* <div className='pot-total-div'> */}
                    <div classNAme='pot-div'>
                        <h2 className='pot-head'>Pot:</h2>
                        <h3>{pot}</h3>
                    </div>

                    {/* <h2></h2> */}

                    {/* </div> */}
                    <div className='your-money-div'>
                        <h2 className='your-money-head'>Your Money: </h2>
                        <h3>{playerMoney}</h3>
                    </div>

                </div>

                {/* <p>{playerSum}</p> */}
                {/* <p>Player Cards: {playerFirstCard}, {playerSecondCard}, </p> */}
                <div className='players-cards-div'>
                    {playerCards.map((card) => {
                        return <img className='card' src={`${process.env.PUBLIC_URL}/cards/${card}.png`} />



                    })}
                    {/* <img className='card' src={`${process.env.PUBLIC_URL}/cards/${playerFirstCard}.png`} />
                    <img className='card' src={`${process.env.PUBLIC_URL}/cards/${playerSecondCard}.png`} />
                    {hitCount && <img className='card' src={`${process.env.PUBLIC_URL}/cards/${hitCard}.png`} />} */}
                    {/* {hitCount = 2 ? <img className='card' src={`${process.env.PUBLIC_URL}/cards/${hitCard}.png`}/> : null} */}

                </div>

            </div>
            <h4>{message}</h4>

            {/* <div id="your-cards"></div> */}
            <div className='blackjack-buttons'>
                <div className='action-buttons-div'>
                    <button className='button' id="hit" onClick={hit}>Hit</button>
                    <button className='button' id="stay" onClick={stay}>Stay</button>
                </div>
                <div className='player-place-bet-div'>
                    {/* <button id="deal" onClick={bet}>Bet</button> */}

                    <form>
                        {/* onSubmit={()=>{
                    }} */}
                        <input type="text" className="bet-input" placeholder="Enter bet" onChange={(event) => setBet(event.target.value)} />
                    </form>
                    {/* <button type="submit" onClick={betButton} className="btn btn-primary btn-lg btn-block centered w-25 shadow">
                        Submit
                    </button> */}
                    <button id="deal" className='button' onClick={betButton}>Bet</button>


                </div>
                <div className='new-hand-button-div'>
                    <button className='button' onClick={newHand}>New Hand</button>
                </div>
            </div>

            {/* <p>{message}</p> */}
        </div>


    )

}



export default BlackJack

