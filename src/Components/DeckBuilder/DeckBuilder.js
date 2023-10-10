import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Filter from "./Filter";
import { player_id } from "../Home";
import "./cards.css";

const URL = process.env.REACT_APP_BACKEND_URL;
export const url_cards = `${URL}/card`;

export default function DeckBuild() {
  const [hoveredImage, setHoveredImage] = useState(null);
  const [hoveredEffect, setHoveredEffect] = useState(null);
  const [sentinel, setSentinel] = useState(null);
  const [trigger, setTrigger] = useState(null);
  const [cardName, setCardName] = useState("");
  const [isFilter, setIsFilter] = useState(false);
  const [filteredCardpool, setFilteredCardpool] = useState("");
  const [originalCardpool, setOriginalCardpool] = useState("");
  const [cardSet, setCardSet] = useState(null);

  const [showRideDeck, setShowRideDeck] = useState({}); // Object to track each button's state
  const [numOfCards, setNumOfCards] = useState({});

  const [rideDeckState, setRideDeckState] = useState({
    g0: null,
    g1: null,
    g2: null,
    g3: null,
  });
  const [triggerList, setTriggerList] = useState([]);
  const [mainDeckList, setMainDeckList] = useState([]);

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

    // Fetch data only when cardSet or originalCardpool changes
    if (cardSet !== null || !originalCardpool) {
      fetchData();
    }

    // Filter cards based on the selected set
    if (originalCardpool) {
      const filteredCards = cardSet
        ? originalCardpool.filter((card) => card.card_number.includes(cardSet))
        : originalCardpool;

      // Update the state with the filtered cards
      setFilteredCardpool(filteredCards);
    }
  }, [cardSet, originalCardpool]);

  const onHover = (card) => {
    setHoveredImage(card.image_link);
    setHoveredEffect(card.effect);
    setSentinel(card.is_sentinel);
    setTrigger(card.trigger);
    setCardName(card.card_name);
  };

  const onHoverOut = () => {
    setHoveredImage(null);
    setHoveredEffect(null);
    setSentinel(null);
    setTrigger(null);
    setCardName("");
  };

  const onClick = (event, card) => {
    const id = card.id;
    const grade = parseInt(card.grade, 10);
    if (event.ctrlKey) {
      switch (grade) {
        case 0:
          if (!rideDeckState.g0) {
            setShowRideDeck((prevState) => ({
              ...prevState,
              [id]: true, // Set the state for this specific button to true
            }));
            setRideDeckState((prevState) => ({
              ...prevState,
              g0: card.id,
            }));
          }
          break;
        case 1:
          if (!rideDeckState.g1) {
            setShowRideDeck((prevState) => ({
              ...prevState,
              [id]: true, // Set the state for this specific button to true
            }));
            setRideDeckState((prevState) => ({
              ...prevState,
              g1: card.id,
            }));
          }
          break;
        case 2:
          if (!rideDeckState.g2) {
            setShowRideDeck((prevState) => ({
              ...prevState,
              [id]: true, // Set the state for this specific button to true
            }));
            setRideDeckState((prevState) => ({
              ...prevState,
              g2: card.id,
            }));
          }
          break;
        case 3:
          if (!rideDeckState.g3) {
            setShowRideDeck((prevState) => ({
              ...prevState,
              [id]: true, // Set the state for this specific button to true
            }));
            setRideDeckState((prevState) => ({
              ...prevState,
              g3: card.id,
            }));
          }
          break;
        default:
          alert("Warning: Cannot set this card as your ride deck!");
          break;
      }
      
    }
    if (numOfCards[id]) {
      setNumOfCards((prevState) => ({
        ...prevState,
        [id]: numOfCards[id] + 1,
      }));
    } else {
      setNumOfCards((prevState) => ({
        ...prevState,
        [id]: 1,
      }));
    }
  };

  const onRightClick = (event, card) => {
    event.preventDefault();
    const id = card.id;
    const grade = parseInt(card.grade, 10);
    if (event.ctrlKey) {
      switch (grade) {
        case 0:
          if (rideDeckState.g0 === card.id) {
            setRideDeckState((prevState) => ({
              ...prevState,
              g0: null,
            }));
          }
          break;
        case 1:
          if (rideDeckState.g1 === card.id) {
            setRideDeckState((prevState) => ({
              ...prevState,
              g1: null,
            }));
          }
          break;
        case 2:
          if (rideDeckState.g2 === card.id) {
            setRideDeckState((prevState) => ({
              ...prevState,
              g2: null,
            }));
          }
          break;
        case 3:
          if (rideDeckState.g3 === card.id) {
            setRideDeckState((prevState) => ({
              ...prevState,
              g3: null,
            }));
          }

          break;
        default:
          break;
      }
      setShowRideDeck((prevState) => ({
        ...prevState,
        [id]: false, // Set the state for this specific button to false
      }));
      
    }
    if (numOfCards[id] > 1) {
      setNumOfCards((prevState) => ({
        ...prevState,
        [id]: numOfCards[id] - 1,
      }));
    } else {
      setNumOfCards((prevState) => ({
        ...prevState,
        [id]: null,
      }));
      setShowRideDeck((prevState) => ({
        ...prevState,
        [id]: false,
      }));
    }
  };

  const openModal = () => {
    setIsFilter(true);
  };

  const closeModal = (selectedSet) => {
    setIsFilter(false);

    setCardSet(selectedSet); // Update cardSet state
  };

  const saveDeck = () => {
    const deckList2 = [];
    const rideDeckList = [rideDeckState.g0,rideDeckState.g1,rideDeckState.g2,rideDeckState.g3];
    
    for (const id in numOfCards) {
      for (let i = 0; i < numOfCards[id]; i++) {
        deckList2.push(id);
      }
    }
    const requestData = {player_id: player_id, main_deck: deckList2, ride_deck: rideDeckList}
    console.log(requestData);
    
  };

  return (
    <div>
      <h1>This is the page for deck building</h1>
      <button onClick={openModal}>Filter</button>
      <br />

      <Filter
        isOpen={isFilter}
        onClose={(set) => closeModal(set)}
        onFilterSelect={(set) => {
          setCardSet(set);
        }}
      />

      {hoveredImage && (
        <div className="preview-image">
          <img src={hoveredImage} alt="Selected Card" />
          <p>{cardName}</p>
          {trigger ? <div>{trigger}Trigger</div> : null}
          {sentinel ? <div>Sentinel</div> : null}
          {hoveredEffect ? (
            <p>{hoveredEffect}</p>
          ) : (
            <p>No additional effect </p>
          )}
        </div>
      )}
      <div className="cardlist-display">
        {Object.values(filteredCardpool).map((card, index) => (
          <button
            className="card-img"
            key={index}
            onMouseOver={() => onHover(card)}
            onMouseOut={() => onHoverOut()}
            onClick={(event) => onClick(event, card)}
            onContextMenu={(event) => onRightClick(event, card)}
          >
            <img src={card.image_link} alt="card" />
            {showRideDeck[card.id] && (
              <div className="ride-deck">Ride deck</div>
            )}
            {numOfCards[card.id] && numOfCards[card.id] !== 0 && (
              <div className="num-in-deck">{numOfCards[card.id]}</div>
            )}
          </button>
        ))}
      </div>
      <br />

      <button onClick={() => saveDeck()}>
        <Link to="/analysis">Save deck</Link>
      </button>
      <button>
        <Link to="/">Back to homepage</Link>
      </button>
    </div>
  );
}
