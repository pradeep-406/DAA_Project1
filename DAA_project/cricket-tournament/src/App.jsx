import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AddTeam from './pages/AddTeam';
import Schedule from './pages/Schedule';
import PointsTable from './pages/PointsTable';
import { TournamentProvider } from './context/TournamentContext';

function App() {
  return (
    <TournamentProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-teams" element={<AddTeam />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/points-table" element={<PointsTable />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </TournamentProvider>
  );
}

export default App;
