import { useEffect, useState } from 'react'
import { Desktop } from './components/shell/Desktop'
import { Window } from './components/window/Window'
import { BootScreen } from './components/shell/BootScreen'
import { useWindowStore } from './store/windowStore'
import { useResponsive } from './lib/useResponsive'
import { MobileHomeScreen } from './components/mobile/MobileHomeScreen'
import { Finder } from './components/apps/Finder/Finder'
import { About } from './components/apps/About/About'
import { Terminal } from './components/apps/Terminal/Terminal'
import { Contact } from './components/apps/Contact/Contact'
import { Photos } from './components/apps/Photos/Photos'
import { Preview } from './components/apps/Preview/Preview'
import { Safari } from './components/apps/Safari/Safari'
import { Wallpapers } from './components/apps/Wallpapers/Wallpapers'

export const APP_REGISTRY = [
  {
    id: 'wallpapers',
    title: 'Wallpapers — macOS Gallery',
    icon: '/icons/wallpapers.svg',
    initialPosition: { x: 170, y: 45 },
    initialSize: { width: 840, height: 540 },
    component: <Wallpapers />,
  },
  {
    id: 'finder',
    title: 'Finder — Projects',
    icon: '/icons/finder.svg',
    initialPosition: { x: 70, y: 35 },
    initialSize: { width: 780, height: 490 },
    component: <Finder />,
  },
  {
    id: 'about',
    title: 'Notes — About Akshay Patel',
    icon: '/icons/notes.svg',
    initialPosition: { x: 130, y: 55 },
    initialSize: { width: 740, height: 480 },
    component: <About />,
  },
  {
    id: 'terminal',
    title: 'Terminal — zsh',
    icon: '/icons/terminal.svg',
    initialPosition: { x: 190, y: 80 },
    initialSize: { width: 620, height: 380 },
    component: <Terminal />,
  },
  {
    id: 'contact',
    title: 'Mail — Compose Message',
    icon: '/icons/mail.svg',
    initialPosition: { x: 230, y: 60 },
    initialSize: { width: 560, height: 460 },
    component: <Contact />,
  },
  {
    id: 'photos',
    title: 'Photos — Visuals & Screenshots',
    icon: '/icons/photos.svg',
    initialPosition: { x: 160, y: 45 },
    initialSize: { width: 760, height: 500 },
    component: <Photos />,
  },
  {
    id: 'preview',
    title: 'Preview — Resume.pdf',
    icon: '/icons/preview.svg',
    initialPosition: { x: 200, y: 40 },
    initialSize: { width: 680, height: 520 },
    component: <Preview />,
  },
  {
    id: 'safari',
    title: 'Safari — Deployments',
    icon: '/icons/safari.svg',
    initialPosition: { x: 150, y: 50 },
    initialSize: { width: 800, height: 500 },
    component: <Safari />,
  },
]

export default function App() {
  const { isMobile } = useResponsive(768)
  const [isBooted, setIsBooted] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true
    return sessionStorage.getItem('has_booted') === 'true'
  })

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('portfolio-theme') : null
    if (saved === 'light' || saved === 'dark') return saved
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light'
    }
    return 'dark'
  })

  const open = useWindowStore((state) => state.open)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    // Open Finder by default on initial load
    open('finder')
  }, [open])

  const handleBootComplete = () => {
    setIsBooted(true)
    sessionStorage.setItem('has_booted', 'true')
  }

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <>
      {/* Boot Animation on first visit */}
      {!isBooted && <BootScreen onComplete={handleBootComplete} />}

      {/* Main Experience: Full Screen Native Desktop */}
      {isMobile ? (
        <MobileHomeScreen />
      ) : (
        <Desktop theme={theme} onToggleTheme={toggleTheme}>
          {APP_REGISTRY.map((app) => (
            <Window
              key={app.id}
              id={app.id}
              title={app.title}
              icon={app.icon}
              initialPosition={app.initialPosition}
              initialSize={app.initialSize}
            >
              {app.component}
            </Window>
          ))}
        </Desktop>
      )}
    </>
  )
}
