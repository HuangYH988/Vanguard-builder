import { sample_cards } from "../../../TestData/sampleData";
import { renderImage, renderName } from "./Analysis";
import { useState } from "react";

export default function Triggers(prop) {
  const { triggers } = prop;
  const [hoveredImage, setHoveredImage] = useState(null);
  const [hoveredEffect, setHoveredEffect] = useState(null);
  const [sentinel, setSentinel] = useState(null);
  const [trigger, setTrigger] = useState(null);
  const [typeCount, setTypeCount] = useState({
    Crit: 0,
    Draw: 0,
    Front: 0,
    Heal: 0,
    Over: 0,
  });

  const onHover = (id, data) => {
    const intId = parseInt(id, 10);
    for (const card in data) {
      if (data[card].id === intId) {
        setHoveredImage(data[card].Image);
        setHoveredEffect(data[card].Effect);
        setSentinel(data[card].isSentinel);
        setTrigger(data[card].Trigger);
        break;
      }
    }
  };

  const onHoverOut = () => {
    setHoveredImage(null);
    setHoveredEffect(null);
    setSentinel(null);
    setTrigger(null);
  };
  return (
    <div>
      {hoveredImage && (
        <div className="preview-image">
          <img src={hoveredImage} alt="Selected Card" />
          {trigger ? <div>{trigger} trigger</div> : null}
          {sentinel ? <div>Sentinel</div> : null}
          {hoveredEffect ? (
            <p>{hoveredEffect}</p>
          ) : (
            <p>No additional effect </p>
          )}
        </div>
      )}
      {triggers.map((id, index) => (
        <div key={"trigger" + index} className="trigger-display">
          {sample_cards && (
            <button
              onMouseOver={() => onHover(id, sample_cards)}
              onMouseOut={() => onHoverOut()}
            >
              <img
                src={renderImage(id, sample_cards)}
                alt={renderName(id, sample_cards)}
                style={{ width: "70px", height: "100px" }}
              />
            </button>
          )}
        </div>
      ))}
      <br />
      {typeCount.Crit}C {typeCount.Draw}D {typeCount.Front}F {typeCount.Heal}H {typeCount.Over}O
    </div>
  );
}
