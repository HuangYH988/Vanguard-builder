import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Analysis() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("deckid");
  return (
    <div>
      <h1>This the page for analysis of your deck</h1>
      <h2>Deck {id}</h2>
      <br />
      <button>
        <Link to="/deckbuilder">Go to deck edittor</Link>
      </button>
      <button>
        {" "}
        <Link to="/"> Back to homepage</Link>
      </button>
    </div>
  );
}
