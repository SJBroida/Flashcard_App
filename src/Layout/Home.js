
import DeckList from "../Decks/DeckList.js";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listDecks } from "../utils/api";


function Home() {

    // Decks appear in the form of an array.
    const [ decks, setDecks ] = useState([]);

    useEffect(() => {
        setDecks([]);
  
        const abortController = new AbortController();
  
        async function fetchDecks() {
            const decksData = await listDecks(abortController.signal);
            setDecks(decksData);
        }

        fetchDecks();
  
        return () => abortController.abort();

    }, []);

    return (
        <div>
            <div className="actions">
                <Link to="/decks/new">
                    <button className="btn btn-secondary">
                        <span className="oi oi-plus mr-2"></span>
                        Create Deck
                    </button>
                </Link>
            </div>

            <div>
                You have fetched {decks.length} decks
                <DeckList decks={decks} />
            </div>
        </div>
    );

}
export default Home;