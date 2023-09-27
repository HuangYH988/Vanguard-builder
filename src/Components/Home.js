import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <h1>This the Home Page</h1>
      <h3>List of your decks:</h3>
      <button>
        <Link to={`/analysis?deck=deck1`}> Dummy deck 1</Link>
      </button>
      <button>
        <Link to={`/analysis?deck=2`}> Dummy deck 2</Link>
      </button>
      <br />
      <button>
        <Link to="/deckbuilder"> Build new deck</Link>
      </button>
    </div>
  );
}
