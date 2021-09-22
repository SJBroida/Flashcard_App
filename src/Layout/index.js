import React from "react";

import Header from "./Header";
import Home from "./Home";
import NotFound from "./NotFound";

import Deck from "../Decks/Deck.js";
import CreateDeck from "../Decks/CreateDeck.js";
import EditDeck from "../Decks/EditDeck.js";
import StudyDeck from "../Decks/StudyDeck.js";
import AddCard from "../Decks/Cards/AddCard.js"
import EditCard from "../Decks/Cards/EditCard.js"

import { Route, Switch } from "react-router-dom";

function Layout() {

  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          {/* The Home Page section underneath the header */}
          <Route exact path="/">
            <Home />
          </Route>
          {/* The Create Page for an individual deck */}
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          {/* The Add Card Page for a specific deck */}
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          {/* The Edit Card Page for a card in a specific deck */}
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          {/* The Study Page for an individual deck */}
          <Route path="/decks/:deckId/study">
            <StudyDeck />
          </Route>
          {/* The Edit Page for an individual deck */}
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>    
          {/* The View Page for an individual deck */}
          <Route path="/decks/:deckId">
            <Deck />
          </Route>
          {/* Final option in case no other pages/components can be found */}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
