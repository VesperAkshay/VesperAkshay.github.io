# AI Agent Build Spec — macOS-Style Portfolio Website

**Purpose of this file:** This is a self-contained implementation spec meant to be fed directly to a coding agent (Claude Code, Cursor, etc.). It defines the goal, stack, design tokens, assets, component contracts, and a phased task list with acceptance criteria. Work through the tasks in order — each phase should be a working, visually-verifiable checkpoint before moving to the next. Do not skip ahead to polish while a foundational phase is incomplete.

---

## 1. Project Overview

Build a personal portfolio website that renders as an interactive macOS desktop inside a MacBook screen. The visitor sees a laptop shell containing a live "desktop": menu bar, wallpaper, dock, and draggable/resizable windows that function as portfolio content ("apps"). Interactions should feel as close to real macOS as web tech allows — spring-physics dragging, dock magnification, genie-style open/close, frosted-glass surfaces.

**Content mapped to apps:**
| App | Content |
|---|---|
| Finder | Projects grid → clicking a project opens a case-study window (description, tech stack, live link, repo link, screenshots) |
| About / Notes | Bio, skills, timeline |
| Terminal | Fake interactive CLI (`whoami`, `skills --list`, `contact`) as a personality piece |
| Mail / Contact | Contact form (name, email, message → posts to an email service) |
| Photos | Screenshot gallery of past projects |
| Safari | Optional — embeds/links to live project URLs |
| Preview | Resume.pdf viewer |

---

## 2. Goals & Non-Goals

**Goals**
- 60fps interactions on a mid-range laptop; no jank on drag/scroll.
- Fully keyboard- and screen-reader-navigable fallback (see Section 10 and 11).
- Mobile: a distinct iOS-style home-screen fallback, not a squished desktop.
- No paid/licensed assets required to ship v1.

**Non-Goals**
- Do not attempt a pixel-perfect OS clone (no login screen, no real file system, no multi-desktop/Mission Control).
- Do not use Apple's SF Pro font files as a web font (license violation — see Section 6.1).
- Do not build a native app; web only.

---

## 3. Tech Stack & Dependencies

```bash
# Scaffold
npm create vite@latest macos-portfolio -- --template react-ts
cd macos-portfolio

# Core
npm install framer-motion zustand lenis clsx

# Styling
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Icons (generic UI icons, not app icons)
npm install lucide-react
```

- **Framework**: React + Vite (TypeScript)
- **Animation**: Framer Motion — drag, spring transitions, `layoutId` shared-layout animations for dock→window open effect
- **Smooth scroll**: Lenis — apply only inside scrollable window content, not the page body
- **State**: Zustand — single store for window registry (open/closed/minimized/z-index/position)
- **Styling**: Tailwind CSS + a `design-tokens.css` file of CSS custom properties (Section 5)
- **Deployment target**: Vercel or Netlify (static build)

---

## 4. Folder Structure

```
src/
  components/
    shell/
      MacBookBezel.tsx
      Desktop.tsx
      MenuBar.tsx
      Dock.tsx
      DockIcon.tsx
      BootScreen.tsx
    window/
      Window.tsx            # generic draggable/resizable window shell
      TrafficLights.tsx
    apps/
      Finder/
        Finder.tsx
        ProjectCard.tsx
        ProjectDetail.tsx
      About/About.tsx
      Terminal/Terminal.tsx
      Contact/Contact.tsx
      Photos/Photos.tsx
      Preview/Preview.tsx
    mobile/
      MobileHomeScreen.tsx
      MobileAppView.tsx
  store/
    windowStore.ts           # zustand store
  data/
    projects.ts              # project content — see Section 13 schema
    profile.ts
  styles/
    design-tokens.css
    globals.css
  lib/
    dockMagnify.ts            # distance→scale math
    useResponsive.ts
  App.tsx
  main.tsx
public/
  icons/                      # downloaded app icons (Section 6.2)
  wallpapers/
  resume.pdf
```

