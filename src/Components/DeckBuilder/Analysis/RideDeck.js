import { renderImage, renderName } from "./Analysis";
import { useEffect, useState } from "react";

export default function RideDeck(prop) {
  const { rideDeck, cardpool } = prop;
  const [sortedRide, setSortedRide] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [hoveredEffect, setHoveredEffect] = useState(null);
  const [sentinel, setSentinel] = useState(null);
  const [trigger, setTrigger] = useState(null);
  const [cardName, setCardName] = useState("");

  const getGrade = (id, data) => {
    for (const card in data) {
      if (data[card].id === id) {
        return data[card].grade;
      }
    }
  };

  useEffect(() => {
    // Create a new array with the grades and corresponding ids
    const gradesWithIds = rideDeck.map((id) => ({
      id,
      grade: getGrade(id, cardpool),
    }));

    // Sort the array based on the grades in ascending order
    gradesWithIds.sort((a, b) => a.grade - b.grade);

    // Extract the sorted ids
    const sortedRideDeck = gradesWithIds.map((item) => item.id);

    // Now sortedRideDeck contains the ids of rideDeck elements sorted by grade
    setSortedRide(sortedRideDeck);
  }, [rideDeck, cardpool]);

  const onHover = (id, data) => {
    for (const card in data) {
      if (data[card].id === id) {
        setHoveredImage(data[card].image_link);
        setHoveredEffect(data[card].effect);
        setSentinel(data[card].is_sentinel);
        setTrigger(data[card].trigger);
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
      {sortedRide && (
        <div>
          {sortedRide.map((id) => (
            <div key={id} className="ride-display">
              {cardpool && (
                <button
                  onMouseOver={() => onHover(id, cardpool)}
                  onMouseOut={onHoverOut}
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
      )}
    </div>
  );
}
