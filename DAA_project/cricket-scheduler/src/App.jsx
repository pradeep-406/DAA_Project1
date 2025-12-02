import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TournamentProvider } from './context/TournamentContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AddTeam from './pages/AddTeam';
import Schedule from './pages/Schedule';
import PointsTable from './pages/PointsTable';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <TournamentProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/teams" element={<AddTeam />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/points-table" element={<PointsTable />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </TournamentProvider>
  );
}

export default App;
