import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import Home from "./pages/Home";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AddBook" element={<AddBook />} />
          <Route path="/EditBook/:id" element={<EditBook />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
