import React from "react";
import { Link, useHistory } from "react-router-dom";

import { deleteDeck } from "../utils/api";

import CardCounter from "./Cards/CardCounter";

/* Deck Structure Example
    {
        "id": 1,
        "name": "Rendering in React",
        "description": "React's component structure allows for quickly building a complex web application that relies on DOM manipulation. "
    }
*/

function DeckList({ decks }) {

    const history = useHistory();

    async function deleteDeckHandler({deckId}) {
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
            {/* Loop through the array of decks and list them on the Home page. */}
            {decks.map((theDeck) => {
                return (
                    <div className="card">
                        <div className="card-body">
                            {/* Use CardCounter component to count the cards*/}
                            <h6 className="mb-2 text-muted float-right" >
                                <CardCounter deckId={theDeck.id} />
                            </h6>
                            <h2>{theDeck.name}</h2>
                            <p>{theDeck.description}</p>
                            <Link to={`/decks/${theDeck.id}`}>
                                <button className="btn btn-secondary mr-2">
                                    <span className="oi oi-eye mr-2"></span>
                                    View
                                </button>
                            </Link>

                            <Link to={`/decks/${theDeck.id}/study`}>
                                <button className="btn btn-primary">
                                    <span className="oi oi-book mr-2"></span>
                                    Study
                                </button>
                            </Link>
                            <div className="float-right">
                                <button className="btn btn-danger" onClick={deleteDeckHandler}>
                                    <span className="oi oi-trash"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );

}

export default DeckList;