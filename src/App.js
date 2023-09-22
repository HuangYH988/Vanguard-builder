import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Error from "./Error";
import HomePage from "./Components/Home";


function App() {
  return (
    <div className="App" >
   
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/*" element={<Error />} />
      </Routes>
      </div>
   
  );
}

export default App;
