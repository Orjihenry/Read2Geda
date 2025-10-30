import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ContextProvider } from "./context/ContextProvider";

// Pages
import About from "./pages/About";
import BookShelf from "./pages/BookShelf";
import ClubDetails from "./pages/ClubDetails";
import Contact from "./pages/Contact";
import ClubForm from "./pages/ClubForm";
import Clubs from "./pages/Clubs";
import Discussions from "./pages/Discussions";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import Login from "./pages/Auth/Login";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Register from "./pages/Auth/Register";
import Terms from "./pages/TermsConditions";

import ProtectedRoutes from "./utils/ProtectedRoutes";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

function App() {
  return (
    <>
      <Router basename="/">
        <ContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/how_it_works" element={<HowItWorks />} />
            <Route path="/club/:clubId" element={<ClubDetails />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/discussions" element={<Discussions />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route path="/my_shelf" element={<ProtectedRoutes><BookShelf /></ProtectedRoutes>} />
            <Route path="/create_club" element={<ProtectedRoutes><ClubForm /></ProtectedRoutes>} />
            <Route path="/club/:clubId/update" element={<ProtectedRoutes><ClubForm /></ProtectedRoutes>} />
            <Route path="/highlights" element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
            <Route path="/edit_profile" element={<ProtectedRoutes><EditProfile /></ProtectedRoutes>} />
          </Routes>
        </ContextProvider>
      </Router>
    </>
  );
}

export default App;
