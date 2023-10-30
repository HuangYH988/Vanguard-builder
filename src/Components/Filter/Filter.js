import Modal from "react-modal";
import { useState } from "react";
import { Button } from "@mui/material";
import { customStyles } from "../Convert";

export default function Filter(props) {
  const { isOpen, onClose, onFilterSelect } = props;
  const [selectedSet, setSelectedSet] = useState("");
  const [selectedSubSet, setSelectedSubSet] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [isSoulCharge, setIsSoulCharge] = useState(false);
  const [isCounterCharge, setIsCounterCharge] = useState(false);
  const [unitOrder, setUnitOrder] = useState("");
  const [orderType, setOrderType] = useState("");
  const nullArray = [];

  const handleSelectChange = (event) => {
    setSelectedSet(event.target.value);
    // Reset the second select when the first select changes
  };

  const handleSubSetChange = (event) => {
    setSelectedSubSet(event.target.value);
  };

  const handleSelectChange2 = (event) => {
    setUnitOrder(event.target.value);
    // Reset the second select when the first select changes
  };

  const handleSubSetChange2 = (event) => {
    setOrderType(event.target.value);
  };

  const handleIsSoulChargeChange = (event) => {
    setIsSoulCharge(event.target.checked);
  };

  const handleIsCounterChargeChange = (event) => {
    setIsCounterCharge(event.target.checked);
  };

  const handleCloseModal = () => {
    const filterCond = [];
    onClose();
    if (selectedSet === "PR") {
      filterCond.push("PR");
      nullArray.push(null);
    } else {
      filterCond.push(selectedSubSet);
      nullArray.push(null);
    }
    filterCond.push(nameFilter);
    nullArray.push(null);
    if (unitOrder === "Unit") {
      filterCond.push("Unit");
      nullArray.push(null);
    } else if (orderType === "Any") {
      filterCond.push("Order");
      nullArray.push(null);
    } else {
      filterCond.push(orderType);
      nullArray.push(null);
    }
    filterCond.push(isCounterCharge, isSoulCharge);
    nullArray.push(null, null);
    onFilterSelect(filterCond);
  };

  const handleResetFilter = () => {
    onClose();
    setSelectedSet("");
    setSelectedSubSet("");
    onFilterSelect(nullArray);
    setNameFilter("");
    setIsCounterCharge(false);
    setIsSoulCharge(false);
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
  const orderOptions =
    {
      Order: {
        1: "Any",
        2: "Normal Order",
        3: "Blitz Order",
        4: "Set Order",
      },
    }[unitOrder] || [];

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
      <div className="filter-cond">
        <h3>Search by set:</h3>
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
              disabled={
                !subSetOptions || Object.keys(subSetOptions).length === 0
              }
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
      </div>
      <div className="filter-cond">
        <h3 className="form-labels">Search by card name:</h3>
        <input
          type="text"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          placeholder="name"
        />
      </div>
      <div className="filter-cond">
        <h3>Unit/Order:</h3>
        <select value={unitOrder} onChange={handleSelectChange2}>
          <option value="Unit">Unit</option>
          <option>Order</option>
        </select>
        {unitOrder && (
          <div>
            <div>Select order type:</div>
            <select
              value={orderType}
              onChange={handleSubSetChange2}
              disabled={!orderOptions || Object.keys(orderOptions).length === 0}
            >
              <option>Select order type:</option>
              {Object.entries(orderOptions).map(([key, value], index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div className="filter-cond">
        <h3>Counter Charge:</h3>
        <input
          type="checkbox"
          checked={isCounterCharge}
          onChange={handleIsCounterChargeChange}
        />
      </div>
      <div className="filter-cond">
        <h3>Soul Charge:</h3>
        <input
          type="checkbox"
          checked={isSoulCharge}
          onChange={handleIsSoulChargeChange}
        />
      </div>

      <br />
      <Button variant="contained" onClick={handleCloseModal}>
        Filter
      </Button>
      <Button variant="contained" color="secondary" onClick={handleResetFilter}>
        Reset filter
      </Button>
    </Modal>
  );
}
