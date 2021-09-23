import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { deleteCard, listCards } from "../../utils/api/index";

/* Card Structure Example
    {
        "id": 1,
        "front": "Differentiate between Real DOM and Virtual DOM.",
        "back": "Virtual DOM updates are faster but do not directly update the HTML",
        "deckId": 1
    }
*/

function CardList({deckId}) {

    const [cards, setCards] = useState([]);

    const history = useHistory();
    const { url } = useRouteMatch();

    useEffect(() => {
        setCards([]);
        
        const abortController = new AbortController();
        const signal = abortController.signal;

        async function fetchCards() {
            const cardsData = await listCards(deckId, signal);
            setCards(cardsData);
        }

        fetchCards();
  
        return () => abortController.abort();

    }, []);

    const listOfCards = cards.map((card) => {
        return (
            <div className="card" key={card.id}>
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <p className="card-text">{card.front}</p>
                        </div> {/* End of Div with ClassName "col */}
                        <div className="col">
                            <p className="card-text">{card.back}</p>
                            <div className="float-right">
                                <button
                                    className="btn btn-secondary mx-1"
                                    onClick={() => history.push(`${url}/cards/${card.id}/edit`)}
                                >
                                    <span className="oi oi-pencil mr-1"></span>
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger mx-1"
                                    onClick={() => {
                                        const confirmDeleteCard = window.confirm(
                                            "Delete this card? \n \nYou will not be able to recover it."
                                        );
                                        if (confirmDeleteCard) {
                                            const abortController = new AbortController();
                                            const signal = abortController.signal;
                                            deleteCard(card.id, signal);
                                            history.go(0);
                                        }
                                    }}
                                >
                                    <span className="oi oi-trash"></span>
                                </button>
                            </div> {/* End of Div with ClassName "float-right" */}
                        </div> {/* End of Div with ClassName "col */}
                    </div> {/* End of Div with ClassName "row" */}
                </div> {/* End of Div with ClassName "card-body" */} 
            </div> // End of Div with ClassName "card"
        );
    });

    return (
        <div>
            {listOfCards}
        </div>
    );

}

export default CardList;