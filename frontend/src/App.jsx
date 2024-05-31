import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/home";
import Events from "./pages/events";
import AboutUs from "./pages/aboutUs";
import Register from "./pages/register";
import Login from "./pages/login";


function App() {
  return (
    
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>  
    </Router>

  );
}

export default App;
