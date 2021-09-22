import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { readDeck } from "../utils/api";

/* Deck Structure Example
    {
        "id": 1,
        "name": "Rendering in React",
        "description": "React's component structure allows for quickly building a complex web application that relies on DOM manipulation. "
    }
*/

function Deck() {
    // Create useState object to hold deck
    const [deck, setDeck] = useState({})
    // Pull parameter information from the URL
    const params = useParams();
    // Obtain the deckId from the parameters
    const deckId = params.deckId;

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        async function fetchDeck() {
            // Use the deckId and the AbortController's signal to fetch the current deck.
            const theDeck = await readDeck(deckId, signal);
            // Push the obtained deck into the useState object
            setDeck(theDeck);
        }

        fetchDeck();

        return () => abortController.abort();
    }, [deckId]);

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {deck.name}
                    </li>
                </ol>
            </nav>
            <h1>This is a placeholder, amigo!</h1>
        </div>
    );
}

export default Deck;