import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import { sample_cards } from "../../TestData/sampleData";
import Filter from "./Filter";

import "./cards.css";

const URL = process.env.REACT_APP_BACKEND_URL;
export const url_cards = `${URL}/card`;

export default function DeckBuild() {
  const [hoveredImage, setHoveredImage] = useState(null);
  const [hoveredEffect, setHoveredEffect] = useState(null);
  const [sentinel, setSentinel] = useState(null);
  const [trigger, setTrigger] = useState(null);
  const [cardName, setCardName] = useState("");
  const [isFilter, setIsFilter] = useState(false);
  const [filteredCardpool, setFilteredCardpool] = useState("");
  const [originalCardpool, setOriginalCardpool] = useState("");
  const [cardSet, setCardSet] = useState(null);

  const [showRideDeck, setShowRideDeck] = useState({}); // Object to track each button's state
  const [numOfCards, setNumOfCards] = useState({});

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
  
    // Fetch data only when cardSet or originalCardpool changes
    if (cardSet !== null || !originalCardpool) {
      fetchData();
    }
  
    // Filter cards based on the selected set
    if (originalCardpool) {
      const filteredCards = cardSet
    ? originalCardpool.filter((card) =>
        card.card_number.includes(cardSet)
      )
    : originalCardpool;
  
      // Update the state with the filtered cards
      setFilteredCardpool(filteredCards);
    }
  }, [cardSet, originalCardpool]);

  const onHover = (card) => {
    setHoveredImage(card.image_link);
    setHoveredEffect(card.effect);
    setSentinel(card.is_sentinel);
    setTrigger(card.trigger);
    setCardName(card.card_name);
  };

  const onHoverOut = () => {
    setHoveredImage(null);
    setHoveredEffect(null);
    setSentinel(null);
    setTrigger(null);
    setCardName("");
  };

  const onClick = (event, id) => {
    if (event.ctrlKey) {
      setShowRideDeck((prevState) => ({
        ...prevState,
        [id]: true, // Set the state for this specific button to true
      }));
    }
    if (numOfCards[id]) {
      setNumOfCards((prevState) => ({
        ...prevState,
        [id]: numOfCards[id] + 1,
      }));
    } else {
      setNumOfCards((prevState) => ({
        ...prevState,
        [id]: 1,
      }));
    }
  };

  const onRightClick = (event, id) => {
    event.preventDefault();
    if (event.ctrlKey) {
      setShowRideDeck((prevState) => ({
        ...prevState,
        [id]: false, // Set the state for this specific button to false
      }));
    }
    if (numOfCards[id] > 1) {
      setNumOfCards((prevState) => ({
        ...prevState,
        [id]: numOfCards[id] - 1,
      }));
    } else {
      setNumOfCards((prevState) => ({
        ...prevState,
        [id]: null,
      }));
      setShowRideDeck((prevState) => ({
        ...prevState,
        [id]: false,
      }));
    }
  };

  const openModal = () => {
    setIsFilter(true);
  };

  const closeModal = (selectedSet) => {
    setIsFilter(false);

    setCardSet(selectedSet); // Update cardSet state
  };

  const saveDeck = () => {
    const deckList = [];
    const rideDeckList = [];
    for (const id in showRideDeck) {
      if (showRideDeck[id]) {
        rideDeckList.push(id);
      }
    }
    for (const id in numOfCards) {
      for (let i = 0; i < numOfCards[id]; i++) {
        deckList.push(id);
      }
    }
    console.log(deckList);
    console.log(rideDeckList);
  };

  return (
    <div>
      <h1>This is the page for deck building</h1>
      <button onClick={openModal}>Filter</button>
      <br />

      <Filter
        isOpen={isFilter}
        onClose={(set) => closeModal(set)}
        onFilterSelect={(set) => {
          setCardSet(set);
        }}
      /> 

      {hoveredImage && (
        <div className="preview-image">
          <img src={hoveredImage} alt="Selected Card" />
          {cardName}
          {trigger ? <div>{trigger} trigger</div> : null}
          {sentinel ? <div>Sentinel</div> : null}
          {hoveredEffect ? (
            <p>{hoveredEffect}</p>
          ) : (
            <p>No additional effect </p>
          )}
        </div>
      )}
      
      {Object.values(filteredCardpool).map((card, index) => (
        <button
          className="card-img"
          key={index}
          onMouseOver={() => onHover(card)}
          onMouseOut={() => onHoverOut()}
          onClick={(event) => onClick(event, card.id)}
          onContextMenu={(event) => onRightClick(event, card.id)}
        >
          <img src={card.image_link} alt="card" />
          {showRideDeck[card.id] && <div className="ride-deck">Ride deck</div>}
          {numOfCards[card.id] && numOfCards[card.id] !== 0 && (
            <div className="num-in-deck">{numOfCards[card.id]}</div>
          )}
        </button>
      ))}

      <br />

      <button onClick={() => saveDeck()}>
        <Link to="/analysis">Save deck</Link>
      </button>
      <button>
        <Link to="/">Back to homepage</Link>
      </button>
    </div>
  );
}
