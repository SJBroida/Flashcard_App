import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import StudyCards from "./Cards/StudyCards.js";
import { readDeck } from "../utils/api/index";

/* Deck Structure Example:
    {
        "id": 1,
        "name": "Rendering in React",
        "description": "React's component structure allows for quickly building a complex web application that relies on DOM manipulation. "
    }

    Path:
    /decks/:deckId/study	
    
    Description:
    allows the user to study the cards from a specified deck
*/

function StudyDeck() {
    // Create a useState object for the deck being studied
    const [deck, setDeck] = useState({});
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
    }, [deckId]); // End of useEffect hook

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
                        Study
                    </li>
                </ol>
            </nav>
            <h1>Study: {deck.name}</h1>
            <StudyCards selectedDeck={deck}/>
        </div>
    );

}

export default StudyDeck;

/*
import React, { useEffect } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import NotEnoughCards from "../Cards/NotEnoughCards";
import StudySession from "../Cards/StudySession";

export default function StudyDeck({ selectedDeck, setSelectedDeck }) {
  const { params } = useRouteMatch();
  const { deckId } = params;

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function loadDeck() {
      const deckFromAPI = await readDeck(deckId, signal);

      try {
        setSelectedDeck(deckFromAPI);
      } catch (error) {
        if (error !== "AbortError") {
          throw error;
        }
      }
    }
    loadDeck();

    return () => abortController.abort();
  }, [deckId]);

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{selectedDeck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h2>{selectedDeck.name}: Study</h2>
      {selectedDeck.cards.length < 3 ? (
        <NotEnoughCards cardsInDeck={selectedDeck.cards} />
      ) : (
        <StudySession cardsInDeck={selectedDeck.cards} />
      )}
    </div>
  );
}
*/