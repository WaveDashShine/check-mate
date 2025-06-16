import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import 'src/renderer/App.css';
import Landing from './pages/Landing'
import Settings from './pages/Settings'
import Sidebar from "./components/Sidebar";
// TODO
// import Alerts from './pages/Alerts';
// import Tutorial from './pages/Tutorial';
// import Settings from './pages/Settings';
// import About from './pages/About';

export default function App() {
  return (
      <Router>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <Sidebar/>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/alerts" element={<Landing />} />
            <Route path="/tutorial" element={<Landing />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<Landing />} />
          </Routes>
        </div>
      </Router>
  );
}
