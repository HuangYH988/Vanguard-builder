import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sample_cards } from "../../TestData/sampleData";
import "./cards.css";

export default function DeckBuild() {
  const [hoveredImage, setHoveredImage] = useState(null);
  const [hoveredEffect, setHoveredEffect] = useState(null);

  const onHover = (card) => {
    setHoveredImage(card.Image);
    setHoveredEffect(card.Effect);
  };
  const onHoverOut = () => {
    setHoveredImage(null);
    setHoveredEffect(null);
  };
  return (
    <div>
      <h1>This the page for deck building</h1>
      {hoveredImage && (
        <div className="preview-image">
          <img src={hoveredImage} alt="Selected Card" />
          <p>{hoveredEffect}</p>
        </div>
      )}
      {Object.values(sample_cards).map((card, index) => (
        <button
          className="card-img"
          key={index}
          onMouseOver={() => onHover(card)}
          onMouseOut={() => onHoverOut()}
        >
          <img src={card.Image} alt="card" />
        </button>
      ))}

      <br />
      <button>Save deck</button>
      <button>
        <Link to="/"> Back to homepage</Link>
      </button>
    </div>
  );
}
