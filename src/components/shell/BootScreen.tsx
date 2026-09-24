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
        <div className="w-16 h-16 text-white mb-10 flex items-center justify-center">
          <svg className="w-14 h-14 fill-current drop-shadow-md" viewBox="0 0 170 170">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.66-7.74-11.89-14.1-6.19-9.35-10.99-20.08-14.42-32.18-3.43-12.11-5.14-23.3-5.14-33.57 0-14.78 3.8-27.17 11.41-37.16 7.61-9.99 17.18-15.09 28.72-15.31 4.58 0 9.8 1.16 15.66 3.47 5.86 2.32 9.8 3.51 11.83 3.59 1.7 0 5.66-1.22 11.89-3.67 6.23-2.45 11.46-3.56 15.68-3.32 11.05.65 20.14 4.89 27.28 12.72-9.8 5.88-14.59 14.23-14.39 25.04.22 8.37 3.37 15.22 9.46 20.55 6.09 5.33 13.37 8.37 21.84 9.13-2.28 7.07-5.06 14.13-8.33 21.18zm-26.43-114.7c0 7.07-2.61 13.6-7.83 18.6-5.22 5-11.75 8.16-19.59 7.48-.11-1.09-.16-2.07-.16-2.94 0-6.96 2.83-13.6 8.5-18.92 5.67-5.33 12.29-8.49 19.86-8.49.22 1.41.22 2.83.22 4.27z"/>
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
