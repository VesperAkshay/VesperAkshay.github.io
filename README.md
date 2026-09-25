# Akshay Patel — macOS Interactive Portfolio

An authentic, ultra-smooth macOS Sonoma/Sequoia desktop experience and interactive portfolio for **Akshay Patel** (AI Systems Architect & Full-Stack Software Engineer).

🌐 **Live URL:** [https://akshaypatel.me](https://akshaypatel.me)  
⚡ **Repository:** [https://github.com/VesperAkshay/VesperAkshay.github.io](https://github.com/VesperAkshay/VesperAkshay.github.io)

---

## 🖥️ Key Features

- **macOS Window Management System**:
  - Full windowing engine with draggable, resizable, minimizable, and maximizable windows.
  - Authentic macOS traffic light controls (close, minimize, zoom).
  - High-performance spring animations and z-index focus stacking via Zustand.
- **Interactive Apps**:
  - 📁 **Finder**: Filterable project gallery (TaxPlan, TyeGit, ReqSmith, etc.) with detailed views and GitHub/live demo links.
  - 📝 **Notes (About Me)**: Career history, core technical skills, verified achievements, and endorsements.
  - 💻 **Terminal**: Interactive `zsh` shell supporting commands like `help`, `about`, `skills`, `projects`, `contact`, `clear`, and `sudo`.
  - 🖼️ **Wallpapers Gallery**: Curated collections (F1 Racing, Flowers, Clouds & Sky, Aesthetic, macOS Sequoia) with instant 1-click wallpaper application and session persistence.
  - 🎮 **2048: Dev Evolution**: Interactive developer career puzzle game with Git power-ups, Hackathon time-attack mode, career achievements, and Web Audio SFX.
  - 📄 **Preview**: Dual-mode interactive resume viewer with built-in PDF viewer and formatted document view.
  - ✉️ **Mail**: Interactive contact composer.
  - 🧭 **Safari**: Live project showcase and deployments.
- **Dock & Menu Bar**:
  - Realistic physics-based dock magnification powered by Framer Motion.
  - Live clock, Apple menu, and Control Center toggles.
- **Responsive Mobile Experience**:
  - Native iOS-inspired mobile home screen with app grid, status bar, dynamic island, and swipeable sheets.

---

## 🕹️ 2048: Dev Evolution (Mini-Game)

A full-fledged, developer-themed evolution puzzle game built directly into the macOS desktop experience. Slide matching technologies to merge your tech stack and climb the career ladder from junior HTML coder to Tech Lead and 10x AI Architect!

### 📈 Evolution Ladder

| Tier | Value | Tech / Role | Badge | Description |
|---|---|---|---|---|
| 1 | **2** | **HTML5** | `</>` | The semantic skeleton of the web |
| 2 | **4** | **CSS3** | `{ }` | Crafting responsive, gorgeous aesthetics |
| 3 | **8** | **JavaScript** | `JS` | Dynamic interactivity and DOM magic |
| 4 | **16** | **TypeScript** | `TS` | Strict type safety & scalable architecture |
| 5 | **32** | **Tailwind CSS** | `💨` | Rapid atomic utility-first design |
| 6 | **64** | **React 19** | `⚛️` | Declarative component-driven frontend |
| 7 | **128** | **Next.js** | `▲` | Full-stack production server rendering |
| 8 | **256** | **Node.js** | `🟢` | High-throughput asynchronous backend runtime |
| 9 | **512** | **Docker** | `🐳` | Portable containerized infrastructure |
| 10 | **1024** | **Full Stack Dev** | `⚡` | End-to-end software engineering mastery |
| 11 | **2048** | **Tech Lead** | `👑` | **Victory Condition!** Architecture, vision & leadership |
| 12 | **4096** | **10x AI Architect** | `🚀` | Autonomous agents & next-gen AI engineering |

### ⚡ Developer Power-Ups ("Git Commands")

- **`git stash` (Tile Pocket)**: Pocket a blocking tile into stash memory to save for later, or swap it with another tile on the board (2 charges).
- **`git reset --hard` (Bug Smasher)**: Obliterate a pesky low-level tile blocking your grid with an instant purge (2 charges).
- **`AI Copilot Hotfix`**: Automatically target the lowest tile on the board and double it to the next tier (1 charge).

### 🎮 Game Modes & Features

- **Classic Evolution**: Relaxed, infinite career progression.
- **Hackathon Sprint**: 60-second time-attack mode where every successful merge grants **+3 seconds** of development sprint time!
- **Grid Size Selector**: Switch dynamically between:
  - **3x3**: Legacy Codebase (Hardcore challenge)
  - **4x4**: Production Ready (Classic)
  - **5x5**: Big Tech Playground (Sandbox)
- **Juicy Game Feel**:
  - **Streak Combo Multipliers**: Fast consecutive merges trigger `2x`, `3x`, `4x` combos with bonus score multipliers.
  - **Floating Score Popups**: Real-time score tags indicating points and technologies merged.
  - **Full-Screen Confetti**: Dynamic 2D canvas confetti celebration upon promotion to Tech Lead.
  - **Live macOS Terminal Console**: Collapsible `$ zsh` stream outputting real-time deployment logs.
  - **Career Achievements Cabinet**: Track unlockable trophies (`Frontend Novice`, `DevOps Captain`, `Velocity Monster`, etc.) persisted in `localStorage`.
  - **Zero-Asset Web Audio API**: Synthesized slide blips, harmonic tier chimes, and victory fanfares with toggleable mute.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript
- **Styling:** Tailwind CSS + PostCSS + Autoprefixer
- **Animations:** Framer Motion (spring physics)
- **State Management:** Zustand
- **Icons:** Lucide React & Authentic macOS Vectors
- **Build Tool:** Vite 8

---

## 🚀 Local Development

```bash
# Clone the repository
git clone https://github.com/VesperAkshay/VesperAkshay.github.io.git

# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

---

## 📦 Deployment

The portfolio is continuously deployed to GitHub Pages at [akshaypatel.me](https://akshaypatel.me) using GitHub Actions (`.github/workflows/deploy.yml`).
