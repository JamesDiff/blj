import React from "react";

const Hit = (card, canHit, deck, yourSum, yourAceCount, getValue, checkAce, ReduceAce) => {

    console.log("CARD FROM HIT: ", card)

    if(!canHit){
        return;
    }

    let cardImg = document.createElement("img");

    for(let i = 0; i < deck.length; i++){
        let card = deck[i]
    }

    console.log("CARD: ", card)

    // let card = deck.pop();
    cardImg.src = `./cards/${card}.png`;
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);

    if(ReduceAce(yourSum, yourAceCount) > 21){
        canHit = false;
    }

}

export default Hit;