import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Features from "./components/Features/Features";
import Home from "./components/Home/Home";
import Pricing from "./components/Pricing/Pricing";
import Resources from "./components/Resources/Resources";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
