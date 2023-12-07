import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./components/Admin";
import BookDetails from "./components/BookDetails";
import Navbar from "./components/Navbar";
import QRScanner from "./components/QrScanner";
import ShowAdmin from "./components/ShowAdmin";
import ShowBook from "./components/ShowBook";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/showAdmin" element={<ShowAdmin />} />
        <Route path="/showBook" element={<ShowBook />} />
        <Route path="/qrScanner" element={<QRScanner />} />
        <Route
          path="/book/:nameofbook/:isbnnoofbook"
          element={<BookDetails />}
        />
      </Routes>
    </Router>
  );
}

export default App;
