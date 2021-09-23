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

function CardList( {deckId} ) {

    // Create a useState object for an array of cards.
    const [cards, setCards] = useState([]);

    useEffect( () => {
        setCards([]);
        
        const abortController = new AbortController();
        const signal = abortController.signal;

        async function fetchCards() {
            const cardsData = await listCards(deckId, signal);
            setCards(cardsData);
        }

        fetchCards();
  
        return () => abortController.abort();

    }, [deckId]);

    const listOfCards = cards.map((card) => (
            <Card card={card} deckId={deckId} />
    ));

    return (
        <div>
            <h3>Cards</h3>
            {listOfCards}
        </div>
    );
}

export default CardList;