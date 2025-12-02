import { useTournament } from '../context/TournamentContext';
import { FaAward, FaFilePdf, FaFileCsv } from 'react-icons/fa';
import { GiTrophy } from 'react-icons/gi';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PointsTable = () => {
  const { pointsTable } = useTournament();

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.setTextColor(31, 64, 175);
    doc.text('Points Table', 14, 20);
    
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
      startY: 30,
      head: [['Rank', 'Team', 'Played', 'Won', 'Lost', 'Draw', 'NRR', 'Points']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [31, 64, 175] },
    });

    doc.save('points-table.pdf');
  };

  const exportToCSV = () => {
    const headers = ['Rank', 'Team', 'Played', 'Won', 'Lost', 'Draw', 'NRR', 'Points'];
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

  if (pointsTable.length === 0) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="glass-dark rounded-2xl p-12 text-center">
            <FaAward className="w-20 h-20 text-gray-500 mx-auto mb-6 animate-float" />
            <h3 className="text-2xl font-bold text-white mb-4">No Points Table Available</h3>
            <p className="text-gray-400 mb-8">
              Generate a schedule first to create the points table
            </p>
            <a
              href="/admin"
              className="inline-block bg-gradient-to-r from-blue-500 to-neon-green text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              Go to Admin Panel
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
            <GiTrophy className="w-16 h-16 text-yellow-400 animate-float" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
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
        </div>

        {/* Points Table */}
        <div className="glass-dark rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-purple-600">
                <tr>
                  <th className="px-6 py-4 text-left text-white font-semibold">#</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Team</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Played</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Won</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Lost</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Draw</th>
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
                      <div className="flex items-center space-x-2">
                        {index < 3 && (
                          <GiTrophy className={`w-5 h-5 ${
                            index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-400' : 'text-orange-600'
                          }`} />
                        )}
                        <span className="text-white font-semibold">{index + 1}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        {entry.teamLogo ? (
                          <img
                            src={entry.teamLogo}
                            alt={entry.teamName}
                            className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-neon-green flex items-center justify-center text-white font-bold">
                            {entry.teamName.charAt(0)}
                          </div>
                        )}
                        <span className="text-white font-medium">{entry.teamName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-white">{entry.matchesPlayed}</td>
                    <td className="px-6 py-4 text-center text-green-400 font-semibold">{entry.wins}</td>
                    <td className="px-6 py-4 text-center text-red-400">{entry.losses}</td>
                    <td className="px-6 py-4 text-center text-gray-400">{entry.draws}</td>
                    <td className="px-6 py-4 text-center text-blue-400 font-semibold">
                      {entry.netRunRate.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-gradient-to-r from-blue-500 to-neon-green px-4 py-2 rounded-full text-white font-bold">
                        {entry.points}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 glass rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Scoring System</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-300">Win = +2 Points</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <span className="text-gray-300">Draw = +1 Point Each</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-300">Loss = 0 Points</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsTable;
