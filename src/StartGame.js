import React from "react";

import GetValue from "./GetValue";


const StartGame = (yourAceCount, checkAce, yourSum, Hit, dealerAceCount, dealerSum, deck, hidden, GetValue, Stay) => {
    // hidden = deck.pop(); 
    dealerSum += GetValue(hidden);
    dealerAceCount += checkAce(hidden);
    console.log("HIDDEN: ", hidden);
    console.log("DEALER SUM: ", dealerSum);
    while(dealerSum < 17) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += GetValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }

    console.log("DEALER SUM: ", dealerSum)

    for(let i = 0; i < 2; i++){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        yourSum += GetValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);


    }

    console.log("YOUR SUM: ", yourSum);
    // document.getElementById("hit").addEventListener("click", Hit);
    // document.getElementById("stay").addEventListener("click", Stay);
    // document.getElementById("deal").addEventListener("click", deal);

}

export default StartGame;