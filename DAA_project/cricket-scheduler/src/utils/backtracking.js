/**
 * BACKTRACKING ALGORITHM FOR TOURNAMENT SCHEDULING
 * 
 * Purpose: Assign dates and slots to matches with conflict resolution
 * 
 * Constraints:
 * - 2 slots per day ONLY (Slot 1: 09:00-12:20, Slot 2: 14:00-17:20)
 * - NO team plays twice on same day
 * - Slot duration = 3hr 20min
 * 
 * Backtracking Process:
 * 1. Try to assign match to current slot
 * 2. Check if assignment is valid (no conflicts)
 * 3. If valid, move to next match
 * 4. If invalid, BACKTRACK and try next slot/day
 * 5. Continue until all matches scheduled
 */

// Slot timing configuration
export const SLOT_CONFIG = {
  SLOT1: {
    name: 'Slot 1',
    startTime: '09:00 AM',
    endTime: '12:20 PM',
    duration: '3hr 20min',
  },
  SLOT2: {
    name: 'Slot 2',
    startTime: '02:00 PM',
    endTime: '05:20 PM',
    duration: '3hr 20min',
  },
  SLOTS_PER_DAY: 2,
};

/**
 * Check if a match can be placed in a specific day/slot without conflicts
 * @param {Object} match - Match to place
 * @param {Array} daySchedule - Current day's schedule
 * @param {string} slotType - 'slot1' or 'slot2'
 * @returns {boolean} True if placement is valid
 */
function isValidPlacement(match, daySchedule, slotType) {
  const slot = daySchedule[slotType];
  
  // Check if slot already has a match
  if (slot.length > 0) {
    return false;
  }
  
  // Check if either team plays in the other slot on same day
  const otherSlot = slotType === 'slot1' ? 'slot2' : 'slot1';
  for (const otherMatch of daySchedule[otherSlot]) {
    if (
      otherMatch.teamA.id === match.teamA.id ||
      otherMatch.teamA.id === match.teamB.id ||
      otherMatch.teamB.id === match.teamA.id ||
      otherMatch.teamB.id === match.teamB.id
    ) {
      return false; // Team conflict - same team plays twice same day
    }
  }
  
  return true;
}

/**
 * Backtracking algorithm to schedule all matches
 * @param {Array} matches - All matches to schedule
 * @param {number} matchIndex - Current match being scheduled
 * @param {Array} schedule - Current schedule state
 * @param {number} currentDayIndex - Current day index
 * @returns {boolean} True if scheduling successful
 */
function backtrackSchedule(matches, matchIndex, schedule, currentDayIndex) {
  // Base case: all matches scheduled
  if (matchIndex >= matches.length) {
    return true;
  }
  
  const currentMatch = matches[matchIndex];
  
  // Try placing in existing days first
  for (let dayIndex = 0; dayIndex <= currentDayIndex; dayIndex++) {
    const day = schedule[dayIndex];
    
    // Try Slot 1
    if (isValidPlacement(currentMatch, day, 'slot1')) {
      day.slot1.push(currentMatch);
      
      if (backtrackSchedule(matches, matchIndex + 1, schedule, currentDayIndex)) {
        return true;
      }
      
      // Backtrack
      day.slot1.pop();
    }
    
    // Try Slot 2
    if (isValidPlacement(currentMatch, day, 'slot2')) {
      day.slot2.push(currentMatch);
      
      if (backtrackSchedule(matches, matchIndex + 1, schedule, currentDayIndex)) {
        return true;
      }
      
      // Backtrack
      day.slot2.pop();
    }
  }
  
  // If can't fit in existing days, create new day
  const newDay = { slot1: [], slot2: [] };
  schedule.push(newDay);
  
  // Try new day's Slot 1
  newDay.slot1.push(currentMatch);
  if (backtrackSchedule(matches, matchIndex + 1, schedule, currentDayIndex + 1)) {
    return true;
  }
  
  // Backtrack - try Slot 2 instead
  newDay.slot1.pop();
  newDay.slot2.push(currentMatch);
  if (backtrackSchedule(matches, matchIndex + 1, schedule, currentDayIndex + 1)) {
    return true;
  }
  
  // Complete backtrack - remove new day
  newDay.slot2.pop();
  schedule.pop();
  
  return false;
}

