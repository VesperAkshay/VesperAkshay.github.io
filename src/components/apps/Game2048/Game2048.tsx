import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  RotateCcw,
  Undo2,
  Volume2,
  VolumeX,
  Trophy,
  Sparkles,
  Flame,
  HelpCircle,
  X,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Terminal as TerminalIcon,
  Trash2,
  Archive,
  Wand2,
  Clock,
  Layers,
  Award,
} from 'lucide-react'

// --- Tech Stack Evolution Ladder ---
export interface TechTier {
  value: number
  name: string
  label: string
  badge: string
  bgLight: string
  bgDark: string
  textColor: string
  description: string
  accent: string
}

export const TECH_TIERS: Record<number, TechTier> = {
  2: {
    value: 2,
    name: 'HTML5',
    label: '</>',
    badge: 'HTML5',
    bgLight: 'from-orange-500 to-amber-600',
    bgDark: 'from-orange-600 to-amber-700',
    textColor: 'text-white',
    description: 'The semantic skeleton of the web',
    accent: '#EA580C',
  },
  4: {
    value: 4,
    name: 'CSS3',
    label: '{ }',
    badge: 'CSS3',
    bgLight: 'from-blue-500 to-sky-600',
    bgDark: 'from-blue-600 to-sky-700',
    textColor: 'text-white',
    description: 'Crafting responsive, gorgeous aesthetics',
    accent: '#2563EB',
  },
  8: {
    value: 8,
    name: 'JavaScript',
    label: 'JS',
    badge: 'JavaScript',
    bgLight: 'from-yellow-400 to-amber-500',
    bgDark: 'from-yellow-500 to-amber-600',
    textColor: 'text-slate-900',
    description: 'Dynamic interactivity and DOM magic',
    accent: '#D97706',
  },
  16: {
    value: 16,
    name: 'TypeScript',
    label: 'TS',
    badge: 'TypeScript',
    bgLight: 'from-sky-500 to-blue-700',
    bgDark: 'from-sky-600 to-blue-800',
    textColor: 'text-white',
    description: 'Strict type safety & scalable architecture',
    accent: '#0284C7',
  },
  32: {
    value: 32,
    name: 'Tailwind CSS',
    label: '💨',
    badge: 'Tailwind',
    bgLight: 'from-cyan-400 to-teal-600',
    bgDark: 'from-cyan-500 to-teal-700',
    textColor: 'text-white',
    description: 'Rapid atomic utility-first design',
    accent: '#06B6D4',
  },
  64: {
    value: 64,
    name: 'React',
    label: '⚛️',
    badge: 'React 19',
    bgLight: 'from-cyan-500 to-indigo-600',
    bgDark: 'from-cyan-600 to-indigo-700',
    textColor: 'text-white',
    description: 'Declarative component-driven frontend',
    accent: '#6366F1',
  },
  128: {
    value: 128,
    name: 'Next.js',
    label: '▲',
    badge: 'Next.js',
    bgLight: 'from-slate-700 to-slate-900',
    bgDark: 'from-slate-800 to-black',
    textColor: 'text-white',
    description: 'Full-stack production server rendering',
    accent: '#0F172A',
  },
  256: {
    value: 256,
    name: 'Node.js',
    label: '🟢',
    badge: 'Node.js',
    bgLight: 'from-emerald-500 to-green-700',
    bgDark: 'from-emerald-600 to-green-800',
    textColor: 'text-white',
    description: 'High-throughput asynchronous backend runtime',
    accent: '#16A34A',
  },
  512: {
    value: 512,
    name: 'Docker',
    label: '🐳',
    badge: 'Docker',
    bgLight: 'from-blue-600 to-indigo-800',
    bgDark: 'from-blue-700 to-indigo-900',
    textColor: 'text-white',
    description: 'Portable containerized infrastructure',
    accent: '#1D4ED8',
  },
  1024: {
    value: 1024,
    name: 'Full Stack Dev',
    label: '⚡',
    badge: 'Full Stack',
    bgLight: 'from-purple-500 to-violet-800',
    bgDark: 'from-purple-600 to-violet-900',
    textColor: 'text-white',
    description: 'End-to-end software engineering mastery',
    accent: '#7C3AED',
  },
  2048: {
    value: 2048,
    name: 'Tech Lead',
    label: '👑',
    badge: 'Tech Lead',
    bgLight: 'from-amber-400 via-rose-500 to-red-600',
    bgDark: 'from-amber-500 via-rose-600 to-red-700',
    textColor: 'text-white',
    description: 'Architecture, system vision & team leadership',
    accent: '#F59E0B',
  },
  4096: {
    value: 4096,
    name: '10x AI Architect',
    label: '🚀',
    badge: '10x AI Dev',
    bgLight: 'from-fuchsia-500 via-purple-600 to-pink-500',
    bgDark: 'from-fuchsia-600 via-purple-700 to-pink-600',
    textColor: 'text-white',
    description: 'Autonomous agents & next-gen AI engineering',
    accent: '#EC4899',
  },
}

// Achievements Definitions
export interface Achievement {
  id: string
  title: string
  desc: string
  icon: string
  unlockedAt?: string
}

