import React, { createContext, useContext, useState, useEffect } from 'react';
import { scheduleMatchesWithBacktracking, validateSchedule } from '../utils/backtracking';

const TournamentContext = createContext();

export const useTournament = () => {
  const context = useContext(TournamentContext);
  if (!context) {
    throw new Error('useTournament must be used within TournamentProvider');
  }
  return context;
};

export const TournamentProvider = ({ children }) => {
  // State
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [pointsTable, setPointsTable] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const savedTeams = localStorage.getItem('cricket-teams');
    const savedMatches = localStorage.getItem('cricket-matches');
    const savedPoints = localStorage.getItem('cricket-points');

    if (savedTeams) setTeams(JSON.parse(savedTeams));
    if (savedMatches) setMatches(JSON.parse(savedMatches));
    if (savedPoints) setPointsTable(JSON.parse(savedPoints));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('cricket-teams', JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    localStorage.setItem('cricket-matches', JSON.stringify(matches));
  }, [matches]);

  useEffect(() => {
    localStorage.setItem('cricket-points', JSON.stringify(pointsTable));
  }, [pointsTable]);

  // Add Team
  const addTeam = (teamData) => {
    const newTeam = {
      id: Date.now().toString() + Math.random().toString(36),
      ...teamData,
      createdAt: new Date().toISOString(),
    };
    setTeams([...teams, newTeam]);
    return newTeam;
  };

  // Delete Team
  const deleteTeam = (teamId) => {
    setTeams(teams.filter(t => t.id !== teamId));
    setPointsTable(pointsTable.filter(p => p.teamId !== teamId));
  };

  // Generate Schedule using BACKTRACKING algorithm
  const generateSchedule = (startDate) => {
    if (teams.length < 2) {
      alert('Please add at least 2 teams to generate schedule');
      return;
    }

    try {
      // Use Backtracking algorithm from utils
      const scheduledMatches = scheduleMatchesWithBacktracking(teams, startDate);
      
      // Validate schedule
      const validation = validateSchedule(scheduledMatches);
      
      if (!validation.isValid) {
        console.error('Schedule validation failed:', validation.conflicts);
        alert('Schedule generated but has conflicts. Please regenerate.');
      }

      setMatches(scheduledMatches);
      initializePointsTable();
      
      alert(`✅ Schedule Generated!

📊 Total Matches: ${scheduledMatches.length}
🏏 Algorithm: Backtracking + Graph Coloring
⏰ Slots: 2 per day
📅 Days Required: ${Math.ceil(scheduledMatches.length / 2)}

${validation.isValid ? '✅ No conflicts detected!' : '⚠️ Please review schedule'}`);
    } catch (error) {
      console.error('Scheduling error:', error);
      alert('Error generating schedule: ' + error.message);
    }
  };

  // Initialize Points Table
  const initializePointsTable = () => {
    const initialPoints = teams.map(team => ({
      teamId: team.id,
      teamName: team.name,
      teamLogo: team.logo,
      matchesPlayed: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      netRunRate: 0.00,
      points: 0,
    }));
    setPointsTable(initialPoints);
  };

  // Update Match Result
  const updateMatchResult = (matchId, result) => {
    const match = matches.find(m => m.id === matchId);
    if (!match) return;

    // Update match status
    const updatedMatches = matches.map(m => {
      if (m.id === matchId) {
        return { ...m, status: 'Completed', result };
      }
      return m;
    });
    setMatches(updatedMatches);

    // Update points table
    updatePointsTable(match, result);
  };

  // Update Points Table based on result
  const updatePointsTable = (match, result) => {
    const updatedPoints = pointsTable.map(entry => {
      let updated = { ...entry };

      // Team A
      if (entry.teamId === match.teamA.id) {
        updated.matchesPlayed += 1;
        if (result === 'teamA') {
          updated.wins += 1;
          updated.points += 2;
          updated.netRunRate += 0.5;
        } else if (result === 'draw') {
          updated.draws += 1;
          updated.points += 1;
        } else {
          updated.losses += 1;
          updated.netRunRate -= 0.3;
        }
      }

      // Team B
      if (entry.teamId === match.teamB.id) {
        updated.matchesPlayed += 1;
        if (result === 'teamB') {
          updated.wins += 1;
          updated.points += 2;
          updated.netRunRate += 0.5;
        } else if (result === 'draw') {
          updated.draws += 1;
          updated.points += 1;
        } else {
          updated.losses += 1;
          updated.netRunRate -= 0.3;
        }
      }

      return updated;
    });

    // Sort by points and NRR
    updatedPoints.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      return b.netRunRate - a.netRunRate;
    });

    setPointsTable(updatedPoints);
  };

  // Clear all data
  const clearAllData = () => {
    if (window.confirm('⚠️ This will delete all teams, matches, and points. Continue?')) {
      setTeams([]);
      setMatches([]);
      setPointsTable([]);
      localStorage.clear();
    }
  };

  const value = {
    teams,
    matches,
    pointsTable,
    addTeam,
    deleteTeam,
    generateSchedule,
    updateMatchResult,
    clearAllData,
  };

  return (
    <TournamentContext.Provider value={value}>
      {children}
    </TournamentContext.Provider>
  );
};
