import { useTournament } from '../context/TournamentContext';
import { IoCalendar, IoLocationSharp } from 'react-icons/io5';
import { GiCricketBat, GiTrophy } from 'react-icons/gi';
import { FaFilePdf, FaFileCsv } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Schedule = () => {
  const { matches, updateMatchResult } = useTournament();

  const handleResultUpdate = (matchId, result) => {
    if (window.confirm('Confirm result for this match?')) {
      updateMatchResult(matchId, result);
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.setTextColor(31, 64, 175);
    doc.text('Cricket Tournament Schedule', 14, 20);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28);

    const tableData = matches.map((match) => [
      match.matchNo,
      match.teamA.name,
      match.teamB.name,
      match.date,
      match.slot,
      match.time,
      match.ground,
      match.status,
    ]);

    doc.autoTable({
      startY: 35,
      head: [['#', 'Team A', 'Team B', 'Date', 'Slot', 'Time', 'Ground', 'Status']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [31, 64, 175] },
    });

    doc.save('tournament-schedule.pdf');
  };

  const exportToCSV = () => {
    const headers = ['Match#', 'Team A', 'Team B', 'Date', 'Slot', 'Time', 'Ground', 'Status'];
    const rows = matches.map((m) => [
      m.matchNo, m.teamA.name, m.teamB.name, m.date, m.slot, m.time, m.ground, m.status
    ]);

    let csv = headers.join(',') + '\n';
    rows.forEach((row) => {
      csv += row.join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tournament-schedule.csv';
    a.click();
  };

  if (matches.length === 0) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="glass-dark rounded-2xl p-12 text-center">
            <IoCalendar className="w-20 h-20 text-gray-500 mx-auto mb-6 animate-float" />
            <h3 className="text-2xl font-bold text-white mb-4">No Schedule Generated</h3>
            <p className="text-gray-400 mb-8">
              Go to Admin Panel to generate schedule using Backtracking algorithm
            </p>
            <a
              href="/admin"
              className="inline-block bg-gradient-to-r from-blue-500 to-neon-green text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              Generate Schedule
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-4">
            <IoCalendar className="w-16 h-16 text-purple-400 animate-float" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Match Schedule
          </h1>
          <p className="text-gray-300 text-lg">Auto-generated using Backtracking & Graph Coloring</p>
        </div>

        {/* Export Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 no-print">
          <button
            onClick={exportToPDF}
            className="glass px-6 py-3 rounded-lg text-white font-medium hover-scale flex items-center space-x-2"
          >
            <FaFilePdf className="text-red-400" />
            <span>Export PDF</span>
          </button>
          <button
            onClick={exportToCSV}
            className="glass px-6 py-3 rounded-lg text-white font-medium hover-scale flex items-center space-x-2"
          >
            <FaFileCsv className="text-green-400" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Schedule Cards */}
        <div className="space-y-4">
          {matches.map((match, index) => (
            <div
              key={match.id}
              className="glass-dark rounded-2xl p-6 animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Match Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-3">
                    <GiCricketBat className="text-neon-green" />
                    <span className="text-white font-bold">Match #{match.matchNo}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      match.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'
                    }`}>
                      {match.status}
                    </span>
                  </div>

                  {/* Teams */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {match.teamA.logo ? (
                        <img src={match.teamA.logo} alt={match.teamA.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                          {match.teamA.name.charAt(0)}
                        </div>
                      )}
                      <span className="text-white font-medium">{match.teamA.name}</span>
                    </div>
                    <span className="text-gray-400 font-bold mx-4">VS</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-white font-medium">{match.teamB.name}</span>
                      {match.teamB.logo ? (
                        <img src={match.teamB.logo} alt={match.teamB.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white font-bold">
                          {match.teamB.name.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Match Details */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                    <div className="flex items-center space-x-2">
                      <IoCalendar className="text-blue-400" />
                      <span>{new Date(match.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 font-medium">
                        {match.slot}
                      </span>
                      <span>{match.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <IoLocationSharp className="text-green-400" />
                      <span>{match.ground}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {match.status === 'Upcoming' && (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => handleResultUpdate(match.id, 'teamA')}
                      className="bg-blue-500/20 hover:bg-blue-500 text-blue-400 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                    >
                      {match.teamA.name} Win
                    </button>
                    <button
                      onClick={() => handleResultUpdate(match.id, 'teamB')}
                      className="bg-green-500/20 hover:bg-green-500 text-green-400 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                    >
                      {match.teamB.name} Win
                    </button>
                    <button
                      onClick={() => handleResultUpdate(match.id, 'draw')}
                      className="bg-gray-500/20 hover:bg-gray-500 text-gray-400 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                    >
                      Draw
                    </button>
                  </div>
                )}
                {match.status === 'Completed' && (
                  <div className="flex items-center space-x-2">
                    <GiTrophy className="text-yellow-400 w-6 h-6" />
                    <span className="text-green-400 font-semibold">Completed</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
