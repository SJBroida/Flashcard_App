import React from "react";

import { Link } from "react-router-dom";


/* Deck Structure Example
    {
        "id": 1,
        "name": "Rendering in React",
        "description": "React's component structure allows for quickly building a complex web application that relies on DOM manipulation. "
    }
*/

function CreateDeck() {

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
            <h1>This is a placeholder, comrade!</h1>
        </div>
    );

}

export default CreateDeck;