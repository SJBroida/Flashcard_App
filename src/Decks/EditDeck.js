import React , {useEffect, useState} from "react";
import {useHistory, useParams, Link} from "react-router-dom";

import {readDeck, updateDeck} from "../utils/api";

import DeckForm from "./DeckForm";

/* Deck Structure Example
    {
        "id": 1,
        "name": "Rendering in React",
        "description": "React's component structure allows for quickly building a complex web application that relies on DOM manipulation. "
    }
*/

function EditDeck() {

    const [currentDeck, setCurrentDeck] = useState({});
    // This is the information that will pre-fill the Name and Description forms
    // on the Edit Deck screen.
    const [editDeckData, setEditDeckData] = useState({});
    const history = useHistory();
    // Obtain the deckId from the URL Parameters
    const params = useParams();
    const deckId = params.deckId;

    const formType = "Edit Deck";

    useEffect(() => {

        const abortController = new AbortController();
        const signal = abortController.signal;

        async function fetchDecks() {
          const decksData = await readDeck(deckId, signal);
          setCurrentDeck(decksData);
        }

        fetchDecks();
        // Immediately after fetching the Deck, get the deck's name and description
        const {theName, theDescription} = currentDeck;
        // Create Initial Deck Object Data
        const initialEditDeckData = {
            name: theName,
            description: theDescription,
            id: deckId
        };
        // Set the Edit Deck Data to be passed
        setEditDeckData(initialEditDeckData);

        return () => abortController.abort();
    
    }, [deckId]);

    async function handleEditSubmit(event){
        event.preventDefault();
        const abortController = new AbortController();
        const signal = abortController.signal;

        await updateDeck(editDeckData, signal);
        history.push(`/decks/${deckId}`);
       
        return() => abortController.abort();
    }

    const handleEditChange = ({target}) => {
        setEditDeckData({
            ...editDeckData, 
            [target.name] : target.value
        });
    }

    async function handleEditSubmit(event){
        event.preventDefault();
        const abortController = new AbortController();
        const signal = abortController.signal;

        await updateDeck(editDeckData, signal);
        history.push(`/decks/${deckId}`);
       
        return() => abortController.abort();
    }

    const handleEditCancel = (e) => {
        e.preventDefault();
        history.push(`/decks/${deckId}`);
    }  

    return (
        <div>
            {/* Insert the code for the page navigation here */}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}>{currentDeck.name}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Edit Deck
                    </li>
                </ol>
            </nav>
            <DeckForm
                formType={formType} 
                handleEditChange={handleEditChange}
                handleEditSubmit={handleEditSubmit}
                editDeckData={editDeckData}
                editNamePlaceholder={currentDeck.name}
                editDescriptionPlaceholder={currentDeck.description}
                handleEditCancel={handleEditCancel}
            />
        </div>
    );

}

export default EditDeck;