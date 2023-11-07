import Modal from "react-modal";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { customStyles } from "../../Convert";
import { url_cards } from "../DeckBuilder";

export default function SampleHand(prop) {
  const { isOpen, onClose, trigger, main } = prop;

  const [cardPool, setCardPool] = useState("");
  const [openHand, setOpenHand] = useState([]);
  const [deckList, setDeckList] = useState([]);

  const pickRandomIds = (arr, count) => {
    const shuffled = arr.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url_cards, {
          method: "GET",
        });

        const data = await response.json();
        const cardPoolObject = {};
        data.forEach((card) => {
          cardPoolObject[card.id] = card;
        });
        setCardPool(cardPoolObject);

        // Create the deckList from trigger and main
        const combinedDeckList = [];
        for (const card in trigger) {
          combinedDeckList.push(trigger[card].id);
        }
        for (const card in main) {
          combinedDeckList.push(main[card].id);
        }
        setDeckList(combinedDeckList);

        // Initially pick random IDs if openHand is empty
        if (openHand.length === 0) {
          const initialRandomIds = pickRandomIds(combinedDeckList, 5);
          setOpenHand(initialRandomIds);
        }
      } catch (error) {
        console.error("Error: ", error.message);
      }
    };

    if (Object.keys(cardPool).length === 0) {
      fetchData();
    }
  }, [trigger, main, cardPool, openHand]);

  const handleCloseModal = () => {
    setOpenHand([]);
    onClose();
  };

  const redrawHand = () => {
    const newRandomIds = pickRandomIds(deckList, 5);
    setOpenHand(newRandomIds);
  };

  useEffect(() => {
    if (isOpen) {
      redrawHand(); 
    }
    // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
    ><h2 style={{ textAlign: "center" }}>Sample opening hand:</h2>
      <div style={customStyles.modalBackground2}></div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={handleCloseModal}
          style={{ cursor: "pointer", padding: "5px" }}
        >
          X
        </button>
      </div>
      <Button variant="contained" color="error" onClick={redrawHand}>
        Redraw hand
      </Button>
      <br />
      {openHand.map((id, index) => {
        const selectedCard = cardPool[id];
        return (
          <div key={index} className="hand-card">
            <img src={selectedCard.image_link} alt="card" width="140px" />
          </div>
        );
      })}
    </Modal>
  );
}

