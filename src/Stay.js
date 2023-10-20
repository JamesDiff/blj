import React from "react";

import ReduceAce from "./ReduceAce";

const stay = (dealerSum, dealerAceCount, yourSum, yourAceCount, canHit, hidden, message) => {
    dealerSum = ReduceAce(dealerSum, dealerAceCount);
    yourSum = ReduceAce(yourSum, yourAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";

    // let message = "";
    if(yourSum > 21) {
        message = "Dealer Wins";
    }
    else if(dealerSum > 21){
        message = "You Win!"
    }
    else if(yourSum == dealerSum){
        message = "Tie"
    }
    else if(yourSum > dealerSum){
        message = "You Win!"
    }
    else if (yourSum < dealerSum){
        message = "Dealer Wins"
    }


}

export default stay