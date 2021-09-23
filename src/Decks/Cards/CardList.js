import React, { useEffect, useState } from "react";
import { listCards } from "../../utils/api/index";

import Card from "./Card.js";

/* Card Structure Example
    {
        "id": 1,
        "front": "Differentiate between Real DOM and Virtual DOM.",
        "back": "Virtual DOM updates are faster but do not directly update the HTML",
        "deckId": 1
    }
*/

function CardList( {cards} ) {

    const listOfCards = cards.map((card) => (
            <Card card={card} />
    ));

    return (
        <div>
            <h3>Cards</h3>
            {listOfCards}
        </div>
    );
}

export default CardList;