---

## 5. Design Tokens

Create `src/styles/design-tokens.css`:

```css
:root {
  /* Color — light mode */
  --desktop-bg: #F5F5F7;
  --window-bg: rgba(255, 255, 255, 0.85);
  --menubar-bg: rgba(255, 255, 255, 0.6);
  --dock-bg: rgba(255, 255, 255, 0.5);
  --text-primary: #1D1D1F;
  --text-secondary: #6E6E73;
  --accent: #0A84FF;

  /* Radii */
  --radius-window: 12px;
  --radius-bezel: 22px;
  --radius-dock: 20px;

  /* Shadow */
  --shadow-window: 0 20px 60px rgba(0,0,0,0.35);
  --shadow-window-focused: 0 30px 80px rgba(0,0,0,0.45);

  /* Typography */
  --font-system: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", "Helvetica Neue", Arial, sans-serif;

  /* Motion */
  --spring-stiffness: 300;
  --spring-damping: 30;
}

[data-theme="dark"] {
  --desktop-bg: #1D1D1F;
  --window-bg: rgba(30, 30, 32, 0.85);
  --menubar-bg: rgba(30, 30, 32, 0.6);
  --dock-bg: rgba(30, 30, 32, 0.5);
  --text-primary: #F5F5F7;
  --text-secondary: #A1A1A6;
}
```

Sizing reference:
- Menu bar height: `28px`
- Dock icon size: `52px` base, magnify peak `1.5x`
- Dock height: `64px` collapsed, grows with magnification
- Traffic light dots: `12px` diameter, `8px` gap
- Window min size: `360x240px`

---

## 6. Assets & Resources

### 6.1 Fonts — DO NOT self-host SF Pro
Apple's SF Pro license restricts it to mockups of Apple-platform UI; it is not licensed for general web use. Use the system-font stack defined in Section 5 (`--font-system`), which resolves to real San Francisco automatically on macOS/iOS/Safari and falls back to **Inter** elsewhere.

- Inter (free, open license): https://fonts.google.com/specimen/Inter
- Add via `<link>` to Google Fonts or self-host the woff2 files for performance.

### 6.2 App icons
- **macosicons.com** — large, actively maintained, free community icon library for macOS-style app icons (Finder, Mail, Terminal, Safari, Photos, etc.), available as individual SVG/PNG/ICNS downloads. Use this as the primary source for dock icons.
- Fallback/generic UI icons (buttons, badges, chevrons): **Lucide** (`lucide-react`, MIT licensed, already in dependency list).

### 6.3 UI reference kits (for nailing proportions before coding)
- Search "macOS UI kit Figma" on Figma Community — multiple free community-built kits (menu bar, window chrome, dock, traffic lights, dialogs) exist as editable vector components. Use one as a visual reference only; do not ship any bitmap exports from a kit without checking its license for redistribution.

### 6.4 Wallpapers
- Use a generated mesh/gradient wallpaper (matches brand colors, zero licensing risk) — e.g. via a mesh-gradient CSS generator, OR
- If using an Apple-style wallpaper image, confirm it's your own render/photo or an explicitly free-to-use asset — do not redistribute ripped Apple default wallpapers on a public commercial site.

### 6.5 Animation/interaction references
- **Lenis** (smooth scroll): https://github.com/darkroomengineering/lenis — lightweight, dependency-free, syncs with GSAP ScrollTrigger, keeps native scroll/accessibility intact. Apply only inside individual app windows that need scroll (Finder grid, About, Photos), never on `<body>`.
- **Dock magnification reference implementation**: search GitHub for "dock-magnification framer motion tailwind" — a small open reference project replicates the distance-based icon scale effect; use it as a starting point for `lib/dockMagnify.ts`.
- **Framer Motion docs** (drag, `layoutId`, spring transitions): https://www.framer.com/motion/

