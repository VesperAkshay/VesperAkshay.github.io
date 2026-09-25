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

// 4x4 Grid types
type Grid = (number | null)[][]

// Web Audio API Sound Synthesizer (Zero asset dependencies, authentic macOS feel)
class SoundFx {
  private ctx: AudioContext | null = null
  private enabled = true

  constructor() {
    // Lazy audio context on user gesture
  }

  private getContext(): AudioContext | null {
    if (!this.enabled) return null
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
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
      osc.frequency.setValueAtTime(280, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(360, ctx.currentTime + 0.05)
      gain.gain.setValueAtTime(0.06, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.05)
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
      const baseFreq = 440 + Math.min(1000, Math.log2(tierValue) * 80)
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, ctx.currentTime + 0.12)
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

  public playWin() {
    const ctx = this.getContext()
    if (!ctx) return
    try {
      const notes = [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1)
        gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.1)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.3)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(ctx.currentTime + idx * 0.1)
        osc.stop(ctx.currentTime + idx * 0.1 + 0.3)
      })
    } catch {
      // ignore
    }
  }
}

const sfx = new SoundFx()

// Helper to spawn initial board
const createEmptyGrid = (): Grid => [
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
]

const addRandomTile = (grid: Grid): Grid => {
  const emptyCoords: { r: number; c: number }[] = []
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (grid[r][c] === null) {
        emptyCoords.push({ r, c })
      }
    }
  }
  if (emptyCoords.length === 0) return grid

  const chosen = emptyCoords[Math.floor(Math.random() * emptyCoords.length)]
  const newGrid = grid.map((row) => [...row])
  // 90% chance of 2 (HTML), 10% chance of 4 (CSS)
  newGrid[chosen.r][chosen.c] = Math.random() < 0.9 ? 2 : 4
  return newGrid
}

