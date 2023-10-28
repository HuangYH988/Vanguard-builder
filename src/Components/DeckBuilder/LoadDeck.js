import Modal from "react-modal";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { customStyles } from "../Convert";

const URL = process.env.REACT_APP_BACKEND_URL;
const url = `${URL}/deck`;

export default function LoadDeck(prop) {
  const { isOpen, onClose, playerID, loadADeck } = prop;

  const [deckList, setDeckList] = useState(null);
  const [deck, setDeck] = useState(null);

  const handleCloseModal = () => {
    onClose();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/byPlayer/${playerID}`, {
          method: "GET",
        });

        const data = await response.json();

        // Set the filtered decks to the state
        setDeckList(data);
      } catch (error) {
        console.error("Error: ", error.message);
      }
    };
    if (deckList === null) {
      fetchData();
    }
  });

  const loadDeck = (dName) => {
    // Filter decks based on player_id
    for (const deck in deckList) {
      if (deckList[deck].deck_name === dName) {
        // Set the filtered decks to the state
        setDeck(deckList[deck]);
        break;
      }
    }

    if (deck) {
      
      loadADeck(deck);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={handleCloseModal} style={customStyles}>
      <div style={customStyles.modalBackground2}></div>
      <h2>Select a deck</h2>
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
              <Button onClick={() => loadDeck(deck.deck_name)} variant="contained" color="success">
                {deck.deck_name}
              </Button>
            </li>
          ))}
        </div>
      )}
    </Modal>
  );
}
