import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { listOfDecks, sample_cards } from "../../TestData/sampleData";

export default function Analysis() {
  const [deck, setDeck] = useState();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("deck");

  useEffect(() => {
    for (const id in listOfDecks) {
      if (listOfDecks[id].name === name) {
        setDeck(listOfDecks[id]);
        break; // assuming names are unique, no need to continue searching
      }
    }
  }, [name]);

  return (
    <div>
      <h1>This the page for analysis of your deck</h1>
      <h2>Deck {deck ? `${deck.name}` : null}</h2>
      <br />
      <button>Import deck</button>
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
