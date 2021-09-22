import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import { deleteDeck, readDeck } from "../utils/api";

import CardCounter from "./Cards/CardCounter.js";

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
    // Create history variable to be used for buttons that go back to Home.
    const history = useHistory();

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

    async function deleteDeckHandler(){
        const abortController = new AbortController();
        const signal = abortController.signal;
        if(
          window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
        ){
          await deleteDeck(deckId, signal)
          history.push("/")
        }
        return () => abortController.abort();
    }

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
            <div className="card mb-5" style={{width: "50rem"}}>
                <div className="card-body">
                    <h5 className="card-title">{deck.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        <CardCounter deckId={deckId} />
                    </h6>
                    <p className="card-text">{deck.description}</p>
                    <Link to={`/decks/${deckId}/Edit`} className="card-link">
                        <button class="btn btn-secondary">
                            <span className="oi oi-pencil mr-1"></span>
                            Edit
                        </button>
                    </Link>
                    <Link to={`/decks/${deckId}/study`} className="card-link">
                        <button className="btn btn-primary">
                            <span className="oi oi-book mr-1"></span>
                            Study
                        </button>
                    </Link>
                    <Link to={`/decks/${deckId}/cards/new`} className="card-link">
                        <button className="btn btn-primary">
                            <span className="oi oi-plus mr-2"></span>
                            Add Cards
                        </button>
                    </Link>
                    <button className="btn btn-danger ml-5" onClick={deleteDeckHandler}>
                        <span className="oi oi-trash"></span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Deck;