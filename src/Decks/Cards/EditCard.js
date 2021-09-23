   
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { readCard, readDeck } from "../../utils/api";

import CardForm from "./CardForm";

/* Card Structure Example
    {
        "id": 1,
        "front": "Differentiate between Real DOM and Virtual DOM.",
        "back": "Virtual DOM updates are faster but do not directly update the HTML",
        "deckId": 1
    }
*/

function EditCard() {

    const params = useParams();
    const deckId = params.deckId;
    const cardId = params.cardId;

	const [deck, setDeck] = useState({});
	const [card, setCard] = useState({});

	useEffect(() => {
		const abortController = new AbortController();
        const signal = abortController.signal;

		async function fetchDeck() {
			const response = await readDeck(deckId, signal);
			setDeck(response);
		}

		fetchDeck();

	}, [deckId]);

	useEffect(() => {
		const abortController = new AbortController();
        const signal = abortController.signal;

		async function fetchCard() {
			const response = await readCard(cardId, signal);
			setCard(response);
		}

		fetchCard();

	}, [cardId]);

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
                        Edit Card {cardId}
                    </li>
                </ol>
            </nav>
            <h2>Edit Card</h2>
			<CardForm
				deckId={deckId}
				editFront={card.front}
				editBack={card.back}
				cardId={cardId}
				isNew={false}
			/>
        </div>
    );

}

export default EditCard;