import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { listOfDecks, sample_cards } from "../../../TestData/sampleData";
import RideDeck from "./RideDeck";
import MainDeck from "./MainDeck";
import Triggers from "./Triggers";

export const renderImage = (id, datas) => {
  const intId = parseInt(id, 10);
  for (const card in datas) {
    if (datas[card].id === intId) {
      return datas[card].Image;
    }
  }
};
export const renderName = (id, datas) => {
  const intId = parseInt(id, 10);
  for (const card in datas) {
    if (datas[card].id === intId) {
      return datas[card].CardName;
    }
  }
};

export default function Analysis() {
  const [deck, setDeck] = useState();
  const [rideDeck, setRideDeck] = useState([]);
  const [triggers, setTriggers] = useState([]);
  const [mainDeck, setMainDeck] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("deck");

  const isTrigger = (cardId) => {
    const intId = parseInt(cardId, 10);
    for (const card in sample_cards) {
      if (sample_cards[card].id === intId && sample_cards[card].Trigger) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    for (const id in listOfDecks) {
      if (listOfDecks[id].name === name) {
        //find the corresponding deck within deck-list
        setDeck(listOfDecks[id]);
        setRideDeck(listOfDecks[id].rideDeckList);
        const triggerList = [];
        const deckList = [];
        for (const cid in listOfDecks[id].deckList) {
          const cardId = listOfDecks[id].deckList[cid];
          if (isTrigger(cardId)) {
            triggerList.push(cardId);
          } else {
            deckList.push(cardId);
          }
        }
        for (const card in rideDeck) {
          const index = deckList.indexOf(rideDeck[card]);
          deckList.splice(index, 1);
        }
        setTriggers(triggerList);
        setMainDeck(deckList);
        break; // assuming names are unique, no need to continue searching
      }
    }
  }, [name, rideDeck]);

  return (
    <div>
      <h1>Deck: {deck ? `${deck.name}` : null}</h1>
      <h3>Ride Deck:</h3>
      <RideDeck rideDeck={rideDeck} />
      <h3>Triggers:</h3>
      <Triggers triggers={triggers} />
      <h3>Main Deck:</h3>
      <MainDeck mainDeck={mainDeck} />

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
