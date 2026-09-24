import { useState, useEffect } from 'react'
import { Wifi, Battery } from 'lucide-react'
import { MobileAppView } from './MobileAppView'
import { profile } from '../../data/profile'
import { Finder } from '../apps/Finder/Finder'
import { About } from '../apps/About/About'
import { Terminal } from '../apps/Terminal/Terminal'
import { Contact } from '../apps/Contact/Contact'
import { Photos } from '../apps/Photos/Photos'
import { Preview } from '../apps/Preview/Preview'
import { Safari } from '../apps/Safari/Safari'
import { Wallpapers } from '../apps/Wallpapers/Wallpapers'
import { useWallpaperStore } from '../../store/wallpaperStore'

export const MOBILE_APPS = [
  { id: 'finder', name: 'Finder', icon: '/icons/finder.svg', component: <Finder /> },
  { id: 'about', name: 'About', icon: '/icons/notes.svg', component: <About /> },
  { id: 'terminal', name: 'Terminal', icon: '/icons/terminal.svg', component: <Terminal /> },
  { id: 'contact', name: 'Mail', icon: '/icons/mail.svg', component: <Contact /> },
  { id: 'photos', name: 'Photos', icon: '/icons/photos.svg', component: <Photos /> },
  { id: 'preview', name: 'Resume', icon: '/icons/preview.svg', component: <Preview /> },
  { id: 'safari', name: 'Safari', icon: '/icons/safari.svg', component: <Safari /> },
  { id: 'wallpapers', name: 'Wallpapers', icon: '/icons/wallpapers.svg', component: <Wallpapers /> },
]

export const MOBILE_SOCIALS = [
  {
    id: 'github',
    name: 'GitHub',
    icon: '/icons/github.svg',
    url: profile.socials.find((s) => s.label.toLowerCase().includes('github'))?.url || 'https://github.com',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '/icons/linkedin.svg',
    url: profile.socials.find((s) => s.label.toLowerCase().includes('linkedin'))?.url || 'https://linkedin.com',
  },
  {
    id: 'x',
    name: 'X',
    icon: '/icons/x.svg',
    url: profile.socials.find((s) => s.label.toLowerCase().includes('twitter') || s.label.toLowerCase().includes('x'))?.url || 'https://x.com',
  },
]

export const MobileHomeScreen = () => {
  const [activeAppId, setActiveAppId] = useState<string | null>(null)
  const [timeStr, setTimeStr] = useState('')
  const currentWallpaper = useWallpaperStore((state) => state.currentWallpaper)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const activeApp = MOBILE_APPS.find((app) => app.id === activeAppId)

  return (
    <div className="relative w-full h-[100dvh] min-h-[100dvh] flex flex-col justify-between p-3 sm:p-4 pb-5 sm:pb-6 overflow-y-auto overflow-x-hidden select-none bg-black">
      {/* Dynamic Background Wallpaper */}
      <div
        className="fixed inset-0 bg-cover bg-center transition-all duration-700 ease-in-out pointer-events-none"
        style={{
          backgroundImage: `url('${currentWallpaper}')`,
        }}
      />
      <div className="fixed inset-0 bg-black/25 backdrop-blur-[1px] pointer-events-none" />

      {/* iOS Status Bar */}
      <div className="relative z-10 w-full flex items-center justify-between text-xs font-semibold text-white px-2 sm:px-3 pt-1 sm:pt-2 shrink-0">
        <span>{timeStr || '9:41'}</span>

        {/* Dynamic Island */}
        <div className="w-24 sm:w-28 h-5 bg-black rounded-full shadow-inner flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#141b2b] ml-12" />
        </div>

        <div className="flex items-center gap-1.5">
          <Wifi className="w-3.5 h-3.5" />
          <Battery className="w-4 h-4 text-emerald-400" />
        </div>
      </div>

      {/* Top iOS Profile & Clock Widget */}
      <div className="relative z-10 mt-2 sm:mt-3 px-1 sm:px-2 shrink-0">
        <div className="p-3.5 sm:p-4 rounded-3xl bg-black/45 backdrop-blur-2xl border border-white/20 text-white shadow-xl flex items-center gap-3 sm:gap-4">
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl overflow-hidden shadow-md border border-white/20 shrink-0 bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-lg sm:text-xl font-bold text-white">
            <img
              src="/profile.png"
              alt={profile.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
            <span className="hidden group-[.fallback]:inline">AP</span>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm sm:text-base font-bold leading-tight truncate">{profile.name}</h2>
            <p className="text-xs text-blue-300 font-medium truncate">{profile.role}</p>
            <p className="text-[11px] text-white/70 mt-0.5 truncate">{profile.location}</p>
          </div>
        </div>
      </div>

      {/* iOS Main App & Social Grid */}
      <div className="relative z-10 my-auto py-4 sm:py-5 grid grid-cols-4 gap-y-3.5 sm:gap-y-5 gap-x-2 sm:gap-x-3 px-1 sm:px-2">
        {MOBILE_APPS.map((app) => (
          <button
            key={app.id}
            onClick={() => setActiveAppId(app.id)}
            className="flex flex-col items-center gap-1 sm:gap-1.5 active:scale-90 transition-transform focus:outline-none min-h-[44px]"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden shadow-xl p-0.5 border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center">
              <img
                src={app.icon}
                alt={app.name}
                className="w-full h-full object-contain pointer-events-none drop-shadow"
              />
            </div>
            <span className="text-[10px] sm:text-[11px] font-medium text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] truncate max-w-full text-center px-0.5">
              {app.name}
            </span>
          </button>
        ))}

        {/* Social Icons in Mobile Grid */}
        {MOBILE_SOCIALS.map((soc) => (
          <a
            key={soc.id}
            href={soc.url}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-1 sm:gap-1.5 active:scale-90 transition-transform focus:outline-none min-h-[44px]"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden shadow-xl p-0.5 border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center">
              <img
                src={soc.icon}
                alt={soc.name}
                className="w-full h-full object-contain pointer-events-none drop-shadow"
              />
            </div>
            <span className="text-[10px] sm:text-[11px] font-medium text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] truncate max-w-full text-center px-0.5">
              {soc.name}
            </span>
          </a>
        ))}
      </div>

      {/* iOS Bottom Dock */}
      <div className="relative z-10 px-1 sm:px-2 w-full max-w-sm mx-auto shrink-0 mt-2">
        <div className="p-2 sm:p-3 rounded-[26px] sm:rounded-[32px] bg-black/45 backdrop-blur-3xl border border-white/25 shadow-2xl flex items-center justify-around">
          {MOBILE_APPS.slice(0, 4).map((app) => (
            <button
              key={`dock-${app.id}`}
              onClick={() => setActiveAppId(app.id)}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden active:scale-90 transition-transform focus:outline-none flex items-center justify-center min-h-[44px] min-w-[44px]"
            >
              <img
                src={app.icon}
                alt={app.name}
                className="w-full h-full object-contain pointer-events-none drop-shadow"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Slide-Up Full Screen App View */}
      {activeApp && (
        <MobileAppView
          isOpen={!!activeAppId}
          title={activeApp.name}
          icon={activeApp.icon}
          onClose={() => setActiveAppId(null)}
        >
          {activeApp.component}
        </MobileAppView>
      )}
    </div>
  )
}
