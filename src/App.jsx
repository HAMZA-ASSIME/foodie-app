import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../src/pages/homePage.jsx";
import Fav from "../src/pages/fav.jsx";
import RestaurantMenu from "../src/pages/restaurant-menu.jsx";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/liste-favories" element={<Fav />} />
          <Route path="/restaurant/:id" element={<RestaurantMenu />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
