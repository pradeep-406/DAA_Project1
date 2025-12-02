# 🏏 Cricket Tournament Scheduler

A modern, professional Cricket Tournament Scheduling Website built with **React + Tailwind CSS** featuring **Backtracking** and **Graph Coloring** algorithms for intelligent, conflict-free match scheduling.

---

## ✨ Features

### 🎯 Core Algorithms

1. **Backtracking Algorithm**
   - Assigns dates and time slots to matches
   - Ensures no team plays twice on the same day
   - Handles constraint satisfaction problems
   - Backtracks when conflicts occur

2. **Graph Coloring Algorithm**
   - Builds conflict graph for matches
   - Assigns time slots (colors) to prevent conflicts
   - Uses greedy coloring approach
   - Ensures efficient slot allocation

### 🎨 UI/UX Features

- **Glassmorphism Design** - Modern glass-effect cards with blur
- **Gradient Backgrounds** - Animated blue + neon green gradients
- **Smooth Animations** - Float, slide, fade effects
- **Cricket Icons** - Bat, ball, trophy, wicket icons
- **Responsive Design** - Mobile, tablet, desktop optimized
- **Poppins & Inter Fonts** - Professional typography

### 🏆 Tournament Management

- **Team Management**
  - Add/Delete teams
  - Upload team logos (PNG/JPG/SVG)
  - Logo preview before saving
  - 40×40px circular logos everywhere

- **Schedule Generation**
  - Auto-generate using Backtracking
  - 2 slots per day (Slot 1: 09:00-12:20, Slot 2: 14:00-17:20)
  - Conflict-free scheduling
  - Date, time, ground assignment

- **Points Table**
  - Live standings
  - Win = +2 points
  - Draw = +1 point
  - Loss = 0 points
  - Net Run Rate calculation
  - Automatic sorting

- **Match Management**
  - Update match results
  - Status tracking (Upcoming/Completed)
  - Export to PDF/CSV
  - Print-friendly version

---

## 📋 Slot Configuration

| Slot | Time | Duration |
|------|------|----------|
| Slot 1 | 09:00 AM - 12:20 PM | 3hr 20min |
| Slot 2 | 02:00 PM - 05:20 PM | 3hr 20min |

**Constraints:**
- Maximum 2 slots per day
- No team plays twice on same day
- Automatic conflict resolution

---

## 🛠️ Tech Stack

- **React 18** - UI library
- **Tailwind CSS 4** - Styling
- **React Router** - Navigation
- **React Icons** - Icon library
- **jsPDF** - PDF generation
- **jsPDF-autotable** - PDF tables
- **Vite** - Build tool
- **localStorage** - Data persistence

---

## 📂 Project Structure

```
cricket-scheduler/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── AddTeam.jsx
│   │   ├── Schedule.jsx
│   │   ├── PointsTable.jsx
│   │   └── AdminPanel.jsx
│   ├── context/
│   │   └── TournamentContext.jsx
│   ├── utils/
│   │   ├── backtracking.js
│   │   └── graphColoring.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

---

## 🚀 Quick Start

### Installation

```bash
# Navigate to project directory
cd cricket-scheduler

# Install dependencies
npm install

# Run development server
npm run dev
```

### Build for Production

```bash
npm run build
```

---

## 🧠 Algorithm Details

### 1. Backtracking Algorithm

**File:** `src/utils/backtracking.js`

**Purpose:** Schedule matches with conflict resolution

**Process:**
1. Generate all possible matches (Round-robin)
2. Try to assign each match to a slot
3. Check if assignment is valid (no conflicts)
4. If valid, move to next match
5. If invalid, **BACKTRACK** and try next slot/day
6. Continue until all matches scheduled

**Hard Constraints:**
- 2 slots per day maximum
- No team plays twice on same day
- Sequential date assignment

### 2. Graph Coloring Algorithm

**File:** `src/utils/graphColoring.js`

**Purpose:** Assign time slots ensuring no conflicts

**Process:**
1. Build adjacency list (conflict graph)
2. Matches sharing teams = edge between nodes
3. Assign colors (slots) to nodes
4. Adjacent nodes get different colors
5. Use only 2 colors (Slot 1, Slot 2) per day

**Example:**
```
Match 1: Team A vs Team B
Match 2: Team A vs Team C  <- Conflict! (shares Team A)
Match 3: Team B vs Team D  <- Conflict! (shares Team B)

