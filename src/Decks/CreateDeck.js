import React, {useState} from "react";
import {Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import DeckForm from "./DeckForm";

/* Deck Structure Example
    {
        "id": 1,
        "name": "Rendering in React",
        "description": "React's component structure allows for quickly building a complex web application that relies on DOM manipulation. "
    }
*/

function CreateDeck() {

    const formType = "Create Deck";
    const createNamePlaceholder = "Deck name";
    const createDescriptionPlaceholder = "Deck description";

    const initialFormData = {
        name: "",
        description: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const history = useHistory();

    const handleChange = ({target}) => {
        setFormData({
            ...formData,
            [target.name] : target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const {id} = await createDeck(formData);
        history.push(`/decks/${id}`);
    }

    const handleCreateCancel = (e) => {
        e.preventDefault();
        history.push("/");
    }

    return (
        <div>
            {/* Insert the code for the page navigation here */}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Create Deck
                    </li>
                </ol>
            </nav>
            <DeckForm 
                formType={formType}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                createNamePlaceholder={createNamePlaceholder}
                createDescriptionPlaceholder={createDescriptionPlaceholder}
                handleCreateCancel={handleCreateCancel}
            />
        </div>
    );

}

export default CreateDeck;