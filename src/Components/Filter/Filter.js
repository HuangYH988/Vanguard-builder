import Modal from "react-modal";
import { useState } from "react";

export default function Filter(props) {
  const { isOpen, onClose, onFilterSelect } = props;
  const [selectedSet, setSelectedSet] = useState("");
  const [selectedSubSet, setSelectedSubSet] = useState("");
  const [nameFilter, setNameFilter]= useState("");

  const handleSelectChange = (event) => {
    setSelectedSet(event.target.value);
    // Reset the second select when the first select changes
  };

  const handleSubSetChange = (event) => {
    setSelectedSubSet(event.target.value);
  };

  const handleCloseModal = () => {
    onClose();
    onFilterSelect(selectedSubSet,nameFilter);
  };

  const handleResetFilter = () => {
    onClose();
    setSelectedSet("");
    setSelectedSubSet("");
    onFilterSelect(null, null);
  };

  // Define the options for the second select based on the first select value
  const subSetOptions =
    {
      "Start/Trial Decks": {
        SD01: "D Start Deck 01: Yu-yu Kondo -Holy Dragon-",
        SD02: "D Start Deck 02: Danji Momoyama -Tyrant Tiger-",
        SD03: "D Start Deck 03: Tohya Ebata -Apex Ruler-",
        SD04: "D Start Deck 04: Megumi Okura -Sylvan King-",
        SD05: "D Start Deck 05: Tomari Seto -Aurora Valkyrie-",
      },
      // Add more options for other sets as needed
      "Booster Sets": {
        BT01: "D Booster Set 01: Genesis of the Five Greats",
        BT02: "D Booster Set 02: A Brush with the Legends",
        BT03: "D Booster Set 03: Advance of Intertwined Stars",
        BT04: "D Booster Set 04: Awakening of Chakrabarthi",
        BT05: "D Booster Set 05: Triumphant Return of the Brave Heroes",
      },
      "Special sets:": {},
    }[selectedSet] || [];

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
      <div>Criterias for filter:</div>
      <select value={selectedSet} onChange={handleSelectChange}>
        <option>Select the set:</option>
        <option>Start/Trial Decks</option>
        <option>Booster Sets</option>
        <option>Special Sets</option>
        <option value="PR">Promos</option>
      </select>

      {selectedSet && (
        <div>
          <div>Select the sub-set:</div>
          <select
            value={selectedSubSet}
            onChange={handleSubSetChange}
            disabled={!subSetOptions || Object.keys(subSetOptions).length === 0}
          >
            <option>Select sub-set:</option>
            {Object.entries(subSetOptions).map(([key, value], index) => (
              <option key={index} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
      )}

      <br />
      <button onClick={handleCloseModal}>Filter</button>
      <button onClick={handleResetFilter}>Reset filter</button>
    </Modal>
  );
}
