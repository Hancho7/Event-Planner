import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Event from "./pages/events";
import AboutUs from "./pages/aboutUs";
import Register from "./pages/register";
import Login from "./pages/login";
import Admin from "./dashboard";
import Overview from "./dashboard/pages/Overview";
import AddNewEvent from "./dashboard/pages/AddNewEvent";
import Attendees from "./dashboard/pages/Attendees";
import Payments from "./dashboard/pages/Payments";
import Students from "./dashboard/pages/Students";
import Review from "./dashboard/pages/Review";
import Profile from "./dashboard/pages/Profile";
import Navbar from "./components/layouts";
import { AdminProvider } from "./Context/AdminContext.jsx";
import EmailVerification from "./pages/EmailVerification.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsOfService from "./pages/TermsOfService.jsx";
import UserProfile from "./pages/updateProfile.jsx";
import BecomeAPlanner from "./pages/becomeAPlanner.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";

function App() {
  return (
    <AdminProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">
            <Routes>
              <Route element={<Navbar />}>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<Event />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/update-profile" element={<UserProfile />} />
                <Route path="/planner-request" element={<BecomeAPlanner />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
              </Route>

              <Route path="/admin" element={<Admin />}>
                <Route path="/admin/" element={<Overview />} />
                <Route path="/admin/add-new-event" element={<AddNewEvent />} />
                <Route path="/admin/Attendees" element={<Attendees />} />
                <Route path="/admin/Payments" element={<Payments />} />
                <Route path="/admin/Student" element={<Students />} />
                <Route path="/admin/Review" element={<Review />} />
                <Route path="/admin/Profile" element={<Profile />} />
              </Route>

              {/* <Route path="/payment" element={<PaymentForm />} /> */}

              <Route
                path="/email-verification/:userID/:tokenLink"
                element={<EmailVerification />}
              />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AdminProvider>
  );
}

export default App;
