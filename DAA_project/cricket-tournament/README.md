# 🏏 Cricket Tournament Manager

A fully modern, beautiful, and responsive cricket tournament scheduling website built with React, Tailwind CSS, and advanced algorithms.

## ✨ Features

### 🎨 Premium UI/UX
- **Glassmorphism** design with stunning visual effects
- **Gradient backgrounds** (blue/neon green theme)
- **Smooth animations** and transitions
- **Cricket-themed icons** (bat, ball, trophy, wickets)
- **Fully responsive** - works perfectly on mobile, tablet, and desktop
- **Clean typography** with shadow effects
- **Stylish navbar & footer**

### 🏆 Core Features

#### 1️⃣ Team Management (Add Teams Page)
- ✅ Add team names
- ✅ Upload team logos (PNG, JPG, SVG)
- ✅ Real-time logo preview
- ✅ Logos stored in browser (localStorage)
- ✅ Logos display throughout the app (40×40px circles)
- ✅ Delete teams with confirmation
- ✅ View all teams with creation dates

#### 2️⃣ Auto Match Schedule Generator
- ✅ **Round-robin scheduling** using backtracking algorithm
- ✅ Automatic match generation for all team combinations
- ✅ Smart time slot allocation (10 AM, 2 PM, 6 PM)
- ✅ Multi-ground support (Ground A, B, C)
- ✅ Conflict-free scheduling
- ✅ Displays: Match No, Teams (with logos), Date, Time, Ground, Status

#### 3️⃣ Interactive Points Table
- ✅ Auto-updates when match results are marked
- ✅ Columns: Team Logo, Name, Matches Played, Wins, Losses, Draws, NRR, Points
- ✅ **Scoring system:**
  - Win: +2 points
  - Draw: +1 point each
  - Loss: 0 points
- ✅ Net Run Rate calculation
- ✅ Automatic ranking by points and NRR
- ✅ Top 3 teams highlighted on home page

#### 4️⃣ Match Result Updater
- ✅ Three buttons per match: Team A Win / Team B Win / Draw
- ✅ Auto-updates points table
- ✅ Changes match status to "Completed"
- ✅ Trophy icon for completed matches
- ✅ Confirmation dialogs

#### 5️⃣ Export & Print Features
- ✅ **Download Schedule as PDF** (jsPDF)
- ✅ **Download Points Table as PDF**
- ✅ **Export Schedule to CSV**
- ✅ **Export Points Table to CSV**
- ✅ **Print-friendly layouts** (clean white template)

### 📄 Pages

1. **Home Page**
   - Tournament overview card
   - Statistics dashboard (total teams, matches, completed, upcoming)
   - Featured top 3 teams with leaderboard
   - Quick action cards
   - Getting started guide

2. **Add Teams Page (Admin)**
   - Team creation form
   - Logo upload with preview
   - Teams list with delete option
   - Generate schedule button (when 2+ teams)
   - Instructions panel

3. **Schedule Page**
   - Beautiful table with team logos
   - Color-coded time slots
   - Status badges (Upcoming/Completed)
   - Match result buttons
   - Export options (PDF, CSV, Print)
   - Responsive cards for mobile

4. **Points Table Page**
   - Fully styled ranking table
   - Animated rows
   - Rank badges (Gold, Silver, Bronze)
   - Trophy for 1st place
   - Points system legend
   - Export options

## 🚀 Technology Stack

- **React 18.2** - UI framework
- **React Router 6** - Navigation
- **Tailwind CSS 3.3** - Styling
- **React Icons 4.12** - Icon library
- **jsPDF** - PDF generation
- **jsPDF AutoTable** - PDF tables
- **Vite 5** - Build tool

## 📦 Installation & Setup

### Prerequisites
Make sure you have Node.js and npm installed on your system.

### Install Dependencies
```bash
cd cricket-tournament
npm install
```

### Run Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🎯 How to Use

### Step 1: Add Teams
1. Navigate to **Add Teams** page
2. Enter team name
3. Upload team logo (PNG/JPG/SVG, max 2MB)
4. Click **Add Team**
5. Repeat for all teams (minimum 2 teams required)

### Step 2: Generate Schedule
1. After adding teams, click **Generate Schedule** button
2. The system will create a round-robin tournament schedule
3. All teams will play against each other once

### Step 3: View Schedule
1. Go to **Schedule** page
2. See all matches with dates, times, and venues
3. Update match results as they're played

### Step 4: Track Points
1. Visit **Points Table** page
2. See live rankings updated automatically
3. Export or print as needed

## 🎨 Design Highlights

### Color Palette
- **Primary Blue**: `#1e40af`
- **Cricket Green**: `#10b981`
- **Neon Green**: `#39ff14`
- **Dark Background**: `#0f172a` to `#1e293b`

### Animations
- **Fade In**: Entry animations
- **Slide Up**: Card animations
- **Float**: Icon hover effects
- **Gradient Shift**: Background animation
- **Bounce Slow**: Trophy animation

### Glassmorphism
- Semi-transparent backgrounds
- Backdrop blur effects
- Border highlights
- Shadow effects

## 📱 Responsive Design

- **Mobile**: < 768px - Stacked cards, mobile menu
- **Tablet**: 768px - 1024px - Grid layouts
- **Desktop**: > 1024px - Full table views

## 🔧 Components

### Reusable Components
- `Navbar.jsx` - Navigation bar with mobile menu
- `Footer.jsx` - Footer with links and social icons
- `AddTeam.jsx` - Team management interface
- `Home.jsx` - Dashboard and overview
- `Schedule.jsx` - Match schedule with results
- `PointsTable.jsx` - Rankings and statistics

### Context
- `TournamentContext.jsx` - Global state management with localStorage persistence

## 💾 Data Storage

All data is stored in the browser's **localStorage**:
- Teams (with logos as base64)
- Match schedule
- Points table

Data persists across browser sessions.

## 🎓 Algorithm

### Schedule Generation (Backtracking)
The app uses a **round-robin tournament algorithm** with constraint satisfaction:
- Each team plays every other team exactly once
- Matches are distributed across time slots
- Multiple grounds used to handle concurrent matches
- Dates calculated to avoid same-day conflicts

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👏 Acknowledgments

- Icons by React Icons
- PDF generation by jsPDF
- UI inspired by modern sports dashboards

---

**Built with ❤️ using React & Tailwind CSS**
