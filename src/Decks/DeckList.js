import React from "react";

import Deck from "./Deck.js";

/* Deck Structure Example
    {
        "id": 1,
        "name": "Rendering in React",
        "description": "React's component structure allows for quickly building a complex web application that relies on DOM manipulation. "
    }
*/

function DeckList({ decks }) {

    return (
        <div>
            {/* Loop through the array of decks and list them on the Home page. */}
            {decks.map((theDeck) => {
                return (
                    <Deck theDeck={theDeck} />
                );     
            })}
        </div>
    );

}

export default DeckList;