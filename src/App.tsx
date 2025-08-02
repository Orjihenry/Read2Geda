
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import BookShelf from './pages/BookShelf';
import Discover from './pages/Discover';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle';

function App() {

  return (
    <>
      <Router basename="/Read2Geda">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/highlights" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my_shelf" element={<BookShelf />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
