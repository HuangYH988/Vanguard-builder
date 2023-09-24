import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Error from "./Error";
import HomePage from "./Components/Home";
import Analysis from "./Components/DeckBuilder/Analysis";
import DeckBuild from "./Components/DeckBuilder/DeckBuilder";

function App() {
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
