import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { url_cards } from "../DeckBuilder";
import RideDeck from "./RideDeck";
import MainDeck from "./MainDeck";
import Triggers from "./Triggers";

export const renderImage = (id, datas) => {
  for (const card in datas) {
    if (datas[card].id === id) {
      return datas[card].image_link;
    }
  }
};
export const renderName = (id, datas) => {
  for (const card in datas) {
    if (datas[card].id === id) {
      return datas[card].card_name;
    }
  }
};

const URL = process.env.REACT_APP_BACKEND_URL;
const url_deck = `${URL}/deck/byPlayer`;
const player_id = 2; // TODO: replace this value by the logged in player ID once auth0 is set-up

export default function Analysis() {
  const [deck, setDeck] = useState();
  const [rideDeck, setRideDeck] = useState([]);
  const [triggers, setTriggers] = useState([]);
  const [mainDeck, setMainDeck] = useState([]);
  const [originalCardpool, setOriginalCardpool] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("deck");

  const isTrigger = (cardId, data) => {
    for (const card in data) {
      if (data[card].id === cardId && data[card].trigger) {
        return data[card].trigger;
      }
    }
    return false;
  };
  const setCard = (cardId, data) => {
    for (const card in data) {
      if (data[card].id === cardId) {
        return [data[card].is_sentinel, data[card].card_advantage];
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url_cards, {
          method: "GET",
        });

        const data = await response.json();
        setOriginalCardpool(data);
      } catch (error) {
        console.error("Error: ", error.message);
      }
    };
    const fetchData2 = async () => {
      //const requestData={deck_name:name};
      try {
        const response = await fetch(`${url_deck}/${player_id}`, {
          method: "GET",
        });

        const data = await response.json();
        for (const dl in data) {
          if (data[dl].deck_name === name) {
            setDeck(data[dl]);
            break;
          }
        }
      } catch (error) {
        console.error("Error: ", error.message);
      }
    };
    fetchData2();
    if (originalCardpool === null) {
      fetchData();
    }
    if (originalCardpool && deck) {
      setRideDeck(deck.ride_deck);
      const triggerList = [];
      const deckList = [];
      for (const tid in deck.triggers) {
        const trigId = deck.triggers[tid];

        triggerList.push({
          id: trigId,
          type: isTrigger(trigId, originalCardpool),
        });
      }
      for (const mid in deck.main_deck) {
        const cardId = deck.main_deck[mid];
        deckList.push({
          id: cardId,
          isSentinel: setCard(cardId, originalCardpool)[0],
          CA: setCard(cardId, originalCardpool)[1],
        });
      }

      setTriggers(triggerList);
      setMainDeck(deckList);
    }
  }, [name, deck, rideDeck, originalCardpool]);

  return (
    <div>
      <h1>Deck: {deck ? `${deck.deck_name}` : null}</h1>
      <h3>Ride Deck:</h3>
      <RideDeck rideDeck={rideDeck} cardpool={originalCardpool} />
      <h3>Triggers:</h3>
      <Triggers triggers={triggers} cardpool={originalCardpool} />
      <h3>Main Deck:</h3>
      <MainDeck mainDeck={mainDeck} cardpool={originalCardpool} />

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
