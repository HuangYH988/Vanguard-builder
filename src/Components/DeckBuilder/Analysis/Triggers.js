//import { sample_cards } from "../../../TestData/sampleData";
import { renderImage, renderName } from "./Analysis";
import { useState, useEffect } from "react";

export default function Triggers(prop) {
  const { triggers, cardpool } = prop;
  const [hoveredImage, setHoveredImage] = useState(null);
  const [hoveredEffect, setHoveredEffect] = useState(null);
  const [sentinel, setSentinel] = useState(null);
  const [cardName, setCardName] = useState("");
  const [trigger, setTrigger] = useState(null);
  const [typeCount, setTypeCount] = useState({
    Crit: 0,
    Draw: 0,
    Front: 0,
    Heal: 0,
    Over: 0,
  });

  useEffect(() => {
    const newTypeCount = {
      Crit: 0,
      Draw: 0,
      Front: 0,
      Heal: 0,
      Over: 0,
    };

    for (const card of triggers) {
      if (card.type === "Crit ") {
        newTypeCount.Crit += 1;
      } else if (card.type === "Draw ") {
        newTypeCount.Draw += 1;
      } else if (card.type === "Front ") {
        newTypeCount.Front += 1;
      } else if (card.type === "Heal ") {
        newTypeCount.Heal += 1;
      } else if (card.type === "Over") {
        newTypeCount.Over += 1;
      }
    }

    setTypeCount((prevState) => ({
      ...prevState,
      ...newTypeCount,
    }));
  }, [triggers, setTypeCount]);

  const onHover = (id, data) => {
    const intId = parseInt(id, 10);
    for (const card in data) {
      const cardID = parseInt(data[card].id, 10);
      if (cardID === intId) {
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
      {triggers.map((card, index) => (
        <div key={"trigger" + index} className="trigger-display">
          {cardpool && (
            <button
              onMouseOver={() => onHover(card.id, cardpool)}
              onMouseOut={() => onHoverOut()}
            >
              <img
                src={renderImage(card.id, cardpool)}
                alt={renderName(card.id, cardpool)}
                style={{ width: "70px", height: "100px" }}
              />
            </button>
          )}
        </div>
      ))}
      <br />
      <div className="trig-count">
        <div className="trig-count" id="crit">
          {typeCount.Crit}C{" "}
        </div>{" "}
        <div className="trig-count" id="draw">
          {typeCount.Draw}D{" "}
        </div>{" "}
        <div className="trig-count" id="front">
          {" "}
          {typeCount.Front}F{" "}
        </div>{" "}
        <div className="trig-count" id="heal">
          {typeCount.Heal}H{" "}
        </div>{" "}
        <div className="trig-count" id="over">
          {typeCount.Over}O{" "}
        </div>{" "}
      </div>
    </div>
  );
}
