import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import BookShelf from "./pages/BookShelf";
import ClubDetails from "./pages/ClubDetails";
import Contact from "./pages/Contact";
import CreateClub from "./pages/CreateClub";
import Discover from "./pages/Discover";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
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
          <Route path="/club/:clubId" element={<ClubDetails />} />
          <Route path="/create_club" element={<CreateClub />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
