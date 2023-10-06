import { url_cards } from "../DeckBuilder";
import { renderImage, renderName } from "./Analysis";
import { useState, useEffect } from "react";

export default function MainDeck(prop) {
  const { mainDeck } = prop;
  const [hoveredImage, setHoveredImage] = useState(null);
  const [hoveredEffect, setHoveredEffect] = useState(null);
  const [originalCardpool, setOriginalCardpool] = useState(null);
  const [sentinel, setSentinel] = useState(null);
  const [cardName, setCardName] = useState("");
  const [collateNum, setCollateNum] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url_cards, {
          method: "GET",
        });
  
        const data = await response.json();
        setOriginalCardpool(data);
      } catch (error) {
        console.error("Error: ", error.message);
      }
    };
    if (originalCardpool===null) {
      fetchData();
    }
    const newCollateNum = mainDeck.reduce((acc, card) => {
      const { id } = card;
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {});

    setCollateNum(newCollateNum);
  }, [mainDeck, originalCardpool]);

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
          {console.log(originalCardpool)}
          <tbody>
            {Object.keys(collateNum).map((id) => (
              <tr key={`table-row-${id}`}>
                <td>
                  {originalCardpool && (
                    <button
                      onMouseOver={() => onHover(id, originalCardpool)}
                      onMouseOut={() => onHoverOut()}
                    >
                      
                      <img
                        src={renderImage(id, originalCardpool)}
                        alt={renderName(id, originalCardpool)}
                        style={{ width: "80px", height: "120px" }}
                      />
                    </button>
                  )}
                </td>
                <td>{renderName(id, originalCardpool)}</td>
                <td>{collateNum[id]}</td>
                <td>{remarks(id, originalCardpool)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
