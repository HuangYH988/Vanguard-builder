import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sample_cards } from "../../TestData/sampleData";
import Filter from "./Filter";

import "./cards.css";

export default function DeckBuild() {
  const [hoveredImage, setHoveredImage] = useState(null);
  const [hoveredEffect, setHoveredEffect] = useState(null);
  const [sentinel, setSentinel] = useState(null);
  const [trigger, setTrigger] = useState(null);
  const [cardName, setCardName] = useState("");
  const [isFilter, setIsFilter] = useState(false);

  const [showRideDeck, setShowRideDeck] = useState({}); // Object to track each button's state
  const [numOfCards, setNumOfCards] = useState({});

  const onHover = (card) => {
    setHoveredImage(card.Image);
    setHoveredEffect(card.Effect);
    setSentinel(card.isSentinel);
    setTrigger(card.Trigger);
    setCardName(card.CardName);
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
  const closeModal = () => {
    setIsFilter(false);
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

      <Filter isOpen={isFilter} onClose={closeModal} />

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
      {Object.values(sample_cards).map((card, index) => (
        <button
          className="card-img"
          key={index}
          onMouseOver={() => onHover(card)}
          onMouseOut={() => onHoverOut()}
          onClick={(event) => onClick(event, card.id)}
          onContextMenu={(event) => onRightClick(event, card.id)}
        >
          <img src={card.Image} alt="card" />
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
