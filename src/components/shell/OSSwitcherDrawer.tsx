import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useOSStore } from '../../store/osStore'
import type { OSType } from '../../store/osStore'
import { ChevronRight, X } from 'lucide-react'

// Authentic Vector OS Logos
export const AppleLogo: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 170 170" fill="currentColor">
    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.7-11.72-13.98-5.26-7.94-9.35-16.74-12.27-26.4-2.93-9.66-4.39-18.73-4.39-27.21 0-12.82 3.34-23.7 10.02-32.64 6.69-8.94 15.11-13.5 25.27-13.68 4.9.11 10.37 1.34 16.42 3.69 6.05 2.35 10.02 3.59 11.91 3.73 1.58-.27 5.76-1.57 12.54-3.9 6.78-2.33 12.43-3.32 16.96-2.98 12.65 1.09 22.45 6.03 29.41 14.82-11.3 6.86-16.83 16.4-16.6 28.62.22 9.69 3.96 17.65 11.22 23.88 7.26 6.22 15.82 9.77 25.68 10.65-2.06 6.08-4.46 12.01-7.2 17.79zM119.22 31.84c0-7.39 2.66-14.15 7.98-20.28C132.52 5.43 138.99 1.41 146.62 0c.32 1.3.49 2.5.49 3.6 0 7.39-2.8 14.39-8.4 21-5.6 6.61-12.44 10.42-20.52 11.44-.33-1.42-.49-2.82-.49-4.2z" />
  </svg>
)

export const WindowsLogo: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 88 88" fill="none">
    <path d="M0 12.5L35.6 7.6V41.7H0V12.5ZM0 46.3H35.6V80.4L0 75.5V46.3ZM40.3 6.9L87.8 0V41.7H40.3V6.9ZM40.3 46.3H87.8V88L40.3 81.1V46.3Z" fill="#0078D4"/>
  </svg>
)

export const UbuntuLogo: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 256 256" fill="none">
    <circle cx="128" cy="128" r="128" fill="#E95420"/>
    <circle cx="128" cy="128" r="76" stroke="white" strokeWidth="25.5"/>
    <circle cx="198" cy="128" r="21" fill="white"/>
    <circle cx="93" cy="67" r="21" fill="white"/>
    <circle cx="93" cy="189" r="21" fill="white"/>
    <path d="M128 52A76 76 0 0 0 62 90" stroke="#E95420" strokeWidth="16" fill="none"/>
    <path d="M62 166A76 76 0 0 0 128 204" stroke="#E95420" strokeWidth="16" fill="none"/>
    <path d="M198 128H204" stroke="#E95420" strokeWidth="16" strokeLinecap="round"/>
  </svg>
)

export const AndroidLogo: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none">
    <path d="M22 48C22 32.536 34.536 20 50 20C65.464 20 78 32.536 78 48H22Z" fill="#3DDC84"/>
    <line x1="33" y1="23" x2="25" y2="12" stroke="#3DDC84" strokeWidth="4.5" strokeLinecap="round"/>
    <line x1="67" y1="23" x2="75" y2="12" stroke="#3DDC84" strokeWidth="4.5" strokeLinecap="round"/>
    <circle cx="38" cy="35" r="3.2" fill="white"/>
    <circle cx="62" cy="35" r="3.2" fill="white"/>
    <rect x="22" y="52" width="56" height="34" rx="6" fill="#3DDC84"/>
  </svg>
)

interface OSButtonConfig {
  id: OSType
  name: string
  icon: React.FC<{ className?: string }>
  activeBorder: string
  hoverBg: string
}

const OS_ICONS: OSButtonConfig[] = [
  {
    id: 'macos',
    name: 'macOS',
    icon: AppleLogo,
    activeBorder: 'border-white/50 bg-white/20 text-white shadow-[0_0_12px_rgba(255,255,255,0.35)]',
    hoverBg: 'hover:bg-white/10 hover:text-white text-slate-300',
  },
  {
    id: 'windows',
    name: 'Windows',
    icon: WindowsLogo,
    activeBorder: 'border-sky-400/60 bg-sky-500/25 text-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.4)]',
    hoverBg: 'hover:bg-sky-500/15 hover:text-sky-300 text-slate-300',
  },
  {
    id: 'linux',
    name: 'Linux',
    icon: UbuntuLogo,
    activeBorder: 'border-orange-500/60 bg-orange-500/25 text-orange-400 shadow-[0_0_12px_rgba(249,115,22,0.4)]',
    hoverBg: 'hover:bg-orange-500/15 hover:text-orange-300 text-slate-300',
  },
  {
    id: 'android',
    name: 'Android',
    icon: AndroidLogo,
    activeBorder: 'border-emerald-400/60 bg-emerald-500/25 text-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.4)]',
    hoverBg: 'hover:bg-emerald-500/15 hover:text-emerald-300 text-slate-300',
  },
]

