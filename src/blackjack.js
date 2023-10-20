import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

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
    const [playerMoney, setPlayerMoney] = useState(500);
    const [playerBet, setPlayerBet] = useState(5);
    const [pot, setPot] = useState(0);
    const [bet, setBet] = useState(0);
    const [betPlaced, setBetPlaced] = useState(false);
    const [addPlayer, setAddPlayer] = useState(false);
    const [additionalPlayerCards, setAdditionalPlayerCards] = useState([]);
    const [additionalPlayerSum, setAdditionalPlayerSum] = useState(0);
    const [addedPlayerMoney, setAddedPlayerMoney] = useState(500);

    const [showAddPlayer, setShowAddPlayer] = useState(true);

    const [basicMessage, setBasicMessage] = useState('');

    const [gameWithTips, setGameWithTips] = useState(false);

    const [player2Results, setPlayer2Results] = useState("...");


    useEffect(() => {
        console.log("===========================================")
        start();
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
        // console.log("NEW DECK WITHIN START: ", newDeck.length);
        let updatedDeck = getDealerCards(newDeck);
        // console.log("Deck AFTER DEALER CARDS: ", updatedDeck.length);
        let finalUpdatedDeck = AssignPlayerCards(updatedDeck);
        // console.log("Deck AFTER PLAYER CARDS: ", finalUpdatedDeck.length);
        setDeck(finalUpdatedDeck);
    }

    function getDealerCards(cards) {

        let randomIndex = Math.floor(Math.random() * cards.length);
        let workingHidden = cards[randomIndex];
        cards.splice(randomIndex, 1);

        let randomIndex2 = Math.floor(Math.random() * cards.length)
        let secondCard = cards[randomIndex2];
        cards.splice(randomIndex2, 1);

        setHidden(workingHidden);

        let theSecondCardValue = getValue(secondCard, 0);

        let hiddenCardValue = getValue(workingHidden, theSecondCardValue);

        setDealerSum(theSecondCardValue + hiddenCardValue);

        setDealerCards([secondCard, workingHidden]);

        console.log("DEALER CARDS [0]: ", dealerCards[0]);

        return cards

    }

    function AssignPlayerCards(deck) {

        let cards = [...deck];
        console.log("CARDS FROM WITHIN ASSIGN PLAYER CARDS: ", cards);
        let randomIndex = Math.floor(Math.random() * cards.length);
        // console.log("RANDOM INDEX within Assign Player Cards: ", randomIndex)
        let card1 = cards[randomIndex];
        cards.splice(randomIndex, 1);

        let randomIndex2 = Math.floor(Math.random() * cards.length);
        let card2 = cards[randomIndex2];
        cards.splice(randomIndex2, 1);

        // console.log("RANDOM INDEX AND CARD ONE: ", randomIndex, card1);

        let cardOneValue = getValue(card1, playerSum);
        console.log("CARD ! VALUE: ", card1)
        let updatedSum = playerSum + cardOneValue;

        // console.log("RANDOM INDEX AND CARD TWO: ", randomIndex2, card2);

        let cardTwoValue = getValue(card2, updatedSum);
        console.log("CARD TWO VALUE WITHIN ASSIGN ADDITIONAL PLAYER AND UPDATED SUM: ", cardTwoValue, updatedSum);

        let newPlayerSum = cardOneValue + cardTwoValue;

        setPlayerSum(newPlayerSum);
        setPlayerCards([card1, card2]);

        if (gameWithTips) {
            giveBasicTips(newPlayerSum);
        }

        return cards;
    }

    function AssignAdditionalPlayerCards(deck) {

        console.log("DECK AT THE BEGINNING OF ASSIGN ADDITIONAL PLAYER CARDS: ", deck);
        // console.log("CRDS AT THE BEGINNING OF ASSIGN ADDITION PLAYER CARDS: ", cards);

        let cards = [...deck];

        let randomIndex = Math.floor(Math.random() * cards.length);

        let card1 = cards[randomIndex];
        cards.splice(randomIndex, 1);

        let card2 = cards[randomIndex];
        cards.splice(randomIndex, 1);

        let cardOneValue = getValue(card1, playerSum);
        let updatedSum = playerSum + cardOneValue;

        let cardTwoValue = getValue(card2, updatedSum);

        let newPlayerSum = cardOneValue + cardTwoValue;

        setAdditionalPlayerSum(newPlayerSum);
        // console.log("ADDITIONAL PLAYER SUM: ", additionalPlayerSum);

        setAdditionalPlayerCards([card1, card2]);

        return cards

    }

    const reduceAce = (cards) => {
        let sum = getHandsValue(cards);
        for (let i = 0; i < cards.length; i++) {
            if (cards[i][0] === 'A' && sum > 21) {
                sum -= 10;
            }
        }

        return sum
    }

    function getHandsValue(cards) {
        let sum = 0;
        cards.forEach((card) => {
            sum += getValue(card);
        })
        return sum
    }

    const getValue = (card, sum) => {
        // console.log("FROM GET VALUE, CARD: ", card);

        let singleCardArray = card.split("-");

        let value = singleCardArray[0];

        if (isNaN(value)) {
            if (value == "A") {
                return 11;
                // } else if (value == "A" && sum <= 10) {
                //     return 11
            }
            return 10;
        }
        return parseInt(value);
    }

    // const testCards = ['A-S', 'A-C'];
    // console.log("REDUCE ACE TEST: ", reduceAce(testCards));

    // const testCards = ['A-S', '7-C'];
    // console.log("BASIC TIPS TEST: ", giveBasicTips(testCards));


    function dealerHit(cards, playerSum) {

        console.log("DEALER CARDS AT THE START OF DEALER HIT: ", dealerCards);

        console.log("INSIDE DEALER HIT: ", cards, playerSum);

        let workingDealerSum = dealerSum;
        let newDealerCards = [];

        while (playerSum > workingDealerSum && playerSum <= 21) {
            console.log("WITHIN DEALER HIT PLAYER SUM WORKING DEALEr SUM: ", playerSum, workingDealerSum);
            let randomIndex = Math.floor(Math.random() * cards.length);
            let newCard = cards[randomIndex];
            newDealerCards.push(newCard);
            cards.splice(randomIndex, 1);
            // console.log("NEW CARD IN DEALER HIT: ", newCard)
            let newCardValue = getValue(newCard, workingDealerSum);
            workingDealerSum += newCardValue;
        }

        //how is reduce ace being used - 
        //remove all instances of reduce ace except for one to try to isolate; only for dealer hit
        //putting code back to return values; don't return sum crested with reduce ace; console.log results of reduce ace
        //anymore instances of state management - 

        const newDealerSum = reduceAce(dealerCards.concat(newDealerCards));

        return {
            newCards: newDealerCards,
            cards,
            dealerSum: newDealerSum
        }

    }


    const stay = (player) => {

        let staySum = playerSum;

        if (!betPlaced) {
            setMessage("Place Bet");
            return;
        };

        // let hitResults = hit([...deck], { sum: player.sum, type: "" });
        // let dealerResults = dealerHit(hitResults.cards, hitResults.updatedSum);
        console.log("++++++++++++++++++++++++++++++++++")
        let dealerResults = dealerHit(deck, playerSum);
        console.log(dealerResults);

        setDealerSum(dealerResults.dealerSum);
        setDealerCards(dealerCards.concat(dealerResults.newCards));
        setCanHit(false);
        setShowDealerCard(true);

        const newPlayerSum = reduceAce(playerCards);

        declareWinner(newPlayerSum, dealerResults.dealerSum);

        setPlayerSum(newPlayerSum);

        if (addPlayer) {
            declareWinnerSecondPlayer();
        }

        setTimeout(() => {
            newHand();
        }, 2500);
    }

    function hit(cards, player) {

        if (player.sum > 21) {
            setMessage("You can't hit")
            return;
        }

        let randomIndex = Math.floor(Math.random() * cards.length);
        let randomCard = cards[randomIndex];
        cards.splice(randomIndex, 1);
        // console.log("RANDOM CARD IN HIT: ", randomCard)

        let sumCount = player.sum + getValue(randomCard);

        const newPlayerSum = reduceAce(playerCards.concat(randomCard));

        if (newPlayerSum > 21) {
            stay();
        }

        console.log("PLAYER.SUM FROM HIT: ", player.sum);
        console.log("RANDOM CARD VALUE FROM HIT: ", getValue(randomCard));

        return {
            newCard: randomCard,
            updatedSum: newPlayerSum,
            cards
        }
    }

    function handleHitClick() {

        if (!betPlaced) {
            setMessage("Place Bet");
            return;
        }

        if (playerSum > 21) {
            setMessage("You can't hit");
            return;
        }

        let hitResults = hit([...deck], { sum: playerSum, type: "" });
        console.log("HIT RESULTS: ", hitResults)
        let dealerResults = dealerHit(hitResults.cards, hitResults.updatedSum);

        giveBasicTips(hitResults.updatedSum);

        const newPlayerSum = (hitResults.updatedSum);

        setPlayerSum(newPlayerSum);
        setPlayerCards([...playerCards, hitResults.newCard]);
        setDealerSum(dealerResults.dealerSum);
        setDealerCards(dealerCards.concat(dealerResults.newCards));
        setDeck(dealerResults.cards);
    }

    function declareWinner(playerSum, dealerSum) {

        if (playerSum > 21) {
            setMessage("Dealer Wins");
        }
        else if (dealerSum > 21) {
            setMessage("You Win!");
            addWinnings();
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

    //additionalPlayerSum

    function declareWinnerSecondPlayer() {
        if (additionalPlayerSum > 21) {
            setPlayer2Results("...loses.");
        }
        else if (dealerSum > 21) {
            setPlayer2Results("...wins!");
        }
        else if (additionalPlayerSum == dealerSum) {
            setPlayer2Results("...ties.");
        }
        else if (additionalPlayerSum > dealerSum) {
            setPlayer2Results("...wins!");
        }
        else if (playerSum < dealerSum) {
            setPlayer2Results("...loses.");
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

    function clearAdditionalPlayerHand() {
        setAdditionalPlayerCards([])
    }

    function clearPlayerSum() {
        setPlayerSum(0);
    }

    function clearDealerSum() {
        setDealerSum(0);
    }

    function clearAdditionalPlayerSum() {
        setAdditionalPlayerSum(0);
    }

    function newHand() {

        clearPlayerHands();
        clearDealerCards();
        clearAdditionalPlayerHand();
        clearPlayerSum();
        clearDealerSum();
        clearAdditionalPlayerSum();
        setPlayer2Results("...")
        setBetPlaced(false);
        setMessage("Enjoy the game!");
        setPot(0);
        setShowDealerCard(false);

        console.log("DECK LENGTH WITHIN newHAND: ", deck.length);

        // if (additionalPlayerCards && deck.length < 10) {
        //     setMessage("Time for a new deck!");
        //     setTimeout(() => {
        //         newGame();
        //         return;
        //     }, 2000);

        // } else if (!additionalPlayerCards && deck.length < 6) {
        //     setMessage("Time for a new deck!");
        //     setTimeout(() => {
        //         newGame();
        //         return;
        //     }, 1500);

        // }

        let newDeck = [...deck];
        console.log("DECK-LENGTH WITHIN NEW HAND: ", newDeck.length);
        let updatedDeck = getDealerCards(newDeck);
        // console.log("Deck AFTER DEALER CARDS: ", updatedDeck.length);
        let finalUpdatedDeck = AssignPlayerCards(updatedDeck);
        // console.log("Deck AFTER PLAYER CARDS: ", finalUpdatedDeck.length);
        setDeck(finalUpdatedDeck);

        if (addPlayer) {
            AssignAdditionalPlayerCards(finalUpdatedDeck);
        }
    }

    function newGame() {
        clearPlayerHands();
        clearDealerCards();
        clearAdditionalPlayerHand();
        clearPlayerSum();
        clearDealerSum();
        clearAdditionalPlayerSum();
        setPlayer2Results("...")
        setBetPlaced(false);
        setMessage("Enjoy the game!");
        setPot(0);
        setShowDealerCard(false);
        start();

    }

    function betButton() {
        setBetPlaced(true);
        setPot(parseInt(pot) + parseInt(bet));
        setPlayerMoney(playerMoney - bet);
        setShowAddPlayer(false);
    }

    function addWinnings() {
        setPlayerMoney(playerMoney + (pot * 2));
    }

    function returnBet() {
        setPlayerMoney(playerMoney + parseInt(bet));
    }

    function addAPlayer() {
        setAddPlayer(true);
        console.log("DECK WITHIN ADD A PLAYER: ", deck)
        AssignAdditionalPlayerCards(deck);
    }

    function removePlayer() {
        setAddPlayer(false);
        setAdditionalPlayerCards([]);
    }


    function giveBasicTips(sum) {

        console.log("DEALER CARDS WITHIN GIVEBASICTIPS: ", dealerCards);

        console.log("PLAYER SUM WITHIN GIVE BASIC TIPS: ", sum);
        console.log("DEALER CARDS [0][1] IN GIVE BASIC TIPS: ", dealerCards[0][0]);
        console.log("DEALER CARDS [0][1] IN GIVE BASIC TIPS WITH GET VALUE: ", getValue(dealerCards[0][0]));

        setGameWithTips(true);

        if (sum === 18 && getValue(playerCards[0][0]) === 11 | getValue(playerCards[1][0]) === 11
            && getValue(playerCards[0][0]) === 7 | getValue(playerCards[1][0]) === 7) {
            setBasicMessage("Hit Bro BRO BROOOO");
        // } else if (getValue(playerCards[0][0]) === 11 | getValue(playerCards[1][0]) === 11
        //     && getValue(playerCards[0][0]) <= 6 | getValue(playerCards[1][0]) <= 6) {
        //     setBasicMessage("Hit Bro HIIIT");

        } else if (sum >= 16) {
            setBasicMessage("Stand");
        } else if (sum <= 12) {
            setBasicMessage("Hit");
        } else if (sum === 13 || sum === 14 || sum === 15 || sum === 16 && getValue(dealerCards[0][0]) <= 6) {
            setBasicMessage("Stand Bro")
        } else if (sum === 13 || sum === 14 || sum === 15 || sum === 16 && getValue(dealerCards[0][0]) > 6) {
            setBasicMessage("Hit Bro")
        }
    }

    return (

        <div className="blackjack-container">
            <div className="blackjack-banner">
                {!addPlayer ? <button className='blackjack-banner-button' onClick={addAPlayer}>Add A Player</button> : <button className='blackjack-banner-button' onClick={removePlayer}>Remove Player</button>}
                <div>
                    <h1 className="blackjack-head">BlackjackBro</h1>
                    <h4 className="blackjack-message">{message}</h4>
                </div>
                {!gameWithTips ? <button className='blackjack-banner-button' onClick={() => giveBasicTips(playerSum)}>Give Basic Tips</button> :
                    <button className='blackjack-banner-button' onClick={() => giveBasicTips(playerSum)}>{basicMessage}</button>
                    // <div className="conditional-tip-container" >
                    //     <div className='conditional-tip-render'>
                    //         <div className='trying-to-make-box-around-tips' onClick={noTips}>
                    //             <h4>Basic Strategy</h4>
                    //             <p>{basicMessage}</p>
                    //         </div>

                    //     </div>
                    // </div>
                }
            </div>
            <div className='blackjack-and-tips-container'>
                <div className='blackjack-container-no-tips'>
                    <div className='main-game-container'>
                        <div className="dealers-container">
                            <div>
                                <h3 className='dealer-head'>Dealer</h3>
                                {/* <h5>Dealer: {dealerSum}</h5> */}
                                <div id="dealer-cards">
                                    <img className='back-card' src={!showDealerCard ? `${process.env.PUBLIC_URL}/cards/back.png` : `${process.env.PUBLIC_URL}/cards/${hidden}.png`} />
                                    {dealerCards.map((card) => {
                                        if (card != hidden) {
                                            return <img className='card' src={`${process.env.PUBLIC_URL}/cards/${card}.png`} />

                                        }
                                        // return <img className='card' src={`${process.env.PUBLIC_URL}/cards/${card}.png`} />
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className='players-container'>
                            {addPlayer ?
                                <div className='added-player-div'>
                                    <div className='player-two-money-div'>
                                        {/* <h3>Player 2 Sum: {additionalPlayerSum}</h3> */}
                                        <h3 className='your-money-head'>Player 2 </h3>
                                        <h3 className='player-sums'>{player2Results}</h3>
                                    </div>
                                    <div className="additional-player-cards">
                                        {additionalPlayerCards.map((card) => {
                                            return <img className='card' src={`${process.env.PUBLIC_URL}/cards/${card}.png`} />
                                        })}
                                    </div>
                                </div>
                                : null}
                            {addPlayer ? <div className='pot-div'>
                                <h3 className='pot-head'>Your Wager:</h3>
                                <h3 className='player-sums'>{pot}</h3>
                            </div> : null}
                            <div className='player-div'>
                                <div className='you-and-money-div'>
                                    <div className='your-total-div'>
                                        <h3 className='your-total-head'>Your Total:</h3>
                                        <h3 className='player-sums'>{playerSum}</h3>
                                    </div>

                                    {/* <div className='pot-total-div'> */}
                                    {!addPlayer ? <div className='pot-div'>
                                        <h3 className='pot-head'>Your Wager:</h3>
                                        <h3 className='player-sums'>{pot}</h3>
                                    </div> : null}

                                    {/* <h2></h2> */}

                                    {/* </div> */}
                                    <div className='your-money-div'>
                                        <h3 className='your-money-head'>Your Money: </h3>
                                        <h3 className='player-sums'>{playerMoney}</h3>
                                    </div>

                                </div>
                                <div className='players-cards-div'>
                                    {playerCards.map((card) => {
                                        return <img className='card' src={`${process.env.PUBLIC_URL}/cards/${card}.png`} />
                                        //instead of process.env.etc the beginning part of the amazon s3 url /{card}.png
                                        //make sure name of card matchs what is saved on s3
                                    })}

                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                {/* {gameWithTips ? <div className="conditional-tip-container" >
                    <div className='conditional-tip-render'>
                        <div className='trying-to-make-box-around-tips'>
                            <h4>Basic Strategy Play</h4>
                            <p>{basicMessage}</p>
                        </div>

                    </div>

                </div> : null} */}
            </div>
            <div className='blackjack-buttons'>
                {/* <h5>{message}</h5> */}

                <div className='player-place-bet-div'>
                    <form>
                        <input type="text" className="bet-input" placeholder="Enter bet" onChange={(event) => setBet(event.target.value)} />
                    </form>
                    <button id="deal" className='button' onClick={betButton}>Bet</button>
                    <button className='button' id="hit" onClick={handleHitClick}>Hit</button>
                    <button className='button' id="stay" onClick={stay}>Stand</button>
                </div>
                <div className='action-buttons-div'>
                    {/* <button className='button' id="hit" onClick={handleHitClick}>Hit</button> */}
                    {/* <button className='button' id="stay" onClick={stay}>Stay</button> */}
                    <button className='button' id="stay" onClick={newGame}>New Game</button>

                </div>

            </div>

        </div>

    )
}

//host images online?
//amazon s3; make sure image title is same as name in public folder
//ways to reduce rerendering?

//EC2

//highlight react; what were the challenges faces and how were they resolved?
//situation
// task- trying to manage state issues; action/approach- cleaned up functions; the steps taken to resolve result- the outcome
//more clean-up don't need to define functionds that take a parameter within the blackjack app; as long as you pass in argument and it returns something (reduceAce, getValue, others- define in different file and export them)
//differende between setters and logic functions
export default BlackJack


