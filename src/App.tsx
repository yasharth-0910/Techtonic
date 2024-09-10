import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Homepage from './pages/Homepage';
import InstallationGuide from "./pages/InstallationGuide" // Update the path as needed

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/installation-guide" element={<InstallationGuide />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;