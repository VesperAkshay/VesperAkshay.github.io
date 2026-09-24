import React, { useState, useEffect } from 'react'
import { Wifi, Battery, Search, SlidersHorizontal, Sun, Moon, Maximize, Minimize } from 'lucide-react'
import { useWindowStore } from '../../store/windowStore'

interface MenuBarProps {
  activeAppName?: string
  theme?: 'light' | 'dark'
  onToggleTheme?: () => void
  onOpenAboutMac?: () => void
  onToggleFullscreen?: () => void
}

export const MenuBar: React.FC<MenuBarProps> = ({
  activeAppName = 'Finder',
  theme = 'dark',
  onToggleTheme,
  onOpenAboutMac,
  onToggleFullscreen,
}) => {
  const [timeStr, setTimeStr] = useState('')
  const [isAppleMenuOpen, setIsAppleMenuOpen] = useState(false)
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const openWindow = useWindowStore((state) => state.open)

  // Live real-time clock updating every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formatted = now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      })
      const timeFormatted = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      })
      setTimeStr(`${formatted} ${timeFormatted}`)
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Track fullscreen changes
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFsChange)
    return () => document.removeEventListener('fullscreenchange', handleFsChange)
  }, [])

  // Close menus on outside click
  useEffect(() => {
    const handleWindowClick = () => {
      setIsAppleMenuOpen(false)
      setIsControlCenterOpen(false)
    }
    window.addEventListener('click', handleWindowClick)
    return () => window.removeEventListener('click', handleWindowClick)
  }, [])

  const handleFsToggle = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {})
      setIsFullscreen(true)
    } else {
      document.exitFullscreen?.().catch(() => {})
      setIsFullscreen(false)
    }
    onToggleFullscreen?.()
  }

  return (
    <header className="relative z-50 w-full h-7 px-3 flex items-center justify-between text-xs font-medium text-white/90 bg-black/35 backdrop-blur-2xl border-b border-white/10 select-none">
      {/* Left Menu Items */}
      <div className="flex items-center gap-3.5">
        {/* Apple Logo Menu */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => {
              setIsAppleMenuOpen((prev) => !prev)
              setIsControlCenterOpen(false)
            }}
            className={`p-1 rounded flex items-center justify-center transition-colors ${
              isAppleMenuOpen ? 'bg-white/20' : 'hover:bg-white/10'
            }`}
            title="Apple Menu"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.66-7.74-11.89-14.1-6.19-9.35-10.99-20.08-14.42-32.18-3.43-12.11-5.14-23.3-5.14-33.57 0-14.78 3.8-27.17 11.41-37.16 7.61-9.99 17.18-15.09 28.72-15.31 4.58 0 9.8 1.16 15.66 3.47 5.86 2.32 9.8 3.51 11.83 3.59 1.7 0 5.66-1.22 11.89-3.67 6.23-2.45 11.46-3.56 15.68-3.32 11.05.65 20.14 4.89 27.28 12.72-9.8 5.88-14.59 14.23-14.39 25.04.22 8.37 3.37 15.22 9.46 20.55 6.09 5.33 13.37 8.37 21.84 9.13-2.28 7.07-5.06 14.13-8.33 21.18zm-26.43-114.7c0 7.07-2.61 13.6-7.83 18.6-5.22 5-11.75 8.16-19.59 7.48-.11-1.09-.16-2.07-.16-2.94 0-6.96 2.83-13.6 8.5-18.92 5.67-5.33 12.29-8.49 19.86-8.49.22 1.41.22 2.83.22 4.27z"/>
            </svg>
          </button>

          {/* Apple Dropdown */}
          {isAppleMenuOpen && (
            <div className="absolute top-8 left-0 w-52 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-2xl border border-white/15 text-white/90 shadow-2xl text-xs flex flex-col z-50 animate-in fade-in zoom-in-95 duration-100">
              <button
                onClick={() => {
                  setIsAppleMenuOpen(false)
                  onOpenAboutMac?.()
                }}
                className="px-3.5 py-1 text-left hover:bg-blue-600 hover:text-white transition-colors"
              >
                About This Mac
              </button>
              <button
                onClick={() => {
                  setIsAppleMenuOpen(false)
                  openWindow('wallpapers')
                }}
                className="px-3.5 py-1 text-left hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-between"
              >
                <span>Change Wallpaper...</span>
              </button>
              <div className="h-[1px] bg-white/10 my-1" />
              <button
                onClick={handleFsToggle}
                className="px-3.5 py-1 text-left hover:bg-blue-600 hover:text-white transition-colors"
              >
                {isFullscreen ? 'Exit Full Screen' : 'Enter Full Screen'}
              </button>
              <div className="h-[1px] bg-white/10 my-1" />
              <button
                onClick={() => {
                  window.location.reload()
                }}
                className="px-3.5 py-1 text-left hover:bg-blue-600 hover:text-white transition-colors"
              >
                Restart...
              </button>
              <button
                onClick={() => {
                  setIsAppleMenuOpen(false)
                }}
                className="px-3.5 py-1 text-left hover:bg-blue-600 hover:text-white transition-colors"
              >
                Lock Screen
              </button>
            </div>
          )}
        </div>

        {/* Focused App Name */}
        <span className="font-semibold text-white tracking-wide">{activeAppName}</span>

        {/* Standard Menu Items */}
        <nav className="hidden sm:flex items-center gap-3.5 text-white/80">
          <span className="hover:text-white cursor-default transition-colors">File</span>
          <span className="hover:text-white cursor-default transition-colors">Edit</span>
          <span className="hover:text-white cursor-default transition-colors">View</span>
          <span className="hover:text-white cursor-default transition-colors">Go</span>
          <span className="hover:text-white cursor-default transition-colors">Window</span>
          <span className="hover:text-white cursor-default transition-colors">Help</span>
        </nav>
      </div>

      {/* Right Status Items */}
      <div className="flex items-center gap-2.5 text-white/85">
        {/* Full Screen Toggle */}
        <button
          onClick={handleFsToggle}
          className="p-1 hover:bg-white/10 rounded transition-colors focus:outline-none"
          title={isFullscreen ? 'Exit Full Screen' : 'Toggle Browser Full Screen'}
        >
          {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
        </button>

        {/* Theme Toggle Button */}
        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            className="p-1 hover:bg-white/10 rounded transition-colors focus:outline-none"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-blue-200" />}
          </button>
        )}

        {/* Battery */}
        <div className="flex items-center gap-1" title="Battery: 100%">
          <span className="text-[11px] hidden sm:inline opacity-80 font-mono">100%</span>
          <Battery className="w-4 h-4 text-emerald-400" />
        </div>

        {/* Wifi */}
        <div title="Wi-Fi: Connected">
          <Wifi className="w-3.5 h-3.5" />
        </div>

        {/* Spotlight Search */}
        <div title="Spotlight" className="hidden sm:block">
          <Search className="w-3.5 h-3.5" />
        </div>

        {/* Control Center Toggle */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => {
              setIsControlCenterOpen((prev) => !prev)
              setIsAppleMenuOpen(false)
            }}
            className={`p-1 rounded transition-colors ${
              isControlCenterOpen ? 'bg-white/20' : 'hover:bg-white/10'
            }`}
            title="Control Center"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>

          {/* Control Center Dropdown */}
          {isControlCenterOpen && (
            <div className="absolute top-8 right-0 w-64 p-3 rounded-2xl bg-slate-900/90 backdrop-blur-2xl border border-white/15 text-white shadow-2xl z-50 flex flex-col gap-2.5 animate-in fade-in zoom-in-95 duration-100">
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-xl bg-white/10 flex items-center gap-2.5">
                  <div className="p-1.5 rounded-full bg-blue-600 text-white">
                    <Wifi className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold">Wi-Fi</div>
                    <div className="text-[10px] text-white/60">Connected</div>
                  </div>
                </div>

                <div
                  onClick={onToggleTheme}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 cursor-pointer transition-colors flex items-center gap-2.5"
                >
                  <div className="p-1.5 rounded-full bg-blue-600 text-white">
                    {theme === 'dark' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold">Display</div>
                    <div className="text-[10px] text-white/60">{theme === 'dark' ? 'Dark' : 'Light'}</div>
                  </div>
                </div>
              </div>

              {/* Sound & Brightness Sliders */}
              <div className="p-2.5 rounded-xl bg-white/10 space-y-2">
                <div>
                  <div className="text-[10px] text-white/70 mb-1">Display Brightness</div>
                  <div className="w-full h-3 rounded-full bg-white/20 overflow-hidden p-0.5">
                    <div className="w-4/5 h-full rounded-full bg-white" />
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-white/70 mb-1">Volume</div>
                  <div className="w-full h-3 rounded-full bg-white/20 overflow-hidden p-0.5">
                    <div className="w-3/5 h-full rounded-full bg-white" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Live Clock */}
        <div className="text-[11px] font-medium tracking-tight pl-1 whitespace-nowrap">
          {timeStr || 'Wed Sep 24 4:45 PM'}
        </div>
      </div>
    </header>
  )
}
