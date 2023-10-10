import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const URL = process.env.REACT_APP_BACKEND_URL;
const url_decks = `${URL}/deck`;

export default function HomePage() {
  const [deckList, setDeckList] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url_decks, {
          method: "GET",
        });

        const data = await response.json();
        setDeckList(data);
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
      <h1>This the Home Page</h1>
      <h3>List of your decks:</h3>
      
      {deckList && (
        <ul>
          {Object.values(deckList).map((deck) => (
            <li>
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
