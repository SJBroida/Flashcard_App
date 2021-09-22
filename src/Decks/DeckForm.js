import React from "react";


function DeckForm({ 
    formType, formData, handleChange, handleSubmit, createNamePlaceholder, createDescriptionPlaceholder, handleCreateCancel,
    handleEditChange, handleEditSubmit, editDeckData, editNamePlaceholder, editDescriptionPlaceholder, handleEditCancel
})
{
    // Variable values are determined depending on if a deck is being created or changed
    const submit = formType === "Create Deck" ? handleSubmit : handleEditSubmit
    const change = formType === "Create Deck" ? handleChange : handleEditChange
    const valueName = formType === "Create Deck" ? formData.name : editDeckData.name
    const valueDescription = formType === "Create Deck" ? formData.description : editDeckData.description
    const namePlaceholder = formType === "Create Deck" ? createNamePlaceholder : editNamePlaceholder
    const descriptionPlaceholder = formType === "Create Deck" ? createDescriptionPlaceholder : editDescriptionPlaceholder
    const cancel = formType === "Create Deck" ? handleCreateCancel : handleEditCancel

    return(
        <div>
            <h2>{formType}</h2>
            <form onSubmit={submit} className="form-group">
                <label className="col-form-label" htmlFor="deckName">
                    Name
                </label>
                <input
                    id="deckName"
                    type="text"
                    name="name"
                    onChange={change}
                    className="form-control"
                    value={valueName}
                    placeholder={namePlaceholder}
                />
                <br></br>
                <label htmlFor="deckDescription">Description</label>
                <textarea
                    id="deckDescription"
                    name="description"
                    onChange={change}
                    className="form-control"
                    value={valueDescription}
                    rows="3"
                    placeholder={descriptionPlaceholder}
                />
                 <br></br>
                <button className="btn btn-secondary" onClick={cancel}>Cancel </button>
                <button className="btn btn-primary ml-2" type="submit">Submit</button>    
            </form>
        </div>
        
    );

}

export default DeckForm;