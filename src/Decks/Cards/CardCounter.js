import React, { useEffect, useState } from "react";

import { listCards } from "../../utils/api"

/*
*   Function accepts a single deck object and returns JSX containing a number of how many cards are tied to that deck.
*/

function CardCounter({deck}) {

    // Cards appear in the form of an array.
    const [ cards, setCards ] = useState([]);

    useEffect(() => {
        setCards([]);
        
        const abortController = new AbortController();
  
        async function fetchCards() {
            const cardsData = await listCards(deck.id, abortController.signal);
            setCards(cardsData);
        }

        fetchCards();
  
        return () => abortController.abort();

    }, []);

    return (
        <div>
            <h3>{cards.length} cards</h3>
        </div>
    );

}

export default CardCounter;