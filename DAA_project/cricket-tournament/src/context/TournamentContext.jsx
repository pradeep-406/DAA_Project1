import React, { createContext, useContext, useState, useEffect } from 'react';

const TournamentContext = createContext();

export const useTournament = () => {
  const context = useContext(TournamentContext);
  if (!context) {
    throw new Error('useTournament must be used within a TournamentProvider');
  }
  return context;
};

export const TournamentProvider = ({ children }) => {
  // State management
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [pointsTable, setPointsTable] = useState([]);
  const [liveMatches, setLiveMatches] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedTeams = localStorage.getItem('cricket-teams');
    const savedMatches = localStorage.getItem('cricket-matches');
    const savedPoints = localStorage.getItem('cricket-points');

    if (savedTeams) setTeams(JSON.parse(savedTeams));
    if (savedMatches) setMatches(JSON.parse(savedMatches));
    if (savedPoints) setPointsTable(JSON.parse(savedPoints));
  }, []);

  // Save teams to localStorage
  useEffect(() => {
    localStorage.setItem('cricket-teams', JSON.stringify(teams));
  }, [teams]);

  // Save matches to localStorage
  useEffect(() => {
    localStorage.setItem('cricket-matches', JSON.stringify(matches));
  }, [matches]);

  // Save points table to localStorage
  useEffect(() => {
    localStorage.setItem('cricket-points', JSON.stringify(pointsTable));
  }, [pointsTable]);

  // Add a new team
  const addTeam = (team) => {
    const newTeam = {
      id: Date.now().toString(),
      ...team,
      createdAt: new Date().toISOString(),
    };
    setTeams([...teams, newTeam]);
    return newTeam;
  };

  // Delete a team
  const deleteTeam = (teamId) => {
    setTeams(teams.filter((team) => team.id !== teamId));
    // Also remove from points table
    setPointsTable(pointsTable.filter((entry) => entry.teamId !== teamId));
  };

  // Generate schedule using backtracking algorithm
  const generateSchedule = () => {
    if (teams.length < 2) {
      alert('Please add at least 2 teams to generate a schedule');
      return;
    }

    const newMatches = [];
    const grounds = ['Ground A', 'Ground B', 'Ground C'];
    const timeSlots = ['10:00 AM', '2:00 PM', '6:00 PM'];
    let matchNo = 1;
    let dayCounter = 0;

    // Round-robin scheduling using backtracking
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        const groundIndex = (matchNo - 1) % grounds.length;
        const timeSlotIndex = Math.floor((matchNo - 1) / grounds.length) % timeSlots.length;
        const daysToAdd = Math.floor((matchNo - 1) / (grounds.length * timeSlots.length));

        const matchDate = new Date();
        matchDate.setDate(matchDate.getDate() + daysToAdd);

        newMatches.push({
          id: `match-${matchNo}`,
          matchNo,
          teamA: teams[i],
          teamB: teams[j],
          date: matchDate.toISOString().split('T')[0],
          time: timeSlots[timeSlotIndex],
          ground: grounds[groundIndex],
          status: 'Upcoming',
          result: null,
          liveScore: null,
        });

        matchNo++;
      }
    }

    setMatches(newMatches);
    initializePointsTable();
    alert(`Schedule generated! ${newMatches.length} matches created.`);
  };

  // Initialize points table
  const initializePointsTable = () => {
    const initialPoints = teams.map((team) => ({
      teamId: team.id,
      teamName: team.name,
      teamLogo: team.logo,
      matchesPlayed: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      netRunRate: 0,
      points: 0,
    }));
    setPointsTable(initialPoints);
  };

  // Start live match
  const startLiveMatch = (matchId) => {
    const updatedMatches = matches.map((match) => {
      if (match.id === matchId) {
        return {
          ...match,
          status: 'Live',
          liveScore: {
            teamAScore: 0,
            teamAWickets: 0,
            teamAOvers: 0,
            teamBScore: 0,
            teamBWickets: 0,
            teamBOvers: 0,
            currentInnings: 'teamA',
          },
        };
      }
      return match;
    });
    setMatches(updatedMatches);
  };

  // Update live score
  const updateLiveScore = (matchId, scoreData) => {
    const updatedMatches = matches.map((match) => {
      if (match.id === matchId) {
        return {
          ...match,
          liveScore: { ...match.liveScore, ...scoreData },
        };
      }
      return match;
    });
    setMatches(updatedMatches);
  };

  // Update match result
  const updateMatchResult = (matchId, result) => {
    const updatedMatches = matches.map((match) => {
      if (match.id === matchId) {
        return {
          ...match,
          status: 'Completed',
          result,
        };
      }
      return match;
    });

    setMatches(updatedMatches);

    // Update points table
    const match = matches.find((m) => m.id === matchId);
    if (match) {
      updatePointsTable(match, result);
    }
  };

  // Update points table based on match result
  const updatePointsTable = (match, result) => {
    const updatedPoints = pointsTable.map((entry) => {
      let updated = { ...entry };

      // Check if team participated in this match
      if (entry.teamId === match.teamA.id || entry.teamId === match.teamB.id) {
        updated.matchesPlayed += 1;

        if (result === 'draw') {
          updated.draws += 1;
          updated.points += 1;
        } else if (
          (result === 'teamA' && entry.teamId === match.teamA.id) ||
          (result === 'teamB' && entry.teamId === match.teamB.id)
        ) {
          // Winner
          updated.wins += 1;
          updated.points += 2;
          updated.netRunRate += 0.5; // Simplified NRR
        } else {
          // Loser
          updated.losses += 1;
          updated.netRunRate -= 0.3; // Simplified NRR
        }
      }

      return updated;
    });

    // Sort by points and NRR
    updatedPoints.sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      }
      return b.netRunRate - a.netRunRate;
    });

    setPointsTable(updatedPoints);
  };

  // Clear all data
  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data?')) {
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
    liveMatches,
    addTeam,
    deleteTeam,
    generateSchedule,
    startLiveMatch,
    updateLiveScore,
    updateMatchResult,
    clearAllData,
  };

  return (
    <TournamentContext.Provider value={value}>
      {children}
    </TournamentContext.Provider>
  );
};
