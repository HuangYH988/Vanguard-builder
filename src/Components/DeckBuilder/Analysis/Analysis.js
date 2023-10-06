import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { listOfDecks } from "../../../TestData/sampleData";
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
    if (originalCardpool === null) {
      fetchData();
    }
    if (originalCardpool) {
      for (const id in listOfDecks) {
        if (listOfDecks[id].name === name) {
          //find the corresponding deck within deck-list
          setDeck(listOfDecks[id]);
          setRideDeck(listOfDecks[id].rideDeckList);
          const triggerList = [];
          const deckList = [];
          for (const cid in listOfDecks[id].deckList) {
            const cardId = listOfDecks[id].deckList[cid];
            if (isTrigger(cardId, originalCardpool)) {
              triggerList.push({
                id: cardId,
                type: isTrigger(cardId, originalCardpool),
              }); //separate triggers from other cards
            } else {
              deckList.push({
                id: cardId,
                isSentinel: setCard(cardId, originalCardpool)[0],
                CA: setCard(cardId, originalCardpool)[1],
              });
            }
          }
          for (const card in rideDeck) {
            //remove ride deck cards from main deck
            for (const dId in deckList) {
              if (rideDeck[card] === deckList[dId].id) {
                deckList.splice(dId, 1);
                break;
              }
            }
          }
          setTriggers(triggerList);
          setMainDeck(deckList);
          break; // assuming names are unique, no need to continue searching
        }
      }
    }
  }, [name, rideDeck, originalCardpool]);

  return (
    <div>
      <h1>Deck: {deck ? `${deck.name}` : null}</h1>
      <h3>Ride Deck:</h3>
      <RideDeck rideDeck={rideDeck} cardpool={originalCardpool} />
      <h3>Triggers:</h3>
      <Triggers triggers={triggers} cardpool={originalCardpool} />
      <h3>Main Deck:</h3>
      <MainDeck mainDeck={mainDeck} cardpool={originalCardpool} />
      {console.log(originalCardpool)}
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
