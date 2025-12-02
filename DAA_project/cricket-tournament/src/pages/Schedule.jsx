import { useTournament } from '../context/TournamentContext';
import { IoCalendar, IoLocationSharp, IoTimeSharp } from 'react-icons/io5';
import { GiCricketBat, GiTrophy } from 'react-icons/gi';
import { FaDownload, FaPrint, FaFileCsv, FaFilePdf } from 'react-icons/fa';
import { MdLiveTv } from 'react-icons/md';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Schedule = () => {
  const { matches, updateMatchResult, startLiveMatch, teams } = useTournament();

  // Handle match result update
  const handleResultUpdate = (matchId, result) => {
    if (window.confirm(`Confirm result for this match?`)) {
      updateMatchResult(matchId, result);
    }
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    const styles = {
      Upcoming: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
      Live: 'bg-red-500/20 text-red-400 border-red-500/50',
      Completed: 'bg-green-500/20 text-green-400 border-green-500/50',
    };
    return styles[status] || styles.Upcoming;
  };

  // Get time slot color
  const getTimeSlotColor = (time) => {
    if (time.includes('10:00')) return 'bg-blue-500/20 text-blue-400';
    if (time.includes('2:00')) return 'bg-purple-500/20 text-purple-400';
    if (time.includes('6:00')) return 'bg-orange-500/20 text-orange-400';
    return 'bg-gray-500/20 text-gray-400';
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.setTextColor(31, 64, 175);
    doc.text('Cricket Tournament Schedule', 14, 20);

    // Date
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28);

    // Table
    const tableData = matches.map((match) => [
      match.matchNo,
      match.teamA.name,
      match.teamB.name,
      match.date,
      match.time,
      match.ground,
      match.status,
    ]);

    doc.autoTable({
      startY: 35,
      head: [['Match', 'Team A', 'Team B', 'Date', 'Time', 'Ground', 'Status']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [31, 64, 175] },
      styles: { fontSize: 9 },
    });

    doc.save('tournament-schedule.pdf');
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Match No', 'Team A', 'Team B', 'Date', 'Time', 'Ground', 'Status'];
    const rows = matches.map((match) => [
      match.matchNo,
      match.teamA.name,
      match.teamB.name,
      match.date,
      match.time,
      match.ground,
      match.status,
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

  // Print schedule
  const handlePrint = () => {
    window.print();
  };

  if (teams.length === 0) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="glass-dark rounded-2xl p-12 text-center">
            <GiCricketBat className="w-20 h-20 text-gray-500 mx-auto mb-6 animate-float" />
            <h3 className="text-2xl font-bold text-white mb-4">No Teams Added</h3>
            <p className="text-gray-400 mb-8">
              Please add teams first before generating the schedule
            </p>
            <a
              href="/add-teams"
              className="inline-block bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              Add Teams
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="glass-dark rounded-2xl p-12 text-center">
            <IoCalendar className="w-20 h-20 text-gray-500 mx-auto mb-6 animate-float" />
            <h3 className="text-2xl font-bold text-white mb-4">No Schedule Generated</h3>
            <p className="text-gray-400 mb-8">
              Click the button below to generate the tournament schedule
            </p>
            <a
              href="/add-teams"
              className="inline-block bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              Go to Team Management
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-4">
            <IoCalendar className="w-16 h-16 text-purple-400 animate-float" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Match Schedule
          </h1>
          <p className="text-gray-300 text-lg">Tournament fixtures and results</p>
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
          <button
            onClick={handlePrint}
            className="glass px-6 py-3 rounded-lg text-white font-medium hover-scale flex items-center space-x-2"
          >
            <FaPrint className="text-blue-400" />
            <span>Print</span>
          </button>
        </div>

        {/* Schedule Table - Desktop */}
        <div className="hidden lg:block glass-dark rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-purple-600">
                <tr>
                  <th className="px-6 py-4 text-left text-white font-semibold">Match</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Team A</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">VS</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Team B</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Date</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Time</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Ground</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Status</th>
                  <th className="px-6 py-4 text-center text-white font-semibold no-print">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {matches.map((match, index) => (
                  <tr
                    key={match.id}
                    className="hover:bg-white/5 transition-colors animate-slide-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <GiCricketBat className="text-neon-green" />
                        <span className="text-white font-semibold">#{match.matchNo}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-3">
                        <img
                          src={match.teamA.logo}
                          alt={match.teamA.name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                        />
                        <span className="text-white font-medium">{match.teamA.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-gray-400 font-bold">VS</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-3">
                        <img
                          src={match.teamB.logo}
                          alt={match.teamB.name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                        />
                        <span className="text-white font-medium">{match.teamB.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2 text-gray-300">
                        <IoCalendar className="text-blue-400" />
                        <span>{new Date(match.date).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTimeSlotColor(match.time)}`}>
                        {match.time}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2 text-gray-300">
                        <IoLocationSharp className="text-green-400" />
                        <span>{match.ground}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadge(match.status)}`}>
                        {match.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 no-print">
                      {match.status === 'Upcoming' && (
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => startLiveMatch(match.id)}
                            className="bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white px-3 py-1 rounded text-xs font-medium transition-all flex items-center space-x-1"
                            title="Start Live Match"
                          >
                            <MdLiveTv />
                            <span>Go Live</span>
                          </button>
                          <button
                            onClick={() => handleResultUpdate(match.id, 'teamA')}
                            className="bg-blue-500/20 hover:bg-blue-500 text-blue-400 hover:text-white px-3 py-1 rounded text-xs font-medium transition-all"
                            title={`${match.teamA.name} Win`}
                          >
                            A Win
                          </button>
                          <button
                            onClick={() => handleResultUpdate(match.id, 'teamB')}
                            className="bg-green-500/20 hover:bg-green-500 text-green-400 hover:text-white px-3 py-1 rounded text-xs font-medium transition-all"
                            title={`${match.teamB.name} Win`}
                          >
                            B Win
                          </button>
                          <button
                            onClick={() => handleResultUpdate(match.id, 'draw')}
                            className="bg-gray-500/20 hover:bg-gray-500 text-gray-400 hover:text-white px-3 py-1 rounded text-xs font-medium transition-all"
                            title="Draw"
                          >
                            Draw
                          </button>
                        </div>
                      )}
                      {match.status === 'Live' && (
                        <div className="flex justify-center items-center space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-red-400 font-bold text-sm">LIVE</span>
                        </div>
                      )}
                      {match.status === 'Completed' && (
                        <div className="flex justify-center">
                          <GiTrophy className="text-yellow-400 w-5 h-5" />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Schedule Cards - Mobile */}
        <div className="lg:hidden space-y-4">
          {matches.map((match, index) => (
            <div
              key={match.id}
              className="glass-dark rounded-2xl p-6 animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Match Number & Status */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <GiCricketBat className="text-neon-green" />
                  <span className="text-white font-bold">Match #{match.matchNo}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(match.status)}`}>
                  {match.status}
                </span>
              </div>

              {/* Teams */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3 flex-1">
                  <img
                    src={match.teamA.logo}
                    alt={match.teamA.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                  />
                  <span className="text-white font-medium">{match.teamA.name}</span>
                </div>
                <span className="text-gray-400 font-bold mx-4">VS</span>
                <div className="flex items-center space-x-3 flex-1 justify-end">
                  <span className="text-white font-medium">{match.teamB.name}</span>
                  <img
                    src={match.teamB.logo}
                    alt={match.teamB.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                  />
                </div>
              </div>

              {/* Match Details */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-gray-300 text-sm">
                  <IoCalendar className="text-blue-400" />
                  <span>{new Date(match.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300 text-sm">
                  <IoTimeSharp className="text-purple-400" />
                  <span>{match.time}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300 text-sm col-span-2">
                  <IoLocationSharp className="text-green-400" />
                  <span>{match.ground}</span>
                </div>
              </div>

              {/* Actions */}
              {match.status === 'Upcoming' && (
                <div className="space-y-2 no-print">
                  <button
                    onClick={() => startLiveMatch(match.id)}
                    className="w-full bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center space-x-2"
                  >
                    <MdLiveTv />
                    <span>Start Live Match</span>
                  </button>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleResultUpdate(match.id, 'teamA')}
                      className="flex-1 bg-blue-500/20 hover:bg-blue-500 text-blue-400 hover:text-white py-2 rounded-lg text-sm font-medium transition-all"
                    >
                      {match.teamA.name} Win
                    </button>
                    <button
                      onClick={() => handleResultUpdate(match.id, 'teamB')}
                      className="flex-1 bg-green-500/20 hover:bg-green-500 text-green-400 hover:text-white py-2 rounded-lg text-sm font-medium transition-all"
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
                </div>
              )}
              {match.status === 'Live' && (
                <div className="flex items-center justify-center space-x-2 no-print">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-400 font-bold">LIVE NOW</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
