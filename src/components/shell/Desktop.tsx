import React, { useState } from 'react'
import { MenuBar } from './MenuBar'
import { Dock, DOCK_APPS } from './Dock'
import { useWindowStore } from '../../store/windowStore'
import { useWallpaperStore } from '../../store/wallpaperStore'
import { useOSStore } from '../../store/osStore'
import { AboutMacModal } from './AboutMacModal'
import { OSSwitcherDrawer } from './OSSwitcherDrawer'
import { WindowsTaskbar } from './windows/WindowsTaskbar'
import { WindowsStartMenu } from './windows/WindowsStartMenu'
import { UbuntuTopBar } from './linux/UbuntuTopBar'
import { UbuntuDash } from './linux/UbuntuDash'
import { AndroidStatusBar } from './android/AndroidStatusBar'
import { AndroidWidgets } from './android/AndroidWidgets'
import { OSAppIcon } from './OSAppIcon'
import { getOSAppMeta } from '../../data/osApps'

interface DesktopProps {
  children?: React.ReactNode
  theme?: 'light' | 'dark'
  onToggleTheme?: () => void
  onToggleFullscreen?: () => void
}

export const Desktop: React.FC<DesktopProps> = ({
  children,
  theme = 'dark',
  onToggleTheme,
  onToggleFullscreen,
}) => {
  const [isAboutMacOpen, setIsAboutMacOpen] = useState(false)
  const focusedId = useWindowStore((state) => state.focusedId)
  const open = useWindowStore((state) => state.open)
  const currentWallpaper = useWallpaperStore((state) => state.currentWallpaper)
  const currentOS = useOSStore((state) => state.currentOS)

  const activeApp = DOCK_APPS.find((app) => app.id === focusedId)
  const activeAppName = activeApp?.name || (currentOS === 'linux' ? 'Files' : 'Finder')

  return (
    <div className="relative w-screen h-[100dvh] min-h-[100dvh] overflow-hidden select-none bg-black flex flex-col font-sans">
      {/* Dynamic Background Wallpaper with Smooth Transitions */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out scale-[1.01]"
        style={{
          backgroundImage: `url('${currentWallpaper}')`,
        }}
      />

      {/* Ambient Lighting Layer */}
      <div className="absolute inset-0 bg-black/10 dark:bg-black/25 pointer-events-none" />

      {/* ========================================================
          macOS Sequoia Desktop Chrome
          ======================================================== */}
      {currentOS === 'macos' && (
        <>
          {/* Authentic MacBook Top Camera Notch */}
          <div className="hidden lg:flex absolute top-0 left-1/2 -translate-x-1/2 z-50 w-28 sm:w-32 h-[22px] bg-black rounded-b-xl items-center justify-center shadow-md pointer-events-none">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#0a1220] border border-[#1b2538] flex items-center justify-center shadow-inner">
                <div className="w-1 h-1 rounded-full bg-[#183358]" />
              </div>
              <div className="w-1 h-1 rounded-full bg-emerald-500/70 shadow-[0_0_4px_#10b981]" />
            </div>
          </div>

          {/* Top Menu Bar */}
          <MenuBar
            activeAppName={activeAppName}
            theme={theme}
            onToggleTheme={onToggleTheme}
            onOpenAboutMac={() => setIsAboutMacOpen(true)}
            onToggleFullscreen={onToggleFullscreen}
          />
        </>
      )}

      {/* ========================================================
          Ubuntu Linux Desktop Chrome
          ======================================================== */}
      {currentOS === 'linux' && (
        <>
          <UbuntuTopBar />
          <UbuntuDash />
        </>
      )}

      {/* ========================================================
          Android 15 Desktop Chrome
          ======================================================== */}
      {currentOS === 'android' && (
        <>
          <AndroidStatusBar />
          <AndroidWidgets />
        </>
      )}

      {/* Main Desktop Workspace Area */}
      <main
        className={`relative flex-1 w-full h-full overflow-hidden ${
          currentOS === 'linux' ? 'pl-[60px] pt-7' : currentOS === 'windows' ? 'pb-12' : ''
        }`}
      >
        {/* Desktop Shortcut Icons for macOS & Ubuntu */}
        {(currentOS === 'macos' || currentOS === 'linux') && (
          <div className="absolute top-4 right-4 flex flex-col gap-4 items-center z-10 pointer-events-auto">
            {/* Macintosh HD / Home */}
            <div
              onDoubleClick={() => open('finder')}
              className="flex flex-col items-center gap-1 group cursor-pointer p-1 rounded hover:bg-white/10 active:bg-blue-600/30 transition-colors w-20 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-slate-200 to-slate-400 p-1 flex items-center justify-center shadow-lg border border-white/30">
                <div className="w-8 h-6 border-2 border-slate-700 rounded flex flex-col justify-end p-0.5">
                  <div className="w-2 h-1 bg-emerald-500 rounded-full self-end mb-0.5" />
                </div>
              </div>
              <span className="text-[11px] font-medium text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] px-1.5 py-0.5 rounded group-hover:bg-blue-600 truncate max-w-full">
                {currentOS === 'linux' ? 'Home' : 'Macintosh HD'}
              </span>
            </div>

            {/* Projects Folder */}
            <div
              onDoubleClick={() => open('finder')}
              className="flex flex-col items-center gap-1 group cursor-pointer p-1 rounded hover:bg-white/10 active:bg-blue-600/30 transition-colors w-20 text-center"
            >
              <div className="w-12 h-12 flex items-center justify-center">
                <svg className="w-11 h-11 drop-shadow-lg" viewBox="0 0 48 48" fill="none">
                  <path d="M4 12C4 9.79086 5.79086 8 8 8H18.5858C19.6466 8 20.664 8.42143 21.4142 9.17157L24.8284 12.5858C25.5786 13.3359 26.596 13.7574 27.6569 13.7574H40C42.2091 13.7574 44 15.5482 44 17.7574V38C44 40.2091 42.2091 42 40 42H8C5.79086 42 4 40.2091 4 38V12Z" fill="#38BDF8"/>
                  <path d="M4 18C4 15.7909 5.79086 14 8 14H40C42.2091 14 44 15.7909 44 18V38C44 40.2091 42.2091 42 40 42H8C5.79086 42 4 40.2091 4 38V18Z" fill="#0284C7"/>
                </svg>
              </div>
              <span className="text-[11px] font-medium text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] px-1.5 py-0.5 rounded group-hover:bg-blue-600 truncate max-w-full">
                Projects
              </span>
            </div>

            {/* Wallpapers Folder */}
            <div
              onDoubleClick={() => open('wallpapers')}
              className="flex flex-col items-center gap-1 group cursor-pointer p-1 rounded hover:bg-white/10 active:bg-blue-600/30 transition-colors w-20 text-center"
            >
              <div className="w-12 h-12 flex items-center justify-center">
                <OSAppIcon id="wallpapers" os={currentOS} className="w-10 h-10 object-contain drop-shadow-lg" />
              </div>
              <span className="text-[11px] font-medium text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] px-1.5 py-0.5 rounded group-hover:bg-blue-600 truncate max-w-full">
                {getOSAppMeta('wallpapers', currentOS).name}
              </span>
            </div>

            {/* Resume PDF Document */}
            <div
              onDoubleClick={() => open('preview')}
              className="flex flex-col items-center gap-1 group cursor-pointer p-1 rounded hover:bg-white/10 active:bg-blue-600/30 transition-colors w-20 text-center"
            >
              <div className="w-12 h-12 flex items-center justify-center">
                <OSAppIcon id="preview" os={currentOS} className="w-10 h-10 object-contain drop-shadow-lg" />
              </div>
              <span className="text-[11px] font-medium text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] px-1.5 py-0.5 rounded group-hover:bg-blue-600 truncate max-w-full">
                Resume.pdf
              </span>
            </div>

            {/* 2048 Dev Game */}
            <div
              onDoubleClick={() => open('game2048')}
              className="flex flex-col items-center gap-1 group cursor-pointer p-1 rounded hover:bg-white/10 active:bg-blue-600/30 transition-colors w-20 text-center"
            >
              <div className="w-12 h-12 flex items-center justify-center">
                <OSAppIcon id="game2048" os={currentOS} className="w-10 h-10 object-contain drop-shadow-lg" />
              </div>
              <span className="text-[11px] font-medium text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] px-1.5 py-0.5 rounded group-hover:bg-blue-600 truncate max-w-full">
                {getOSAppMeta('game2048', currentOS).name}
              </span>
            </div>
          </div>
        )}

        {/* Windows 11 Desktop Shortcuts (Left Edge Windows Style) */}
        {currentOS === 'windows' && (
          <div className="absolute top-5 left-5 flex flex-col gap-4 items-center z-10 pointer-events-auto">
            {/* This PC */}
            <div
              onDoubleClick={() => open('finder')}
              className="flex flex-col items-center gap-1 group cursor-pointer p-1.5 rounded-lg hover:bg-white/10 active:bg-sky-500/30 transition-colors w-20 text-center"
            >
              <div className="w-11 h-11 rounded-lg bg-sky-600/20 border border-sky-400/40 p-1 flex items-center justify-center shadow-lg">
                <OSAppIcon id="finder" os="windows" className="w-8 h-8 object-contain drop-shadow" />
              </div>
              <span className="text-[11px] font-normal text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] px-1 rounded group-hover:bg-sky-600 truncate max-w-full font-sans">
                This PC
              </span>
            </div>

            {/* Projects */}
            <div
              onDoubleClick={() => open('finder')}
              className="flex flex-col items-center gap-1 group cursor-pointer p-1.5 rounded-lg hover:bg-white/10 active:bg-sky-500/30 transition-colors w-20 text-center"
            >
              <div className="w-11 h-11 rounded-lg bg-amber-600/20 border border-amber-400/40 p-1 flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 drop-shadow" viewBox="0 0 48 48" fill="none">
                  <path d="M4 12C4 9.79086 5.79086 8 8 8H18.5858C19.6466 8 20.664 8.42143 21.4142 9.17157L24.8284 12.5858C25.5786 13.3359 26.596 13.7574 27.6569 13.7574H40C42.2091 13.7574 44 15.5482 44 17.7574V38C44 40.2091 42.2091 42 40 42H8C5.79086 42 4 40.2091 4 38V12Z" fill="#38BDF8"/>
                  <path d="M4 18C4 15.7909 5.79086 14 8 14H40C42.2091 14 44 15.7909 44 18V38C44 40.2091 42.2091 42 40 42H8C5.79086 42 4 40.2091 4 38V18Z" fill="#0284C7"/>
                </svg>
              </div>
              <span className="text-[11px] font-normal text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] px-1 rounded group-hover:bg-sky-600 truncate max-w-full font-sans">
                Projects
              </span>
            </div>

            {/* Resume */}
            <div
              onDoubleClick={() => open('preview')}
              className="flex flex-col items-center gap-1 group cursor-pointer p-1.5 rounded-lg hover:bg-white/10 active:bg-sky-500/30 transition-colors w-20 text-center"
            >
              <div className="w-11 h-11 rounded-lg bg-red-600/20 border border-red-400/40 p-1 flex items-center justify-center shadow-lg">
                <OSAppIcon id="preview" os="windows" className="w-8 h-8 object-contain drop-shadow" />
              </div>
              <span className="text-[11px] font-normal text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] px-1 rounded group-hover:bg-sky-600 truncate max-w-full font-sans">
                Resume.pdf
              </span>
            </div>

            {/* 2048 Dev */}
            <div
              onDoubleClick={() => open('game2048')}
              className="flex flex-col items-center gap-1 group cursor-pointer p-1.5 rounded-lg hover:bg-white/10 active:bg-sky-500/30 transition-colors w-20 text-center"
            >
              <div className="w-11 h-11 rounded-lg bg-emerald-600/20 border border-emerald-400/40 p-1 flex items-center justify-center shadow-lg">
                <OSAppIcon id="game2048" os="windows" className="w-8 h-8 object-contain drop-shadow" />
              </div>
              <span className="text-[11px] font-normal text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] px-1 rounded group-hover:bg-sky-600 truncate max-w-full font-sans">
                2048 Xbox
              </span>
            </div>
          </div>
        )}

        {/* Windows and Active Content */}
        {children}
      </main>

      {/* ========================================================
          macOS Dock & Modal
          ======================================================== */}
      {currentOS === 'macos' && (
        <>
          <AboutMacModal
            isOpen={isAboutMacOpen}
            onClose={() => setIsAboutMacOpen(false)}
          />
          <Dock />
        </>
      )}

      {/* ========================================================
          Windows 11 Start Menu & Taskbar
          ======================================================== */}
      {currentOS === 'windows' && (
        <>
          <WindowsStartMenu />
          <WindowsTaskbar />
        </>
      )}

      {/* ========================================================
          Multi-OS Switcher Drawer (Available in all OS modes!)
          ======================================================== */}
      <OSSwitcherDrawer />
    </div>
  )
}
