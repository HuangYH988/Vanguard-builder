import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../NavBar";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import About from "./Information/About";

const URL = process.env.REACT_APP_BACKEND_URL;
const url_decks = `${URL}/deck/byPlayer`;

export default function HomePage() {
  const [deckList, setDeckList] = useState(null);
  const { user, isAuthenticated } = useAuth0();
  const [playerId, setPlayerId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url_decks}/${playerId}`, {
          method: "GET",
        });

        const data = await response.json();

        // Set the filtered decks to the state
        setDeckList(data);
      } catch (error) {
        console.error("Error: ", error.message);
      }
    };
    const getID = async () => {
      const url_user = `${URL}/player`;
      if (isAuthenticated) {
        try {
          const response = await fetch(url_user, { method: "GET" });
          const data = await response.json();
          for (const player in data) {
            if (
              user.name === data[player].player_email &&
              user.nickname === data[player].player_name
            ) {
              setPlayerId(data[player].id);
            }
          }
        } catch (error) {
          console.error("Error: ", error.message);
        }
      }
    };
    if (!playerId && isAuthenticated) {
      getID();
    }
    if (deckList === null && playerId) {
      fetchData();
    }
  });

  return (
    <div>
      <NavBar />
      <h1>Welcome to Vanguard Builder</h1>
      {isAuthenticated ? (
        <div>
          <h2>hello, {user.nickname}</h2>
          <h3>Here is your list of decks:</h3>

          {deckList ? (
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
          ):<p>You have not created any decks here yet. Start creating one by selecting cards from our cardpool!</p>}
          <br />
          <Button variant="outlined" endIcon={<SendIcon/>}>
            <Link to="/deckbuilder"> Build new deck/View cards</Link>
          </Button>{" "}
        </div>
      ) : (
        <div>
          <h3>Note: You need to login in order to build a deck</h3>
          <Button variant="outlined" endIcon={<SendIcon/>}>
            <Link to="/deckbuilder"> View Vanguard cards</Link>
          </Button>
        </div>
      )}
      <About />
    </div>
  );
}
