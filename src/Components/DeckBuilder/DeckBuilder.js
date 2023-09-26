import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sample_cards } from "../../TestData/sampleData";
import "./cards.css";

export default function DeckBuild() {
  const [hoveredImage, setHoveredImage] = useState(null);
  const [hoveredEffect, setHoveredEffect] = useState(null);
  const [sentinel, setSentinel] = useState(null);
  const [trigger, setTrigger] = useState(null);

  const [showRideDeck, setShowRideDeck] = useState({}); // Object to track each button's state

  const onHover = (card) => {
    setHoveredImage(card.Image);
    setHoveredEffect(card.Effect);
    setSentinel(card.isSentinel);
    setTrigger(card.Trigger);
  };

  const onHoverOut = () => {
    setHoveredImage(null);
    setHoveredEffect(null);
    setSentinel(null);
    setTrigger(null);
  };

  const onClick = (event, id) => {
    if (event.ctrlKey) {
      setShowRideDeck((prevState) => ({
        ...prevState,
        [id]: true, // Set the state for this specific button to true
      }));
    } else {
      console.log(id, "+1");
    }
  };

  const onRightClick = (event, id) => {
    event.preventDefault();
    if (event.ctrlKey) {
      setShowRideDeck((prevState) => ({
        ...prevState,
        [id]: false, // Set the state for this specific button to false
      }));
    } else {
      console.log(id, "-1");
    }
  };

  return (
    <div>
      <h1>This is the page for deck building</h1>
      {hoveredImage && (
        <div className="preview-image">
          <img src={hoveredImage} alt="Selected Card" />
          {trigger ? <div>{trigger} trigger</div> : null}
          {sentinel ? <h4>Sentinel</h4> : null}
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
        </button>
      ))}

      <br />
      <button>Save deck</button>
      <button>
        <Link to="/">Back to homepage</Link>
      </button>
    </div>
  );
}