### 6.6 Sound (optional, off by default)
- Short open/close "pop" sound — keep under a user-toggled mute control; never autoplay audio on load.

---

## 7. Component Specs

### 7.1 `Window.tsx` (generic shell — build this once, reuse for every app)
Props:
```ts
interface WindowProps {
  id: string;
  title: string;
  icon?: string;
  initialPosition: { x: number; y: number };
  initialSize: { width: number; height: number };
  minSize?: { width: number; height: number };
  resizable?: boolean;
  children: React.ReactNode;
}
```
Behavior:
- Rendered via `motion.div`, `drag` enabled, `dragConstraints` bound to the desktop container ref, `dragMomentum={false}`.
- Clicking anywhere in the window calls `windowStore.focus(id)` → raises z-index, updates menu bar active-app label.
- Title bar contains `TrafficLights` (close/minimize/zoom) — close removes from store, minimize animates scale/position toward the window's dock icon and sets `minimized: true`, zoom toggles a "maximized" size state.
- Opening animation: use Framer Motion `layoutId={`window-${id}`}` shared with the originating `DockIcon` so the open transition appears to grow from the dock.
- Closing animation: reverse of open (scale + fade toward dock icon position), ~200–250ms, spring easing per Section 5 tokens.

### 7.2 `Dock.tsx` / `DockIcon.tsx`
- Horizontal flex row, frosted-glass background (`backdrop-filter: blur(20px)` + `var(--dock-bg)`).
- On `onMouseMove` over the dock container, compute each icon's horizontal distance from cursor and pass through `dockMagnify(distance)` (Section 7.4) to get a scale 1.0–1.5, applied via Framer Motion `animate={{ scale }}` with a fast spring.
- Icons: Finder, About, Terminal, Mail, Photos, Preview (Resume) — each `onClick` calls `windowStore.open(appId)`.
- Small dot indicator under icons whose window is currently open.

### 7.3 `MenuBar.tsx`
- Fixed top, `height: 28px`, frosted glass.
- Left: Apple-logo-substitute (your initials or a simple monogram mark) + bold label of the currently focused app's name (read from store).
- Right: live clock (update via `setInterval` every 1000ms, clear on unmount), static wifi/battery glyphs (Lucide icons), theme toggle.

### 7.4 `lib/dockMagnify.ts`
```ts
// Given distance (px) from cursor to icon center, return a scale 1.0–1.5
// with falloff over roughly 2 neighboring icons (~150px radius).
export function dockMagnify(distance: number, maxScale = 1.5, radius = 150): number {
  if (distance > radius) return 1;
  const falloff = 1 - distance / radius;
  return 1 + (maxScale - 1) * falloff;
}
```

### 7.5 `Finder.tsx` / `ProjectCard.tsx` / `ProjectDetail.tsx`
- Grid of `ProjectCard` (thumbnail, title, one-line tagline) sourced from `data/projects.ts`.
- Clicking a card opens a new `Window` (via store) rendering `ProjectDetail` with full description, tech badges, live-site link (`<a target="_blank">`), repo link, and an image carousel.

### 7.6 `Terminal.tsx`
- Fake shell: an input line + scrollback of prior commands/output, monospace font.
- Support a small fixed command set: `help`, `whoami`, `skills`, `projects`, `contact`, `clear`. Unrecognized commands return `command not found: <input>`.

### 7.7 `Contact.tsx`
- Simple form: name, email, message. Submit via a form backend (e.g., Formspree or an email API) — do not hardcode credentials in client code; use an env var and document it in `.env.example`.

### 7.8 `MobileHomeScreen.tsx` / `MobileAppView.tsx`
- Below `768px` viewport width, bypass the laptop shell entirely.
- Render an iOS-style grid of the same app icons on a full-screen wallpaper background.
- Tapping an icon pushes a full-screen `MobileAppView` (slide-up transition) rendering the same app component used inside `Window`, without drag/resize behavior.

