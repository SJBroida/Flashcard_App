import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CardForm from "./CardForm";
import { readDeck } from "../../utils/api";


/* Card Structure Example
    {
        "id": 1,
        "front": "Differentiate between Real DOM and Virtual DOM.",
        "back": "Virtual DOM updates are faster but do not directly update the HTML",
        "deckId": 1
    }
*/

function AddCard() {
    // Create a UseState object to hold the deck the card goes to
    const [deck, setDeck] = useState({});
    // Obtain the Deck ID for this deck.
    const params = useParams();
    const deckId = params.deckId;

	useEffect(() => {
		const abortController = new AbortController();
        const signal = abortController.signal;

		async function fetchDeck() {
			const response = await readDeck(deckId, signal);
			setDeck(response);
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
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Add Card
                    </li>
                </ol>
            </nav>
            <h2>{deck.name}: Add Card</h2>
			<CardForm deckId={deckId} isNew={true} />
        </div>
    );

}

export default AddCard;