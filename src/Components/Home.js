import React from "react";
import { Link } from "react-router-dom";
import { listOfDecks } from "../TestData/sampleData";

export default function HomePage() {
  return (
    <div>
      <h1>This the Home Page</h1>
      <h3>List of your decks:</h3>
      <ul>
      {Object.values(listOfDecks).map((deck)=>(<li><button><Link to={`/analysis?deck=${deck.name}`}>{deck.name}</Link></button></li>))}
      </ul>
      <br />
      <button>
        <Link to="/deckbuilder"> Build new deck</Link>
      </button>
    </div>
  );
}
