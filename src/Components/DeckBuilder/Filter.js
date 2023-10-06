import Modal from "react-modal";
import { useState} from "react";

export default function Filter(props) {
  const { isOpen, onClose, onFilterSelect } = props;
  const [selectedSet, setSelectedSet] = useState("");

  const handleSelectChange = (event) => {
    setSelectedSet(event.target.value);
    // Reset the second select when the first select changes
  };

  const handleCloseModal = () => {
    onClose();
    onFilterSelect(selectedSet); // Pass both selected values
  };

  const handleResetFilter = () => {
    onClose();
    setSelectedSet("");

    onFilterSelect(null); // Reset both selected values to null
  };

  // Define the options for the second select based on the first select value
  const subSetOptions =
    {
      "Start/Trial Decks": {
        SD01: "D Start Deck 01: Yu-yu Kondo -Holy Dragon-",
        SD02: "D Start Deck 02: Danji Momoyama -Tyrant Tiger-",
        SD03: "D Start Deck 03: Tohya Ebata -Apex Ruler-",
        SD04: "D Start Deck 04: Megumi Okura -Sylvan King-",
      },
      // Add more options for other sets as needed
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

      {selectedSet === "Start/Trial Decks" && (
        <div>
          <div>Select the sub-set:</div>
          <select value={selectedSet} onChange={handleSelectChange}>
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
