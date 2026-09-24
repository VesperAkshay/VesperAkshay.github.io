import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, X } from 'lucide-react'

interface MobileAppViewProps {
  isOpen: boolean
  title: string
  icon?: string
  onClose: () => void
  children: React.ReactNode
}

export const MobileAppView: React.FC<MobileAppViewProps> = ({
  isOpen,
  title,
  icon,
  onClose,
  children,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '100%', opacity: 0.8 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0.8 }}
          transition={{ type: 'spring', stiffness: 350, damping: 35 }}
          className="fixed inset-0 z-50 bg-[#121318] text-white flex flex-col overflow-hidden"
        >
          {/* iOS-Style App Top Bar */}
          <header className="h-14 px-4 bg-[#1c1d24]/90 backdrop-blur-xl border-b border-white/10 flex items-center justify-between shrink-0 safe-top">
            <button
              onClick={onClose}
              className="flex items-center gap-1 text-sm font-medium text-blue-400 active:opacity-70 min-h-[44px] min-w-[44px]"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>

            <div className="flex items-center gap-2">
              {icon && <img src={icon} alt="" className="w-5 h-5 object-contain" />}
              <span className="font-semibold text-sm text-white truncate max-w-[180px]">
                {title}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 active:bg-white/20 text-white/80 min-h-[36px] min-w-[36px] flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </header>

          {/* App Body Content */}
          <div className="flex-1 flex flex-col overflow-y-auto bg-white/5">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
