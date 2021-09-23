import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { listCards } from "../../utils/api";

import NotEnoughCards from "./NotEnoughCards";

function StudyCards({deckId}) {

    const [cards, setCards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [front, setFront] = useState(true);
    const history = useHistory();

    useEffect(() => {
        setCards([]);
  
        const abortController = new AbortController();
        const signal = abortController.signal;

        async function fetchCards() {
            console.log(deckId);
            const cardsData = await listCards(deckId, signal);
            setCards(cardsData);
        }

        fetchCards();
  
        return () => abortController.abort();

    }, []);

    const flipButtonHandler = () => {
        setFront(!front);
    }
    
    const nextButtonHandler = () => {
        if(currentIndex < cards.length -1){
            setCurrentIndex(currentIndex +1);
            setFront(true);
        } else {
            if (window.confirm("Restart cards?\n\n Click 'Cancel' to return to home page")){
                setCurrentIndex(0);
                setFront(true);
            } else {
                history.push("/");
            }
        }
        
    }

    if(cards.length === 0) { 
        return (
            <div>Loading...</div>
        );
    } else if(cards.length <=2) {
        return (
            <NotEnoughCards cards={cards} />
        )
    } else {
        return (
            <div>
                <div className="card" style={{width: "45rem"}}>
                    <div className="card-body">
                        <h5 className="card-title">Card: {currentIndex +1} of {cards.length}</h5>
                        <p className="card-text">{front? cards[currentIndex].front : cards[currentIndex].back}</p>
                        <button type="button" className="btn btn-secondary" onClick={flipButtonHandler}>Flip</button>
                        {!front? <button type="button" className="btn btn-primary" onClick={nextButtonHandler}>Next</button> : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default StudyCards;