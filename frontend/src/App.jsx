import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Event from "./pages/events";
import AboutUs from "./pages/aboutUs";
import Register from "./pages/register";
import Login from "./pages/login";
import Footer from "./components/footer";
import Admin from "./dashboard";
import DashboardHome from "./dashboard/pages/home";
import Navbar from "./components/layouts";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Event />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/admin" element={<Admin />}>
          <Route path="/admin/" element={<DashboardHome />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  
  );
}

export default App;
