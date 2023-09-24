import React from "react";
import { Link } from "react-router-dom";

export default function DeckBuild() {
  return (
    <div>
      <h1>This the page for deck building</h1>
      <br />
      <button>Save deck</button>
      <button>
        <Link to="/"> Back to homepage</Link>
      </button>
    </div>
  );
}
