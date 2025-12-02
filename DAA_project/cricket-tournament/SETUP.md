# 🚀 Quick Start Guide

## Installation Steps

### 1. Navigate to Project Directory
```bash
cd cricket-tournament
```

### 2. Install Dependencies
```bash
npm install
```

This will install all required packages:
- React & React DOM
- React Router DOM
- React Icons
- Tailwind CSS
- jsPDF & jsPDF AutoTable
- Vite

### 3. Start Development Server
```bash
npm run dev
```

The application will start at: **http://localhost:5173**

## 🎯 Usage Guide

### Adding Teams
1. Click **"Add Teams"** in the navigation
2. Enter team name
3. Click **"Upload Logo"** and select an image (PNG/JPG/SVG)
4. Preview will show automatically
5. Click **"Add Team"**
6. Repeat for all teams (minimum 2 required)

### Generating Schedule
1. After adding 2+ teams, click **"Generate Schedule"** button
2. The system automatically creates a round-robin tournament
3. All matches are scheduled with dates, times, and grounds

### Updating Match Results
1. Go to **"Schedule"** page
2. For each upcoming match, click:
   - **"A Win"** if Team A wins
   - **"B Win"** if Team B wins
   - **"Draw"** for a draw
3. Points table updates automatically!

### Viewing Points Table
1. Navigate to **"Points Table"**
2. See live rankings
3. Export to PDF or CSV
4. Print if needed

## 📦 Production Build

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## 🎨 Features Implemented

✅ Glassmorphism UI Design
✅ Gradient Backgrounds (Blue/Neon Green)
✅ Smooth Animations
✅ Cricket Icons (Bat, Ball, Trophy, Wickets)
✅ Fully Responsive (Mobile, Tablet, Desktop)
✅ Team Logo Upload & Preview
✅ Auto Schedule Generator (Backtracking Algorithm)
✅ Interactive Points Table
✅ Match Result Updater
✅ Export to PDF & CSV
✅ Print Functionality
✅ LocalStorage Persistence

## 🎓 Technical Details

### Scheduling Algorithm
- **Round-robin tournament** - Each team plays every other team once
- **Constraint satisfaction** - No time conflicts
- **Multi-ground support** - Concurrent matches on different grounds
- **Smart date allocation** - Matches spread across days

### Points System
- **Win**: +2 points
- **Draw**: +1 point each
- **Loss**: 0 points
- **Net Run Rate**: Simplified calculation for tiebreakers

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is busy:
```bash
npm run dev -- --port 3000
```

### Clear Browser Data
If data appears corrupted:
1. Open browser console (F12)
2. Type: `localStorage.clear()`
3. Refresh the page

## 📧 Support

For issues or questions, please refer to the main README.md file.

---

**Enjoy managing your cricket tournament! 🏏🏆**
