import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ContextProvider } from "./context/ContextProvider";

// Pages
import About from "./pages/About";
import BookShelf from "./pages/BookShelf";
import ClubDetails from "./pages/ClubDetails";
import Contact from "./pages/Contact";
import CreateClub from "./pages/CreateClub";
import Discover from "./pages/Discover";
import Discussions from "./pages/Discussions";
import Home from "./pages/Home";
import HowItWoks from "./pages/HowItWorks";
import Login from "./pages/Auth/Login";
import PrivacyPolicy from "./pages/Privacy";
import Profile from "./pages/Profile";
import Register from "./pages/Auth/Register";
import Terms from "./pages/T&C";
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
            <Route path="/discover" element={<Discover />} />
            <Route path="/how_it_works" element={<HowItWoks />} />
            <Route path="/club/:clubId" element={<ClubDetails />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/discussions" element={<Discussions />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route path="/my_shelf" element={<ProtectedRoutes><BookShelf /></ProtectedRoutes>} />
            <Route path="/create_club" element={<ProtectedRoutes><CreateClub /></ProtectedRoutes>} />
            <Route path="/highlights" element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
            
          </Routes>
        </ContextProvider>
      </Router>
    </>
  );
}

export default App;
