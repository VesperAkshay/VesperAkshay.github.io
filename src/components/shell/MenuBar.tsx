import React, { useState, useEffect } from 'react'
import {
  Wifi,
  Battery,
  Search,
  SlidersHorizontal,
  Sun,
  Moon,
  Maximize,
  Minimize,
  Check,
  Download,
  ExternalLink,
  Copy,
  Sparkles,
  HelpCircle,
  Keyboard,
  X,
  Mail,
  RotateCcw,
} from 'lucide-react'
import { useWindowStore } from '../../store/windowStore'
import { profile } from '../../data/profile'

interface MenuBarProps {
  activeAppName?: string
  theme?: 'light' | 'dark'
  onToggleTheme?: () => void
  onOpenAboutMac?: () => void
  onToggleFullscreen?: () => void
}

type MenuKey = 'apple' | 'file' | 'edit' | 'view' | 'go' | 'window' | 'help' | null

export const MenuBar: React.FC<MenuBarProps> = ({
  activeAppName = 'Finder',
  theme = 'dark',
  onToggleTheme,
  onOpenAboutMac,
  onToggleFullscreen,
}) => {
  const [timeStr, setTimeStr] = useState('')
  const [activeMenu, setActiveMenu] = useState<MenuKey>(null)
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState(false)
  const [isTourModalOpen, setIsTourModalOpen] = useState(false)

  // Window store hooks
  const windows = useWindowStore((state) => state.windows)
  const focusedId = useWindowStore((state) => state.focusedId)
  const openWindow = useWindowStore((state) => state.open)
  const closeWindow = useWindowStore((state) => state.close)
  const closeAll = useWindowStore((state) => state.closeAll)
  const minimizeWindow = useWindowStore((state) => state.minimize)
  const restoreAll = useWindowStore((state) => state.restoreAll)
  const toggleMaximize = useWindowStore((state) => state.toggleMaximize)
  const centerWindow = useWindowStore((state) => state.centerWindow)
  const cascadeWindows = useWindowStore((state) => state.cascadeWindows)
  const focusWindow = useWindowStore((state) => state.focus)

  // Real-time macOS Clock
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

  // Fullscreen tracking
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFsChange)
    return () => document.removeEventListener('fullscreenchange', handleFsChange)
  }, [])

  // Close menus on outside click or Escape
  useEffect(() => {
    const handleGlobalClick = () => {
      setActiveMenu(null)
      setIsControlCenterOpen(false)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null)
        setIsControlCenterOpen(false)
        setIsShortcutsModalOpen(false)
        setIsTourModalOpen(false)
      }
    }

    window.addEventListener('click', handleGlobalClick)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('click', handleGlobalClick)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Toast Helper
  const showToast = (message: string) => {
    setToastMessage(message)
    setTimeout(() => {
      setToastMessage(null)
    }, 2800)
  }

  // Fullscreen Toggle
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

  // Copy helpers
  const handleCopyUrl = () => {
    const url = typeof window !== 'undefined' ? window.location.href : 'https://akshaypatel.me'
    navigator.clipboard.writeText(url).then(() => {
      showToast('Copied portfolio URL to clipboard! 📋')
    })
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email).then(() => {
      showToast(`Copied ${profile.email} to clipboard! ✉️`)
    })
  }

  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = profile.resumePath
    link.download = 'Akshay_Patel_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    showToast('Downloading Akshay Patel Resume (PDF)... 📄')
  }

  // Hover menu switching (smooth macOS behavior)
  const handleMenuHover = (key: MenuKey) => {
    if (activeMenu !== null && activeMenu !== key) {
      setActiveMenu(key)
    }
  }

  const toggleMenu = (key: MenuKey, e: React.MouseEvent) => {
    e.stopPropagation()
    setIsControlCenterOpen(false)
    setActiveMenu((prev) => (prev === key ? null : key))
  }

  // List of all open windows
  const openWindowsList = Object.values(windows).filter((w) => w.isOpen && !w.isMinimized)

  return (
    <>
      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] px-4 py-2 rounded-xl bg-slate-900/95 text-white text-xs font-semibold shadow-2xl border border-white/20 backdrop-blur-xl animate-in fade-in slide-in-from-top-3 duration-200 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Menu Bar */}
      <header className="relative z-50 w-full h-7 px-3 flex items-center justify-between text-xs font-medium text-white/90 bg-black/35 backdrop-blur-2xl border-b border-white/10 select-none">
        {/* Left Side: Apple Icon, App Name & Dropdowns */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* 1. Apple Logo Menu */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={(e) => toggleMenu('apple', e)}
              onMouseEnter={() => handleMenuHover('apple')}
              className={`px-2 py-0.5 rounded flex items-center justify-center transition-colors ${
                activeMenu === 'apple' ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
              title="Apple Menu"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
              </svg>
            </button>

            {/* Apple Dropdown */}
            {activeMenu === 'apple' && (
              <div className="absolute top-7 left-0 w-56 py-1.5 rounded-xl bg-slate-900/90 dark:bg-[#1a1b22]/90 backdrop-blur-2xl border border-white/15 text-white/90 shadow-2xl text-xs flex flex-col z-50 animate-in fade-in zoom-in-95 duration-75">
                <button
                  onClick={() => {
                    setActiveMenu(null)
                    onOpenAboutMac?.()
                  }}
                  className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors"
                >
                  About This Mac
                </button>
                <button
                  onClick={() => {
                    setActiveMenu(null)
                    openWindow('wallpapers')
                  }}
                  className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors"
                >
                  System Settings...
                </button>
                <button
                  onClick={() => {
                    setActiveMenu(null)
                    openWindow('game2048')
                  }}
                  className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors"
                >
                  App Store (2048 Arcade)...
                </button>

                <div className="h-[1px] bg-white/10 my-1 mx-2" />

                <button
                  onClick={() => {
                    setActiveMenu(null)
                    handleFsToggle()
                  }}
                  className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>{isFullscreen ? 'Exit Full Screen' : 'Enter Full Screen'}</span>
                  <span className="text-[10px] text-white/50 font-mono">⌃⌘F</span>
                </button>

                <div className="h-[1px] bg-white/10 my-1 mx-2" />

                <button
                  onClick={() => {
                    window.location.reload()
                  }}
                  className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restart Session...</span>
                </button>
              </div>
            )}
          </div>

          {/* Focused App Name */}
          <span className="font-bold text-white tracking-wide px-1.5 hidden sm:inline">
            {activeAppName}
          </span>

          {/* 2. File Menu */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={(e) => toggleMenu('file', e)}
              onMouseEnter={() => handleMenuHover('file')}
              className={`px-2 py-0.5 rounded transition-colors ${
                activeMenu === 'file' ? 'bg-white/20 text-white' : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              File
            </button>

            {activeMenu === 'file' && (
              <div className="absolute top-7 left-0 w-60 py-1.5 rounded-xl bg-slate-900/90 dark:bg-[#1a1b22]/90 backdrop-blur-2xl border border-white/15 text-white/90 shadow-2xl text-xs flex flex-col z-50 animate-in fade-in zoom-in-95 duration-75">
                <button
                  onClick={() => {
                    setActiveMenu(null)
                    openWindow('finder')
                  }}
                  className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>New Finder Window</span>
                  <span className="text-[10px] text-white/50 font-mono">⌘N</span>
                </button>
                <button
                  onClick={() => {
                    setActiveMenu(null)
                    openWindow('terminal')
                  }}
                  className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>New Terminal Window</span>
                  <span className="text-[10px] text-white/50 font-mono">⌘T</span>
                </button>
                <button
                  onClick={() => {
                    setActiveMenu(null)
                    openWindow('preview')
                  }}
                  className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>Open Resume (PDF)...</span>
                  <span className="text-[10px] text-white/50 font-mono">⌘O</span>
                </button>
                <button
                  onClick={() => {
                    setActiveMenu(null)
                    handleDownloadResume()
                  }}
                  className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <Download className="w-3 h-3 text-blue-400" /> Download Resume
                  </span>
                  <span className="text-[10px] text-white/50 font-mono">⌥⌘S</span>
                </button>

                <div className="h-[1px] bg-white/10 my-1 mx-2" />

                <button
                  onClick={() => {
                    setActiveMenu(null)
                    handleCopyUrl()
                  }}
                  className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>Share Portfolio...</span>
                  <span className="text-[10px] text-white/50 font-mono">⌘S</span>
                </button>
                <button
                  onClick={() => {
                    setActiveMenu(null)
                    window.print()
                  }}
                  className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>Print Document...</span>
                  <span className="text-[10px] text-white/50 font-mono">⌘P</span>
                </button>

                <div className="h-[1px] bg-white/10 my-1 mx-2" />

                <button
                  onClick={() => {
                    setActiveMenu(null)
                    if (focusedId) closeWindow(focusedId)
                  }}
                  disabled={!focusedId}
                  className={`px-3.5 py-1 text-left rounded-md mx-1 flex items-center justify-between ${
                    focusedId
                      ? 'hover:bg-blue-600 hover:text-white transition-colors'
                      : 'opacity-40 cursor-not-allowed'
                  }`}
                >
                  <span>Close Window</span>
                  <span className="text-[10px] text-white/50 font-mono">⌘W</span>
                </button>
                <button
                  onClick={() => {
                    setActiveMenu(null)
                    closeAll()
                  }}
                  className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-between text-rose-300"
                >
                  <span>Close All Windows</span>
                  <span className="text-[10px] text-white/50 font-mono">⌥⌘W</span>
                </button>
              </div>
            )}
          </div>

          {/* 3. Edit Menu */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={(e) => toggleMenu('edit', e)}
              onMouseEnter={() => handleMenuHover('edit')}
              className={`px-2 py-0.5 rounded transition-colors ${
                activeMenu === 'edit' ? 'bg-white/20 text-white' : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Edit
            </button>

            {activeMenu === 'edit' && (
              <div className="absolute top-7 left-0 w-56 py-1.5 rounded-xl bg-slate-900/90 dark:bg-[#1a1b22]/90 backdrop-blur-2xl border border-white/15 text-white/90 shadow-2xl text-xs flex flex-col z-50 animate-in fade-in zoom-in-95 duration-75">
                <button
                  onClick={() => {
                    setActiveMenu(null)
                    handleCopyUrl()
                  }}
                  className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <Copy className="w-3 h-3 text-slate-300" /> Copy Portfolio URL
                  </span>
                  <span className="text-[10px] text-white/50 font-mono">⌘C</span>
                </button>
                <button
                  onClick={() => {
                    setActiveMenu(null)
                    handleCopyEmail()
                  }}
                  className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3 h-3 text-slate-300" /> Copy Email Address
                  </span>
                  <span className="text-[10px] text-white/50 font-mono">⌥⌘C</span>
                </button>

                <div className="h-[1px] bg-white/10 my-1 mx-2" />

                <button
                  onClick={() => {
                    setActiveMenu(null)
                    openWindow('finder')
                  }}
                  className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>Select All Projects</span>
                  <span className="text-[10px] text-white/50 font-mono">⌘A</span>
                </button>
                <button
                  onClick={() => {
                    setActiveMenu(null)
                    openWindow('game2048')
                  }}
                  className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-between text-amber-300"
                >
                  <span>Play 2048 Dev Game</span>
                  <span className="text-[10px] text-white/50 font-mono">⌘G</span>
                </button>
              </div>
            )}
          </div>

          {/* 4. View Menu */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={(e) => toggleMenu('view', e)}
              onMouseEnter={() => handleMenuHover('view')}
              className={`px-2 py-0.5 rounded transition-colors ${
                activeMenu === 'view' ? 'bg-white/20 text-white' : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              View
            </button>

            {activeMenu === 'view' && (
              <div className="absolute top-7 left-0 w-60 py-1.5 rounded-xl bg-slate-900/90 dark:bg-[#1a1b22]/90 backdrop-blur-2xl border border-white/15 text-white/90 shadow-2xl text-xs flex flex-col z-50 animate-in fade-in zoom-in-95 duration-75">
                {onToggleTheme && (
                  <button
                    onClick={() => {
                      setActiveMenu(null)
                      onToggleTheme()
                    }}
                    className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-between"
                  >
                    <span>{theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
                    <span className="text-[10px] text-white/50 font-mono">⌃⌘T</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    setActiveMenu(null)
                    handleFsToggle()
                  }}
                  className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>{isFullscreen ? 'Exit Full Screen' : 'Enter Full Screen'}</span>
                  <span className="text-[10px] text-white/50 font-mono">⌃⌘F</span>
                </button>
                <button
                  onClick={() => {
                    setActiveMenu(null)
                    openWindow('wallpapers')
                  }}
                  className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>Change Wallpaper...</span>
                  <span className="text-[10px] text-white/50 font-mono">⌥⌘B</span>
                </button>

                <div className="h-[1px] bg-white/10 my-1 mx-2" />

                <button
                  onClick={() => {
                    setActiveMenu(null)
                    if (focusedId) centerWindow(focusedId)
                  }}
                  disabled={!focusedId}
                  className={`px-3.5 py-1 text-left rounded-md mx-1 flex items-center justify-between ${
                    focusedId
                      ? 'hover:bg-blue-600 hover:text-white transition-colors'
                      : 'opacity-40 cursor-not-allowed'
                  }`}
                >
                  <span>Center Active Window</span>
                  <span className="text-[10px] text-white/50 font-mono">⌘R</span>
                </button>
                <button
                  onClick={() => {
                    setActiveMenu(null)
                    cascadeWindows()
                  }}
                  className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>Arrange in Cascade</span>
                  <span className="text-[10px] text-white/50 font-mono">⌥⌘R</span>
                </button>
              </div>
            )}
          </div>

          {/* 5. Go Menu */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={(e) => toggleMenu('go', e)}
              onMouseEnter={() => handleMenuHover('go')}
              className={`px-2 py-0.5 rounded transition-colors ${
                activeMenu === 'go' ? 'bg-white/20 text-white' : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Go
            </button>

            {activeMenu === 'go' && (
              <div className="absolute top-7 left-0 w-56 py-1.5 rounded-xl bg-slate-900/90 dark:bg-[#1a1b22]/90 backdrop-blur-2xl border border-white/15 text-white/90 shadow-2xl text-xs flex flex-col z-50 animate-in fade-in zoom-in-95 duration-75">
                <button
                  onClick={() => {
                    setActiveMenu(null)
                    openWindow('finder')
                  }}
                  className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>📁 Projects (Finder)</span>
                  <span className="text-[10px] text-white/50 font-mono">⌘1</span>
                </button>
                <button
                  onClick={() => {
                    setActiveMenu(null)
                    openWindow('about')
                  }}
                  className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>📝 About Akshay (Notes)</span>
                  <span className="text-[10px] text-white/50 font-mono">⌘2</span>
                </button>
                <button
                  onClick={() => {
                    setActiveMenu(null)
                    openWindow('terminal')
                  }}
                  className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>💻 Terminal (zsh)</span>
                  <span className="text-[10px] text-white/50 font-mono">⌘3</span>
                </button>
                <button
                  onClick={() => {
                    setActiveMenu(null)
                    openWindow('preview')
                  }}
                  className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>📄 Resume (Preview)</span>
                  <span className="text-[10px] text-white/50 font-mono">⌘4</span>
                </button>
                <button
                  onClick={() => {
                    setActiveMenu(null)
                    openWindow('wallpapers')
                  }}
                  className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>🖼️ Wallpapers Gallery</span>
                  <span className="text-[10px] text-white/50 font-mono">⌘5</span>
                </button>
                <button
                  onClick={() => {
                    setActiveMenu(null)
                    openWindow('game2048')
                  }}
                  className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>🎮 2048 Dev Evolution</span>
                  <span className="text-[10px] text-white/50 font-mono">⌘6</span>
                </button>
                <button
                  onClick={() => {
                    setActiveMenu(null)
                    openWindow('contact')
                  }}
                  className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>✉️ Contact Akshay (Mail)</span>
                  <span className="text-[10px] text-white/50 font-mono">⌘7</span>
                </button>

                <div className="h-[1px] bg-white/10 my-1 mx-2" />

                {profile.socials.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveMenu(null)
                      window.open(s.url, '_blank', 'noopener,noreferrer')
                    }}
                    className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-between"
                  >
                    <span>{s.label} Profile</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 6. Window Menu */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={(e) => toggleMenu('window', e)}
              onMouseEnter={() => handleMenuHover('window')}
              className={`px-2 py-0.5 rounded transition-colors ${
                activeMenu === 'window' ? 'bg-white/20 text-white' : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Window
            </button>

            {activeMenu === 'window' && (
              <div className="absolute top-7 left-0 w-56 py-1.5 rounded-xl bg-slate-900/90 dark:bg-[#1a1b22]/90 backdrop-blur-2xl border border-white/15 text-white/90 shadow-2xl text-xs flex flex-col z-50 animate-in fade-in zoom-in-95 duration-75">
                <button
                  onClick={() => {
                    setActiveMenu(null)
                    if (focusedId) minimizeWindow(focusedId)
                  }}
                  disabled={!focusedId}
                  className={`px-3.5 py-1 text-left rounded-md mx-1 flex items-center justify-between ${
                    focusedId
                      ? 'hover:bg-blue-600 hover:text-white transition-colors'
                      : 'opacity-40 cursor-not-allowed'
                  }`}
                >
                  <span>Minimize</span>
                  <span className="text-[10px] text-white/50 font-mono">⌘M</span>
                </button>
                <button
                  onClick={() => {
                    setActiveMenu(null)
                    if (focusedId) toggleMaximize(focusedId)
                  }}
                  disabled={!focusedId}
                  className={`px-3.5 py-1 text-left rounded-md mx-1 flex items-center justify-between ${
                    focusedId
                      ? 'hover:bg-blue-600 hover:text-white transition-colors'
                      : 'opacity-40 cursor-not-allowed'
                  }`}
                >
                  <span>Zoom / Maximize</span>
                  <span className="text-[10px] text-white/50 font-mono">^⌘Z</span>
                </button>

                <div className="h-[1px] bg-white/10 my-1 mx-2" />

                <button
                  onClick={() => {
                    setActiveMenu(null)
                    restoreAll()
                  }}
                  className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors"
                >
                  Bring All to Front
                </button>
                <button
                  onClick={() => {
                    setActiveMenu(null)
                    cascadeWindows()
                  }}
                  className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors"
                >
                  Arrange in Cascade
                </button>
                <button
                  onClick={() => {
                    setActiveMenu(null)
                    closeAll()
                  }}
                  className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors text-rose-300"
                >
                  Close All Windows
                </button>

                {openWindowsList.length > 0 && (
                  <>
                    <div className="h-[1px] bg-white/10 my-1 mx-2" />
                    <div className="px-3 py-0.5 text-[9px] font-bold text-white/40 uppercase tracking-wider">
                      Open Windows
                    </div>
                    {openWindowsList.map((win) => {
                      const isFocused = focusedId === win.id
                      return (
                        <button
                          key={win.id}
                          onClick={() => {
                            setActiveMenu(null)
                            focusWindow(win.id)
                          }}
                          className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-between"
                        >
                          <span className="truncate max-w-[140px] capitalize">{win.id}</span>
                          {isFocused && <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
                        </button>
                      )
                    })}
                  </>
                )}
              </div>
            )}
          </div>

          {/* 7. Help Menu */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={(e) => toggleMenu('help', e)}
              onMouseEnter={() => handleMenuHover('help')}
              className={`px-2 py-0.5 rounded transition-colors ${
                activeMenu === 'help' ? 'bg-white/20 text-white' : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Help
            </button>

            {activeMenu === 'help' && (
              <div className="absolute top-7 left-0 w-60 py-1.5 rounded-xl bg-slate-900/90 dark:bg-[#1a1b22]/90 backdrop-blur-2xl border border-white/15 text-white/90 shadow-2xl text-xs flex flex-col z-50 animate-in fade-in zoom-in-95 duration-75">
                <button
                  onClick={() => {
                    setActiveMenu(null)
                    setIsTourModalOpen(true)
                  }}
                  className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <HelpCircle className="w-3 h-3 text-blue-400" /> macOS Portfolio Tour
                  </span>
                  <span className="text-[10px] text-white/50 font-mono">⌘?</span>
                </button>
                <button
                  onClick={() => {
                    setActiveMenu(null)
                    setIsShortcutsModalOpen(true)
                  }}
                  className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <Keyboard className="w-3 h-3 text-amber-400" /> Keyboard Shortcuts
                  </span>
                  <span className="text-[10px] text-white/50 font-mono">⇧⌘?</span>
                </button>
                <button
                  onClick={() => {
                    setActiveMenu(null)
                    onOpenAboutMac?.()
                  }}
                  className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors"
                >
                  About This Portfolio...
                </button>

                <div className="h-[1px] bg-white/10 my-1 mx-2" />

                <button
                  onClick={() => {
                    setActiveMenu(null)
                    openWindow('contact')
                  }}
                  className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors flex items-center gap-1.5 text-emerald-400"
                >
                  <Mail className="w-3 h-3" />
                  <span>Send Feedback / Hire Akshay</span>
                </button>
                <button
                  onClick={() => {
                    setActiveMenu(null)
                    window.open('https://github.com/VesperAkshay/VesperAkshay.github.io/issues', '_blank')
                  }}
                  className="px-3.5 py-1 text-left rounded-md mx-1 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>Report an Issue on GitHub</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Status Icons, Fullscreen, Theme, Clock */}
        <div className="flex items-center gap-2.5 text-white/85">
          {/* Full Screen Toggle */}
          <button
            onClick={handleFsToggle}
            className="p-1 hover:bg-white/10 rounded transition-colors focus:outline-none"
            title={isFullscreen ? 'Exit Full Screen' : 'Toggle Full Screen'}
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

          {/* Spotlight Search Icon */}
          <div title="Spotlight" className="hidden sm:block">
            <Search className="w-3.5 h-3.5" />
          </div>

          {/* Control Center Toggle */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => {
                setIsControlCenterOpen((prev) => !prev)
                setActiveMenu(null)
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
              <div className="absolute top-8 right-0 w-64 p-3 rounded-2xl bg-slate-900/90 dark:bg-[#1a1b22]/90 backdrop-blur-2xl border border-white/15 text-white shadow-2xl z-50 flex flex-col gap-2.5 animate-in fade-in zoom-in-95 duration-100">
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

                {/* Display Brightness & Sound */}
                <div className="p-2.5 rounded-xl bg-white/10 space-y-2">
                  <div>
                    <div className="text-[10px] text-white/70 mb-1">Display Brightness</div>
                    <div className="w-full h-3 rounded-full bg-white/20 overflow-hidden p-0.5">
                      <div className="w-4/5 h-full rounded-full bg-white" />
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-white/70 mb-1">Sound Volume</div>
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

      {/* Keyboard Shortcuts Reference Modal */}
      {isShortcutsModalOpen && (
        <div
          className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsShortcutsModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-slate-900/95 text-white rounded-2xl shadow-2xl border border-white/20 p-5 overflow-hidden flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Keyboard className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold">macOS Keyboard Shortcuts</h3>
              </div>
              <button
                onClick={() => setIsShortcutsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-white/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-white/80">Close Focused Window</span>
                <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-[11px]">Escape / ⌘W</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-white/80">Minimize to Dock (Genie Effect)</span>
                <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-[11px]">⌘M</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-white/80">Open Finder (Projects)</span>
                <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-[11px]">⌘1 / ⌘N</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-white/80">Open Terminal (CLI)</span>
                <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-[11px]">⌘3 / ⌘T</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-white/80">Open Resume Viewer</span>
                <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-[11px]">⌘4 / ⌘O</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-white/80">2048 Game Controls</span>
                <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-[11px]">Arrow Keys / WASD</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-white/80">Toggle Full Screen</span>
                <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-[11px]">⌃⌘F</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-white/80">Toggle Light / Dark Mode</span>
                <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-[11px]">⌃⌘T</span>
              </div>
            </div>

            <button
              onClick={() => setIsShortcutsModalOpen(false)}
              className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold text-xs text-white shadow-md transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Portfolio Tour Modal */}
      {isTourModalOpen && (
        <div
          className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsTourModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-slate-900/95 text-white rounded-2xl shadow-2xl border border-white/20 p-5 overflow-hidden flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold">Welcome to Akshay's Portfolio</h3>
              </div>
              <button
                onClick={() => setIsTourModalOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-white/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="font-bold text-blue-400 mb-0.5">📁 Finder & Projects</div>
                <p className="text-white/70">
                  Explore full-stack applications, AI pipelines, and live deployments with source links.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="font-bold text-amber-400 mb-0.5">🎮 2048: Dev Evolution</div>
                <p className="text-white/70">
                  Merge matching technologies to climb from HTML to Tech Lead with Git power-ups and sound FX.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="font-bold text-emerald-400 mb-0.5">🖼️ 4K Wallpapers Gallery</div>
                <p className="text-white/70">
                  Choose from F1 Racing, Flowers, Clouds, and macOS themes with instant local switching.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="font-bold text-purple-400 mb-0.5">🖥️ macOS Window Management</div>
                <p className="text-white/70">
                  Drag, resize, minimize (vacuum Genie effect), maximize, and cascade windows fluidly.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsTourModalOpen(false)}
              className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold text-xs text-white shadow-md transition-colors"
            >
              Start Exploring
            </button>
          </div>
        </div>
      )}
    </>
  )
}
