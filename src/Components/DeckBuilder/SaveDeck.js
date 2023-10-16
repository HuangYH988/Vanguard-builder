import Modal from "react-modal";
import { useState } from "react";

const URL = process.env.REACT_APP_BACKEND_URL;
const url = `${URL}/deck`;

export default function SaveDeck(prop) {
  const { isOpen, onClose, rideDeck, triggers, mainDeck, playerID } = prop;
  const [deckName, setDeckName] = useState("");
  const deckList2 = [];
  const rideDeckList = [rideDeck.g0, rideDeck.g1, rideDeck.g2, rideDeck.g3];
  const triggersList = [];
  let i = 0;
  for (const grade in rideDeck) {
    if (rideDeck[grade] !== null) {
      i++;
    }
  }
  for (const type in triggers) {
    for (let i = 0; i < triggers[type].length; i++) {
      triggersList.push(triggers[type][i]);
    }
  }
  for (const id in mainDeck) {
    deckList2.push(mainDeck[id]);
  }
  const deckSize = deckList2.length + triggersList.length + i;
  const checkLegit = () => {
    if (i !== 4) {
      return false;
    }
    if (triggersList.length !== 16) {
      return false;
    }
    if (deckSize !== 50) {
      return false;
    }
    return true;
  };
  async function saveDeck(e) {
    e.preventDefault();
  
    // Trim the deckName and check if it's empty or contains only spaces
    const trimmedDeckName = deckName.trim();
    if (!trimmedDeckName) {
      alert("Please enter a valid deck name.");
      return;
    }
    if (!checkLegit()) {
      alert(
        "Your deck is not legitimate. Please make appropriate changes to your deck first."
      );
    } else {
      const requestData = {
        deck_name: deckName,
        player_id: playerID,
        main_deck: deckList2,
        ride_deck: rideDeckList,
        triggers: triggersList,
      };
      console.log(requestData);
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add Authorization header if needed
            // "Authorization": `Bearer ${accessToken}`,
          },
          body: JSON.stringify(requestData),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error:", errorData);
          alert(`Failed to save deck. Error: ${errorData.message}`);
        } else {
          // Handle successful response if needed
          alert("Deck saved successfully!");
        }
      } catch (error) {
        console.error("Error:", error.message);
        alert(`Failed to save deck. Error: ${error.message}`);
      }
    }
  }
  

  const handleCloseModal = () => {
    onClose();
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
      <form onSubmit={saveDeck}>
        <h3 className="form-labels">Deck Name:</h3>
        <input
          type="text"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
          placeholder="name"
        />
        <div>Ride Deck: {i}/4</div>
        <div>Triggers: {triggersList.length}/16</div>
        <div>Main Deck: {deckSize}/50</div>
        <div>
          <button type="submit">Save Deck</button>
        </div>
      </form>
    </Modal>
  );
}
