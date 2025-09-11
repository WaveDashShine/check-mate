import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from 'src/renderer/components/Sidebar';
import Landing from 'src/renderer/pages/Landing';
import Checks from 'src/renderer/pages/Checks';
import Settings from 'src/renderer/pages/Settings';
// TODO
// import Tutorial from './pages/Tutorial';
// import About from './pages/About';

export default function App() {
  return (
    <Router>
      <div className="app flex min-h-screen font-sans">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/checks" element={<Checks />} />
          <Route path="/tutorial" element={<Landing />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<Landing />} />
        </Routes>
      </div>
    </Router>
  );
}
