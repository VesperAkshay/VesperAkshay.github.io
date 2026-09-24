import { X } from 'lucide-react'
import { profile } from '../../data/profile'

interface AboutMacModalProps {
  isOpen: boolean
  onClose: () => void
}

export const AboutMacModal: React.FC<AboutMacModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-100"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl bg-white/90 dark:bg-[#22242c]/95 backdrop-blur-2xl border border-black/10 dark:border-white/15 p-6 shadow-2xl text-slate-800 dark:text-slate-100 text-center flex flex-col items-center relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Laptop icon / graphic */}
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-slate-700 to-slate-900 border border-white/20 shadow-xl flex items-center justify-center text-white mb-4">
          <svg className="w-12 h-12 fill-current" viewBox="0 0 24 24">
            <path d="M4 6h16v10H4z" fillOpacity="0.4" />
            <path d="M20 18H4V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v13zm2 1H2a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h20a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1z" />
          </svg>
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-white">MacBook Pro</h3>
        <p className="text-xs text-slate-500 mb-4">16-inch, Portfolio Edition</p>

        <div className="w-full space-y-1.5 text-xs text-left bg-slate-100 dark:bg-white/5 p-3 rounded-xl border border-black/5 dark:border-white/5 mb-4 font-mono">
          <div className="flex justify-between">
            <span className="text-slate-400">Engineer:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{profile.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Role:</span>
            <span className="text-slate-800 dark:text-slate-200">{profile.role.split('&')[0]}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">OS:</span>
            <span className="text-slate-800 dark:text-slate-200">macOS Web 15.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Memory:</span>
            <span className="text-slate-800 dark:text-slate-200">64 GB Unified RAM</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="px-4 py-1.5 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-sm"
        >
          Close
        </button>
      </div>
    </div>
  )
}