Solution:
Match 1: Slot 1, Day 1
Match 2: Slot 2, Day 1  (different slot)
Match 3: Slot 2, Day 1  (no Team A/B conflict)
```

---

## 📖 Usage Guide

### Step 1: Add Teams

1. Go to **Teams** page
2. Enter team name
3. Upload team logo (optional)
4. Click "Add Team"

### Step 2: Generate Schedule

1. Go to **Admin Panel**
2. Select tournament start date
3. Click "Generate Schedule with Backtracking"
4. Algorithm will auto-generate conflict-free schedule

### Step 3: View Schedule

1. Go to **Schedule** page
2. View all matches with:
   - Team logos
   - Date & time
   - Slot assignment
   - Ground allocation
3. Export to PDF/CSV

### Step 4: Update Results

1. Click match result buttons (Team A Win / Team B Win / Draw)
2. Points table auto-updates
3. Match status changes to "Completed"

### Step 5: View Points Table

1. Go to **Points Table** page
2. View live standings
3. Export to PDF/CSV

---

## 🎨 Design Specifications

### Colors

- **Primary:** Blue (#3b82f6)
- **Secondary:** Neon Green (#00ff88)
- **Background:** Dark Blue (#0f172a)
- **Accent:** Purple (#a855f7)

### Fonts

- **Headings:** Poppins (700-800 weight)
- **Body:** Inter (400-600 weight)

### Logo Size

- All team logos: **40×40px** circular

---

## 📊 Points System

| Result | Points |
|--------|--------|
| Win | +2 |
| Draw | +1 |
| Loss | 0 |

**Net Run Rate:** Simplified calculation (+0.5 for win, -0.3 for loss)

---

## 🔧 Configuration

### Tailwind Config

```js
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'neon-green': '#00ff88',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
}
```

### Vite Config

```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
})
```

---

## 📝 Code Comments

All algorithm files (`backtracking.js`, `graphColoring.js`) include:
- Detailed function documentation
- Step-by-step algorithm explanation
- Parameter descriptions
- Return value specifications
- Example usage

---

## 🌐 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Dashboard with stats & top teams |
| Teams | `/teams` | Add/manage teams with logos |
| Schedule | `/schedule` | View match schedule |
| Points Table | `/points-table` | Live tournament standings |
| Admin Panel | `/admin` | Generate schedule & settings |

---

## 💾 Data Persistence

All data stored in `localStorage`:
- Teams
- Matches
- Points Table

Data persists across page reloads.

---

## 📤 Export Features

- **PDF Export:** Schedule & Points Table
- **CSV Export:** Schedule & Points Table
- **Print:** Browser print with clean template

---

## ⚡ Performance

- Lazy loading components
- Optimized re-renders with React Context
- Efficient algorithm implementation
- Smooth animations with CSS

---

## 🎯 Algorithm Complexity

### Backtracking
- **Time Complexity:** O(2^n) worst case, O(n) average
- **Space Complexity:** O(n)

### Graph Coloring
- **Time Complexity:** O(n²)
- **Space Complexity:** O(n + e)

Where:
- n = number of matches
- e = number of edges (conflicts)

---

## 🐛 Troubleshooting

### Issue: Schedule not generating

**Solution:** Ensure you have at least 2 teams added

### Issue: White screen

**Solution:** Check browser console for errors, ensure all dependencies installed

### Issue: Logos not showing

**Solution:** Ensure image file is < 2MB and format is PNG/JPG/SVG

---

## 📄 License

MIT License - Free to use for educational and commercial purposes

---

## 👨‍💻 Author

Built with ❤️ using React, Tailwind CSS, and advanced algorithms

---

## 🚀 Future Enhancements

- [ ] Live match scoring
- [ ] Player statistics
- [ ] Multiple tournament support
- [ ] Backend integration
- [ ] Real-time updates
- [ ] Email notifications

---

## 📞 Support

For issues or questions:
1. Check documentation
2. Review algorithm files
3. Check browser console for errors

---

**🎉 Enjoy your Cricket Tournament Scheduling!** 🏏
