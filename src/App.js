import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Modal from "react-modal"; // Import the Modal component
import "./App.css";
import Error from "./Error";
import HomePage from "./Components/Home";
import Analysis from "./Components/DeckBuilder/Analysis/Analysis";
import DeckBuild from "./Components/DeckBuilder/DeckBuilder";

function App() {
  // Set the app element when the component mounts
  useEffect(() => {
    Modal.setAppElement("#root"); // Replace "#root" with your actual root element id
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/deckbuilder" element={<DeckBuild />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
