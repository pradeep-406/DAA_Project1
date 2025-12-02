import { useState } from 'react';
import { useTournament } from '../context/TournamentContext';
import { FaUpload, FaTrash, FaImage } from 'react-icons/fa';
import { IoAdd, IoPeople } from 'react-icons/io5';
import { GiCricketBat } from 'react-icons/gi';

const AddTeam = () => {
  const { teams, addTeam, deleteTeam, generateSchedule } = useTournament();
  const [teamName, setTeamName] = useState('');
  const [teamLogo, setTeamLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  // Handle logo file selection
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a PNG, JPG, or SVG image');
        return;
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('File size should not exceed 2MB');
        return;
      }

      // Convert to base64 for storage
      const reader = new FileReader();
      reader.onloadend = () => {
        setTeamLogo(reader.result);
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!teamName.trim()) {
      alert('Please enter a team name');
      return;
    }

    if (!teamLogo) {
      alert('Please upload a team logo');
      return;
    }

    // Add team to context
    addTeam({
      name: teamName.trim(),
      logo: teamLogo,
    });

    // Reset form
    setTeamName('');
    setTeamLogo(null);
    setLogoPreview(null);

    // Reset file input
    const fileInput = document.getElementById('logo-upload');
    if (fileInput) fileInput.value = '';
  };

  // Handle team deletion
  const handleDelete = (teamId, teamName) => {
    if (window.confirm(`Are you sure you want to delete ${teamName}?`)) {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            Team Management
          </h1>
          <p className="text-gray-300 text-lg">Add teams and upload their logos</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Team Form */}
          <div className="glass-dark rounded-2xl p-8 animate-slide-up">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <IoAdd className="mr-2" />
              Add New Team
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Team Name Input */}
              <div>
                <label className="block text-gray-300 font-medium mb-2">
                  Team Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Enter team name"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              {/* Logo Upload */}
              <div>
                <label className="block text-gray-300 font-medium mb-2">
                  Team Logo <span className="text-red-400">*</span>
                </label>
                <div className="flex flex-col items-center space-y-4">
                  {/* Logo Preview */}
                  {logoPreview ? (
                    <div className="relative group">
                      <img
                        src={logoPreview}
                        alt="Logo Preview"
                        className="w-40 h-40 rounded-full object-cover border-4 border-white/20 shadow-xl"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setTeamLogo(null);
                          setLogoPreview(null);
                          document.getElementById('logo-upload').value = '';
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-40 h-40 rounded-full bg-gradient-to-r from-blue-500/20 to-green-500/20 border-2 border-dashed border-white/30 flex items-center justify-center">
                      <FaImage className="w-12 h-12 text-gray-500" />
                    </div>
                  )}

                  {/* File Input */}
                  <label className="cursor-pointer bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all flex items-center space-x-2">
                    <FaUpload />
                    <span>{logoPreview ? 'Change Logo' : 'Upload Logo'}</span>
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                      onChange={handleLogoChange}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-400">PNG, JPG, SVG (Max 2MB)</p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center space-x-2"
              >
                <IoAdd size={20} />
                <span>Add Team</span>
              </button>
            </form>
          </div>

          {/* Teams List */}
          <div className="glass-dark rounded-2xl p-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <GiCricketBat className="mr-2 text-neon-green" />
                Teams ({teams.length})
              </h2>
              {teams.length >= 2 && (
                <button
                  onClick={generateSchedule}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all text-sm"
                >
                  Generate Schedule
                </button>
              )}
            </div>

            {teams.length === 0 ? (
              <div className="text-center py-12">
                <IoPeople className="w-20 h-20 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No teams added yet</p>
                <p className="text-gray-500 text-sm mt-2">Add your first team to get started</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {teams.map((team, index) => (
                  <div
                    key={team.id}
                    className="glass rounded-xl p-4 flex items-center justify-between hover-scale animate-slide-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-center space-x-4">
                      {/* Team Logo */}
                      <img
                        src={team.logo}
                        alt={team.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                      />
                      {/* Team Info */}
                      <div>
                        <h3 className="text-white font-semibold text-lg">{team.name}</h3>
                        <p className="text-gray-400 text-sm">
                          Added {new Date(team.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(team.id, team.name)}
                      className="bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white p-3 rounded-lg transition-all"
                      title="Delete team"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="glass-dark rounded-2xl p-6 mt-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-white font-bold mb-3 flex items-center">
            <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">i</span>
            Instructions
          </h3>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-green-400 mr-2">•</span>
              <span>Add at least 2 teams to generate a tournament schedule</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-2">•</span>
              <span>Upload team logos in PNG, JPG, or SVG format (max 2MB)</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-2">•</span>
              <span>Logos will be displayed as 40×40px circles in schedules and points tables</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-2">•</span>
              <span>Click "Generate Schedule" after adding all teams to create the match fixtures</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddTeam;
