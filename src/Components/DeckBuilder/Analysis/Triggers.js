import { sample_cards } from "../../../TestData/sampleData";
import { renderImage, renderName } from "./Analysis";
import { useState, useEffect } from "react";

export default function Triggers(prop) {
  const { triggers } = prop;
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
      if (card.type === "Crit") {
        newTypeCount.Crit += 1;
      } else if (card.type === "Draw") {
        newTypeCount.Draw += 1;
      } else if (card.type === "Front") {
        newTypeCount.Front += 1;
      } else if (card.type === "Heal") {
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
      if (data[card].id === intId) {
        setHoveredImage(data[card].Image);
        setHoveredEffect(data[card].Effect);
        setSentinel(data[card].isSentinel);
        setTrigger(data[card].Trigger);
        setCardName(data[card].CardName);
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
      {triggers.map((card, index) => (
        <div key={"trigger" + index} className="trigger-display">
          {sample_cards && (
            <button
              onMouseOver={() => onHover(card.id, sample_cards)}
              onMouseOut={() => onHoverOut()}
            >
              <img
                src={renderImage(card.id, sample_cards)}
                alt={renderName(card.id, sample_cards)}
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
