import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const URL = process.env.REACT_APP_BACKEND_URL;
const url_decks = `${URL}/deck`;
export const player_id = 4; //TODO: replace with actual player id once auth0 is established

export default function HomePage() {
  const [deckList, setDeckList] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url_decks, {
          method: "GET",
        });

        const data = await response.json();
         // Filter decks based on player_id
        const playerDecks = Object.values(data).filter(
          (deck) => parseInt(deck.player_id,10) === player_id
        );
       
        // Set the filtered decks to the state
        setDeckList(playerDecks);
        
      } catch (error) {
        console.error("Error: ", error.message);
      }
    };
    if (deckList === null) {
      fetchData();
    }
  });

  return (
    <div>
      <h1>Welcome to Vanguard Builder</h1>
      <h3>List of your decks:</h3>
      
      {deckList && (
        <ul>
          {Object.values(deckList).map((deck) => (
            <li key={deck.deck_name}>
              <button>
                <Link to={`/analysis?deck=${deck.deck_name}`}>
                  {deck.deck_name}
                </Link>
              </button>
            </li>
          ))}
        </ul>
      )}

      <br />
      <button>
        <Link to="/deckbuilder"> Build new deck</Link>
      </button>
    </div>
  );
}
