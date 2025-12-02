/**
 * GRAPH COLORING ALGORITHM FOR MATCH SCHEDULING
 * 
 * Purpose: Assign time slots to matches ensuring no team plays twice in the same slot
 * 
 * Graph Representation:
 * - Each match is a NODE
 * - Two matches sharing a team = EDGE between them
 * - Colors represent TIME SLOTS (Slot 1, Slot 2)
 * 
 * Algorithm Steps:
 * 1. Build adjacency list (conflict graph)
 * 2. Color each match node ensuring adjacent nodes have different colors
 * 3. Use only 2 colors (Slot 1, Slot 2) per day
 */

/**
 * Build conflict graph - matches sharing teams are connected
 * @param {Array} matches - Array of match objects with teamA and teamB
 * @returns {Map} Adjacency list representing conflicts
 */
export function buildConflictGraph(matches) {
  const graph = new Map();
  
  // Initialize graph with all match indices
  for (let i = 0; i < matches.length; i++) {
    graph.set(i, []);
  }
  
  // Add edges between conflicting matches (matches sharing teams)
  for (let i = 0; i < matches.length; i++) {
    for (let j = i + 1; j < matches.length; j++) {
      const match1 = matches[i];
      const match2 = matches[j];
      
      // Check if matches share any team
      if (
        match1.teamA.id === match2.teamA.id ||
        match1.teamA.id === match2.teamB.id ||
        match1.teamB.id === match2.teamA.id ||
        match1.teamB.id === match2.teamB.id
      ) {
        // Add edge (conflict)
        graph.get(i).push(j);
        graph.get(j).push(i);
      }
    }
  }
  
  return graph;
}

/**
 * Graph Coloring using Greedy Algorithm
 * Colors = Slot assignments
 * 
 * @param {Map} graph - Conflict graph
 * @param {number} matchCount - Total number of matches
 * @returns {Array} Color assignment for each match (0 = Slot 1, 1 = Slot 2)
 */
export function colorGraph(graph, matchCount) {
  const colors = new Array(matchCount).fill(-1);
  const availableColors = [0, 1]; // Only 2 slots per day
  
  // Assign first color to first match
  colors[0] = 0;
  
  // Color remaining matches
  for (let match = 1; match < matchCount; match++) {
    const usedColors = new Set();
    
    // Find colors used by adjacent matches (conflicts)
    const neighbors = graph.get(match);
    for (const neighbor of neighbors) {
      if (colors[neighbor] !== -1) {
        usedColors.add(colors[neighbor]);
      }
    }
    
    // Assign first available color
    for (const color of availableColors) {
      if (!usedColors.has(color)) {
        colors[match] = color;
        break;
      }
    }
    
    // If both slots are used by conflicts, we need a new day (handled in backtracking)
    if (colors[match] === -1) {
      colors[match] = 0; // Start fresh day
    }
  }
  
  return colors;
}

/**
 * Group matches by day ensuring 2 slots per day maximum
 * @param {Array} matches - Matches with slot colors assigned
 * @param {Array} colors - Slot assignments from graph coloring
 * @returns {Array} Matches grouped by days
 */
export function groupMatchesByDay(matches, colors) {
  const days = [];
  let currentDay = { slot1: [], slot2: [] };
  
  for (let i = 0; i < matches.length; i++) {
    const slotType = colors[i] === 0 ? 'slot1' : 'slot2';
    
    // Check if adding this match would cause conflict in current day
    const wouldConflict = currentDay[slotType].some(existingMatch => {
      return (
        existingMatch.teamA.id === matches[i].teamA.id ||
        existingMatch.teamA.id === matches[i].teamB.id ||
        existingMatch.teamB.id === matches[i].teamA.id ||
        existingMatch.teamB.id === matches[i].teamB.id
      );
    });
    
    if (wouldConflict || currentDay[slotType].length > 0) {
      // Try other slot
      const otherSlot = slotType === 'slot1' ? 'slot2' : 'slot1';
      const otherConflict = currentDay[otherSlot].some(existingMatch => {
        return (
          existingMatch.teamA.id === matches[i].teamA.id ||
          existingMatch.teamA.id === matches[i].teamB.id ||
          existingMatch.teamB.id === matches[i].teamA.id ||
          existingMatch.teamB.id === matches[i].teamB.id
        );
      });
      
      if (!otherConflict && currentDay[otherSlot].length === 0) {
        currentDay[otherSlot].push(matches[i]);
      } else {
        // Start new day
        days.push(currentDay);
        currentDay = { slot1: [], slot2: [] };
        currentDay[slotType].push(matches[i]);
      }
    } else {
      currentDay[slotType].push(matches[i]);
    }
    
    // If both slots filled, start new day
    if (currentDay.slot1.length > 0 && currentDay.slot2.length > 0) {
      days.push(currentDay);
      currentDay = { slot1: [], slot2: [] };
    }
  }
  
  // Add last day if it has matches
  if (currentDay.slot1.length > 0 || currentDay.slot2.length > 0) {
    days.push(currentDay);
  }
  
  return days;
}
