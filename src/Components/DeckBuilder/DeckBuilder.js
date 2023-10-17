import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Filter from "../Filter/Filter";
import FilterButtons from "../Filter/FilterButtons";
import SaveDeck from "./SaveDeck";
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
  const [isSave, setIsSave] = useState(false);
  const [filteredCardpool, setFilteredCardpool] = useState("");
  const [originalCardpool, setOriginalCardpool] = useState("");
  const [filters, setFilters] = useState({
    cardSet: null,
    grade: "3",
    nation: "Dragon Empire",
    card_name: null,
  });

  const [showRideDeck, setShowRideDeck] = useState({}); // Object to track each button's state
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
    const checkFilterNull = () => {
      if (filters.cardSet !== null) {
        return true;
      }
      if (filters.name !== null) {
        return true;
      }
      return false;
    };

    // Fetch data only when filters or originalCardpool changes
    const filterChange = checkFilterNull();
    if (filterChange || !originalCardpool) {
      fetchData();
    }

    // Filter cards based on the selected set
    if (originalCardpool) {
      const filterByGradeNation = originalCardpool.filter((card)=>card.nation===filters.nation && card.grade===filters.grade)
      const filteredCards = filters.cardSet
        ? filterByGradeNation.filter((card) =>
            card.card_number.includes(filters.cardSet)
          )
        : filterByGradeNation;

      // Update the state with the filtered cards
      setFilteredCardpool(filteredCards);
    }
  }, [filters, originalCardpool]);

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
    const isUnit = card.card_type === "Unit";
    const isTrigger = card.trigger;
    if (event.ctrlKey) {
      if (isUnit) {
        // Set card as ride deck if it is unit and of g0-g3
        switch (grade) {
          case 0:
            if (!rideDeckState.g0) {
              // Only set as ride deck if ride deck does not already contain a g0
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
    }
    const isVacancy = isDeckLimit();
    if (isTrigger) {
      setDifferentTriggers(id, isTrigger);
    } else {
      if (isVacancy) {
        if (numOfCards[id] && numOfCards[id] >= 4) {
          alert("You cannot have more than 4 copy of the same card.");
        } else if (numOfCards[id]) {
          setNumOfCards((prevState) => ({
            ...prevState,
            [id]: numOfCards[id] + 1,
          }));
          setMainDeckList((prevMainDeckList) => [...prevMainDeckList, id]);
        } else {
          setNumOfCards((prevState) => ({
            ...prevState,
            [id]: 1,
          }));
          setMainDeckList((prevMainDeckList) => [...prevMainDeckList, id]);
        }
      } else {
        alert("You have exceeded the upper limit of your deck");
      }
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
    setIsSave(true);
  };
  const closeModal2 = () => {
    setIsSave(false);
  };

  const closeModal = (selectedSet) => {
    setIsFilter(false);

    setFilters({ ...filters, cardSet: selectedSet });
  };

  return (
    <div>
      <h1>This is the page for deck building</h1>
      <button onClick={openModal}>Filter</button>
      <br />
      <div className="modal">
        <Filter
          isOpen={isFilter}
          onClose={(set) => closeModal(set)}
          onFilterSelect={(set, name) => {
            setFilters({ ...filters, cardSet: set, card_name: name });
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

      <button onClick={openModal2}>Save deck</button>
      <br />
      <div className="modal">
        <SaveDeck
          isOpen={isSave}
          onClose={() => closeModal2()}
          rideDeck={rideDeckState}
          triggers={triggerList}
          mainDeck={mainDeckList}
          playerID={player_id}
        />
      </div>
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
      <button>
        <Link to="/">Back to homepage</Link>
      </button>
    </div>
  );
}
