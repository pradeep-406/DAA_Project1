import { Link } from 'react-router-dom';
import { useTournament } from '../context/TournamentContext';
import { GiCricketBat, GiTrophy } from 'react-icons/gi';
import { IoCalendar, IoPeople, IoStatsChart } from 'react-icons/io5';
import { FaAward } from 'react-icons/fa';

const Home = () => {
  const { teams, matches, pointsTable } = useTournament();

  const stats = [
    {
      icon: <IoPeople className="w-8 h-8" />,
      label: 'Total Teams',
      value: teams.length,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <IoCalendar className="w-8 h-8" />,
      label: 'Total Matches',
      value: matches.length,
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: <IoStatsChart className="w-8 h-8" />,
      label: 'Completed',
      value: matches.filter((m) => m.status === 'Completed').length,
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: <FaAward className="w-8 h-8" />,
      label: 'Upcoming',
      value: matches.filter((m) => m.status === 'Upcoming').length,
      color: 'from-orange-500 to-yellow-500',
    },
  ];

  const topTeams = [...pointsTable]
    .sort((a, b) => b.points - a.points || b.netRunRate - a.netRunRate)
    .slice(0, 3);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <GiCricketBat className="w-20 h-20 text-neon-green animate-float" />
              <GiTrophy className="w-10 h-10 text-yellow-400 absolute -top-2 -right-2 animate-bounce-slow" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-neon-green to-purple-400 bg-clip-text text-transparent">
            Cricket Tournament Scheduler
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-4">
            Professional scheduling using <span className="text-neon-green font-semibold">Backtracking</span> & <span className="text-blue-400 font-semibold">Graph Coloring</span> algorithms
          </p>
          <div className="glass inline-block px-6 py-2 rounded-full">
            <p className="text-sm text-gray-300">
              🏏 2 Slots/Day • ⏰ 09:00-12:20 & 14:00-17:20 • 🎯 Conflict-Free
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-6 hover-scale cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`bg-gradient-to-r ${stat.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/teams" className="glass rounded-2xl p-8 hover-scale group cursor-pointer transition-all">
              <IoPeople className="w-12 h-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-2">Manage Teams</h3>
              <p className="text-gray-400">Add teams and upload logos</p>
            </Link>
            <Link to="/admin" className="glass rounded-2xl p-8 hover-scale group cursor-pointer transition-all">
              <IoCalendar className="w-12 h-12 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-2">Generate Schedule</h3>
              <p className="text-gray-400">Auto-schedule with algorithms</p>
            </Link>
            <Link to="/points-table" className="glass rounded-2xl p-8 hover-scale group cursor-pointer transition-all">
              <FaAward className="w-12 h-12 text-neon-green mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-2">Points Table</h3>
              <p className="text-gray-400">Live standings & statistics</p>
            </Link>
          </div>
        </div>

        {/* Top Teams */}
        {topTeams.length > 0 && (
          <div className="glass-dark rounded-2xl p-8">
            <div className="flex items-center justify-center mb-8">
              <GiTrophy className="w-8 h-8 text-yellow-400 mr-3" />
              <h2 className="text-3xl font-bold text-white">Top Teams</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topTeams.map((team, index) => (
                <div
                  key={team.teamId}
                  className={`glass rounded-xl p-6 hover-scale relative ${
                    index === 0 ? 'border-2 border-yellow-400' : ''
                  }`}
                >
                  {index === 0 && (
                    <div className="absolute top-2 right-2">
                      <GiTrophy className="w-6 h-6 text-yellow-400 animate-bounce-slow" />
                    </div>
                  )}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative">
                      {team.teamLogo ? (
                        <img
                          src={team.teamLogo}
                          alt={team.teamName}
                          className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-neon-green flex items-center justify-center text-white text-2xl font-bold">
                          {team.teamName.charAt(0)}
                        </div>
                      )}
                      <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === 0 ? 'bg-yellow-400 text-black' : index === 1 ? 'bg-gray-400 text-black' : 'bg-orange-600 text-white'
                      }`}>
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{team.teamName}</h3>
                      <p className="text-gray-400 text-sm">{team.matchesPlayed} matches</p>
                    </div>
                  </div>
                  <div className="flex justify-between text-center">
                    <div>
                      <p className="text-2xl font-bold text-white">{team.points}</p>
                      <p className="text-xs text-gray-400">Points</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-400">{team.wins}</p>
                      <p className="text-xs text-gray-400">Wins</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-400">{team.netRunRate.toFixed(2)}</p>
                      <p className="text-xs text-gray-400">NRR</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Getting Started */}
        {teams.length === 0 && (
          <div className="glass-dark rounded-2xl p-12 text-center mt-16">
            <GiCricketBat className="w-20 h-20 text-gray-500 mx-auto mb-6 animate-float" />
            <h3 className="text-2xl font-bold text-white mb-4">Get Started</h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Add teams to your tournament and generate schedule using our advanced algorithms!
            </p>
            <Link
              to="/teams"
              className="inline-block bg-gradient-to-r from-blue-500 to-neon-green text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              Add Your First Team
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
