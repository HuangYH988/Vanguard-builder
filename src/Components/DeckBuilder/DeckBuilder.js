import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Filter from "../Filter/Filter";
import FilterButtons from "../Filter/FilterButtons";
import LoadDeck from "./LoadDeck";
import SaveDeck from "./SaveDeck";
import NavBar from "../../NavBar";
import { usePlayerContext } from "../../PlayerContext";
import { ArraytoList } from "../Convert";
import { Button } from "@mui/material";
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
  const [isLoad, setIsLoad] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [filteredCardpool, setFilteredCardpool] = useState("");
  const [originalCardpool, setOriginalCardpool] = useState("");
  const { player } = usePlayerContext();
  const [existingDeck, setExistingDeck] = useState(null);

  const [filters, setFilters] = useState({
    cardSet: null,
    grade: "3",
    nation: "Dragon Empire",
    cardName: null,
    cardType: null,
    hasCC:false,
    hasSC: false
  });

  const [showRideDeck, setShowRideDeck] = useState({}); // Object to track each Button's state
  const [numOfCards, setNumOfCards] = useState({});

  const [rideDeckState, setRideDeckState] = useState({
    g0: null,
    g1: null,
    g2: null,
    g3: null,
  });
  const [triggerList, setTriggerList] = useState({
    crit: [],
    draw: [],
    front: [],
    heal: [],
    over: [],
  });
  const [mainDeckList, setMainDeckList] = useState([]);

  const isDeckLimit = () => {
    const length = mainDeckList.length;
    if (length >= 34) {
      return false;
    } else {
      return true;
    }
  };

  const setDifferentTriggers = (id, type) => {
    let length =
      triggerList.crit.length +
      triggerList.draw.length +
      triggerList.heal.length +
      triggerList.front.length +
      triggerList.over.length;
    if (length >= 16) {
      alert("You can only have a maximum of 16 triggers in your deck.");
      return;
    }
    switch (type) {
      case "Crit ":
        length = triggerList.crit.length;
        if (length >= 8) {
          alert(
            "You have exceeded the maximum number of Critical triggers in deck."
          );
          break;
        } else {
          if (numOfCards[id] && numOfCards[id] >= 4) {
            alert("You cannot have more than 4 copy of the same card.");
            break;
          } else if (numOfCards[id]) {
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
          const newList = triggerList.crit ? [...triggerList.crit, id] : [id];
          setTriggerList({
            ...triggerList,
            crit: newList,
          });
          break;
        }
      case "Draw ":
        length = triggerList.draw.length;
        if (length >= 8) {
          alert(
            "You have exceeded the maximum number of Draw triggers in deck."
          );
          break;
        } else {
          if (numOfCards[id] && numOfCards[id] >= 4) {
            alert("You cannot have more than 4 copy of the same card.");
            break;
          } else if (numOfCards[id]) {
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
          const newList = triggerList.draw ? [...triggerList.draw, id] : [id];
          setTriggerList({
            ...triggerList,
            draw: newList,
          });
          break;
        }
      case "Front ":
        length = triggerList.front.length;
        if (length >= 8) {
          alert(
            "You have exceeded the maximum number of Front triggers in deck."
          );
          break;
        } else {
          if (numOfCards[id] && numOfCards[id] >= 4) {
            alert("You cannot have more than 4 copy of the same card.");
            break;
          } else if (numOfCards[id]) {
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
          const newList = triggerList.front ? [...triggerList.front, id] : [id];
          setTriggerList({
            ...triggerList,
            front: newList,
          });
          break;
        }
      case "Heal ":
        length = triggerList.heal.length;
        if (length >= 4) {
          alert(
            "You have exceeded the maximum number of Heal triggers in deck."
          );
          break;
        } else {
          if (numOfCards[id] && numOfCards[id] >= 4) {
            alert("You cannot have more than 4 copy of the same card.");
            break;
          } else if (numOfCards[id]) {
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
          const newList = triggerList.heal ? [...triggerList.heal, id] : [id];
          setTriggerList({
            ...triggerList,
            heal: newList,
          });
          break;
        }
      case "Over":
        length = triggerList.over.length;
        if (length >= 1) {
          alert("You can only have up to 1 overTrigger in your deck.");
          break;
        } else {
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
          const newList = triggerList.over ? [...triggerList.over, id] : [id];
          setTriggerList({
            ...triggerList,
            over: newList,
          });
          break;
        }
      default:
        break;
    }
  };

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

    if (!originalCardpool) {
      fetchData();
    }

    // Only update filteredCardpool when filters change
    if (originalCardpool && filters) {
      const filterByGradeNation = originalCardpool.filter(
        (card) => card.nation === filters.nation && card.grade === filters.grade
      );

      const filteredCards = filters.cardSet
        ? filterByGradeNation.filter((card) =>
            card.card_number.includes(filters.cardSet)
          )
        : filterByGradeNation;
      const filteredCards2 = filters.cardName
        ? filteredCards.filter((card) =>
            card.cardName
              .toLowerCase()
              .includes(filters.cardName.toLowerCase())
          )
        : filteredCards;
        const filteredCard3 = filters.cardType
        ? filteredCards2.filter((card) =>
            card.card_type.includes(filters.cardType)
          )
        : filteredCards2;
        const filteredCard4 = filters.hasCC
        ? filteredCard3.filter((card) =>
            card.counter_charge
          )
        : filteredCard3;
        const filteredCard5 = filters.hasSC
        ? filteredCard4.filter((card) =>
            card.soul_charge
          )
        : filteredCard4;
      // Update the state with the filtered cards
      setFilteredCardpool(filteredCard5);
    }
  }, [originalCardpool, filters]);

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
    console.log(id)
    const grade = parseInt(card.grade, 10);
    const isUnit = card.cardType === "Unit";
    const isTrigger = card.trigger;
    if (!numOfCards[id] || numOfCards[id] < 4) {
      if (event.ctrlKey && isUnit) {
        // Set card as ride deck if it is unit and of g0-g3
        const rideKey = `g${grade}`;
        if (!rideDeckState[rideKey]) {
          setShowRideDeck((prevState) => ({ ...prevState, [id]: true }));
          setRideDeckState((prevState) => ({ ...prevState, [rideKey]: id }));
        } else {
          alert("Warning: Cannot set this card as your ride deck!");
        }
      }

      const isVacancy = isDeckLimit();

      if (isTrigger) {
        setDifferentTriggers(id, isTrigger);
      } else if (isVacancy) {
        const newNumOfCards = numOfCards[id] ? numOfCards[id] + 1 : 1;
        setNumOfCards((prevState) => ({ ...prevState, [id]: newNumOfCards }));
        setMainDeckList((prevMainDeckList) => [...prevMainDeckList, id]);
      } else {
        alert("You have exceeded the upper limit of your deck");
      }
    } else {
      alert("You can only have up to 4 copies of a card in your deck!");
    }
  };

  const onRightClick = (event, card) => {
    event.preventDefault();
    const id = card.id;
    const grade = parseInt(card.grade, 10);
    const isTrigger = card.trigger;
    if (event.ctrlKey) {
      switch (grade) {
        case 0:
        case 1:
        case 2:
        case 3:
          if (rideDeckState[`g${grade}`] === card.id) {
            setRideDeckState((prevState) => ({
              ...prevState,
              [`g${grade}`]: null,
            }));
          }
          break;
        default:
          break;
      }
      setShowRideDeck((prevState) => ({
        ...prevState,
        [id]: false, // Set the state for this specific Button to false
      }));
    }
    let indexToRemove;
    if (isTrigger) {
      switch (isTrigger) {
        case "Crit ":
          indexToRemove = triggerList.crit.indexOf(id);
          if (indexToRemove !== -1) {
            const newList = [...triggerList.crit];
            newList.splice(indexToRemove, 1);
            setTriggerList({
              ...triggerList,
              crit: newList,
            });
          }
          break;
        case "Draw ":
          indexToRemove = triggerList.draw.indexOf(id);
          if (indexToRemove !== -1) {
            const newList = [...triggerList.draw];
            newList.splice(indexToRemove, 1);
            setTriggerList({
              ...triggerList,
              draw: newList,
            });
          }
          break;
        case "Front ":
          indexToRemove = triggerList.front.indexOf(id);
          if (indexToRemove !== -1) {
            const newList = [...triggerList.front];
            newList.splice(indexToRemove, 1);
            setTriggerList({
              ...triggerList,
              front: newList,
            });
          }
          break;
        case "Heal ":
          indexToRemove = triggerList.heal.indexOf(id);
          if (indexToRemove !== -1) {
            const newList = [...triggerList.heal];
            newList.splice(indexToRemove, 1);
            setTriggerList({
              ...triggerList,
              heal: newList,
            });
          }
          break;
        case "Over":
          indexToRemove = triggerList.over.indexOf(id);
          if (indexToRemove !== -1) {
            const newList = [...triggerList.over];
            newList.splice(indexToRemove, 1);
            setTriggerList({
              ...triggerList,
              over: newList,
            });
          }
          break;
        default:
          break;
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
        for (const ride in rideDeckState) {
          if (rideDeckState[ride] === card.id) {
            setRideDeckState((prevState) => ({
              ...prevState,
              [ride]: null,
            }));
          }
        }
      }
    } else {
      indexToRemove = mainDeckList.indexOf(id);
      if (numOfCards[id] > 1) {
        setNumOfCards((prevState) => ({
          ...prevState,
          [id]: numOfCards[id] - 1,
        }));
        if (indexToRemove !== -1) {
          // Remove the element at the found index
          setMainDeckList((prevMainDeckList) => {
            const newList = [...prevMainDeckList];
            newList.splice(indexToRemove, 1);
            return newList;
          });
        }
      } else if (numOfCards[id] === 1) {
        setNumOfCards((prevState) => ({
          ...prevState,
          [id]: null,
        }));
        setShowRideDeck((prevState) => ({
          ...prevState,
          [id]: false,
        }));
        if (indexToRemove !== -1) {
          // Remove the element at the found index
          setMainDeckList((prevMainDeckList) => {
            const newList = [...prevMainDeckList];
            newList.splice(indexToRemove, 1);
            return newList;
          });
        }
        for (const ride in rideDeckState) {
          if (rideDeckState[ride] === card.id) {
            setRideDeckState((prevState) => ({
              ...prevState,
              [ride]: null,
            }));
          }
        }
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
    }
  };

  const openModal = () => {
    setIsFilter(true);
  };
  const openModal2 = () => {
    setIsLoad(true);
  };
  const closeModal2 = () => {
    setIsLoad(false);
  };

  const openModal3 = () => {
    setIsSave(true);
  };
  const closeModal3 = () => {
    setIsSave(false);
  };

  const closeModal = (selectedSet) => {
    setIsFilter(false);

    setFilters({ ...filters, cardSet: selectedSet });
  };
  const loadDeck = (deck) => {
    setNumOfCards({});
    setShowRideDeck({});
    setExistingDeck(deck);
    for (const rideID in deck.ride_deck) {
      const rID = deck.ride_deck[rideID];
      setShowRideDeck((prevState) => ({ ...prevState, [rID]: true }));
    }
    setRideDeckState({
      g0: deck.ride_deck[0],
      g1: deck.ride_deck[1],
      g2: deck.ride_deck[2],
      g3: deck.ride_deck[3],
    });
    // Calculate counts from the loaded deck
    const newNumOfCards = {};

    // Count cards in ride_deck
    deck.ride_deck.forEach((cardId) => {
      newNumOfCards[cardId] = (newNumOfCards[cardId] || 0) + 1;
    });

    // Count cards in triggers
    deck.triggers.forEach((cardId) => {
      newNumOfCards[cardId] = (newNumOfCards[cardId] || 0) + 1;
    });

    // Count cards in main_deck
    deck.main_deck.forEach((cardId) => {
      newNumOfCards[cardId] = (newNumOfCards[cardId] || 0) + 1;
    });

    // Update numOfCards with the counts from the loaded deck
    setNumOfCards(newNumOfCards);
    setMainDeckList(deck.main_deck);
    const newTriggerList = ArraytoList(deck.triggers, originalCardpool);
    setTriggerList(newTriggerList);
  };

  return (
    <div>
      <NavBar />
      <h1>Deck loaded: </h1>
      {existingDeck ? <h1>{existingDeck.deck_name}</h1> : <h1>None</h1>}
      <Button onClick={openModal}>Filter</Button>
      <br />
      <div className="modal">
        <Filter
          isOpen={isFilter}
          onClose={(set) => closeModal(set)}
          onFilterSelect={(filterCond) => {
            setFilters({
              ...filters,
              cardSet: filterCond[0],
              cardName: filterCond[1],
              cardType: filterCond[2],
              hasCC: filterCond[3],
              hasSC: filterCond[4],
            });
          }}
        />
      </div>

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
      {player ? (
        <div>
          <Button onClick={openModal2}>Load deck</Button>
          <div className="modal">
            <LoadDeck
              isOpen={isLoad}
              onClose={() => closeModal2()}
              playerID={player.id}
              loadADeck={(deck) => loadDeck(deck)}
            />
          </div>
          <Button onClick={openModal3}>Save deck</Button>
          <br />
          <div className="modal">
            <SaveDeck
              isOpen={isSave}
              onClose={() => closeModal3()}
              rideDeck={rideDeckState}
              triggers={triggerList}
              mainDeck={mainDeckList}
            />
          </div>
        </div>
      ) : null}
      <FilterButtons
        properties={filters}
        onSetProp={(newGrade, newNation) => {
          setFilters((prevFilters) => ({
            ...prevFilters,
            grade: newGrade,
            nation: newNation,
          }));
        }}
      />
      <Button>
        <Link to="/">Back to homepage</Link>
      </Button>
    </div>
  );
}
