import React , { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { readDeck } from "../utils/api";

import DeckForm from "./DeckForm";

/* Deck Structure Example
    {
        "id": 1,
        "name": "Rendering in React",
        "description": "React's component structure allows for quickly building a complex web application that relies on DOM manipulation. "
    }
*/

function EditDeck() {

    // Obtain the deckId from the URL Parameters
    const params = useParams();
    const deckId = params.deckId;
    // Create Use State instance for Deck being changed
    const [deck, setDeck] = useState({});

    // This is the information that will pre-fill the Name and Description forms
    // on the Edit Deck screen.

    useEffect(() => {

        const abortController = new AbortController();
        const signal = abortController.signal;

        async function fetchDeck() {
          const deckData = await readDeck(deckId, signal);
          setDeck(deckData);
        }

        fetchDeck();

        return () => abortController.abort();
    
    }, [deckId]);

    return (
        <div>
            {/* Insert the code for the page navigation here */}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Edit Deck
                    </li>
                </ol>
            </nav>
            {/* Call the Deck Form HTML */}
            <DeckForm
                editDesc={deck.description}
                editName={deck.name}
                editId={deckId}
                isNew={false}
            />
        </div>
    );

}

export default EditDeck;