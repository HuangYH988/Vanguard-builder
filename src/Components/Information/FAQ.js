import Modal from "react-modal";
import { customStyles } from "../Convert";
import { Link } from "react-router-dom";

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
      <div className="help-text">
        <h2>How to use Vanguard Builder</h2>
        <h3>Card filter and search</h3>
        <div>
          Go to BUILD DECK/VIEW CARDS to see the entire card list available,
          filtered by both grade of the card and the nation it belongs to. You
          can further filter the list by clicking the Filter button above the
          cards to further filter the cards by the set they were released in,
          name of the card, card type, card effect, as well as whether the card
          can counter charge/soul charge. See details of card mechanics
          explained{" "}
          <Link to="https://cardfight.fandom.com/wiki/Card_Mechanics">
            here
          </Link>{" "}
        </div>
        <h3>Deck building</h3>
        <div>
          You can also build a deck here using the cards available in our
          database! A Cardfight!! Vanguard deck needs to consist of exactly 50
          cards, all need to contain the same Nation, or is an Elemental,
          including exactly 16{" "}
          <Link to="https://cardfight.fandom.com/wiki/Trigger">trigger</Link>{" "}
          cards. The deck also need to contain 4 unit cards, 1 of each from
          grade 0 to 3 respectively, to form the{" "}
          <Link to="https://cardfight.fandom.com/wiki/Ride_Deck">
            Ride Deck
          </Link>
          . Details of deck building regulations can be found{" "}
          <Link to="https://cardfight.fandom.com/wiki/Deck_Regulations">
            here.
          </Link>{" "}
          Even if you cannot remember the details, no worry! Much of the deck
          building restrictions are automatically included in our deck builder!
          <br />
          Further use for the decklists you constructed here will be explored in
          the future.
        </div>
        <h3>Deck editting</h3>
        <div>
          If you wish to edit and save changes to an existing deck, you may do
          so. First go to deck building page, then load the deck you wish to
          edit by clicking LOAD DECK button. After you are satisfied with the
          changes, click SAVE DECK. Then from the pop up modal, select the deck
          you wish to edit over. You may give your deck a new name or leave the
          deck name section blank if you wish to keep the old one.
        </div>
      </div>
    </Modal>
  );
}
