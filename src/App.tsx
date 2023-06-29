import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Features from "./components/Features/Features";
import Home from "./components/Home/Home";
import Pricing from "./components/Pricing/Pricing";
import Resources from "./components/Resources/Resources";
import Footer from "./components/Footer/Footer";


function App() {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <Router>
        <div>
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/resources" element={<Resources />} />
            <Shortening isLoggedIn={isLoggedIn} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
