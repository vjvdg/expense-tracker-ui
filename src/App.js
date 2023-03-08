import React from "react";
import "./App.css";
import Expense from "./components/Expense";

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Expense Tracker</h1>
      <Expense />
    </div>
  );
}

export default App;