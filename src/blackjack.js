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
    const [pot, setPot] = useState(0);
    const [bet, setBet] = useState(0);
    const [betPlaced, setBetPlaced] = useState(false);
    const [addPlayer, setAddPlayer] = useState(false);
    const [additionalPlayerCards, setAdditionalPlayerCards] = useState([]);
    const [additionalPlayerSum, setAdditionalPlayerSum] = useState(0);

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
        // for (let i = 0; i < types.length; i++) {
        //     for (let j = 0; j < values.length; j++) {
        //         workingDeck.push(values[j] + "-" + types[i]);
        //     }
        // }

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
        let dealerResults = getDealerCards(newDeck);
        let assignPlayerResults = AssignPlayerCards(dealerResults.cards);
        // setDeck(finalUpdatedDeck);
        setDealerSum(dealerResults.newDealerSum);
        setDealerCards(dealerResults.newDealerCards);
        setPlayerSum(assignPlayerResults.newPlayerSum);
        setPlayerCards(assignPlayerResults.newPlayerCards);
        setDeck(assignPlayerResults.cards);

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

        // setDealerSum(theSecondCardValue + hiddenCardValue);

        // setDealerCards([secondCard, workingHidden]);

        return {
            cards,
            newDealerSum: theSecondCardValue + hiddenCardValue,
            newDealerCards: [secondCard, workingHidden]
        }

    }

    function AssignPlayerCards(deck) {

        let cards = [...deck];
        // console.log("CARDS FROM WITHIN ASSIGN PLAYER CARDS: ", cards);
        let randomIndex = Math.floor(Math.random() * cards.length);
        let card1 = cards[randomIndex];
        cards.splice(randomIndex, 1);

        let randomIndex2 = Math.floor(Math.random() * cards.length);
        let card2 = cards[randomIndex2];
        cards.splice(randomIndex2, 1);

        let cardOneValue = getValue(card1, playerSum);
        let updatedSum = playerSum + cardOneValue;

        let cardTwoValue = getValue(card2, updatedSum);
        let newPlayerSum = cardOneValue + cardTwoValue;

        // setPlayerSum(newPlayerSum);
        // setPlayerCards([card1, card2]);

        // if (gameWithTips) {
        //     giveBasicTips(newPlayerSum);
        // }
        // console.log("NEW PLAYER SUM WITHIN ASSIGN PLAYER CARDS: ", newPlayerSum)
        // if(newPlayerSum === 21){
        //     declareBlackJack();
        // }
        return {
            cards,
            newPlayerSum,
            newPlayerCards: [card1, card2]
        }
    }

    function AssignAdditionalPlayerCards(deck) {

        // console.log("DECK AT THE START OF ASSIGN ADDITIONAL PLAYER CARDS: ", deck)

        let cards = [...deck];
        // console.log("CARDS AFTER ASSIGNMENT IN ASSIGN ADDITIONAL PLAYER CARDS: ", cards)


        let randomIndex = Math.floor(Math.random() * cards.length);
        let card1 = cards[randomIndex];
        cards.splice(randomIndex, 1);

        let randomIndex2 = Math.floor(Math.random() * cards.length);
        let card2 = cards[randomIndex2];

        cards.splice(randomIndex2, 1);

        let cardOneValue = getValue(card1, playerSum);
        let updatedSum = playerSum + cardOneValue;

        let cardTwoValue = getValue(card2, updatedSum);

        let newPlayerSum = cardOneValue + cardTwoValue;


        return {
            cards: cards,
            additionalPlayerSum: newPlayerSum,
            additionalPlayerCards: [card1, card2]
        }

    }

    const reduceAce = (cards) => {
        console.log("CARDS WITHIN REDUCE ACE: ", cards);
        let sum = getHandsValue(cards);
        for (let i = 0; i < cards.length; i++) {
            if (cards[i][0] === 'A' && sum > 21) {
                sum -= 10;
            }
        }

        return sum
    }

    function getHandsValue(cards) {

        // console.log("CARDS WITHIN GET HANDS VALUE: ", cards)

        let sum = 0;
        cards.forEach((card) => {
            // console.log("CARD WITHIN FOR EACH LOOP OF GET HANDS VALUE: ", card)
            sum += getValue(card);
        })
        return sum
    }

    const getValue = (card, sum) => {

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

        let workingDealerSum = dealerSum;
        let newDealerCards = [];

        while (playerSum > workingDealerSum && playerSum <= 21) {
            let randomIndex = Math.floor(Math.random() * cards.length);
            let newCard = cards[randomIndex];
            newDealerCards.push(newCard);
            cards.splice(randomIndex, 1);
            let newCardValue = getValue(newCard, workingDealerSum);
            workingDealerSum += newCardValue;
        }
        //how is reduce ace being used - 
        //remove all instances of reduce ace except for one to try to isolate; only for dealer hit
        //putting code back to return values; don't return sum crested with reduce ace; console.log results of reduce ace
        //anymore instances of state management - 
        const newDealerSum = reduceAce(dealerCards.concat(newDealerCards));

        let secondPlayerResults;

        if (addPlayer) {
            secondPlayerResults = secondPlayerHit();
            setAdditionalPlayerCards(additionalPlayerCards.concat(secondPlayerResults.additionalPlayerCards));
            setAdditionalPlayerSum(secondPlayerResults.additionalPlayerSum);
        }

        return {
            newCards: newDealerCards,
            cards,
            dealerSum: newDealerSum
        }

    }

    function secondPlayerHit() {

        let cards = deck;

        let workingPlayerSum = additionalPlayerSum;
        let newSecondPlayerCards = [];

        while (workingPlayerSum < 16) {
            let randomIndex = Math.floor(Math.random() * cards.length);
            let newCard = cards[randomIndex];
            // console.log("NEW CARD WITHIN SECOND PLAYER HIT: ", newCard)
            newSecondPlayerCards.push(newCard);
            cards.splice(randomIndex, 1);
            let newCardValue = getValue(newCard, workingPlayerSum);
            workingPlayerSum += newCardValue;
        }

        const newAdditionalPlayerSum = reduceAce(additionalPlayerCards.concat(newSecondPlayerCards));

        // setAdditionalPlayerCards([...additionalPlayerCards, ...newSecondPlayerCards]);
        // console.log("ADDITIONAL PLAYER CARDS IN SECOND PLAYER CARD HIT: ", additionalPlayerCards)

        return {
            additionalPlayerCards: newSecondPlayerCards,
            cards,
            additionalPlayerSum: newAdditionalPlayerSum
        }

    }

    const stay = (player) => {
        // let staySum = playerSum;
        if (!betPlaced) {
            setMessage("Place Bet");
            return;
        };

        if (player.sum > 21) {
            return;
        }

        // if (message === "Dealer Wins" || message === "You win!") {
        //     // setMessage("Place Bet");
        //     return;
        // };

        let secondPlayerResults;
        if (addPlayer) {
            secondPlayerResults = secondPlayerHit();
            setAdditionalPlayerCards(additionalPlayerCards.concat(secondPlayerResults.additionalPlayerCards));
            setAdditionalPlayerSum(secondPlayerResults.additionalPlayerSum);
        }
        console.log("++++++++++++++++++++++++++++++++++")

        const deckAfterSecondPlayer = addPlayer ? secondPlayerResults.cards : deck;
        let dealerResults = dealerHit(deckAfterSecondPlayer, playerSum);
        // console.log(dealerResults);

        setDealerSum(dealerResults.dealerSum);
        setDealerCards(dealerCards.concat(dealerResults.newCards));
        setCanHit(false);
        setShowDealerCard(true);

        // const deckUpdate = addPlayer ? secondPlayerResults.cards : dealerResults.cards;

        const newPlayerSum = reduceAce(playerCards);

        declareWinner(newPlayerSum, dealerResults.dealerSum);

        setPlayerSum(newPlayerSum);
        setDeck(dealerResults.cards);

        if (addPlayer) {
            declareWinnerSecondPlayer(secondPlayerResults.additionalPlayerSum, dealerResults.dealerSum);
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

        const newPlayerSum = reduceAce(playerCards.concat(randomCard));

        // if (newPlayerSum > 21) {
        //     stay();
        // }

        return {
            newCard: randomCard,
            updatedSum: newPlayerSum,
            cards
        }
    }

    function handleHitClick() {

        // console.log("PLAYER SUM AT THE START OF HANDLE HIT CLICK: ", playerSum);

        if (!betPlaced) {
            setMessage("Place Bet");
            return;
        }
        if (playerSum > 21) {
            setMessage("You can't hit");
            return;
        }

        let hitResults = hit([...deck], { sum: playerSum, type: "" });
        // console.log("HIT RESULTS: ", hitResults)
        // console.log("PLAYERSUM IN HANDLE HIT CLICK AFTER HIT RESULTS: ", playerSum)
        let dealerResults = dealerHit(hitResults.cards, hitResults.updatedSum);

        giveBasicTips(hitResults.updatedSum, ); 
        //DEALER Card VALUE NEEDS TO BE PASSED AS SECOND ARGUMENT

        const newPlayerSum = (hitResults.updatedSum);

        setPlayerSum(newPlayerSum);
        setPlayerCards([...playerCards, hitResults.newCard]);
        setDealerSum(dealerResults.dealerSum);
        setDealerCards(dealerCards.concat(dealerResults.newCards));
        setDeck(dealerResults.cards);

        // if (addPlayer) {
        //     secondPlayerHit();
        // }
    }

    function declareBlackJack() {
        setMessage("Natural Blackjack! You win!");
        setPlayerMoney(playerMoney + (pot * 1.5));

        clearPlayerHands();
        clearDealerCards();
        clearAdditionalPlayerHand();
        clearPlayerSum();
        clearDealerSum();
        clearAdditionalPlayerSum();
        setPlayer2Results("...")
        setBetPlaced(false);
        setMessage("Enjoy the game!");
        setPot(5);
        setShowDealerCard(false);

        if (additionalPlayerCards && deck.length < 10) {
            setMessage("Time for a new deck!");
            setTimeout(() => {
                newGame();
                return;
            }, 2000);

        } else if (!additionalPlayerCards && deck.length < 6) {
            setMessage("Time for a new deck!");
            setTimeout(() => {
                newGame();
                return;
            }, 1500);

        }

        let newDeck = [...deck];
        console.log("DECK-LENGTH WITHIN NEW HAND: ", newDeck.length);
        let dealerResults = getDealerCards(newDeck);
        let assignPlayerResults= AssignPlayerCards(dealerResults.cards);
        setPlayerSum(assignPlayerResults.newPlayerSum);
        setPlayerCards(assignPlayerResults.newPlayerCards);
        setDeck(assignPlayerResults.cards);
        setDealerCards(dealerResults.newDealerCards);
        setDealerSum(dealerResults.newDealerSum);

        if (addPlayer) {
            AssignAdditionalPlayerCards(assignPlayerResults.cards);
        }
    }

    function declareWinner(playerSum, dealerSum) {

        if (playerSum > 21) {
            setMessage("Dealer Wins");
        }
        else if (playerSum === 21 && playerCards.length === 2) {
            setMessage("Natural Blackjack! You win!");
            addWinnings();
        }
        else if (playerSum === 21 && playerCards.length === 2) {
            setMessage("Blackjack! You win!");
            addWinnings();
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

    function declareWinnerSecondPlayer(additionalPlayerSum, dealerSum) {
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

        if (addPlayer && deck.length < 12) {
            setMessage("Time for a new deck!");
            setTimeout(() => {
                newDeck();
                return;
            }, 2000);
        } else 
        if (additionalPlayerCards.length === 0 && deck.length < 7) {
            setMessage("Time for a new deck!");
            setTimeout(() => {
                newDeck();
                return;
            }, 1500);
        } else {
        clearPlayerHands();
        clearDealerCards();
        clearPlayerSum();
        clearDealerSum();
        clearAdditionalPlayerSum();
        setPlayer2Results("...")
        setBetPlaced(false);
        setMessage("Enjoy the game!");
        setPot(0);
        setShowDealerCard(false);
        
        let newDeck = [...deck];
        // console.log("DECK-LENGTH WITHIN NEW HAND: ", newDeck.length);
        let dealerResults = getDealerCards(newDeck);
        // console.log("Deck AFTER PLAYER CARDS: ", finalUpdatedDeck.length);
        let assignPlayerResults = AssignPlayerCards(dealerResults.cards);
        
        let dealerCardValue = getValue(dealerResults.newDealerCards[0]);
        giveBasicTips(assignPlayerResults.newPlayerSum, dealerCardValue)


        setPlayerSum(assignPlayerResults.newPlayerSum);
        setPlayerCards(assignPlayerResults.newPlayerCards);
        setDealerCards(dealerResults.newDealerCards);
        setDealerSum(dealerResults.newDealerSum);
  
        // setDeck(assignPlayerResults.cards);

        let additionalPlayerResults;

        if (addPlayer) {
            additionalPlayerResults = AssignAdditionalPlayerCards(assignPlayerResults.cards);
            setAdditionalPlayerSum(additionalPlayerResults.additionalPlayerSum);
            setAdditionalPlayerCards(additionalPlayerResults.additionalPlayerCards);
        }

        const finalFinalUpdatedDeck = additionalPlayerResults ? additionalPlayerResults.cards : assignPlayerResults.cards;
        setDeck(finalFinalUpdatedDeck);}

    }

    function newDeck(){
        console.log("HEY BROTHER, IT'S TIME FOR A NEW DECK")
        clearPlayerHands();
        clearDealerCards();
        clearAdditionalPlayerHand();
        // clearPlayerSum();
        // clearDealerSum();
        setBetPlaced(false);
        setMessage("Enjoy the game!");
        setPot(0);
        setShowDealerCard(false);
        // start();

        let newDeck = shuffleDeck(buildDeck());
        let dealerResults = getDealerCards(newDeck);
        let assignPlayerResults = AssignPlayerCards(dealerResults.cards);

        let dealerCardValue = getValue(dealerResults.newDealerCards[0]);
        giveBasicTips(assignPlayerResults.newPlayerSum, dealerCardValue)

        setDealerCards(dealerResults.newDealerCards);
        setDealerSum(dealerResults.newDealerSum);
        setPlayerSum(assignPlayerResults.newPlayerSum);
        setPlayerCards(assignPlayerResults.newPlayerCards);
        let additionalPlayerResults;

        if (addPlayer) {
            additionalPlayerResults = AssignAdditionalPlayerCards(assignPlayerResults.cards);
            setAdditionalPlayerSum(additionalPlayerResults.additionalPlayerSum);
            setAdditionalPlayerCards(additionalPlayerResults.additionalPlayerCards);
        }

        const finalFinalUpdatedDeck = additionalPlayerResults ? additionalPlayerResults.cards : assignPlayerResults.cards;
        setDeck(finalFinalUpdatedDeck);


    }

    function newGame() {
        console.log("HEY BROTHER, IT'S THE NEEEEEEEEEEEEEEEWW GAME")
        clearPlayerHands();
        clearDealerCards();
        clearAdditionalPlayerHand();
        clearPlayerSum();
        clearDealerSum();
        clearAdditionalPlayerSum();
        setAddPlayer(false);
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
        const additionalPlayerResults = AssignAdditionalPlayerCards(deck);
        setAdditionalPlayerCards(additionalPlayerResults.additionalPlayerCards);
        setAdditionalPlayerSum(additionalPlayerResults.additionalPlayerSum);
        setDeck(additionalPlayerResults.cards);
    }

    function removePlayer() {
        setAddPlayer(false);
        setAdditionalPlayerCards([]);
    }

    function giveBasicTips(sum, dealerCardValue) {
        setGameWithTips(true);

        // if (sum === 18 && getValue(playerCards[0][0]) === 11 | getValue(playerCards[1][0]) === 11
        //     && getValue(playerCards[0][0]) === 7 | getValue(playerCards[1][0]) === 7) {
        //     setBasicMessage("Hit Bro BRO BROOOO");
        // } else 
        // if (getValue(playerCards[0][0]) === 11 | getValue(playerCards[1][0]) === 11
        //     && getValue(playerCards[0][0]) <= 6 | getValue(playerCards[1][0]) <= 6) {
        //     setBasicMessage("Hit Bro HIIIT");
        if (sum >= 16) {
            setBasicMessage("Stand Bro");
        } else if (sum <= 12) {
            setBasicMessage("Hit Bro");
        // } else if(sum > 21){
        //     setBasicMessage("Sorry Bro")
        } else if ((sum === 13 || sum === 14 || sum === 15) && dealerCardValue <= 6) {
            // console.log("GET VALUE DEALER CARDS WITHIN IF: ", dealerCardValue)
            setBasicMessage("Stand Bro Bro")
        } else if ((sum === 13 || sum === 14 || sum === 15) && dealerCardValue > 6) {
            setBasicMessage("Hit Bro Bro")
        }

        //maybe write different function for hit; or just put conditional logic within the function; need more than just the dealers one card value

    }

    return (

        <div className="blackjack-container">
            <div className="blackjack-banner">
                {!addPlayer ? <button className='blackjack-banner-button' onClick={addAPlayer}>Add A Player</button> : <button className='blackjack-banner-button' onClick={removePlayer}>Remove Player</button>}
                <div>
                    <h1 className="blackjack-head">BlackjackBro</h1>
                    <h4 className="blackjack-message">{message}</h4>
                </div>
                {!gameWithTips ? <button className='blackjack-banner-button' onClick={() => {setGameWithTips(true); giveBasicTips(playerSum)}}>Give Basic Tips</button> :
                    <button className='blackjack-banner-button' onClick={() => giveBasicTips(playerSum)}>{basicMessage}</button>
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

            </div>
            <div className='blackjack-buttons'>
                {/* <h5>{message}</h5> */}

                <div className='player-place-bet-div'>
                    <div>
                        <input type="text" className="bet-input" placeholder="Enter bet" onChange={(event) => setBet(event.target.value)} />
                        <button type="button" id="deal" className='button' onClick={betButton}>Bet</button>
                        <button className='button' id="hit" onClick={handleHitClick}>Hit</button>
                        <button className='button' id="stay" onClick={stay}>Stand</button>
                    </div>
                </div>
                <div className='action-buttons-div'>            
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


