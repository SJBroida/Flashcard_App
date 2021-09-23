import React from "react";
import {Link, useHistory} from "react-router-dom"

import {deleteDeck} from "../utils/api"

import CardCounter from "./Cards/CardCounter.js";

function Deck({theDeck}){

    const history = useHistory();

    async function deleteDeckHandler() {
        const abortController = new AbortController();
        const signal = abortController.signal;
        if(
            window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
        ){
            await deleteDeck(theDeck.id, signal)
            history.push("/")
        }
    return () => abortController.abort();
    }

    return(
        <div className="card mb-5" style={{width: "50rem"}}>
            <div className="card-body">
                {/* Use CardCounter component to count the cards*/}
                <h6 className="card-subtitle mb-2 text-muted float-right">
                    <CardCounter cards={theDeck.cards} />
                </h6>
                <h5 className="card-title">{theDeck.name}</h5>
                <p className="card-text">{theDeck.description}</p>
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
            </div> {/* End of Class "card-body" */}
        </div>
    );

}

export default Deck;