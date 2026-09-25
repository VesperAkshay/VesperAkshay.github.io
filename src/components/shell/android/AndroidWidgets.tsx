import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useWindowStore } from '../../../store/windowStore'
import { DOCK_APPS } from '../Dock'
import { OSAppIcon } from '../OSAppIcon'
import { getOSAppMeta } from '../../../data/osApps'
import { Mic, Camera, Sun } from 'lucide-react'

export const AndroidWidgets: React.FC = () => {
  const open = useWindowStore((state) => state.open)
  const [timeStr, setTimeStr] = useState('')
  const [dateStr, setDateStr] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTimeStr(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      )
      setDateStr(
        now.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'short',
          day: 'numeric',
        })
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="absolute inset-0 pt-8 pb-10 flex flex-col justify-between items-center pointer-events-none z-10 px-4">
      {/* Top Section: At a Glance & Clock */}
      <div className="flex flex-col items-center gap-3 w-full max-w-xl pointer-events-auto">
        {/* At a Glance */}
        <div
          onClick={() => open('safari')}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white text-xs font-medium cursor-pointer hover:bg-black/40 transition-colors shadow-lg"
        >
          <Sun className="w-3.5 h-3.5 text-amber-400" />
          <span>{dateStr}</span>
          <span className="opacity-40">•</span>
          <span>28°C Sunny</span>
        </div>

        {/* Big Material You Clock */}
        <div className="flex flex-col items-center select-none py-2">
          <span className="text-6xl sm:text-7xl font-light tracking-tighter text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] font-mono">
            {timeStr}
          </span>
          <span className="text-xs text-white/80 tracking-widest uppercase font-medium mt-1">
            Akshay Patel • Android Edition
          </span>
        </div>

        {/* Android Material Search Pill */}
        <div className="w-full max-w-md bg-white/20 dark:bg-black/40 backdrop-blur-2xl border border-white/20 rounded-full px-4 py-2.5 flex items-center justify-between shadow-xl mt-1">
          <div className="flex items-center gap-2.5 flex-1 mr-2">
            <span className="text-base font-bold text-sky-400">G</span>
            <input
              type="text"
              placeholder="Search portfolio, apps, contact..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-xs text-white placeholder-white/60 focus:outline-none w-full"
            />
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <Mic className="w-3.5 h-3.5 cursor-pointer hover:text-white" />
            <Camera className="w-3.5 h-3.5 cursor-pointer hover:text-white" />
          </div>
        </div>
      </div>

      {/* Center Apps Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-4 sm:gap-6 my-auto pointer-events-auto max-w-lg w-full px-2">
        {DOCK_APPS.filter((app) =>
          !search || app.name.toLowerCase().includes(search.toLowerCase())
        ).map((app) => {
          const meta = getOSAppMeta(app.id, 'android')
          return (
            <motion.button
              key={app.id}
              onClick={() => open(app.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              className="flex flex-col items-center gap-1.5 p-1 group"
            >
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 p-2.5 flex items-center justify-center shadow-lg group-hover:bg-white/20 group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)] transition-all">
                <OSAppIcon id={app.id} os="android" className="w-8 h-8 object-contain drop-shadow" />
              </div>
              <span className="text-[11px] font-medium text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] truncate max-w-[70px] text-center">
                {meta.name}
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* Bottom Gesture Bar */}
      <div className="pointer-events-auto flex flex-col items-center gap-2">
        {/* Navigation gesture pill */}
        <div
          onClick={() => useWindowStore.getState().cascadeWindows()}
          className="w-32 h-1 bg-white/70 hover:bg-white rounded-full cursor-pointer transition-colors shadow"
          title="Home / Overview"
        />
      </div>
    </div>
  )
}
