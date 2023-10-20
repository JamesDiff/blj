import React from "react";

const ReduceAce = (playerSum, playerAceCount) => {
    while(playerSum > 21 && playerAceCount > 0){
        playerSum -= 10;
        playerAceCount -=1;
    }
    return playerSum
}

export default ReduceAce;