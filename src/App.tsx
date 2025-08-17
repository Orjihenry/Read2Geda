import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import About from "./pages/About";
import BookShelf from "./pages/BookShelf";
import ClubDetails from "./pages/ClubDetails";
import Contact from "./pages/Contact";
import CreateClub from "./pages/CreateClub";
import Discover from "./pages/Discover";
import Home from "./pages/Home";
import HowItWoks from "./pages/HowItWorks";
import PrivacyPolicy from "./pages/Privacy";
import Profile from "./pages/Profile";
import Terms from "./pages/T&C";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

function App() {
  return (
    <>
      <Router basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/highlights" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my_shelf" element={<BookShelf />} />
          <Route path="/how_it_works" element={<HowItWoks />} />
          <Route path="/club/:clubId" element={<ClubDetails />} />
          <Route path="/create_club" element={<CreateClub />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
