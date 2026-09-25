import React, { useState, useEffect } from 'react'
import { WindowsLogo } from '../OSSwitcherDrawer'
import { useOSStore } from '../../../store/osStore'
import { useWindowStore } from '../../../store/windowStore'
import { DOCK_APPS } from '../Dock'
import { OSAppIcon } from '../OSAppIcon'
import { getOSAppMeta } from '../../../data/osApps'
import {
  Wifi,
  Volume2,
  Battery,
  Search,
  ChevronUp,
  Bell,
  Sun,
  Layers,
} from 'lucide-react'

export const WindowsTaskbar: React.FC = () => {
  const isStartMenuOpen = useOSStore((state) => state.isStartMenuOpen)
  const toggleStartMenu = useOSStore((state) => state.toggleStartMenu)
  const windows = useWindowStore((state) => state.windows)
  const focusedId = useWindowStore((state) => state.focusedId)
  const open = useWindowStore((state) => state.open)
  const minimize = useWindowStore((state) => state.minimize)
  const focus = useWindowStore((state) => state.focus)

  // Live Windows Time & Date
  const [timeStr, setTimeStr] = useState('')
  const [dateStr, setDateStr] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTimeStr(
        now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
      )
      setDateStr(
        now.toLocaleDateString([], {
          month: 'numeric',
          day: 'numeric',
          year: 'numeric',
        })
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleAppClick = (id: string) => {
    const win = windows[id]
    if (win?.isOpen && !win.isMinimized && focusedId === id) {
      minimize(id)
    } else if (win?.isOpen && win.isMinimized) {
      open(id)
    } else if (win?.isOpen) {
      focus(id)
    } else {
      open(id)
    }
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-12 bg-[#141a29]/80 dark:bg-[#0c101a]/85 backdrop-blur-2xl border-t border-white/10 z-[65] flex items-center justify-between px-2 select-none font-sans">
      {/* Left side: Weather / News Widget Pill (Windows 11 style) */}
      <div className="flex items-center gap-2 pl-2 w-48 shrink-0">
        <button
          onClick={() => open('safari')}
          className="flex items-center gap-2 px-2.5 py-1 rounded-md hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          title="Windows Widgets"
        >
          <Sun className="w-4 h-4 text-amber-400" />
          <div className="flex flex-col text-left leading-tight">
            <span className="text-[11px] font-semibold">27°C</span>
            <span className="text-[9px] text-slate-400">Sunny • Bengaluru</span>
          </div>
        </button>
      </div>

      {/* Centered Windows 11 App Cluster */}
      <div className="flex items-center gap-1">
        {/* Windows Start Button */}
        <button
          data-start-button
          onClick={toggleStartMenu}
          className={`relative p-2 rounded-md transition-all duration-200 flex items-center justify-center ${
            isStartMenuOpen
              ? 'bg-white/20 shadow-inner'
              : 'hover:bg-white/10 active:scale-95'
          }`}
          title="Start"
        >
          <WindowsLogo className="w-5 h-5 text-sky-400 drop-shadow" />
        </button>

        {/* Windows Search Icon */}
        <button
          onClick={toggleStartMenu}
          className="p-2 rounded-md hover:bg-white/10 text-slate-300 hover:text-white transition-all hidden sm:flex items-center justify-center"
          title="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Windows Task View */}
        <button
          onClick={() => useWindowStore.getState().cascadeWindows()}
          className="p-2 rounded-md hover:bg-white/10 text-slate-300 hover:text-white transition-all hidden sm:flex items-center justify-center"
          title="Task View (Arrange Windows)"
        >
          <Layers className="w-4 h-4" />
        </button>

        {/* App Icons */}
        {DOCK_APPS.map((app) => {
          const win = windows[app.id]
          const isOpen = win?.isOpen ?? false
          const isFocused = isOpen && !win.isMinimized && focusedId === app.id

          const meta = getOSAppMeta(app.id, 'windows')

          return (
            <button
              key={app.id}
              onClick={() => handleAppClick(app.id)}
              className={`relative p-2 rounded-md transition-all flex items-center justify-center group ${
                isFocused
                  ? 'bg-white/15'
                  : isOpen
                  ? 'hover:bg-white/10'
                  : 'hover:bg-white/5 active:scale-95'
              }`}
              title={meta.name}
            >
              <OSAppIcon
                id={app.id}
                os="windows"
                className="w-6 h-6 object-contain group-hover:scale-110 transition-transform drop-shadow"
              />

              {/* Running Pill Indicator (Under Icon) */}
              {isOpen && (
                <div
                  className={`absolute bottom-0.5 rounded-full transition-all ${
                    isFocused
                      ? 'w-4 h-1 bg-sky-400 shadow-[0_0_8px_#38bdf8]'
                      : 'w-1.5 h-1 bg-slate-400'
                  }`}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Right side: System Tray & Clock */}
      <div className="flex items-center gap-1 pr-1 w-48 justify-end shrink-0 text-slate-300">
        {/* Chevron overflow */}
        <button
          className="p-1.5 hover:bg-white/10 rounded text-slate-400 hover:text-white"
          title="Show hidden icons"
        >
          <ChevronUp className="w-3.5 h-3.5" />
        </button>

        {/* Quick status icons group */}
        <div className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white/10 cursor-pointer">
          <Wifi className="w-3.5 h-3.5" />
          <Volume2 className="w-3.5 h-3.5" />
          <Battery className="w-3.5 h-3.5" />
        </div>

        {/* Time and Date */}
        <div className="flex flex-col items-end px-2 py-0.5 rounded hover:bg-white/10 cursor-pointer text-right leading-tight">
          <span className="text-[11px] font-medium text-white">{timeStr}</span>
          <span className="text-[10px] text-slate-400">{dateStr}</span>
        </div>

        {/* Notification Bell */}
        <button
          className="p-1.5 hover:bg-white/10 rounded relative text-slate-400 hover:text-white"
          title="Notifications"
        >
          <Bell className="w-3.5 h-3.5" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-sky-400 rounded-full" />
        </button>

        {/* Show Desktop Peek Strip (Far Right) */}
        <div
          onClick={() => {
            const wins = useWindowStore.getState().windows
            const anyOpen = Object.values(wins).some((w) => w.isOpen && !w.isMinimized)
            if (anyOpen) {
              Object.keys(wins).forEach((id) => useWindowStore.getState().minimize(id))
            } else {
              useWindowStore.getState().restoreAll()
            }
          }}
          className="w-1.5 h-8 border-l border-white/20 hover:bg-white/30 cursor-pointer ml-1 transition-colors"
          title="Show Desktop"
        />
      </div>
    </footer>
  )
}