const ACHIEVEMENTS_LIST: Achievement[] = [
  { id: 'react_unlocked', title: 'Frontend Novice', desc: 'Crafted your first React (64) component', icon: '⚛️' },
  { id: 'node_unlocked', title: 'Backend Specialist', desc: 'Engineered a Node.js (256) microservice', icon: '🟢' },
  { id: 'docker_unlocked', title: 'DevOps Captain', desc: 'Deployed containerized Docker (512) fleet', icon: '🐳' },
  { id: 'fullstack_unlocked', title: 'Full-Stack Master', desc: 'Mastered Full-Stack Dev (1024)', icon: '⚡' },
  { id: 'techlead_unlocked', title: 'The Architect', desc: 'Promoted to Tech Lead (2048)', icon: '👑' },
  { id: 'ai_unlocked', title: '10x AI Singularity', desc: 'Reached 10x AI Architect (4096)', icon: '🚀' },
  { id: 'combo_master', title: 'Velocity Monster', desc: 'Hit a 4x merge streak combo', icon: '🔥' },
  { id: 'hackathon_champ', title: 'Sprint Finisher', desc: 'Scored 2,500+ points in Hackathon Sprint', icon: '⏱️' },
  { id: 'high_roller', title: 'Code Billionaire', desc: 'Achieved 8,000+ points in a single session', icon: '💎' },
]

type Grid = (number | null)[][]
type GameMode = 'classic' | 'hackathon'
type GridSize = 3 | 4 | 5

// Floating Score Popups
interface ScorePopup {
  id: string
  text: string
  x: number
  y: number
  color: string
}

// Synthesized Web Audio API System
class SoundFx {
  private ctx: AudioContext | null = null
  private enabled = true

  private getContext(): AudioContext | null {
    if (!this.enabled) return null
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {})
    }
    return this.ctx
  }

  public setEnabled(val: boolean) {
    this.enabled = val
  }

  public isSoundEnabled() {
    return this.enabled
  }

  public playSlide() {
    const ctx = this.getContext()
    if (!ctx) return
    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(260, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(340, ctx.currentTime + 0.04)
      gain.gain.setValueAtTime(0.05, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.04)
    } catch {
      // ignore
    }
  }

  public playMerge(tierValue: number) {
    const ctx = this.getContext()
    if (!ctx) return
    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      const baseFreq = 420 + Math.min(1100, Math.log2(tierValue) * 85)
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.45, ctx.currentTime + 0.12)
      gain.gain.setValueAtTime(0.12, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.12)
    } catch {
      // ignore
    }
  }

  public playCombo(comboCount: number) {
    const ctx = this.getContext()
    if (!ctx) return
    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sawtooth'
      const freq = 550 + comboCount * 120
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      gain.gain.setValueAtTime(0.09, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.1)
    } catch {
      // ignore
    }
  }

  public playPowerUp() {
    const ctx = this.getContext()
    if (!ctx) return
    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(300, ctx.currentTime)
      osc.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.15)
      gain.gain.setValueAtTime(0.12, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.15)
    } catch {
      // ignore
    }
  }

  public playFanfare() {
    const ctx = this.getContext()
    if (!ctx) return
    try {
      const notes = [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.09)
        gain.gain.setValueAtTime(0.14, ctx.currentTime + idx * 0.09)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.09 + 0.35)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(ctx.currentTime + idx * 0.09)
        osc.stop(ctx.currentTime + idx * 0.09 + 0.35)
      })
    } catch {
      // ignore
    }
  }
}

const sfx = new SoundFx()

// Helper: Create grid of any size (3, 4, 5)
const createEmptyGrid = (size: number): Grid => {
  return Array.from({ length: size }, () => Array.from({ length: size }, () => null))
}

const addRandomTile = (grid: Grid): Grid => {
  const size = grid.length
  const emptyCoords: { r: number; c: number }[] = []
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === null) {
        emptyCoords.push({ r, c })
      }
    }
  }
  if (emptyCoords.length === 0) return grid

  const chosen = emptyCoords[Math.floor(Math.random() * emptyCoords.length)]
  const newGrid = grid.map((row) => [...row])
  newGrid[chosen.r][chosen.c] = Math.random() < 0.88 ? 2 : 4
  return newGrid
}

