//import { sample_cards } from "../../../TestData/sampleData";
import { renderImage, renderName } from "./Analysis";
import { useState } from "react";

export default function RideDeck(prop) {
  const { rideDeck, cardpool } = prop;
  const [hoveredImage, setHoveredImage] = useState(null);
  const [hoveredEffect, setHoveredEffect] = useState(null);
  const [sentinel, setSentinel] = useState(null);
  const [trigger, setTrigger] = useState(null);
  const [cardName, setCardName] = useState("");

  const onHover = (id, data) => {
    for (const card in data) {
      const cardID = parseInt(data[card].id, 10);
      if (cardID === id) {
        setHoveredImage(data[card].image_link);
        setHoveredEffect(data[card].effect);
        setSentinel(data[card].is_sentinel);
        setCardName(data[card].card_name);
        break;
      }
    }
  };

  const onHoverOut = () => {
    setHoveredImage(null);
    setHoveredEffect(null);
    setSentinel(null);
    setTrigger(null);
    setCardName("");
  };

  return (
    <div>
      {hoveredImage && (
        <div className="preview-image">
          <img src={hoveredImage} alt="Selected Card" />
          <p>{cardName}</p>
          {trigger ? <div>{trigger} trigger</div> : null}
          {sentinel ? <div>Sentinel</div> : null}
          {hoveredEffect ? (
            <p>{hoveredEffect}</p>
          ) : (
            <p>No additional effect </p>
          )}
        </div>
      )}
      {rideDeck.map((id) => (
        <div key={id} className="ride-display">
          {cardpool && (
            <button
              onMouseOver={() => onHover(id, cardpool)}
              onMouseOut={() => onHoverOut()}
            >
              <img
                src={renderImage(id, cardpool)}
                alt={renderName(id, cardpool)}
                style={{ width: "90px", height: "120px" }}
              />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
