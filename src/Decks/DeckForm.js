import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createDeck, updateDeck } from "../utils/api";


function DeckForm({ editDesc = "", editName = "", editId = "", isNew }) {

    const [name, setName] = useState("");
	const [desc, setDesc] = useState("");
	const newDeck = { name: name, description: desc };
	const upDeck = { name: name, description: desc, id: editId };
	const history = useHistory();

    // Event handlers for when changing the name & description of a deck.
	const handleNameChange = (event) => setName(event.target.value);
	const handleDescriptionChange = (event) => setDesc(event.target.value);

	useEffect(() => {
		setName(editName);
		setDesc(editDesc);
	}, [editName, editDesc]);

    // Event handler for when creating a deck
	const handleCreateSubmit = async function (event) {
		event.preventDefault();
		let result = await createDeck(newDeck);
		let deckId = result.id;
		history.push(`/decks/${deckId}`);
	};

    // Event handler for when editing a deck
    const handleEditSubmit = async function (event) {
		event.preventDefault();
		let result = await updateDeck(upDeck);
		let deckId = result.id;
		history.push(`/decks/${deckId}`);
	};

    return(
        <div>
			<form
                /* Determine which event handler to use when form is submitted */
				onSubmit={isNew ? handleCreateSubmit : handleEditSubmit}
				className="form-group"
			>
                <label className="col-form-label" htmlFor="deckName">
                    Name
                </label>
                <input
                    id="deckName"
                    type="text"
                    name="name"
                    onChange={handleNameChange}
                    className="form-control"
                    value={name}
                    placeholder="Deck Name"
                />
                <br></br>

                <label htmlFor="deckDescription">
                    Description
                </label>
                <textarea
                    id="deckDescription"
                    name="description"
                    onChange={handleDescriptionChange}
                    className="form-control"
                    value={desc}
                    rows="3"
                    placeholder="Deck Description"
                />
                 <br></br>

                <button 
                    className="btn btn-secondary" 
                    /* On Click, use anonymous event handlerto go back one page in history */
					onClick={(e) => {
						e.preventDefault();
						history.go(-1);
					}}
                >
                    Cancel{" "}
                </button>
                <button className="btn btn-primary ml-2" type="submit">
                    Submit
                </button>    
            </form> {/* End of Form for modifying or creating a deck */}
        </div>
        
    );

}

export default DeckForm;