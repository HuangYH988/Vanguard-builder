import { renderImage, renderName } from "./Analysis";
import { useState, useEffect } from "react";

export default function MainDeck(prop) {
  const { mainDeck, cardpool } = prop;
  const [hoveredImage, setHoveredImage] = useState(null);
  const [hoveredEffect, setHoveredEffect] = useState(null);
  const [sentinel, setSentinel] = useState(null);
  const [cardName, setCardName] = useState("");
  const [collateNum, setCollateNum] = useState({});

  useEffect(() => {
    const newCollateNum = mainDeck.reduce((acc, card) => {
      const { id } = card;
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {});

    setCollateNum(newCollateNum);
  }, [mainDeck]);

  const remarks = (id, data) => {
    const output = [];
    for (const card in data) {
      if (data[card].id === id) {
        if (data[card].is_sentinel) {
          output.push("Sentinel");
        }
        if (data[card].card_type !== "Unit") {
          output.push(data[card].card_type);
        }
        return output.length > 0 ? output.join(" ") : null;
      }
    }
  };
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
    setCardName("");
  };
  return (
    <div>
      {hoveredImage && (
        <div className="preview-image">
          <img src={hoveredImage} alt="Selected Card" />
          <p>{cardName}</p>
          {sentinel ? <div>Sentinel</div> : null}
          {hoveredEffect ? (
            <p>{hoveredEffect}</p>
          ) : (
            <p>No additional effect </p>
          )}
        </div>
      )}
      <div className="deck-table">
        <table>
          <thead>
            <tr>
              <th>Card</th>
              <th>Name</th>
              <th>Qty</th>
              <th>Remarks</th>
            </tr>
          </thead>

          <tbody>
            {Object.keys(collateNum).map((id) => (
              <tr key={`table-row-${id}`}>
                <td>
                  {cardpool && (
                    <button
                      onMouseOver={() => onHover(id, cardpool)}
                      onMouseOut={() => onHoverOut()}
                    >
                      <img
                        src={renderImage(id, cardpool)}
                        alt={renderName(id, cardpool)}
                        style={{ width: "80px", height: "120px" }}
                      />
                    </button>
                  )}
                </td>
                <td>{renderName(id, cardpool)}</td>
                <td>{collateNum[id]}</td>
                <td>{remarks(id, cardpool)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