export const Game2048: React.FC = () => {
  const [grid, setGrid] = useState<Grid>(() => {
    let g = createEmptyGrid()
    g = addRandomTile(g)
    g = addRandomTile(g)
    return g
  })

  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState<number>(() => {
    if (typeof window === 'undefined') return 0
    return parseInt(localStorage.getItem('dev_2048_best') || '0', 10)
  })

  const [prevGameState, setPrevGameState] = useState<{ grid: Grid; score: number } | null>(null)
  const [hasWon, setHasWon] = useState(false)
  const [hasDismissedWin, setHasDismissedWin] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showRoadmap, setShowRoadmap] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)

  // Sync best score to localStorage
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score)
      localStorage.setItem('dev_2048_best', score.toString())
    }
  }, [score, bestScore])

  // Sound toggle
  const toggleSound = () => {
    const next = !soundEnabled
    setSoundEnabled(next)
    sfx.setEnabled(next)
  }

  // Check Game Over condition
  const checkGameOver = (g: Grid): boolean => {
    // If any cell empty, not over
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (g[r][c] === null) return false
      }
    }
    // Check adjacent matches
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const val = g[r][c]
        if (r < 3 && g[r + 1][c] === val) return false
        if (c < 3 && g[r][c + 1] === val) return false
      }
    }
    return true
  }

  // Check Win condition (has 2048 tile)
  const checkWin = (g: Grid): boolean => {
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (g[r][c] === 2048) return true
      }
    }
    return false
  }

  // Restart Game
  const resetGame = () => {
    let g = createEmptyGrid()
    g = addRandomTile(g)
    g = addRandomTile(g)
    setGrid(g)
    setScore(0)
    setPrevGameState(null)
    setHasWon(false)
    setHasDismissedWin(false)
    setIsGameOver(false)
  }

  // Undo move
  const handleUndo = () => {
    if (prevGameState) {
      setGrid(prevGameState.grid)
      setScore(prevGameState.score)
      setPrevGameState(null)
      setIsGameOver(false)
    }
  }

  // Core 2048 Slide & Merge Algorithm
  const move = useCallback(
    (direction: 'up' | 'down' | 'left' | 'right') => {
      if (isGameOver) return

      let hasMoved = false
      let gainedScore = 0
      let mergedTiers: number[] = []

      // Create deep clone
      let currentGrid = grid.map((row) => [...row])

      // Rotate grid to normalize all directions to a 'left' slide
      const rotate = (matrix: Grid): Grid => {
        const N = matrix.length
        const res = createEmptyGrid()
        for (let r = 0; r < N; r++) {
          for (let c = 0; c < N; c++) {
            res[c][N - 1 - r] = matrix[r][c]
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

      // Slide and merge rows to the left
      for (let r = 0; r < 4; r++) {
        let row = currentGrid[r].filter((val) => val !== null) as number[]
        let newRow: (number | null)[] = []

        for (let c = 0; c < row.length; c++) {
          if (c + 1 < row.length && row[c] === row[c + 1]) {
            const mergedVal = row[c] * 2
            newRow.push(mergedVal)
            gainedScore += mergedVal
            mergedTiers.push(mergedVal)
            c++ // skip merged neighbor
          } else {
            newRow.push(row[c])
          }
        }

        while (newRow.length < 4) {
          newRow.push(null)
        }

        for (let c = 0; c < 4; c++) {
          if (currentGrid[r][c] !== newRow[c]) {
            hasMoved = true
          }
          currentGrid[r][c] = newRow[c]
        }
      }

      // Rotate back to original orientation
      const reverseRotations = (4 - rotations) % 4
      for (let i = 0; i < reverseRotations; i++) {
        currentGrid = rotate(currentGrid)
      }

      if (hasMoved) {
        setPrevGameState({ grid, score })
        const nextGrid = addRandomTile(currentGrid)
        setGrid(nextGrid)
        setScore((prev) => prev + gainedScore)

        if (mergedTiers.length > 0) {
          const highestMerged = Math.max(...mergedTiers)
          sfx.playMerge(highestMerged)
        } else {
          sfx.playSlide()
        }

        // Check Win
        if (!hasWon && !hasDismissedWin && checkWin(nextGrid)) {
          setHasWon(true)
          sfx.playWin()
        }

        // Check Game Over
        if (checkGameOver(nextGrid)) {
          setIsGameOver(true)
        }
      }
    },
    [grid, score, isGameOver, hasWon, hasDismissedWin]
  )

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if modifier keys are pressed
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

  // Touch Swipe handlers for touchscreens & mobile
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

  // Find highest tier currently on the board
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
      className="relative flex-1 flex flex-col p-4 sm:p-5 select-none overflow-y-auto text-slate-800 dark:text-slate-100 max-w-full justify-between gap-3"
    >
      {/* Top Header & Scoreboard */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-500 bg-clip-text text-transparent">
              2048
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              Dev Evolution
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 hidden sm:block">
            Merge code to evolve from HTML to Tech Lead!
          </p>
        </div>

        {/* Score & Best Cards */}
        <div className="flex items-center gap-2">
          {/* Current Score */}
          <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#202128] border border-black/5 dark:border-white/10 text-center min-w-[70px]">
            <span className="block text-[9px] uppercase font-bold tracking-wider text-slate-400">
              Score
            </span>
            <span className="text-sm font-extrabold text-slate-800 dark:text-white">
              {score}
            </span>
          </div>

          {/* Best Score */}
          <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#202128] border border-black/5 dark:border-white/10 text-center min-w-[70px]">
            <span className="block text-[9px] uppercase font-bold tracking-wider text-amber-500 flex items-center justify-center gap-0.5">
              <Trophy className="w-2.5 h-2.5" /> Best
            </span>
            <span className="text-sm font-extrabold text-amber-500 dark:text-amber-400">
              {bestScore}
            </span>
          </div>
        </div>
      </div>

      {/* Control Actions Bar */}
      <div className="flex items-center justify-between gap-2 py-1">
        {/* Highest Rank Progress Indicator */}
        <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100/80 dark:bg-white/5 border border-black/5 dark:border-white/10">
          <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span className="text-[11px] text-slate-600 dark:text-slate-300">Rank:</span>
          <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 truncate max-w-[130px]">
            {currentTierInfo.name}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5">
          {/* Undo */}
          <button
            type="button"
            onClick={handleUndo}
            disabled={!prevGameState}
            title="Undo last move"
            className={`p-1.5 rounded-lg border transition-all ${
              prevGameState
                ? 'bg-white dark:bg-white/10 border-black/10 dark:border-white/15 hover:bg-slate-50 dark:hover:bg-white/20 active:scale-95 text-slate-700 dark:text-slate-200'
                : 'opacity-40 cursor-not-allowed border-transparent text-slate-400'
            }`}
          >
            <Undo2 className="w-4 h-4" />
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            title={soundEnabled ? 'Mute sound' : 'Unmute sound'}
            className="p-1.5 rounded-lg bg-white dark:bg-white/10 border border-black/10 dark:border-white/15 hover:bg-slate-50 dark:hover:bg-white/20 active:scale-95 text-slate-700 dark:text-slate-200 transition-all"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Roadmap Info */}
          <button
            type="button"
            onClick={() => setShowRoadmap(true)}
            title="View Evolution Roadmap"
            className="p-1.5 rounded-lg bg-white dark:bg-white/10 border border-black/10 dark:border-white/15 hover:bg-slate-50 dark:hover:bg-white/20 active:scale-95 text-slate-700 dark:text-slate-200 transition-all"
          >
            <HelpCircle className="w-4 h-4 text-blue-500" />
          </button>

          {/* New Game */}
          <button
            type="button"
            onClick={resetGame}
            title="Start new game"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs font-semibold shadow-sm transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New</span>
          </button>
        </div>
      </div>

      {/* 2048 Game Board Surface */}
      <div className="relative mx-auto w-full max-w-[380px] aspect-square p-2.5 sm:p-3 rounded-2xl bg-slate-200/80 dark:bg-[#121318]/90 border border-black/10 dark:border-white/10 shadow-inner flex flex-col justify-between">
        {/* Background Grid Slots */}
        <div className="grid grid-cols-4 grid-rows-4 gap-2 sm:gap-2.5 w-full h-full">
          {grid.map((row, r) =>
            row.map((cellValue, c) => (
              <div
                key={`slot-${r}-${c}`}
                className="relative rounded-xl bg-slate-300/50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-center overflow-hidden"
              >
                {/* Active Tile */}
                {cellValue !== null && (
                  <motion.div
                    key={`tile-${cellValue}-${r}-${c}`}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className={`absolute inset-0 rounded-xl bg-gradient-to-br ${
                      TECH_TIERS[cellValue]?.bgDark || 'from-indigo-600 to-purple-800'
                    } flex flex-col items-center justify-center p-1 shadow-md select-none border border-white/20`}
                  >
                    {/* Tech Symbol / Badge */}
                    <span className="text-base sm:text-xl font-black drop-shadow-sm leading-none text-white">
                      {TECH_TIERS[cellValue]?.label || cellValue}
                    </span>

                    {/* Tech Name */}
                    <span className="text-[9px] sm:text-[10px] font-bold text-white/90 truncate max-w-full text-center tracking-tight mt-0.5">
                      {TECH_TIERS[cellValue]?.badge || cellValue}
                    </span>

                    {/* Number Value Tag */}
                    <span className="absolute bottom-1 right-1.5 text-[8px] font-mono font-semibold text-white/60">
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
                No more merges available. You reached{' '}
                <span className="font-bold text-amber-400">{currentTierInfo.name}</span>!
              </p>
              <div className="text-sm font-extrabold text-white mb-4">
                Final Score: <span className="text-blue-400">{score}</span>
              </div>
              <button
                type="button"
                onClick={resetGame}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg active:scale-95 transition-all flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" /> Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* You Win Overlay (Reached 2048 / Tech Lead) */}
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
                You successfully merged all the way to 2048! You are now the Architect.
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
                  onClick={resetGame}
                  className="px-3.5 py-2 rounded-xl bg-black/40 text-white font-semibold text-xs border border-white/20 active:scale-95 hover:bg-black/60 transition-all"
                >
                  New Game
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* D-Pad Arrow Controls for touch & click ease */}
      <div className="flex flex-col items-center gap-1 pt-1">
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => move('up')}
            aria-label="Move Up"
            className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 active:scale-90 border border-black/5 dark:border-white/10 flex items-center justify-center transition-all shadow-sm"
          >
            <ChevronUp className="w-5 h-5 text-slate-700 dark:text-slate-200" />
          </button>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => move('left')}
            aria-label="Move Left"
            className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 active:scale-90 border border-black/5 dark:border-white/10 flex items-center justify-center transition-all shadow-sm"
          >
            <ChevronLeft className="w-5 h-5 text-slate-700 dark:text-slate-200" />
          </button>
          <button
            type="button"
            onClick={() => move('down')}
            aria-label="Move Down"
            className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 active:scale-90 border border-black/5 dark:border-white/10 flex items-center justify-center transition-all shadow-sm"
          >
            <ChevronDown className="w-5 h-5 text-slate-700 dark:text-slate-200" />
          </button>
          <button
            type="button"
            onClick={() => move('right')}
            aria-label="Move Right"
            className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 active:scale-90 border border-black/5 dark:border-white/10 flex items-center justify-center transition-all shadow-sm"
          >
            <ChevronRight className="w-5 h-5 text-slate-700 dark:text-slate-200" />
          </button>
        </div>
        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-1">
          Use Arrow Keys, WASD, Swipe, or D-Pad
        </span>
      </div>

      {/* Tech Evolution Roadmap Modal */}
      <AnimatePresence>
        {showRoadmap && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md z-40 flex items-center justify-center p-4"
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
    </div>
  )
}
