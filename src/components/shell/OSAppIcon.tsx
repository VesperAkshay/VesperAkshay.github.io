import React from 'react'
import type { OSType } from '../../store/osStore'

interface OSAppIconProps {
  id: string
  os: OSType
  className?: string
}

export const OSAppIcon: React.FC<OSAppIconProps> = ({ id, os, className = 'w-7 h-7' }) => {
  // ----------------------------------------------------
  // 1. WINDOWS 11 FLUENT ICONS
  // ----------------------------------------------------
  if (os === 'windows') {
    switch (id) {
      case 'finder':
        // Windows 11 File Explorer
        return (
          <svg className={className} viewBox="0 0 64 64" fill="none">
            <path d="M6 16C6 13.7909 7.79086 12 10 12H24.5C26.5 12 28.5 13.5 29.5 15.5L32 20H54C56.2091 20 58 21.7909 58 24V48C58 50.2091 56.2091 52 54 52H10C7.79086 52 6 50.2091 6 48V16Z" fill="#FFA000"/>
            <path d="M6 24C6 21.7909 7.79086 20 10 20H54C56.2091 20 58 21.7909 58 24V48C58 50.2091 56.2091 52 54 52H10C7.79086 52 6 50.2091 6 48V24Z" fill="#FFCA28"/>
            <rect x="10" y="27" width="44" height="23" rx="3" fill="#29B6F6" fillOpacity="0.85"/>
            <path d="M12 27H52V33H12V27Z" fill="#0288D1"/>
            <circle cx="20" cy="30" r="1.5" fill="white"/>
            <circle cx="26" cy="30" r="1.5" fill="white"/>
          </svg>
        )
      case 'about':
        // Windows 11 Notepad
        return (
          <svg className={className} viewBox="0 0 64 64" fill="none">
            <rect x="10" y="8" width="44" height="48" rx="8" fill="#0078D4"/>
            <rect x="14" y="12" width="36" height="40" rx="6" fill="#F3F3F3"/>
            <line x1="20" y1="22" x2="44" y2="22" stroke="#0078D4" strokeWidth="3" strokeLinecap="round"/>
            <line x1="20" y1="30" x2="44" y2="30" stroke="#0078D4" strokeWidth="3" strokeLinecap="round"/>
            <line x1="20" y1="38" x2="36" y2="38" stroke="#0078D4" strokeWidth="3" strokeLinecap="round"/>
            <circle cx="44" cy="42" r="7" fill="#0078D4"/>
            <path d="M42 42L44 44L47 40" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        )
      case 'terminal':
        // Windows Terminal (PowerShell)
        return (
          <svg className={className} viewBox="0 0 64 64" fill="none">
            <rect x="8" y="10" width="48" height="44" rx="8" fill="#0F172A" stroke="#38BDF8" strokeWidth="2"/>
            <path d="M18 22L28 32L18 42" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="32" y1="42" x2="44" y2="42" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round"/>
          </svg>
        )
      case 'contact':
        // Windows Outlook / Mail
        return (
          <svg className={className} viewBox="0 0 64 64" fill="none">
            <rect x="8" y="14" width="48" height="36" rx="6" fill="#0078D4"/>
            <path d="M8 18L32 36L56 18" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <circle cx="48" cy="22" r="8" fill="#005A9E"/>
            <text x="48" y="26" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="sans-serif">O</text>
          </svg>
        )
      case 'photos':
        // Windows 11 Photos
        return (
          <svg className={className} viewBox="0 0 64 64" fill="none">
            <rect x="8" y="10" width="48" height="44" rx="10" fill="url(#win-photos-grad)"/>
            <circle cx="22" cy="24" r="5" fill="#FFE082"/>
            <path d="M12 46L26 30L38 42L44 36L52 46H12Z" fill="#FFFFFF" fillOpacity="0.9"/>
            <defs>
              <linearGradient id="win-photos-grad" x1="8" y1="10" x2="56" y2="54" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0078D4"/>
                <stop offset="1" stopColor="#673AB7"/>
              </linearGradient>
            </defs>
          </svg>
        )
      case 'preview':
        // Windows PDF Reader
        return (
          <svg className={className} viewBox="0 0 64 64" fill="none">
            <path d="M12 12C12 9.79086 13.7909 8 16 8H38L52 22V52C52 54.2091 50.2091 56 48 56H16C13.7909 56 12 54.2091 12 52V12Z" fill="#E53935"/>
            <path d="M38 8V22H52L38 8Z" fill="#FFCDD2"/>
            <rect x="18" y="32" width="28" height="14" rx="2" fill="white"/>
            <text x="32" y="43" textAnchor="middle" fill="#E53935" fontSize="10" fontWeight="bold" fontFamily="sans-serif">PDF</text>
          </svg>
        )
      case 'safari':
        // Microsoft Edge Browser
        return (
          <svg className={className} viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="24" fill="url(#edge-grad)"/>
            <path d="M32 16C23.1634 16 16 23.1634 16 32C16 39.5 21.5 45.8 28.7 47.6C26 44.5 25 39 28 34C31 29 38 27 41 22C42.5 19.5 41 16 32 16Z" fill="#00E5FF"/>
            <path d="M48 32C48 40.8366 40.8366 48 32 48C28.5 48 25 47 22 45C27 45 32 42 34 38C36 34 34 30 38 27C42 24 47 26 48 32Z" fill="#0078D4"/>
            <defs>
              <linearGradient id="edge-grad" x1="16" y1="16" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00C853"/>
                <stop offset="0.5" stopColor="#00B0FF"/>
                <stop offset="1" stopColor="#0052CC"/>
              </linearGradient>
            </defs>
          </svg>
        )
      case 'wallpapers':
        // Windows Personalization / Settings
        return (
          <svg className={className} viewBox="0 0 64 64" fill="none">
            <rect x="8" y="8" width="48" height="48" rx="12" fill="#0078D4"/>
            <circle cx="32" cy="32" r="10" stroke="white" strokeWidth="4"/>
            <path d="M32 14V20M32 44V50M14 32H20M44 32H50M19 19L24 24M40 40L45 45M19 45L24 40M40 24L45 19" stroke="white" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        )
      case 'game2048':
        // Xbox Games 2048
        return (
          <svg className={className} viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="24" fill="#107C10"/>
            <path d="M22 22C26 27 32 34 32 34C32 34 38 27 42 22C45 25 47 29 47 33C47 41.2843 40.2843 48 32 48C23.7157 48 17 41.2843 17 33C17 29 19 25 22 22Z" fill="white"/>
            <circle cx="32" cy="32" r="23" stroke="white" strokeWidth="2"/>
          </svg>
        )
    }
  }

  // ----------------------------------------------------
  // 2. UBUNTU LINUX YARU ICONS
  // ----------------------------------------------------
  if (os === 'linux') {
    switch (id) {
      case 'finder':
        // Nautilus Files (Aubergine / Orange Folder)
        return (
          <svg className={className} viewBox="0 0 64 64" fill="none">
            <path d="M8 18C8 14.6863 10.6863 12 14 12H26L32 18H50C53.3137 18 56 20.6863 56 24V48C56 51.3137 53.3137 54 50 54H14C10.6863 54 8 51.3137 8 48V18Z" fill="#300A24"/>
            <path d="M8 24C8 20.6863 10.6863 18 14 18H50C53.3137 18 56 20.6863 56 24V48C56 51.3137 53.3137 54 50 54H14C10.6863 54 8 51.3137 8 48V24Z" fill="#E95420"/>
            <circle cx="20" cy="36" r="3" fill="white"/>
            <circle cx="32" cy="36" r="3" fill="white"/>
            <circle cx="44" cy="36" r="3" fill="white"/>
          </svg>
        )
      case 'about':
        // Text Editor (Gedit)
        return (
          <svg className={className} viewBox="0 0 64 64" fill="none">
            <rect x="12" y="8" width="40" height="48" rx="6" fill="#F7F7F7" stroke="#333333" strokeWidth="2"/>
            <line x1="20" y1="20" x2="44" y2="20" stroke="#E95420" strokeWidth="3" strokeLinecap="round"/>
            <line x1="20" y1="28" x2="44" y2="28" stroke="#772953" strokeWidth="3" strokeLinecap="round"/>
            <line x1="20" y1="36" x2="36" y2="36" stroke="#5E2750" strokeWidth="3" strokeLinecap="round"/>
            <path d="M38 46L48 36L44 32L34 42L38 46Z" fill="#E95420"/>
          </svg>
        )
      case 'terminal':
        // GNOME Terminal (Black + Orange prompt)
        return (
          <svg className={className} viewBox="0 0 64 64" fill="none">
            <rect x="8" y="10" width="48" height="44" rx="8" fill="#1E1E1E" stroke="#E95420" strokeWidth="2.5"/>
            <rect x="8" y="10" width="48" height="10" rx="8" fill="#300A24"/>
            <circle cx="15" cy="15" r="2" fill="#E95420"/>
            <circle cx="21" cy="15" r="2" fill="#772953"/>
            <circle cx="27" cy="15" r="2" fill="#5E2750"/>
            <path d="M16 28L26 36L16 44" stroke="#E95420" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="30" y1="44" x2="44" y2="44" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round"/>
          </svg>
        )
      case 'contact':
        // Thunderbird Mail (Ubuntu)
        return (
          <svg className={className} viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="24" fill="#0080FF"/>
            <path d="M14 26L32 40L50 26V44H14V26Z" fill="#FFFFFF"/>
            <path d="M14 26L32 40L50 26L32 20L14 26Z" fill="#B3E5FC"/>
          </svg>
        )
      case 'photos':
        // Shotwell Photo Manager
        return (
          <svg className={className} viewBox="0 0 64 64" fill="none">
            <rect x="8" y="12" width="48" height="40" rx="8" fill="#772953"/>
            <circle cx="32" cy="32" r="12" fill="#E95420"/>
            <circle cx="32" cy="32" r="6" fill="#FFFFFF"/>
            <rect x="42" y="16" width="6" height="4" rx="1" fill="#FFFFFF"/>
          </svg>
        )
      case 'preview':
        // Evince Document Viewer
        return (
          <svg className={className} viewBox="0 0 64 64" fill="none">
            <path d="M14 10C14 7.79086 15.7909 6 18 6H38L50 18V54C50 56.2091 48.2091 58 46 58H18C15.7909 58 14 56.2091 14 54V10Z" fill="#C7162B"/>
            <path d="M38 6V18H50L38 6Z" fill="#FFA4A2"/>
            <line x1="22" y1="28" x2="42" y2="28" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <line x1="22" y1="36" x2="42" y2="36" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <line x1="22" y1="44" x2="34" y2="44" stroke="white" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        )
      case 'safari':
        // Mozilla Firefox
        return (
          <svg className={className} viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="23" fill="#252F77"/>
            <circle cx="32" cy="32" r="17" fill="#00B0FF"/>
            <path d="M48 24C46 16 38 12 32 12C20.9543 12 12 20.9543 12 32C12 43.0457 20.9543 52 32 52C43.0457 52 52 43.0457 52 32C52 28 50 26 48 24Z" fill="#FF7118"/>
            <path d="M42 20C40 26 34 30 30 32C24 35 20 38 20 44C20 44 26 48 34 46C42 44 46 36 46 32C46 26 44 22 42 20Z" fill="#FFDF37"/>
          </svg>
        )
      case 'wallpapers':
        // Ubuntu Settings
        return (
          <svg className={className} viewBox="0 0 64 64" fill="none">
            <rect x="8" y="8" width="48" height="48" rx="12" fill="#333333"/>
            <circle cx="32" cy="32" r="12" stroke="#E95420" strokeWidth="5"/>
            <circle cx="32" cy="32" r="4" fill="white"/>
          </svg>
        )
      case 'game2048':
        // GNOME Games
        return (
          <svg className={className} viewBox="0 0 64 64" fill="none">
            <rect x="8" y="16" width="48" height="32" rx="10" fill="#E95420"/>
            <path d="M20 26V38M14 32H26" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <circle cx="44" cy="28" r="2.5" fill="white"/>
            <circle cx="38" cy="34" r="2.5" fill="white"/>
          </svg>
        )
    }
  }

  // ----------------------------------------------------
  // 3. ANDROID 15 MATERIAL YOU ICONS
  // ----------------------------------------------------
  if (os === 'android') {
    switch (id) {
      case 'finder':
        // Files by Google
        return (
          <svg className={className} viewBox="0 0 64 64" fill="none">
            <rect x="8" y="8" width="48" height="48" rx="16" fill="#F1F3F4"/>
            <path d="M16 22C16 19.7909 17.7909 18 20 18H28L34 24H44C46.2091 24 48 25.7909 48 28V42C48 44.2091 46.2091 46 44 46H20C17.7909 46 16 44.2091 16 42V22Z" fill="#4285F4"/>
            <path d="M30 30L38 38L30 46" stroke="#FBBC05" strokeWidth="3" strokeLinecap="round"/>
            <circle cx="26" cy="34" r="3" fill="#EA4335"/>
          </svg>
        )
      case 'about':
        // Google Keep Notes
        return (
          <svg className={className} viewBox="0 0 64 64" fill="none">
            <rect x="8" y="8" width="48" height="48" rx="16" fill="#FBBC04"/>
            <circle cx="32" cy="28" r="9" fill="white"/>
            <rect x="27" y="36" width="10" height="5" rx="2" fill="white"/>
          </svg>
        )
      case 'terminal':
        // Termux / Android CLI
        return (
          <svg className={className} viewBox="0 0 64 64" fill="none">
            <rect x="8" y="8" width="48" height="48" rx="16" fill="#000000"/>
            <path d="M18 24L28 32L18 40" stroke="#00E676" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="32" y1="40" x2="44" y2="40" stroke="#00E676" strokeWidth="4" strokeLinecap="round"/>
          </svg>
        )
      case 'contact':
        // Gmail
        return (
          <svg className={className} viewBox="0 0 64 64" fill="none">
            <rect x="8" y="8" width="48" height="48" rx="16" fill="#FFFFFF"/>
            <path d="M16 20V44H24V32L32 38L40 32V44H48V20L32 32L16 20Z" fill="#EA4335"/>
            <path d="M16 20L32 32L48 20" stroke="#4285F4" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        )
      case 'photos':
        // Google Photos (Pinwheel)
        return (
          <svg className={className} viewBox="0 0 64 64" fill="none">
            <rect x="8" y="8" width="48" height="48" rx="16" fill="#FFFFFF"/>
            <circle cx="32" cy="24" r="7" fill="#EA4335"/>
            <circle cx="40" cy="32" r="7" fill="#FBBC05"/>
            <circle cx="32" cy="40" r="7" fill="#34A853"/>
            <circle cx="24" cy="32" r="7" fill="#4285F4"/>
          </svg>
        )
      case 'preview':
        // Google Drive PDF
        return (
          <svg className={className} viewBox="0 0 64 64" fill="none">
            <rect x="8" y="8" width="48" height="48" rx="16" fill="#F1F3F4"/>
            <path d="M16 16C16 13.7909 17.7909 12 20 12H36L48 24V48C48 50.2091 46.2091 52 44 52H20C17.7909 52 16 50.2091 16 48V16Z" fill="#4285F4"/>
            <text x="32" y="38" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="sans-serif">DOC</text>
          </svg>
        )
      case 'safari':
        // Google Chrome
        return (
          <svg className={className} viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="24" fill="#FFFFFF"/>
            <circle cx="32" cy="32" r="10" fill="#4285F4"/>
            <path d="M32 8C39.5 8 46 12 49 18L38 32H22L32 8Z" fill="#EA4335"/>
            <path d="M56 32C56 42 49 50 40 54L32 40L42 22C50 24 56 28 56 32Z" fill="#FBBC05"/>
            <path d="M32 56C22 56 14 50 10 40L22 32L32 56Z" fill="#34A853"/>
          </svg>
        )
      case 'wallpapers':
        // Android Wallpaper & Style (Material You)
        return (
          <svg className={className} viewBox="0 0 64 64" fill="none">
            <rect x="8" y="8" width="48" height="48" rx="16" fill="#D0E8FF"/>
            <circle cx="26" cy="26" r="8" fill="#7C4DFF"/>
            <circle cx="38" cy="26" r="8" fill="#00B0FF"/>
            <circle cx="26" cy="38" r="8" fill="#00E676"/>
            <circle cx="38" cy="38" r="8" fill="#FFD740"/>
          </svg>
        )
      case 'game2048':
        // Google Play Games
        return (
          <svg className={className} viewBox="0 0 64 64" fill="none">
            <rect x="8" y="8" width="48" height="48" rx="16" fill="#0F9D58"/>
            <path d="M22 26C20 26 18 28 18 30V34C18 36 20 38 22 38H42C44 38 46 36 46 34V30C46 28 44 26 42 26H22Z" fill="white"/>
            <circle cx="25" cy="32" r="2.5" fill="#0F9D58"/>
            <circle cx="39" cy="32" r="2.5" fill="#0F9D58"/>
          </svg>
        )
    }
  }

  // ----------------------------------------------------
  // 4. MACOS DEFAULT (Fallback to local SVGs)
  // ----------------------------------------------------
  const macIcons: Record<string, string> = {
    finder: '/icons/finder.svg',
    about: '/icons/notes.svg',
    terminal: '/icons/terminal.svg',
    contact: '/icons/mail.svg',
    photos: '/icons/photos.svg',
    preview: '/icons/preview.svg',
    safari: '/icons/safari.svg',
    wallpapers: '/icons/wallpapers.svg',
    game2048: '/icons/game.svg',
  }

  return (
    <img
      src={macIcons[id] || '/icons/finder.svg'}
      alt={id}
      className={`${className} object-contain drop-shadow`}
    />
  )
}