export const Game2048: React.FC = () => {
  // Configuration
  const [gridSize, setGridSize] = useState<GridSize>(4)
  const [gameMode, setGameMode] = useState<GameMode>('classic')

  // Board & Score State
  const [grid, setGrid] = useState<Grid>(() => {
    let g = createEmptyGrid(4)
    g = addRandomTile(g)
    g = addRandomTile(g)
    return g
  })

  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState<number>(() => {
    if (typeof window === 'undefined') return 0
    return parseInt(localStorage.getItem('dev_2048_best') || '0', 10)
  })

  // Hackathon Timer State (60s countdown)
  const [timeLeft, setTimeLeft] = useState(60)
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  // Combo Streak Tracker
  const [combo, setCombo] = useState(0)
  const lastMergeTimeRef = useRef(0)
  const comboTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Developer Power-Ups (Git Commands)
  const [stashTile, setStashTile] = useState<number | null>(null)
  const [stashCharges, setStashCharges] = useState(2)
  const [resetCharges, setResetCharges] = useState(2)
  const [hotfixCharges, setHotfixCharges] = useState(1)
  const [activePowerUp, setActivePowerUp] = useState<'stash' | 'reset' | null>(null)

  // Floating Popups & Logs
  const [popups, setPopups] = useState<ScorePopup[]>([])
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    '$ git init portfolio-game',
    '✔ Loaded 2048 Dev Evolution v2.0 (macOS Edition)',
    '➜ Tip: Use Arrow keys, WASD, or swipe to deploy code!',
  ])
  const [isConsoleOpen, setIsConsoleOpen] = useState(false)

  // Modals & Achievements
  const [prevGameState, setPrevGameState] = useState<{ grid: Grid; score: number } | null>(null)
  const [hasWon, setHasWon] = useState(false)
  const [hasDismissedWin, setHasDismissedWin] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showRoadmap, setShowRoadmap] = useState(false)
  const [showTrophies, setShowTrophies] = useState(false)
  const [recentAchievement, setRecentAchievement] = useState<Achievement | null>(null)
  const [unlockedAchievements, setUnlockedAchievements] = useState<Record<string, string>>(() => {
    if (typeof window === 'undefined') return {}
    try {
      return JSON.parse(localStorage.getItem('dev_2048_achievements') || '{}')
    } catch {
      return {}
    }
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Add Console Log Helper
  const addLog = (msg: string) => {
    setConsoleLogs((prev) => [...prev.slice(-15), msg])
  }

  // Confetti Particle Burst
  const triggerConfetti = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const colors = ['#F59E0B', '#EF4444', '#3B82F6', '#10B981', '#8B5CF6', '#EC4899']
    const particles = Array.from({ length: 70 }, () => ({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.7) * 16,
      size: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 12,
    }))

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let activeCount = 0

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.35 // gravity
        p.alpha -= 0.015
        p.rotation += p.vRot

        if (p.alpha > 0) {
          activeCount++
          ctx.save()
          ctx.globalAlpha = Math.max(0, p.alpha)
          ctx.translate(p.x, p.y)
          ctx.rotate((p.rotation * Math.PI) / 180)
          ctx.fillStyle = p.color
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5)
          ctx.restore()
        }
      })

      if (activeCount > 0) {
        requestAnimationFrame(render)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
    requestAnimationFrame(render)
  }

  // Check & Unlock Achievement
  const unlockAchievement = (id: string) => {
    if (unlockedAchievements[id]) return
    const ach = ACHIEVEMENTS_LIST.find((a) => a.id === id)
    if (!ach) return

    const now = new Date().toLocaleDateString()
    const updated = { ...unlockedAchievements, [id]: now }
    setUnlockedAchievements(updated)
    localStorage.setItem('dev_2048_achievements', JSON.stringify(updated))

    setRecentAchievement(ach)
    sfx.playFanfare()
    triggerConfetti()
    addLog(`🏆 UNLOCKED ACHIEVEMENT: [${ach.title}] — ${ach.desc}`)

    setTimeout(() => {
      setRecentAchievement(null)
    }, 4500)
  }

  // Hackathon Countdown Timer
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>
    if (gameMode === 'hackathon' && isTimerRunning && timeLeft > 0 && !isGameOver) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsGameOver(true)
            setIsTimerRunning(false)
            addLog('⏰ HACKATHON DEADLINE EXPIRED! Deployment completed.')
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [gameMode, isTimerRunning, timeLeft, isGameOver])

  // Sync Best Score
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score)
      localStorage.setItem('dev_2048_best', score.toString())
    }
    if (score >= 8000) {
      unlockAchievement('high_roller')
    }
    if (gameMode === 'hackathon' && score >= 2500) {
      unlockAchievement('hackathon_champ')
    }
  }, [score, bestScore, gameMode])

  // Restart / Reset Game
  const resetGame = (size: GridSize = gridSize, mode: GameMode = gameMode) => {
    let g = createEmptyGrid(size)
    g = addRandomTile(g)
    g = addRandomTile(g)
    setGrid(g)
    setScore(0)
    setPrevGameState(null)
    setHasWon(false)
    setHasDismissedWin(false)
    setIsGameOver(false)
    setCombo(0)
    setActivePowerUp(null)
    setStashTile(null)
    setStashCharges(2)
    setResetCharges(2)
    setHotfixCharges(1)

    if (mode === 'hackathon') {
      setTimeLeft(60)
      setIsTimerRunning(false)
    }
    addLog(`$ git checkout -b sprint-${Date.now().toString().slice(-4)}`)
  }

  // Undo Move
  const handleUndo = () => {
    if (prevGameState) {
      setGrid(prevGameState.grid)
      setScore(prevGameState.score)
      setPrevGameState(null)
      setIsGameOver(false)
      addLog('$ git reset --soft HEAD~1 (Reverted previous move)')
    }
  }

  // Power-Up: git stash (Save tile to stash pocket or swap)
  const handleStashAction = (r?: number, c?: number) => {
    if (r !== undefined && c !== undefined) {
      // Cell selected
      const targetVal = grid[r][c]
      if (targetVal === null && stashTile !== null) {
        // Place stashed tile on empty cell
        const next = grid.map((row) => [...row])
        next[r][c] = stashTile
        setGrid(next)
        setStashTile(null)
        setActivePowerUp(null)
        sfx.playPowerUp()
        addLog(`✔ git stash pop: Restored [${TECH_TIERS[stashTile]?.name}] to board`)
      } else if (targetVal !== null) {
        // Stash this tile
        if (stashCharges <= 0 && stashTile === null) return
        const next = grid.map((row) => [...row])
        next[r][c] = null
        const prevStashed = stashTile
        setStashTile(targetVal)
        if (prevStashed !== null) {
          next[r][c] = prevStashed
          addLog(`✔ git stash: Swapped [${TECH_TIERS[targetVal]?.name}] with [${TECH_TIERS[prevStashed]?.name}]`)
        } else {
          setStashCharges((prev) => Math.max(0, prev - 1))
          addLog(`✔ git stash: Pocketed [${TECH_TIERS[targetVal]?.name}] tile`)
        }
        setGrid(next)
        setActivePowerUp(null)
        sfx.playPowerUp()
      }
    } else {
      // Toggle stash picker mode
      setActivePowerUp(activePowerUp === 'stash' ? null : 'stash')
    }
  }

  // Power-Up: git reset --hard (Destroy low blocking tile)
  const handleResetHard = (r?: number, c?: number) => {
    if (r !== undefined && c !== undefined) {
      const targetVal = grid[r][c]
      if (targetVal !== null && resetCharges > 0) {
        const next = grid.map((row) => [...row])
        next[r][c] = null
        setGrid(next)
        setResetCharges((prev) => Math.max(0, prev - 1))
        setActivePowerUp(null)
        sfx.playPowerUp()
        addLog(`⚡ git reset --hard: Obliterated blocking [${TECH_TIERS[targetVal]?.name}]`)
      }
    } else {
      setActivePowerUp(activePowerUp === 'reset' ? null : 'reset')
    }
  }

  // Power-Up: AI Copilot / Hotfix (Upgrade lowest tile on board)
  const handleHotfix = () => {
    if (hotfixCharges <= 0) return
    let lowestVal = Infinity
    let lowestCoords: { r: number; c: number }[] = []

    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const val = grid[r][c]
        if (val !== null) {
          if (val < lowestVal) {
            lowestVal = val
            lowestCoords = [{ r, c }]
          } else if (val === lowestVal) {
            lowestCoords.push({ r, c })
          }
        }
      }
    }

    if (lowestCoords.length > 0) {
      const target = lowestCoords[Math.floor(Math.random() * lowestCoords.length)]
      const next = grid.map((row) => [...row])
      const upgradedVal = lowestVal * 2
      next[target.r][target.c] = upgradedVal
      setGrid(next)
      setHotfixCharges((prev) => Math.max(0, prev - 1))
      sfx.playPowerUp()
      addLog(`✨ AI Copilot Hotfix: Upgraded [${TECH_TIERS[lowestVal]?.name}] ➜ [${TECH_TIERS[upgradedVal]?.name}]`)
    }
  }

  // Check Game Over
  const checkGameOver = (g: Grid): boolean => {
    const size = g.length
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (g[r][c] === null) return false
      }
    }
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const val = g[r][c]
        if (r < size - 1 && g[r + 1][c] === val) return false
        if (c < size - 1 && g[r][c + 1] === val) return false
      }
    }
    return true
  }

  // Core Slide & Merge Move
  const move = useCallback(
    (direction: 'up' | 'down' | 'left' | 'right') => {
      if (isGameOver) return
      if (gameMode === 'hackathon' && !isTimerRunning) {
        setIsTimerRunning(true)
      }

      let hasMoved = false
      let gainedScore = 0
      let mergedTiers: number[] = []
      let currentGrid = grid.map((row) => [...row])
      const size = gridSize

      const rotate = (matrix: Grid): Grid => {
        const res = createEmptyGrid(size)
        for (let r = 0; r < size; r++) {
          for (let c = 0; c < size; c++) {
            res[c][size - 1 - r] = matrix[r][c]
          }
        }
        return res
      }

      let rotations = 0
      if (direction === 'up') rotations = 3
      else if (direction === 'right') rotations = 2
      else if (direction === 'down') rotations = 1

      for (let i = 0; i < rotations; i++) {
        currentGrid = rotate(currentGrid)
      }

      for (let r = 0; r < size; r++) {
        let row = currentGrid[r].filter((val) => val !== null) as number[]
        let newRow: (number | null)[] = []

        for (let c = 0; c < row.length; c++) {
          if (c + 1 < row.length && row[c] === row[c + 1]) {
            const mergedVal = row[c] * 2
            newRow.push(mergedVal)
            gainedScore += mergedVal
            mergedTiers.push(mergedVal)
            c++
          } else {
            newRow.push(row[c])
          }
        }

        while (newRow.length < size) {
          newRow.push(null)
        }

        for (let c = 0; c < size; c++) {
          if (currentGrid[r][c] !== newRow[c]) {
            hasMoved = true
          }
          currentGrid[r][c] = newRow[c]
        }
      }

      const reverseRotations = (4 - rotations) % 4
      for (let i = 0; i < reverseRotations; i++) {
        currentGrid = rotate(currentGrid)
      }

      if (hasMoved) {
        setPrevGameState({ grid, score })
        const nextGrid = addRandomTile(currentGrid)
        setGrid(nextGrid)

        // Combo calculations
        const now = Date.now()
        let nextCombo = combo
        if (mergedTiers.length > 0) {
          if (now - lastMergeTimeRef.current < 1600) {
            nextCombo = combo + 1
          } else {
            nextCombo = 1
          }
          lastMergeTimeRef.current = now
          setCombo(nextCombo)

          if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current)
          comboTimeoutRef.current = setTimeout(() => {
            setCombo(0)
          }, 1800)

          if (nextCombo >= 4) {
            unlockAchievement('combo_master')
          }
        }

        // Score bonus with combo
        const comboBonus = nextCombo > 1 ? gainedScore * (nextCombo * 0.25) : 0
        const totalAdd = Math.round(gainedScore + comboBonus)
        setScore((prev) => prev + totalAdd)

        // Floating score popup
        if (totalAdd > 0) {
          const highestMerged = Math.max(...mergedTiers)
          const tier = TECH_TIERS[highestMerged]
          const popupText = nextCombo > 1 ? `+${totalAdd} (${nextCombo}x Combo!)` : `+${totalAdd}`
          const newPopup: ScorePopup = {
            id: `${now}-${Math.random()}`,
            text: `${popupText} ${tier ? tier.label : ''}`,
            x: Math.random() * 80 + 10,
            y: 40,
            color: tier ? tier.accent : '#F59E0B',
          }
          setPopups((prev) => [...prev.slice(-4), newPopup])
          setTimeout(() => {
            setPopups((prev) => prev.filter((p) => p.id !== newPopup.id))
          }, 850)

          // Terminal Log
          if (tier) {
            addLog(`✔ Merged into [${tier.name} ${tier.label}] (+${totalAdd} pts)`)
          }
        }

        // Hackathon time bonus
        if (gameMode === 'hackathon' && mergedTiers.length > 0) {
          setTimeLeft((prev) => Math.min(120, prev + mergedTiers.length * 3))
        }

        // Audio
        if (mergedTiers.length > 0) {
          const highest = Math.max(...mergedTiers)
          sfx.playMerge(highest)
          if (nextCombo > 1) {
            sfx.playCombo(nextCombo)
          }

          // Check Achievements based on tier
          if (highest >= 64) unlockAchievement('react_unlocked')
          if (highest >= 256) unlockAchievement('node_unlocked')
          if (highest >= 512) unlockAchievement('docker_unlocked')
          if (highest >= 1024) unlockAchievement('fullstack_unlocked')
          if (highest >= 2048) {
            unlockAchievement('techlead_unlocked')
            if (!hasWon && !hasDismissedWin) {
              setHasWon(true)
              sfx.playFanfare()
              triggerConfetti()
            }
          }
          if (highest >= 4096) unlockAchievement('ai_unlocked')
        } else {
          sfx.playSlide()
        }

        // Check Game Over
        if (checkGameOver(nextGrid)) {
          setIsGameOver(true)
          addLog('✖ Stack Overflow: No valid merge directions remaining.')
        }
      }
    },
    [grid, score, isGameOver, gameMode, isTimerRunning, combo, gridSize, hasWon, hasDismissedWin]
  )

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault()
          move('up')
          break
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault()
          move('down')
          break
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault()
          move('left')
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault()
          move('right')
          break
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [move])

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return
    const touch = e.changedTouches[0]
    const dx = touch.clientX - touchStartRef.current.x
    const dy = touch.clientY - touchStartRef.current.y
    const absX = Math.abs(dx)
    const absY = Math.abs(dy)

    if (Math.max(absX, absY) > 30) {
      if (absX > absY) {
        move(dx > 0 ? 'right' : 'left')
      } else {
        move(dy > 0 ? 'down' : 'up')
      }
    }
    touchStartRef.current = null
  }

  // Find highest tile
  const highestTileOnBoard = Math.max(
    ...grid.flatMap((row) => row.filter((v): v is number => v !== null)),
    2
  )
  const currentTierInfo = TECH_TIERS[highestTileOnBoard] || TECH_TIERS[2]

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative flex-1 flex flex-col p-3 sm:p-4 select-none overflow-y-auto text-slate-800 dark:text-slate-100 max-w-full justify-between gap-2.5 font-sans"
    >
      {/* Canvas Confetti Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-50 w-full h-full" />

      {/* Floating Achievement Notification Banner */}
      <AnimatePresence>
        {recentAchievement && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="absolute top-2 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-xl flex items-center gap-2 border border-white/30 backdrop-blur-md"
          >
            <span className="text-xl">{recentAchievement.icon}</span>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-200">
                Achievement Unlocked!
              </div>
              <div className="text-xs font-black">{recentAchievement.title}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Score Popups Container */}
      <div className="absolute inset-x-0 top-14 pointer-events-none z-40 flex justify-center">
        <AnimatePresence>
          {popups.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 0, scale: 0.8 }}
              animate={{ opacity: 1, y: -35, scale: 1.15 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="absolute font-black text-sm px-2.5 py-1 rounded-full shadow-lg border border-white/20 backdrop-blur-md"
              style={{
                backgroundColor: p.color,
                color: '#FFFFFF',
              }}
            >
              {p.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Top Header & Scoreboard */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-500 bg-clip-text text-transparent">
              2048
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              Dev Evolution
            </span>
            {combo > 1 && (
              <motion.span
                initial={{ scale: 0.8 }}
                animate={{ scale: [1, 1.25, 1] }}
                className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500 text-white shadow-sm flex items-center gap-1"
              >
                <Flame className="w-2.5 h-2.5 fill-current" /> {combo}x COMBO
              </motion.span>
            )}
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            {gameMode === 'hackathon'
              ? '⚡ Race against the clock! Every merge adds +3s.'
              : 'Merge technologies to climb from HTML to Tech Lead!'}
          </p>
        </div>

        {/* Score & Best Cards */}
        <div className="flex items-center gap-2">
          {gameMode === 'hackathon' && (
            <div
              className={`px-3 py-1 rounded-xl border text-center min-w-[70px] transition-colors ${
                timeLeft <= 10
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-500 animate-pulse'
                  : 'bg-slate-100 dark:bg-[#202128] border-black/5 dark:border-white/10'
              }`}
            >
              <span className="block text-[9px] uppercase font-bold tracking-wider flex items-center justify-center gap-0.5">
                <Clock className="w-2.5 h-2.5" /> Time
              </span>
              <span className="text-sm font-extrabold">{timeLeft}s</span>
            </div>
          )}

          <div className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-[#202128] border border-black/5 dark:border-white/10 text-center min-w-[65px]">
            <span className="block text-[9px] uppercase font-bold tracking-wider text-slate-400">
              Score
            </span>
            <span className="text-sm font-extrabold text-slate-800 dark:text-white">{score}</span>
          </div>

          <div className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-[#202128] border border-black/5 dark:border-white/10 text-center min-w-[65px]">
            <span className="block text-[9px] uppercase font-bold tracking-wider text-amber-500 flex items-center justify-center gap-0.5">
              <Trophy className="w-2.5 h-2.5" /> Best
            </span>
            <span className="text-sm font-extrabold text-amber-500 dark:text-amber-400">{bestScore}</span>
          </div>
        </div>
      </div>

      {/* Control Actions & Mode Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 py-0.5 border-y border-black/5 dark:border-white/5">
        {/* Game Mode / Grid Size Pills */}
        <div className="flex items-center gap-1">
          {/* Mode Selector */}
          <button
            type="button"
            onClick={() => {
              const nextMode = gameMode === 'classic' ? 'hackathon' : 'classic'
              setGameMode(nextMode)
              resetGame(gridSize, nextMode)
            }}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold tracking-tight transition-all flex items-center gap-1 border ${
              gameMode === 'hackathon'
                ? 'bg-rose-500 text-white border-rose-600 shadow-sm'
                : 'bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 border-black/5 dark:border-white/10 text-slate-700 dark:text-slate-200'
            }`}
          >
            {gameMode === 'hackathon' ? <Clock className="w-3 h-3" /> : <Flame className="w-3 h-3 text-amber-500" />}
            {gameMode === 'hackathon' ? 'Hackathon Sprint' : 'Classic'}
          </button>

          {/* Grid Size Toggle (3x3 / 4x4 / 5x5) */}
          <button
            type="button"
            onClick={() => {
              const sizes: GridSize[] = [3, 4, 5]
              const nextIndex = (sizes.indexOf(gridSize) + 1) % sizes.length
              const nextSize = sizes[nextIndex]
              setGridSize(nextSize)
              resetGame(nextSize, gameMode)
            }}
            title="Toggle Grid Size (3x3, 4x4, 5x5)"
            className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 border border-black/5 dark:border-white/10 text-[10px] font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1 transition-all"
          >
            <Layers className="w-3 h-3 text-blue-500" />
            {gridSize}x{gridSize}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          {/* Trophy Cabinet */}
          <button
            type="button"
            onClick={() => setShowTrophies(true)}
            title="View Achievements"
            className="p-1.5 rounded-lg bg-white dark:bg-white/10 border border-black/10 dark:border-white/15 hover:bg-slate-50 dark:hover:bg-white/20 active:scale-95 text-amber-500 transition-all"
          >
            <Award className="w-3.5 h-3.5" />
          </button>

          {/* Roadmap Info */}
          <button
            type="button"
            onClick={() => setShowRoadmap(true)}
            title="Tech Roadmap"
            className="p-1.5 rounded-lg bg-white dark:bg-white/10 border border-black/10 dark:border-white/15 hover:bg-slate-50 dark:hover:bg-white/20 active:scale-95 text-blue-500 transition-all"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>

          {/* Undo */}
          <button
            type="button"
            onClick={handleUndo}
            disabled={!prevGameState}
            title="Undo move"
            className={`p-1.5 rounded-lg border transition-all ${
              prevGameState
                ? 'bg-white dark:bg-white/10 border-black/10 dark:border-white/15 hover:bg-slate-50 dark:hover:bg-white/20 active:scale-95 text-slate-700 dark:text-slate-200'
                : 'opacity-40 cursor-not-allowed border-transparent text-slate-400'
            }`}
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={() => {
              const next = !soundEnabled
              setSoundEnabled(next)
              sfx.setEnabled(next)
            }}
            title={soundEnabled ? 'Mute' : 'Unmute'}
            className="p-1.5 rounded-lg bg-white dark:bg-white/10 border border-black/10 dark:border-white/15 hover:bg-slate-50 dark:hover:bg-white/20 active:scale-95 text-slate-700 dark:text-slate-200 transition-all"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-500" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
          </button>

          {/* New Game */}
          <button
            type="button"
            onClick={() => resetGame(gridSize, gameMode)}
            title="Restart"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-[11px] font-bold shadow-sm transition-all"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Developer Power-Ups (Git Commands) Bar */}
      <div className="flex items-center justify-between gap-1.5 px-2 py-1.5 rounded-xl bg-slate-100/90 dark:bg-white/5 border border-black/5 dark:border-white/10">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <TerminalIcon className="w-3 h-3 text-slate-400" /> Git Power-Ups:
        </span>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {/* git stash */}
          <button
            type="button"
            onClick={() => handleStashAction()}
            disabled={stashCharges <= 0 && stashTile === null}
            title={stashTile ? `Drop stashed ${TECH_TIERS[stashTile]?.name} tile` : 'Stash a tile (2 uses)'}
            className={`px-2 py-1 rounded-lg text-[10px] font-semibold flex items-center gap-1 transition-all border ${
              activePowerUp === 'stash'
                ? 'bg-amber-500 text-white border-amber-600 ring-2 ring-amber-400'
                : stashTile
                ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30'
                : stashCharges > 0
                ? 'bg-white dark:bg-white/10 text-slate-700 dark:text-slate-200 border-black/10 dark:border-white/15 hover:bg-slate-200'
                : 'opacity-40 cursor-not-allowed border-transparent text-slate-400'
            }`}
          >
            <Archive className="w-3 h-3" />
            <span>git stash</span>
            {stashTile ? (
              <span className="font-bold text-amber-500">[{TECH_TIERS[stashTile]?.label}]</span>
            ) : (
              <span className="text-[9px] opacity-70">({stashCharges})</span>
            )}
          </button>

          {/* git reset --hard */}
          <button
            type="button"
            onClick={() => handleResetHard()}
            disabled={resetCharges <= 0}
            title="Destroy a low-tier blocking tile (2 uses)"
            className={`px-2 py-1 rounded-lg text-[10px] font-semibold flex items-center gap-1 transition-all border ${
              activePowerUp === 'reset'
                ? 'bg-rose-500 text-white border-rose-600 ring-2 ring-rose-400'
                : resetCharges > 0
                ? 'bg-white dark:bg-white/10 text-slate-700 dark:text-slate-200 border-black/10 dark:border-white/15 hover:bg-slate-200'
                : 'opacity-40 cursor-not-allowed border-transparent text-slate-400'
            }`}
          >
            <Trash2 className="w-3 h-3 text-rose-500" />
            <span>git reset</span>
            <span className="text-[9px] opacity-70">({resetCharges})</span>
          </button>

          {/* AI Copilot Hotfix */}
          <button
            type="button"
            onClick={handleHotfix}
            disabled={hotfixCharges <= 0}
            title="AI Copilot: Instantly upgrade lowest tile"
            className={`px-2 py-1 rounded-lg text-[10px] font-semibold flex items-center gap-1 transition-all border ${
              hotfixCharges > 0
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-purple-600 hover:brightness-110 shadow-sm'
                : 'opacity-40 cursor-not-allowed border-transparent text-slate-400'
            }`}
          >
            <Wand2 className="w-3 h-3" />
            <span>AI Hotfix</span>
            <span className="text-[9px] opacity-70">({hotfixCharges})</span>
          </button>
        </div>
      </div>

      {/* Target Selection Prompt Banner */}
      {activePowerUp && (
        <div className="px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-[11px] font-semibold text-center animate-pulse">
          {activePowerUp === 'stash'
            ? stashTile
              ? 'Click any empty cell to place your stashed tile!'
              : 'Click any tile on the board to stash it!'
            : 'Click any blocking tile on the board to obliterate it!'}
        </div>
      )}

      {/* 2048 Game Board Surface */}
      <div className="relative mx-auto w-full max-w-[380px] aspect-square p-2.5 sm:p-3 rounded-2xl bg-slate-200/80 dark:bg-[#121318]/90 border border-black/10 dark:border-white/10 shadow-inner flex flex-col justify-between">
        {/* Dynamic Grid Layout */}
        <div
          className={`grid gap-2 sm:gap-2.5 w-full h-full ${
            gridSize === 3
              ? 'grid-cols-3 grid-rows-3'
              : gridSize === 5
              ? 'grid-cols-5 grid-rows-5'
              : 'grid-cols-4 grid-rows-4'
          }`}
        >
          {grid.map((row, r) =>
            row.map((cellValue, c) => (
              <div
                key={`slot-${r}-${c}`}
                onClick={() => {
                  if (activePowerUp === 'stash') handleStashAction(r, c)
                  if (activePowerUp === 'reset') handleResetHard(r, c)
                }}
                className={`relative rounded-xl border flex items-center justify-center overflow-hidden transition-all ${
                  activePowerUp
                    ? 'cursor-crosshair ring-2 ring-amber-400/70 bg-amber-500/10'
                    : 'bg-slate-300/50 dark:bg-white/5 border-black/5 dark:border-white/5'
                }`}
              >
                {/* Active Tile */}
                {cellValue !== null && (
                  <motion.div
                    key={`tile-${cellValue}-${r}-${c}`}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 360, damping: 25 }}
                    className={`absolute inset-0 rounded-xl bg-gradient-to-br ${
                      TECH_TIERS[cellValue]?.bgDark || 'from-indigo-600 to-purple-800'
                    } flex flex-col items-center justify-center p-1 shadow-md select-none border border-white/20 ${
                      cellValue >= 512 ? 'ring-2 ring-yellow-400/80 shadow-[0_0_12px_rgba(234,179,8,0.45)]' : ''
                    }`}
                  >
                    {/* Symbol / Icon */}
                    <span
                      className={`font-black drop-shadow-sm leading-none text-white ${
                        gridSize === 5 ? 'text-xs sm:text-base' : 'text-base sm:text-xl'
                      }`}
                    >
                      {TECH_TIERS[cellValue]?.label || cellValue}
                    </span>

                    {/* Badge Label */}
                    <span
                      className={`font-bold text-white/95 truncate max-w-full text-center tracking-tight mt-0.5 ${
                        gridSize === 5 ? 'text-[7px]' : 'text-[9px] sm:text-[10px]'
                      }`}
                    >
                      {TECH_TIERS[cellValue]?.badge || cellValue}
                    </span>

                    {/* Value Badge */}
                    <span className="absolute bottom-1 right-1.5 text-[8px] font-mono font-bold text-white/60">
                      {cellValue}
                    </span>
                  </motion.div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Game Over Overlay */}
        <AnimatePresence>
          {isGameOver && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-2.5 sm:inset-3 rounded-xl bg-slate-900/90 backdrop-blur-md flex flex-col items-center justify-center p-5 text-center text-white z-30"
            >
              <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mb-2">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">Stack Overflow!</h3>
              <p className="text-xs text-slate-300 mt-1 mb-3">
                {gameMode === 'hackathon' && timeLeft <= 0
                  ? 'Hackathon deadline arrived! Production deployment locked.'
                  : `No more merges available. Highest: ${currentTierInfo.name}!`}
              </p>
              <div className="text-sm font-extrabold text-white mb-4">
                Final Score: <span className="text-blue-400">{score}</span>
              </div>
              <button
                type="button"
                onClick={() => resetGame(gridSize, gameMode)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg active:scale-95 transition-all flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" /> Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* You Win Overlay (Tech Lead 2048) */}
        <AnimatePresence>
          {hasWon && !hasDismissedWin && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="absolute inset-2.5 sm:inset-3 rounded-xl bg-gradient-to-br from-amber-600/95 via-rose-700/95 to-purple-900/95 backdrop-blur-md flex flex-col items-center justify-center p-5 text-center text-white z-30 shadow-2xl"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -5, 5, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2 }}
                className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-2 shadow-inner"
              >
                <span className="text-3xl">👑</span>
              </motion.div>
              <h3 className="text-xl font-black tracking-tight flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-yellow-300" /> Promoted to Tech Lead!
              </h3>
              <p className="text-xs text-amber-100 mt-1 mb-4">
                You evolved all the way to 2048! Can you reach the 4096 AI Singularity?
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setHasDismissedWin(true)}
                  className="px-3.5 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs shadow-md active:scale-95 hover:bg-slate-100 transition-all"
                >
                  Keep Playing
                </button>
                <button
                  type="button"
                  onClick={() => resetGame(gridSize, gameMode)}
                  className="px-3.5 py-2 rounded-xl bg-black/40 text-white font-semibold text-xs border border-white/20 active:scale-95 hover:bg-black/60 transition-all"
                >
                  New Game
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* D-Pad Arrow Controls for touch & click accessibility */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => move('up')}
            aria-label="Move Up"
            className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 active:scale-90 border border-black/5 dark:border-white/10 flex items-center justify-center transition-all shadow-sm"
          >
            <ChevronUp className="w-4 h-4 text-slate-700 dark:text-slate-200" />
          </button>
        </div>
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => move('left')}
            aria-label="Move Left"
            className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 active:scale-90 border border-black/5 dark:border-white/10 flex items-center justify-center transition-all shadow-sm"
          >
            <ChevronLeft className="w-4 h-4 text-slate-700 dark:text-slate-200" />
          </button>
          <button
            type="button"
            onClick={() => move('down')}
            aria-label="Move Down"
            className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 active:scale-90 border border-black/5 dark:border-white/10 flex items-center justify-center transition-all shadow-sm"
          >
            <ChevronDown className="w-4 h-4 text-slate-700 dark:text-slate-200" />
          </button>
          <button
            type="button"
            onClick={() => move('right')}
            aria-label="Move Right"
            className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 active:scale-90 border border-black/5 dark:border-white/10 flex items-center justify-center transition-all shadow-sm"
          >
            <ChevronRight className="w-4 h-4 text-slate-700 dark:text-slate-200" />
          </button>
        </div>
      </div>

      {/* Live macOS Terminal Console Stream (Collapsible) */}
      <div className="rounded-xl border border-black/10 dark:border-white/10 bg-slate-900 text-slate-200 font-mono text-[10px] overflow-hidden shadow-sm">
        <button
          type="button"
          onClick={() => setIsConsoleOpen(!isConsoleOpen)}
          className="w-full px-3 py-1.5 bg-black/40 flex items-center justify-between hover:bg-black/60 transition-colors"
        >
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold">terminal — zsh</span>
          </div>
          <span className="text-[9px] text-slate-400">
            {isConsoleOpen ? '▲ Hide Logs' : '▼ View Logs'}
          </span>
        </button>

        {isConsoleOpen && (
          <div className="p-2.5 max-h-24 overflow-y-auto space-y-1">
            {consoleLogs.map((log, i) => (
              <div
                key={i}
                className={
                  log.startsWith('✔')
                    ? 'text-emerald-400'
                    : log.startsWith('⚡')
                    ? 'text-yellow-400'
                    : log.startsWith('🏆')
                    ? 'text-amber-300 font-bold'
                    : 'text-slate-300'
                }
              >
                {log}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Evolution Roadmap Modal */}
      <AnimatePresence>
        {showRoadmap && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/65 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="w-full max-w-sm max-h-[85%] bg-white dark:bg-[#1a1b22] rounded-2xl shadow-2xl border border-black/10 dark:border-white/15 overflow-hidden flex flex-col"
            >
              <div className="p-3.5 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Dev Evolution Roadmap
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setShowRoadmap(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {Object.values(TECH_TIERS).map((tier) => (
                  <div
                    key={tier.value}
                    className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tier.bgDark} flex flex-col items-center justify-center text-white shrink-0 shadow-sm`}
                    >
                      <span className="text-xs font-black leading-none">{tier.label}</span>
                      <span className="text-[8px] font-mono opacity-80">{tier.value}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {tier.name}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {tier.value} pts
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                        {tier.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trophy & Achievement Cabinet Modal */}
      <AnimatePresence>
        {showTrophies && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/65 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="w-full max-w-sm max-h-[85%] bg-white dark:bg-[#1a1b22] rounded-2xl shadow-2xl border border-black/10 dark:border-white/15 overflow-hidden flex flex-col"
            >
              <div className="p-3.5 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Career Achievements
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setShowTrophies(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {ACHIEVEMENTS_LIST.map((ach) => {
                  const isUnlocked = !!unlockedAchievements[ach.id]
                  return (
                    <div
                      key={ach.id}
                      className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all ${
                        isUnlocked
                          ? 'bg-amber-500/10 border-amber-500/30'
                          : 'bg-slate-100/60 dark:bg-white/5 border-black/5 dark:border-white/5 opacity-60'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${
                          isUnlocked ? 'bg-amber-500 text-white shadow-md' : 'bg-slate-200 dark:bg-white/10 text-slate-400'
                        }`}
                      >
                        {ach.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {ach.title}
                          </span>
                          {isUnlocked && (
                            <span className="text-[9px] font-bold text-emerald-500">
                              ✓ Unlocked
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">
                          {ach.desc}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