export const OSSwitcherDrawer: React.FC = () => {
  const currentOS = useOSStore((state) => state.currentOS)
  const isDrawerOpen = useOSStore((state) => state.isDrawerOpen)
  const toggleDrawer = useOSStore((state) => state.toggleDrawer)
  const closeDrawer = useOSStore((state) => state.closeDrawer)
  const setOS = useOSStore((state) => state.setOS)

  const [hoveredOS, setHoveredOS] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeDrawer()
      }
    }
    if (isDrawerOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDrawerOpen, closeDrawer])

  const handleSelectOS = (os: OSType) => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      const osc = audioCtx.createOscillator()
      const gain = audioCtx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.1)
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15)
      osc.connect(gain)
      gain.connect(audioCtx.destination)
      osc.start()
      osc.stop(audioCtx.currentTime + 0.16)
    } catch {
      // AudioContext unavailable
    }

    setOS(os, true)
    closeDrawer()
  }

  const activeOSConfig = OS_ICONS.find((o) => o.id === currentOS) || OS_ICONS[0]
  const ActiveTriggerIcon = activeOSConfig.icon

  const positionClass =
    currentOS === 'windows'
      ? 'fixed bottom-14 left-3 z-[75]'
      : currentOS === 'linux'
      ? 'fixed bottom-3 left-[68px] z-[75]'
      : currentOS === 'android'
      ? 'fixed bottom-4 left-4 z-[75]'
      : 'fixed bottom-3 left-4 z-[75]'

  return (
    <div ref={containerRef} className={`${positionClass} select-none font-sans`}>
      {/* Horizontal Opening Capsule Tray */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="flex items-center gap-1.5 p-1 rounded-full bg-[#0c101a]/85 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
      >
        {/* Main Trigger Pill: Shows Current OS and expand chevron */}
        <motion.button
          onClick={toggleDrawer}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-white transition-colors cursor-pointer group"
          title="Switch Operating System"
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <ActiveTriggerIcon className="w-4 h-4 text-white drop-shadow" />
          </div>

          <motion.div
            animate={{ rotate: isDrawerOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-white/60 group-hover:text-white"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </motion.div>
        </motion.button>

        {/* Small Horizontal Opening Tray with the OS Icons */}
        <AnimatePresence>
          {isDrawerOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0, x: -10 }}
              animate={{ width: 'auto', opacity: 1, x: 0 }}
              exit={{ width: 0, opacity: 0, x: -10 }}
              transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              className="flex items-center gap-1.5 overflow-hidden pr-1"
            >
              {OS_ICONS.map((os) => {
                const Icon = os.icon
                const isActive = currentOS === os.id

                return (
                  <div key={os.id} className="relative flex flex-col items-center">
                    <motion.button
                      onClick={() => handleSelectOS(os.id)}
                      onMouseEnter={() => setHoveredOS(os.id)}
                      onMouseLeave={() => setHoveredOS(null)}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.92 }}
                      className={`relative w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-200 cursor-pointer ${
                        isActive
                          ? os.activeBorder
                          : `border-transparent bg-white/5 ${os.hoverBg}`
                      }`}
                      title={os.name}
                    >
                      <Icon className="w-4 h-4" />

                      {/* Small Active Dot */}
                      {isActive && (
                        <div className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-white shadow-[0_0_4px_white]" />
                      )}
                    </motion.button>

                    {/* Tiny Floating Tooltip above icon on hover */}
                    <AnimatePresence>
                      {hoveredOS === os.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 4, scale: 0.85 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 2, scale: 0.85 }}
                          transition={{ duration: 0.15 }}
                          className="absolute -top-7 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-semibold text-white whitespace-nowrap shadow-lg border border-white/10 pointer-events-none z-30"
                        >
                          {os.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}

              {/* Close Button */}
              <button
                onClick={closeDrawer}
                className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white/15 text-slate-400 hover:text-white transition-colors ml-0.5"
                title="Close Tray"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
