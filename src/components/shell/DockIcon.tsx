import { useState, useRef } from 'react'
import { motion, useTransform, useSpring } from 'framer-motion'
import type { MotionValue } from 'framer-motion'

export interface DockItemData {
  id: string
  name: string
  icon: string
  isOpen?: boolean
  isExternal?: boolean
  url?: string
}

interface DockIconProps {
  item: DockItemData
  mouseX: MotionValue<number>
  onClick?: (id: string) => void
}

export const DockIcon: React.FC<DockIconProps> = ({ item, mouseX, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isBouncing, setIsBouncing] = useState(false)
  const iconRef = useRef<HTMLDivElement>(null)

  // Distance from cursor to icon center
  const distance = useTransform(mouseX, (val) => {
    const bounds = iconRef.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return Math.abs(val - bounds.x - bounds.width / 2)
  })

  // Dynamic width: 50px normal -> up to 74px at peak hover
  const widthSync = useTransform(distance, [0, 80, 150], [74, 62, 50])
  const width = useSpring(widthSync, {
    mass: 0.08,
    stiffness: 420,
    damping: 24,
  })

  // Dynamic vertical lift: lifts up by -12px on peak hover
  const yLiftSync = useTransform(distance, [0, 80, 150], [-12, -6, 0])
  const yLift = useSpring(yLiftSync, {
    mass: 0.08,
    stiffness: 420,
    damping: 24,
  })

  const handleClick = () => {
    setIsBouncing(true)
    onClick?.(item.id)
    setTimeout(() => setIsBouncing(false), 900)
  }

  return (
    <motion.div
      ref={iconRef}
      style={{ width }}
      className="relative flex flex-col items-center group focus:outline-none origin-bottom select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Refined macOS Frosted Tooltip */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 4, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 2, scale: 0.95 }}
          transition={{ duration: 0.12 }}
          className="absolute -top-11 px-3 py-1 rounded-md bg-[#16171d]/85 backdrop-blur-xl text-white/95 text-[11px] font-medium shadow-[0_4px_12px_rgba(0,0,0,0.5)] border border-white/15 pointer-events-none whitespace-nowrap z-50 flex items-center justify-center"
        >
          {item.name}
          <div className="absolute -bottom-1 w-2 h-2 bg-[#16171d]/85 rotate-45 border-r border-b border-white/15" />
        </motion.div>
      )}

      {/* Animated App Icon with Lift and Launch Bounce */}
      <motion.button
        type="button"
        style={{
          y: yLift,
          width: '100%',
          height: width,
        }}
        animate={
          isBouncing
            ? {
                y: [0, -22, 0, -12, 0, -5, 0],
                transition: { duration: 0.85, ease: 'easeInOut' },
              }
            : undefined
        }
        aria-label={item.name}
        className="rounded-2xl p-0.5 flex items-center justify-center transition-transform active:brightness-90 focus:outline-none origin-bottom"
      >
        <img
          src={item.icon}
          alt={item.name}
          className="w-full h-full object-contain pointer-events-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)] select-none"
          draggable={false}
        />
      </motion.button>

      {/* Running/Open Indicator Dot */}
      <div className="h-1.5 flex items-center justify-center mt-0.5">
        {item.isOpen ? (
          <div className="w-1 h-1 rounded-full bg-white shadow-[0_0_5px_rgba(255,255,255,0.9)]" />
        ) : (
          <div className="w-1 h-1 rounded-full opacity-0" />
        )}
      </div>
    </motion.div>
  )
}
