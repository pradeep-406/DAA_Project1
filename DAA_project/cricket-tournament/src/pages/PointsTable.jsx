import { useTournament } from '../context/TournamentContext';
import { FaAward, FaFilePdf, FaFileCsv, FaPrint } from 'react-icons/fa';
import { GiTrophy, GiCricketBat } from 'react-icons/gi';
import { IoStatsChart } from 'react-icons/io5';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PointsTable = () => {
  const { pointsTable, teams } = useTournament();

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.setTextColor(31, 64, 175);
    doc.text('Tournament Points Table', 14, 20);

    // Date
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28);

    // Table
    const tableData = pointsTable.map((entry, index) => [
      index + 1,
      entry.teamName,
      entry.matchesPlayed,
      entry.wins,
      entry.losses,
      entry.draws,
      entry.netRunRate.toFixed(2),
      entry.points,
    ]);

    doc.autoTable({
      startY: 35,
      head: [['Rank', 'Team', 'Played', 'Wins', 'Losses', 'Draws', 'NRR', 'Points']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [31, 64, 175] },
      styles: { fontSize: 9 },
    });

    doc.save('points-table.pdf');
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Rank', 'Team', 'Matches Played', 'Wins', 'Losses', 'Draws', 'Net Run Rate', 'Points'];
    const rows = pointsTable.map((entry, index) => [
      index + 1,
      entry.teamName,
      entry.matchesPlayed,
      entry.wins,
      entry.losses,
      entry.draws,
      entry.netRunRate.toFixed(2),
      entry.points,
    ]);

    let csv = headers.join(',') + '\n';
    rows.forEach((row) => {
      csv += row.join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'points-table.csv';
    a.click();
  };

  // Print points table
  const handlePrint = () => {
    window.print();
  };

  // Get rank badge color
  const getRankBadge = (index) => {
    if (index === 0) return 'bg-yellow-400 text-black';
    if (index === 1) return 'bg-gray-400 text-black';
    if (index === 2) return 'bg-orange-600 text-white';
    return 'bg-blue-500 text-white';
  };

  if (teams.length === 0) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="glass-dark rounded-2xl p-12 text-center">
            <GiTrophy className="w-20 h-20 text-gray-500 mx-auto mb-6 animate-float" />
            <h3 className="text-2xl font-bold text-white mb-4">No Teams Added</h3>
            <p className="text-gray-400 mb-8">
              Please add teams and generate schedule first
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

  if (pointsTable.length === 0) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="glass-dark rounded-2xl p-12 text-center">
            <IoStatsChart className="w-20 h-20 text-gray-500 mx-auto mb-6 animate-float" />
            <h3 className="text-2xl font-bold text-white mb-4">No Points Table Available</h3>
            <p className="text-gray-400 mb-8">
              Generate the tournament schedule to initialize the points table
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
            <div className="relative">
              <FaAward className="w-16 h-16 text-green-400 animate-float" />
              <GiTrophy className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2 animate-bounce-slow" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Points Table
          </h1>
          <p className="text-gray-300 text-lg">Live tournament standings</p>
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

        {/* Points Table - Desktop */}
        <div className="hidden lg:block glass-dark rounded-2xl overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-green-600 to-blue-600">
                <tr>
                  <th className="px-6 py-4 text-left text-white font-semibold">Rank</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Team</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Played</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Wins</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Losses</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Draws</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">NRR</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {pointsTable.map((entry, index) => (
                  <tr
                    key={entry.teamId}
                    className={`hover:bg-white/5 transition-colors animate-slide-in ${
                      index === 0 ? 'bg-yellow-500/10' : ''
                    }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${getRankBadge(index)}`}>
                          {index + 1}
                        </div>
                        {index === 0 && <GiTrophy className="text-yellow-400 w-5 h-5 animate-bounce-slow" />}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        {entry.teamLogo ? (
                          <img
                            src={entry.teamLogo}
                            alt={entry.teamName}
                            className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white font-bold">
                            {entry.teamName.charAt(0)}
                          </div>
                        )}
                        <span className="text-white font-semibold text-lg">{entry.teamName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-white font-medium">{entry.matchesPlayed}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-green-400 font-bold">{entry.wins}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-red-400 font-bold">{entry.losses}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-yellow-400 font-bold">{entry.draws}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`font-bold ${entry.netRunRate >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {entry.netRunRate >= 0 ? '+' : ''}{entry.netRunRate.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-lg font-bold text-lg">
                        {entry.points}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Points Table - Mobile */}
        <div className="lg:hidden space-y-4 mb-8">
          {pointsTable.map((entry, index) => (
            <div
              key={entry.teamId}
              className={`glass-dark rounded-2xl p-6 hover-scale animate-slide-up ${
                index === 0 ? 'border-2 border-yellow-400' : ''
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Rank and Trophy */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${getRankBadge(index)}`}>
                    {index + 1}
                  </div>
                  {index === 0 && <GiTrophy className="text-yellow-400 w-6 h-6 animate-bounce-slow" />}
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-lg font-bold text-xl">
                  {entry.points} pts
                </div>
              </div>

              {/* Team Info */}
              <div className="flex items-center space-x-4 mb-4">
                {entry.teamLogo ? (
                  <img
                    src={entry.teamLogo}
                    alt={entry.teamName}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white text-2xl font-bold">
                    {entry.teamName.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="text-white font-bold text-xl">{entry.teamName}</h3>
                  <p className="text-gray-400 text-sm">{entry.matchesPlayed} matches played</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-3">
                <div className="text-center">
                  <p className="text-green-400 font-bold text-2xl">{entry.wins}</p>
                  <p className="text-gray-400 text-xs">Wins</p>
                </div>
                <div className="text-center">
                  <p className="text-red-400 font-bold text-2xl">{entry.losses}</p>
                  <p className="text-gray-400 text-xs">Losses</p>
                </div>
                <div className="text-center">
                  <p className="text-yellow-400 font-bold text-2xl">{entry.draws}</p>
                  <p className="text-gray-400 text-xs">Draws</p>
                </div>
                <div className="text-center">
                  <p className={`font-bold text-2xl ${entry.netRunRate >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {entry.netRunRate >= 0 ? '+' : ''}{entry.netRunRate.toFixed(2)}
                  </p>
                  <p className="text-gray-400 text-xs">NRR</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="glass-dark rounded-2xl p-6">
          <h3 className="text-white font-bold mb-4 flex items-center">
            <GiCricketBat className="mr-2 text-neon-green" />
            Points System
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400 font-bold text-xl">+2</span>
              </div>
              <div>
                <p className="text-white font-medium">Win</p>
                <p className="text-gray-400 text-sm">2 points awarded</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <span className="text-yellow-400 font-bold text-xl">+1</span>
              </div>
              <div>
                <p className="text-white font-medium">Draw</p>
                <p className="text-gray-400 text-sm">1 point each team</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
                <span className="text-red-400 font-bold text-xl">0</span>
              </div>
              <div>
                <p className="text-white font-medium">Loss</p>
                <p className="text-gray-400 text-sm">No points</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsTable;
