import Modal from "react-modal";
import { customStyles } from "../Convert";

export default function FAQ(prop) {
  const { isOpen, onClose } = prop;
  const handleCloseModal = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
    >
        <div style={customStyles.modalBackground}></div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={handleCloseModal}
          style={{ cursor: "pointer", padding: "5px" }}
        >
          X
        </button>
      </div>
      <h2>How to use Vanguard Builder</h2>
      <p>help info</p>
    </Modal>
  );
}
