import { useState } from 'react';
import { useTournament } from '../context/TournamentContext';
import { IoPeople, IoCloudUpload, IoTrash } from 'react-icons/io5';
import { GiCricketBat } from 'react-icons/gi';

const AddTeam = () => {
  const { teams, addTeam, deleteTeam } = useTournament();
  const [teamName, setTeamName] = useState('');
  const [teamLogo, setTeamLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
      if (!validTypes.includes(file.type)) {
        alert('❌ Please upload PNG, JPG, or SVG image only');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert('❌ File size should not exceed 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setTeamLogo(reader.result);
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!teamName.trim()) {
      alert('❌ Please enter team name');
      return;
    }

    addTeam({
      name: teamName.trim(),
      logo: teamLogo || null,
    });

    alert(`✅ Team "${teamName}" added successfully!`);
    setTeamName('');
    setTeamLogo(null);
    setLogoPreview(null);
  };

  const handleDelete = (teamId, teamName) => {
    if (window.confirm(`Delete "${teamName}"? This action cannot be undone.`)) {
      deleteTeam(teamId);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-4">
            <IoPeople className="w-16 h-16 text-blue-400 animate-float" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Team Management
          </h1>
          <p className="text-gray-300 text-lg">Add teams and upload logos for your tournament</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Team Form */}
          <div className="glass-dark rounded-2xl p-8 animate-slide-up">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <GiCricketBat className="mr-2 text-neon-green" />
              Add New Team
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Team Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Team Name *
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Enter team name"
                  className="w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-green"
                />
              </div>

              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Team Logo (PNG/JPG/SVG)
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex-1 glass rounded-lg p-4 cursor-pointer hover-scale group">
                    <div className="flex flex-col items-center">
                      <IoCloudUpload className="w-12 h-12 text-gray-400 group-hover:text-neon-green mb-2 transition-colors" />
                      <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                        {logoPreview ? 'Change Logo' : 'Upload Logo'}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">Max 2MB</span>
                    </div>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                      onChange={handleLogoChange}
                      className="hidden"
                    />
                  </label>

                  {/* Logo Preview */}
                  {logoPreview && (
                    <div className="flex flex-col items-center">
                      <img
                        src={logoPreview}
                        alt="Preview"
                        className="w-24 h-24 rounded-full object-cover border-4 border-neon-green shadow-lg"
                      />
                      <p className="text-xs text-gray-400 mt-2">Preview</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-neon-green text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all"
              >
                ✅ Add Team
              </button>
            </form>
          </div>

          {/* Teams List */}
          <div className="glass-dark rounded-2xl p-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-bold text-white mb-6">
              Teams ({teams.length})
            </h2>

            {teams.length === 0 ? (
              <div className="text-center py-12">
                <GiCricketBat className="w-16 h-16 text-gray-500 mx-auto mb-4 animate-float" />
                <p className="text-gray-400">No teams added yet</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {teams.map((team, index) => (
                  <div
                    key={team.id}
                    className="glass rounded-xl p-4 flex items-center justify-between hover-scale animate-slide-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-center space-x-4">
                      {team.logo ? (
                        <img
                          src={team.logo}
                          alt={team.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-neon-green flex items-center justify-center text-white text-lg font-bold">
                          {team.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h3 className="text-white font-semibold">{team.name}</h3>
                        <p className="text-xs text-gray-400">
                          Added {new Date(team.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(team.id, team.name)}
                      className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/20 rounded-lg transition-all"
                      title="Delete Team"
                    >
                      <IoTrash className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {teams.length >= 2 && (
              <div className="mt-6 p-4 bg-neon-green/10 border border-neon-green/30 rounded-lg">
                <p className="text-sm text-neon-green">
                  ✅ Ready to generate schedule! Go to Admin Panel.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTeam;
