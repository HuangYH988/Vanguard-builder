import { sample_cards } from "../../../TestData/sampleData";
import { renderImage, renderName } from "./Analysis";
import { useState, useEffect } from "react";

export default function MainDeck(prop) {
  const { mainDeck } = prop;
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
    const intId = parseInt(id, 10);
    const output = [];
    for (const card in data) {
      if (data[card].id === intId) {
        if (data[card].isSentinel) {
          output.push("Sentinel");
        }
        if (data[card].CardType !== "unit") {
          output.push(data[card].CardType);
        }
        return output.length > 0 ? output.join(" ") : null;
      }
    }
  };
  const onHover = (id, data) => {
    const intId = parseInt(id, 10);
    for (const card in data) {
      if (data[card].id === intId) {
        setHoveredImage(data[card].Image);
        setHoveredEffect(data[card].Effect);
        setSentinel(data[card].isSentinel);
        setCardName(data[card].CardName);
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
          {cardName}
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
                  {sample_cards && (
                    <button
                      onMouseOver={() => onHover(id, sample_cards)}
                      onMouseOut={() => onHoverOut()}
                    >
                      <img
                        src={renderImage(id, sample_cards)}
                        alt={renderName(id, sample_cards)}
                        style={{ width: "80px", height: "120px" }}
                      />
                    </button>
                  )}
                </td>
                <td>{renderName(id, sample_cards)}</td>
                <td>{collateNum[id]}</td>
                <td>{remarks(id, sample_cards)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