/**
 * Main scheduling function using Backtracking
 * @param {Array} teams - Array of team objects
 * @param {string} startDate - Tournament start date
 * @returns {Array} Scheduled matches with date, time, slot info
 */
export function scheduleMatchesWithBacktracking(teams, startDate = new Date()) {
  // Generate all possible matches (Round-robin)
  const allMatches = [];
  let matchNo = 1;
  
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      allMatches.push({
        id: `match-${matchNo}`,
        matchNo,
        teamA: teams[i],
        teamB: teams[j],
        status: 'Upcoming',
        result: null,
      });
      matchNo++;
    }
  }
  
  // Initialize schedule with empty first day
  const schedule = [{ slot1: [], slot2: [] }];
  
  // Run backtracking algorithm
  const success = backtrackSchedule(allMatches, 0, schedule, 0);
  
  if (!success) {
    throw new Error('Failed to schedule matches. Please check team configuration.');
  }
  
  // Convert schedule to final format with dates and times
  const finalSchedule = [];
  const grounds = ['Ground A', 'Ground B', 'Ground C', 'Ground D'];
  let matchCounter = 1;
  
  schedule.forEach((day, dayIndex) => {
    const matchDate = new Date(startDate);
    matchDate.setDate(matchDate.getDate() + dayIndex);
    const dateStr = matchDate.toISOString().split('T')[0];
    
    // Process Slot 1 matches
    day.slot1.forEach((match) => {
      finalSchedule.push({
        ...match,
        matchNo: matchCounter++,
        date: dateStr,
        slot: SLOT_CONFIG.SLOT1.name,
        time: `${SLOT_CONFIG.SLOT1.startTime} - ${SLOT_CONFIG.SLOT1.endTime}`,
        startTime: SLOT_CONFIG.SLOT1.startTime,
        endTime: SLOT_CONFIG.SLOT1.endTime,
        ground: grounds[(matchCounter - 2) % grounds.length],
        dayNumber: dayIndex + 1,
      });
    });
    
    // Process Slot 2 matches
    day.slot2.forEach((match) => {
      finalSchedule.push({
        ...match,
        matchNo: matchCounter++,
        date: dateStr,
        slot: SLOT_CONFIG.SLOT2.name,
        time: `${SLOT_CONFIG.SLOT2.startTime} - ${SLOT_CONFIG.SLOT2.endTime}`,
        startTime: SLOT_CONFIG.SLOT2.startTime,
        endTime: SLOT_CONFIG.SLOT2.endTime,
        ground: grounds[(matchCounter - 2) % grounds.length],
        dayNumber: dayIndex + 1,
      });
    });
  });
  
  return finalSchedule;
}

/**
 * Validate schedule - ensure no team plays twice on same day
 * @param {Array} schedule - Schedule to validate
 * @returns {Object} Validation result with conflicts
 */
export function validateSchedule(schedule) {
  const conflicts = [];
  
  // Group by date
  const byDate = {};
  schedule.forEach(match => {
    if (!byDate[match.date]) {
      byDate[match.date] = [];
    }
    byDate[match.date].push(match);
  });
  
  // Check each date
  Object.entries(byDate).forEach(([date, matches]) => {
    const teamsOnDate = new Set();
    
    matches.forEach(match => {
      if (teamsOnDate.has(match.teamA.id)) {
        conflicts.push({
          date,
          team: match.teamA.name,
          message: `${match.teamA.name} plays multiple times on ${date}`,
        });
      }
      if (teamsOnDate.has(match.teamB.id)) {
        conflicts.push({
          date,
          team: match.teamB.name,
          message: `${match.teamB.name} plays multiple times on ${date}`,
        });
      }
      
      teamsOnDate.add(match.teamA.id);
      teamsOnDate.add(match.teamB.id);
    });
  });
  
  return {
    isValid: conflicts.length === 0,
    conflicts,
  };
}
