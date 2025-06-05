import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import 'src/renderer/App.css';
import Landing from './pages/Landing'
// TODO
// import Alerts from './pages/Alerts';
// import Tutorial from './pages/Tutorial';
// import Settings from './pages/Settings';
// import About from './pages/About';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/alerts" element={<Landing />} />
        <Route path="/tutorial" element={<Landing />} />
        <Route path="/settings" element={<Landing />} />
        <Route path="/about" element={<Landing />} />
      </Routes>
    </Router>
  );
}
