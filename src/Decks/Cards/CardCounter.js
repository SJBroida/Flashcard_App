import React, { useEffect, useState } from "react";

import { listCards } from "../../utils/api"

/*
*   Function accepts a single deck object and returns JSX containing a number of how many cards are tied to that deck.
*/

function CardCounter({cards}) {
  
    return (
        <div>
            {cards ? cards.length : 0} cards
        </div>
    );

}

export default CardCounter;