import React, { useEffect, useRef } from 'react';
import { useCursor } from '../context/CursorContext';

const CustomCursor: React.FC = () => {
  const { cursorVariant } = useCursor();

  // Outer ref for positioning (JS driven)
  const cursorRef = useRef<HTMLDivElement>(null);

  const positionRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });

  // Physics constants
  const speed = 0.2;

  useEffect(() => {
    // Initialize off-screen or center to prevent flash
    positionRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    mouseRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      if (!cursorRef.current) return;

      // Linear interpolation (Lerp) for smooth movement
      const distX = mouseRef.current.x - positionRef.current.x;
      const distY = mouseRef.current.y - positionRef.current.y;

      positionRef.current.x += distX * speed;
      positionRef.current.y += distY * speed;

      const x = positionRef.current.x;
      const y = positionRef.current.y;

      // We translate the wrapper. The translate(-50%, -50%) centers it on the coordinate.
      cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const isHovering = cursorVariant === 'button';

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform flex items-center justify-center"
      style={{ backfaceVisibility: 'hidden' }}
    >
      {/* Fixed circular shape with lumina/glass effect */}
      <div
        className={`
            relative rounded-full border border-white/40 shadow-[0_0_20px_2px_rgba(255,255,255,0.4)]
            transition-all duration-300 ease-out
            ${isHovering ? 'h-24 w-24 bg-white/10 border-white/60' : 'h-12 w-12 bg-white/5'}
          `}
        style={{
          backdropFilter: 'invert(100%) blur(1px)',
          WebkitBackdropFilter: 'invert(100%) blur(1px)',
        }}
      >
        {/* Inner glowing core for extra 'lumina' feel */}
        <div className={`absolute inset-0 bg-white/10 rounded-full blur-sm transition-all duration-300 ${isHovering ? 'opacity-50' : 'opacity-100'}`} />
      </div>
    </div>
  );
};

export default CustomCursor;