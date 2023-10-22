import Modal from "react-modal";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const URL = process.env.REACT_APP_BACKEND_URL;
const url = `${URL}/deck`;
const url_player = `${URL}/player`;

export default function SaveDeck(prop) {
  const { isOpen, onClose, rideDeck, triggers, mainDeck } = prop;
  const [deckName, setDeckName] = useState("");
  const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect } =
    useAuth0();
  const [ accessToken, setAccessToken ] = useState("");
  const [player, setPlayer] = useState(null);

const checkUser=async()=>{
  if (isAuthenticated) {
    let token = await getAccessTokenSilently();
   
    setAccessToken(token)
  } else {
    loginWithRedirect();
  }
}

  useEffect(() => {
    checkUser();
    const fetchPlayerData = async () => {
      try {
        const response = await fetch(url_player, {
          method: "GET",
        });

        const data = await response.json();
        for (const acc in data) {
          if (user.nickname === data[acc].player_name) {
            setPlayer(data[acc]);
            break;
          }
        }
      } catch (error) {
        console.error("Error: ", error.message);
      }
    };
    if (isAuthenticated && !player) {
      fetchPlayerData();
    }
  });

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
    if (!isAuthenticated) {
      alert("You need to login first before you can save a deck list.");
    }

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
        player_id: player.id,
        main_deck: deckList2,
        ride_deck: rideDeckList,
        triggers: triggersList,
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add Authorization header if needed
             "Authorization": `Bearer ${accessToken}`,
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
