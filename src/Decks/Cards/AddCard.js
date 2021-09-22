import React from "react";
import { useParams } from "react-router-dom";


/* Card Structure Example
    {
        "id": 1,
        "front": "Differentiate between Real DOM and Virtual DOM.",
        "back": "Virtual DOM updates are faster but do not directly update the HTML",
        "deckId": 1
    }
*/

function AddCard() {

    const params = useParams();
    const deckId = params.deckId;

    return (
        <div>
            <h1>This is a placeholder, brah!</h1>
        </div>
    );

}

export default AddCard;