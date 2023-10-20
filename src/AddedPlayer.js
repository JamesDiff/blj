import React, { useEffect, useState } from "react";


// const AddedPlayer = ({getValue, setDeck}) => {

//     useEffect(() => {
//         AssignAdditionalPlayerCards();
//     })

//     const [additionalPlayerCards, setAdditionalPlayerCards] = useState([]);
//     const [additionalPlayerSum, setAdditionalPlayerSum] = useState(0);
//     const [addedPlayerBet, setAddedPlayerBet] = useState(0);
//     const [addedPlayerMoney, setAddedPlayerMoney] = useState(1000);


//     function AssignAdditionalPlayerCards(deck) {

//         let cards = deck;

//         let randomIndex = Math.floor(Math.random() * 52);

//         let card1 = cards[randomIndex];
//         console.log("CARD 1 WITHIN ASSIGN PLAYER CARDS: ", card1)
//         cards.splice(randomIndex, 1);

//         let card2 = cards[randomIndex];
//         console.log("CARD 2 FROM WITHIN ASSIGN PLAYER CARDS: ", card2)
//         cards.splice(randomIndex, 1);

//         let newPlayerSum = getValue(card1) + getValue(card2);

//         setAdditionalPlayerSum(newPlayerSum);
//         console.log("PLAYER SUM: ", additionalPlayerSum);

//         setAdditionalPlayerCards([card1, card2]);

//         setDeck(cards);

//         console.log("DECK AT END OF ASSIGN PLAYER CARDS: ", deck)

//     }


//     return (
//         <div>
//             <div className='your-money-div'>
//                 <h2 className='your-money-head'>Player 2 Money: </h2>
//                 <h3>{addedPlayerMoney}</h3>
//             </div>
//             <div id="additional-player-cards">
//                 {additionalPlayerCards.map((card) => {
//                     return <img className='card' src={`${process.env.PUBLIC_URL}/cards/${card}.png`} />
//                 })}
//             </div>
//         </div>
//     )

// }

