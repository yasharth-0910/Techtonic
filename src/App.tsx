import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import InstallationGuide from "./pages/InstallationGuide" // Update the path as needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/InstallationGuide" element={<InstallationGuide />} />
      </Routes>
    </Router>
  );
}

export default App;