---

## 8. State Management (`store/windowStore.ts`)

```ts
interface WindowState {
  id: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface WindowStore {
  windows: Record<string, WindowState>;
  focusedId: string | null;
  open: (id: string) => void;
  close: (id: string) => void;
  minimize: (id: string) => void;
  focus: (id: string) => void;
  updatePosition: (id: string, pos: { x: number; y: number }) => void;
}
```
- `focus(id)` sets `focusedId` and bumps that window's `zIndex` to `max(all zIndex) + 1`.
- Persist nothing across reloads for v1 (fresh desktop on every visit is fine and matches boot-animation intent).

---

## 9. Animation & Interaction Rules

- Animate **only** `transform` and `opacity` — never animate `top/left/width/height` directly (forces layout thrashing).
- Standard spring for window drag/open/close: `{ type: "spring", stiffness: 300, damping: 30 }`.
- Dock icon hover/magnify spring: faster — `{ type: "spring", stiffness: 500, damping: 25 }`.
- `will-change: transform` only on the actively-dragged window; remove after drag ends.
- Lazy-mount window contents: don't render `ProjectDetail` images until that window's `isOpen` flips true.

---

## 10. Responsive / Mobile

- Breakpoint: `768px`.
- Above breakpoint: full MacBook shell as described.
- Below breakpoint: `MobileHomeScreen` (Section 7.8) — no bezel, no drag, no dock magnification (touch targets should just be a static icon grid).
- Verify with actual device emulation, not just browser resize — check tap target sizes (min 44×44px per accessibility guidance).

---

## 11. Accessibility & Performance Requirements

- All interactive elements reachable via `Tab`; windows must be closable/minimizable via keyboard (bind `Escape` to close focused window).
- Respect `prefers-reduced-motion`: when set, disable spring physics/drag animations in favor of instant or simple fade transitions.
- Respect `prefers-color-scheme` for initial theme, with a manual override toggle stored in `localStorage`.
- Target Lighthouse Performance score ≥ 90 on the built site; verify with Chrome DevTools 6x CPU throttling that drag/dock interactions hold ~60fps.
- `backdrop-filter: blur()` usage limited to menu bar, dock, and window title bars only — do not apply it broadly across large surfaces.

---

## 12. Phased Task List

Work through phases sequentially. Each phase ends with a visually verifiable checkpoint — do not proceed until it's true.

### Phase 0 — Scaffold
- [ ] Run Section 3 setup commands.
- [ ] Add `design-tokens.css` (Section 5) and import into `globals.css`.
- [ ] Set up folder structure (Section 4).
- **Checkpoint:** blank page renders with Tailwind + tokens loading, no console errors.

### Phase 1 — Static Shell (no interactivity)
- [ ] `MacBookBezel.tsx` — SVG or CSS shape of a laptop screen with notch, centered on page background.
- [ ] `Desktop.tsx` — wallpaper fill inside the bezel.
- [ ] `MenuBar.tsx` — static version (no live clock yet).
- [ ] `Dock.tsx` — static row of icon placeholders (download real icons from macosicons.com per Section 6.2).
- **Checkpoint:** looks like a macOS desktop screenshot; nothing is clickable yet.

### Phase 2 — Window System
- [ ] Build `Window.tsx` fully per Section 7.1 (drag, focus/z-index, traffic lights, resize).
- [ ] Build `windowStore.ts` per Section 8.
- [ ] Wire one placeholder app ("Hello World" content) to open from a dock icon click.
- **Checkpoint:** clicking the dock icon opens a draggable, closable, focusable window with correct shadow/z-index behavior.

