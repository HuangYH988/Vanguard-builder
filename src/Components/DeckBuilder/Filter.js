import Modal from "react-modal";

export default function Filter(prop) {
  const { isOpen, onClose } = prop;
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={onClose} style={{ cursor: "pointer", padding: "5px" }}>
          X
        </button>
      </div>
      <div>Citerias for filter:</div>
      <select value="Select set">
        <option>Select the set:</option>
        <option>Start/Trial Decks</option>
        <option>Booster Sets</option>
        <option>Special Sets</option>
        <option>Promos</option>
      </select>
    </Modal>
  );
}
