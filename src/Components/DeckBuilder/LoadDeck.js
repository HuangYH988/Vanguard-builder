import Modal from "react-modal";
import { useState, useEffect } from "react";

const URL = process.env.REACT_APP_BACKEND_URL;
const url = `${URL}/deck`;

export default function LoadDeck(prop) {
  const { isOpen, onClose, playerID } = prop;

  const [deckList, setDeckList] = useState(null);
  const [deck, setDeck] = useState(null);

  const handleCloseModal = () => {
    onClose();
  };
let i =0;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
        });

        const data = await response.json();
        // Filter decks based on player_id
        const playerDecks = Object.values(data).filter(
          (deck) => parseInt(deck.player_id, 10) === playerID
        );

        // Set the filtered decks to the state
        setDeckList(playerDecks);
      } catch (error) {
        console.error("Error: ", error.message);
      }
    };
    if (deckList === null) {
      fetchData();
    }
  });

  const loadDeck = (dName) => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/byPlayer/${playerID}`, {
          method: "GET",
        });

        const data = await response.json();
        // Filter decks based on player_id
        for (const deck in data) {
          if (data[deck].deck_name === dName) {
            // Set the filtered decks to the state
            setDeck(data[deck]);
            break;
          }
        }
      } catch (error) {
        console.error("Error: ", error.message);
      }
    };
    if (!deck) {
      fetchData();
      
    }
    if(deck && i===0){
      console.log(deck.deck_name);
      i++
    }
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={handleCloseModal}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={handleCloseModal}
          style={{ cursor: "pointer", padding: "5px" }}
        >
          X
        </button>
      </div>
      {deckList && (
        <div>
          {Object.values(deckList).map((deck) => (
            <li key={deck.deck_name}>
              <button onClick={() => loadDeck(deck.deck_name)}>
                {deck.deck_name}
              </button>
            </li>
          ))}
        </div>
      )}
    </Modal>
  );
}
