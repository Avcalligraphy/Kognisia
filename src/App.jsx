import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Majalah from "./pages/Majalah";
import Galeri from "./pages/Galeri";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/majalah" element={<Majalah />} />
        <Route path="/galeri" element={<Galeri />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
