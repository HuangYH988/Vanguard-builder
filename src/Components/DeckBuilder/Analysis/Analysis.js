import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { listOfDecks, sample_cards } from "../../../TestData/sampleData";
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

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("deck");

  const isTrigger = (cardId) => {
    const intId = parseInt(cardId, 10);
    for (const card in sample_cards) {
      if (sample_cards[card].id === intId && sample_cards[card].Trigger) {
        return sample_cards[card].Trigger;
      }
    }
    return false;
  };
const setCard=(cardId)=>{const intId = parseInt(cardId, 10);
  for (const card in sample_cards) {
    if (sample_cards[card].id === intId){
      return[sample_cards[card].isSentinel,sample_cards[card].CardAdvantage ]
    }
  }}
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
            triggerList.push({id: cardId, type:isTrigger(cardId)}); //separate triggers from other cards
          } else {
            deckList.push({id:cardId, isSentinel:setCard(cardId)[0], CA: setCard(cardId)[1]});
          }
        }
        for (const card in rideDeck) { //remove ride deck cards from main deck
          for(const dId in deckList){
            if (rideDeck[card]===deckList[dId].id){
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
