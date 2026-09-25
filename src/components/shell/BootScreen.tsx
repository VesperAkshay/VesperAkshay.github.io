import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BootScreenProps {
  onComplete: () => void
  durationMs?: number
}

export const BootScreen: React.FC<BootScreenProps> = ({
  onComplete,
  durationMs = 1600,
}) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const currentProgress = Math.min(100, (elapsed / durationMs) * 100)
      setProgress(currentProgress)

      if (elapsed < durationMs) {
        requestAnimationFrame(animate)
      } else {
        setTimeout(onComplete, 200)
      }
    }

    const frameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId)
  }, [durationMs, onComplete])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        onClick={onComplete}
        className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center cursor-pointer select-none"
      >
        {/* Apple Logo */}
        <div className="w-20 h-20 text-white mb-10 flex items-center justify-center">
          <svg className="w-16 h-16 fill-current drop-shadow-md" viewBox="0 0 24 24">
            <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
          </svg>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-56 h-1.5 bg-[#252528] rounded-full overflow-hidden p-[1px]">
          <motion.div
            className="h-full bg-white rounded-full transition-all ease-out duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-[10px] text-white/30 mt-4 tracking-wider uppercase font-mono">
          Click or press any key to skip
        </span>
      </motion.div>
    </AnimatePresence>
  )
}
