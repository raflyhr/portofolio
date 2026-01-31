import React, { useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Particle = ({ data, scrollY, theme }) => {
  const y = useTransform(scrollY, (latest) => {
    // Parallax speed based on layer - Reduced for slower movement
    // Old: layer * 0.05 + 0.02 (approx 0.07 - 0.17)
    // New: layer * 0.02 + 0.01 (approx 0.03 - 0.07)
    const speed = data.layer * 0.02 + 0.01; 
    const movement = latest * speed;
    
    // Initial position
    const initial = data.y;
    
    // Calculate wrapped position: range -20% to 120% (140% total span)
    // This allows particles to seamlessly wrap around the screen
    const range = 140;
    const offset = 20;
    
    let pos = (initial - movement) % range;
    if (pos < -offset) {
      pos += range;
    } else if (pos > 100 + offset) {
      pos -= range;
    }
    
    // Adjust to keep 0 as top
    // Try to stabilize the wrap logic:
    // We want P = (initial - move) mod Range.
    // Normalized to 0..Range
    const normalized = ((((initial - movement) % range) + range) % range);
    // Shift to -20..120
    return normalized - offset;
  });

  const particleColor = data.isAccent 
    ? 'var(--accent-color)' 
    : (theme === 'light' ? '#1a1a1a' : '#ffffff');

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 0, // We use transform Y or top? sticky 'top' with motion value is OK.
        // Actually, style.top accepting a MotionValue works in Framer Motion.
        // But let's use percent directly.
        top: useTransform(y, v => `${v}%`), 
        left: `${data.x}%`,
        width: data.size,
        height: data.size,
        willChange: 'transform, top', // Hint for optimization
      }}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          backgroundColor: particleColor,
          opacity: data.opacity,
          transition: 'background-color 0.3s ease',
        }}
        animate={{
          y: [0, data.floatY, 0], 
          x: [0, data.floatX, 0],
        }}
        transition={{
          duration: data.duration,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse"
        }}
      />
    </motion.div>
  );
};

// Main Component
const ParticleBackground = () => {
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'dark');
  const { scrollY } = useScroll();
  
  // Observe theme changes
  useEffect(() => {
    const handleThemeChange = (mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
        }
      });
    };

    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, []);

  // RESTORED: Full 40 particles
  const particles = useMemo(() => {
    const particleCount = 20; // Reduced from 40 for cleaner look
    const newParticles = [];

    for (let i = 0; i < particleCount; i++) {
        const layer = Math.floor(Math.random() * 3) + 1;
        let size;
        
        if (layer === 1) size = Math.random() * 3 + 1;      
        if (layer === 2) size = Math.random() * 5 + 3;      
        if (layer === 3) size = Math.random() * 12 + 8;    

        const isAccent = Math.random() > 0.6;

        newParticles.push({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 120 - 10, // Initial scatter
            size: size,
            isAccent: isAccent,
            opacity: layer === 3 ? 0.3 : (Math.random() * 0.2 + 0.1),
            layer: layer,
            duration: Math.random() * 15 + 15,
            floatX: Math.random() * 40 - 20, 
            floatY: Math.random() * 40 - 20,
        });
    }
    return newParticles;
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
      contain: 'layout style paint',
    }}>
      {particles.map((particle) => (
        <Particle 
          key={particle.id} 
          data={particle} 
          scrollY={scrollY} 
          theme={theme} 
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