### Phase 3 — Real Apps
- [ ] `data/projects.ts` populated with real project data (Section 13 schema).
- [ ] `Finder.tsx` + `ProjectCard.tsx` + `ProjectDetail.tsx`.
- [ ] `About.tsx` with real bio content.
- [ ] `Terminal.tsx` with command set from Section 7.6.
- [ ] `Contact.tsx` wired to a real form backend.
- [ ] `Photos.tsx` gallery.
- [ ] `Preview.tsx` embedding `resume.pdf`.
- **Checkpoint:** every dock icon opens real, correct content.

### Phase 4 — Dock Magnification & Open/Close Motion
- [ ] Implement `dockMagnify.ts` (Section 7.4) and wire to `DockIcon` hover.
- [ ] Implement `layoutId`-based genie open/close animation between dock icon and window (Section 7.1).
- [ ] Add active-app dot indicators under open apps.
- **Checkpoint:** dock feels magnetic on hover; opening/closing a window visibly originates from/returns to its dock icon.

### Phase 5 — Menu Bar Live State
- [ ] Live clock (Section 7.3).
- [ ] Focused-app name binding.
- [ ] Theme toggle wired to `[data-theme]` attribute + `localStorage`.
- **Checkpoint:** menu bar reflects real-time and real app focus state.

### Phase 6 — Mobile Fallback
- [ ] Build `MobileHomeScreen.tsx` + `MobileAppView.tsx` (Section 7.8).
- [ ] Breakpoint switch logic in `App.tsx` via `useResponsive.ts`.
- **Checkpoint:** resizing below 768px (and on real device emulation) swaps to the mobile view cleanly, all app content still reachable.

### Phase 7 — Accessibility & Reduced Motion
- [ ] Keyboard navigation + `Escape`-to-close.
- [ ] `prefers-reduced-motion` handling.
- [ ] Color contrast check on both themes.
- **Checkpoint:** full keyboard-only walkthrough works; reduced-motion users get non-jarring transitions.

### Phase 8 — Boot Animation & Polish
- [ ] `BootScreen.tsx` — brief loading/boot animation on first visit (progress bar or Apple-logo-substitute fade), then reveals desktop.
- [ ] Optional sound toggle (off by default).
- [ ] Final pass on shadows/blur/spacing against Section 5 tokens.
- **Checkpoint:** first-visit experience feels intentional and cohesive end to end.

### Phase 9 — Performance & QA
- [ ] Lighthouse pass ≥ 90 performance.
- [ ] 6x CPU throttle test on drag/dock interactions — confirm smoothness.
- [ ] Cross-browser check: Chrome, Safari, Firefox.
- [ ] Real mobile device test (iOS Safari + Android Chrome).
- **Checkpoint:** ready to deploy.

### Phase 10 — Deploy
- [ ] Push to GitHub.
- [ ] Deploy via Vercel or Netlify, connect custom domain if available.
- [ ] Verify production build matches dev behavior (no dev-only console warnings, assets load correctly).

---

## 13. Content Data Schema

`src/data/projects.ts`:
```ts
export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;       // full case-study text, markdown-safe
  techStack: string[];
  liveUrl?: string;
  repoUrl?: string;
  thumbnail: string;          // path in /public
  screenshots: string[];      // paths in /public
  year: number;
}

export const projects: Project[] = [
  // Fill in with real project entries.
];
```

`src/data/profile.ts`:
```ts
export interface Profile {
  name: string;
  role: string;
  bio: string;
  skills: string[];
  email: string;
  socials: { label: string; url: string }[];
  resumePath: string; // e.g. "/resume.pdf"
}
```

---

## 14. Environment Variables

`.env.example`:
```
VITE_CONTACT_FORM_ENDPOINT=   # e.g. Formspree endpoint URL
```

---

## 15. Definition of Done (v1)

- All Phase 0–10 checkpoints pass.
- No hardcoded secrets in the repo.
- Lighthouse Performance/Accessibility/Best Practices all ≥ 90.
- Works on latest Chrome, Safari, Firefox, and one real mobile device.
- All asset licenses (icons, fonts, wallpaper) confirmed compatible with public/commercial use per Section 6.
