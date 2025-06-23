import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import 'src/renderer/App.css';
import Sidebar from "./components/Sidebar";
import Landing from './pages/Landing'
import Checks from './pages/Checks';
import Settings from './pages/Settings'
// TODO
// import Tutorial from './pages/Tutorial';
// import About from './pages/About';

export default function App() {
  return (
      <Router>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <Sidebar/>
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
