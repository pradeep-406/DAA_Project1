import { useState } from 'react';
import { useTournament } from '../context/TournamentContext';
import { IoSettings, IoCalendar, IoTrash } from 'react-icons/io5';
import { GiCricketBat } from 'react-icons/gi';
import { FaRobot } from 'react-icons/fa';

const AdminPanel = () => {
  const { teams, matches, generateSchedule, clearAllData } = useTournament();
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateSchedule = () => {
    if (teams.length < 2) {
      alert('❌ Need at least 2 teams to generate schedule');
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      generateSchedule(new Date(startDate));
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-4">
            <IoSettings className="w-16 h-16 text-purple-400 animate-float" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <p className="text-gray-300 text-lg">Schedule generation & tournament management</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Schedule Generator */}
          <div className="glass-dark rounded-2xl p-8 animate-slide-up">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <FaRobot className="mr-2 text-neon-green" />
              Generate Schedule
            </h2>

            <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <h3 className="text-blue-400 font-semibold mb-2">🧠 Algorithms Used:</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• <span className="text-neon-green">Backtracking</span> - Slot & date assignment with conflict resolution</li>
                <li>• <span className="text-blue-400">Graph Coloring</span> - Conflict-free time slot allocation</li>
                <li>• <span className="text-purple-400">Constraint Satisfaction</span> - 2 slots/day, no team plays twice/day</li>
              </ul>
            </div>

            <div className="space-y-6">
              {/* Tournament Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass rounded-lg p-4">
                  <p className="text-sm text-gray-400">Total Teams</p>
                  <p className="text-2xl font-bold text-white">{teams.length}</p>
                </div>
                <div className="glass rounded-lg p-4">
                  <p className="text-sm text-gray-400">Expected Matches</p>
                  <p className="text-2xl font-bold text-neon-green">
                    {teams.length >= 2 ? (teams.length * (teams.length - 1)) / 2 : 0}
                  </p>
                </div>
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tournament Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-green"
                />
              </div>

              {/* Slot Information */}
              <div className="glass rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3">⏰ Slot Configuration</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Slot 1:</span>
                    <span className="text-blue-400 font-medium">09:00 AM - 12:20 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Slot 2:</span>
                    <span className="text-purple-400 font-medium">02:00 PM - 05:20 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Slots per Day:</span>
                    <span className="text-neon-green font-medium">2 (Maximum)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Match Duration:</span>
                    <span className="text-orange-400 font-medium">3 hr 20 min</span>
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerateSchedule}
                disabled={isGenerating || teams.length < 2}
                className={`w-full py-4 rounded-lg font-semibold text-white transition-all ${
                  teams.length < 2
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-neon-green hover:shadow-lg hover:scale-105'
                }`}
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating Schedule...
                  </span>
                ) : (
                  '🚀 Generate Schedule with Backtracking'
                )}
              </button>

              {teams.length < 2 && (
                <p className="text-sm text-red-400 text-center">
                  ⚠️ Add at least 2 teams to generate schedule
                </p>
              )}
            </div>
          </div>

          {/* Current Status & Actions */}
          <div className="space-y-6">
            {/* Current Schedule Status */}
            <div className="glass-dark rounded-2xl p-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <IoCalendar className="mr-2 text-blue-400" />
                Current Status
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 glass rounded-lg">
                  <span className="text-gray-300">Teams Registered</span>
                  <span className="text-2xl font-bold text-neon-green">{teams.length}</span>
                </div>

                <div className="flex items-center justify-between p-4 glass rounded-lg">
                  <span className="text-gray-300">Matches Scheduled</span>
                  <span className="text-2xl font-bold text-blue-400">{matches.length}</span>
                </div>

                <div className="flex items-center justify-between p-4 glass rounded-lg">
                  <span className="text-gray-300">Matches Completed</span>
                  <span className="text-2xl font-bold text-green-400">
                    {matches.filter((m) => m.status === 'Completed').length}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 glass rounded-lg">
                  <span className="text-gray-300">Matches Pending</span>
                  <span className="text-2xl font-bold text-orange-400">
                    {matches.filter((m) => m.status === 'Upcoming').length}
                  </span>
                </div>

                {matches.length > 0 && (
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <p className="text-sm text-green-400">
                      ✅ Tournament Days Required: {Math.ceil(matches.length / 2)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Algorithm Info */}
            <div className="glass-dark rounded-2xl p-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-2xl font-bold text-white mb-6">🎯 How It Works</h2>
              <div className="space-y-4 text-sm text-gray-300">
                <div>
                  <h3 className="text-neon-green font-semibold mb-2">1. Graph Coloring</h3>
                  <p>Builds conflict graph where matches sharing teams are connected. Assigns time slots (colors) ensuring no conflicts.</p>
                </div>
                <div>
                  <h3 className="text-blue-400 font-semibold mb-2">2. Backtracking</h3>
                  <p>Tries placing matches in slots. If conflict occurs, backtracks and tries next slot/day until valid solution found.</p>
                </div>
                <div>
                  <h3 className="text-purple-400 font-semibold mb-2">3. Validation</h3>
                  <p>Ensures no team plays twice on same day. Maximum 2 matches per day across both slots.</p>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="glass-dark rounded-2xl p-8 border-2 border-red-500/30 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-2xl font-bold text-red-400 mb-6 flex items-center">
                <IoTrash className="mr-2" />
                Danger Zone
              </h2>
              <p className="text-gray-400 text-sm mb-4">
                This will permanently delete all teams, matches, and points table data.
              </p>
              <button
                onClick={clearAllData}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-all"
              >
                🗑️ Clear All Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
