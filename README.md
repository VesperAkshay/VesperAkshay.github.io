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
  - 📄 **Preview**: Dual-mode interactive resume viewer with built-in PDF viewer and formatted document view.
  - ✉️ **Mail**: Interactive contact composer.
  - 🧭 **Safari**: Live project showcase and deployments.
- **Dock & Menu Bar**:
  - Realistic physics-based dock magnification powered by Framer Motion.
  - Live clock, Apple menu, and Control Center toggles.
- **Responsive Mobile Experience**:
  - Native iOS-inspired mobile home screen with app grid, status bar, dynamic island, and swipeable sheets.

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
