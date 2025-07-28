
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/Read2Geda" element={<Navigate to="/" replace />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
