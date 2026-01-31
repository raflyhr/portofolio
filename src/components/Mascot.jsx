import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import owlImg from '../assets/images/owl_mascot.png';

// Import icons for stickers
import htmlIcon from '../assets/images/html.png';
import jsIcon from '../assets/images/javascript.png';
import cssIcon from '../assets/images/css3.png';
import reactIcon from '../assets/react.svg';
import tailwindIcon from '../assets/images/tailwind.png';
import bootstrapIcon from '../assets/images/bootstrap.png';
import figmaIcon from '../assets/images/icon_figma.png';
import nodejsIcon from '../assets/images/nodejs.png';

const Mascot = ({ isMobile }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [message, setMessage] = useState("Let's see what's over here... 🦉✨");
  const [isMoving, setIsMoving] = useState(false);
  const [targetPos, setTargetPos] = useState({ x: 50, y: 100, rotate: 0, scale: 1 });
  const [lastCell, setLastCell] = useState(-1);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [transitionProps, setTransitionProps] = useState({ stiffness: 25, damping: 15 });
  const [showBubbles, setShowBubbles] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const stickers = [htmlIcon, jsIcon, cssIcon, reactIcon, tailwindIcon, bootstrapIcon, figmaIcon, nodejsIcon];

  // Optimized scroll detection with throttling
  useEffect(() => {
    let scrollTimeout;
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolling(true);
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            setIsScrolling(false);
          }, 100);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const startNewTrip = useCallback((currentPos) => {
    if (isHovered || isClicked || isDragging || isScrolling) return;

    const margin = 80;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const playerWidth = isMobile ? 100 : 160;
    const playerHeight = isMobile ? 120 : 200;
    const maxX = width - playerWidth - margin;
    const maxY = height - playerHeight - margin;

    const cells = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        cells.push({
          x: [margin + (c * maxX) / 3, margin + ((c + 1) * maxX) / 3],
          y: [margin + (r * maxY) / 3, margin + ((r + 1) * maxY) / 3],
          id: r * 3 + c
        });
      }
    }

    let nextCellIdx;
    do {
      nextCellIdx = Math.floor(Math.random() * cells.length);
    } while (
      nextCellIdx === lastCell || 
      (lastCell !== -1 && Math.abs(nextCellIdx - lastCell) <= 1)
    );

    const cell = cells[nextCellIdx];
    const nextX = cell.x[0] + Math.random() * (cell.x[1] - cell.x[0]);
    const nextY = cell.y[0] + Math.random() * (cell.y[1] - cell.y[0]);

    setLastCell(nextCellIdx);
    setIsFlipped(nextX < (currentPos?.x || targetPos.x));

    // Much lower stiffness for smoother, less jarring movement
    setTransitionProps({
      stiffness: 15 + Math.random() * 10, // Reduced from 25-50 to 15-25
      damping: 18 + Math.random() * 6     // Increased from 12-20 to 18-24
    });

    setIsMoving(true);
    setTargetPos({
      x: nextX,
      y: nextY,
      rotate: (nextX > targetPos.x ? 10 : -10) + (Math.random() - 0.5) * 15, // Reduced rotation
      scale: 0.9 + Math.random() * 0.15 // Reduced scale variation
    });
  }, [isHovered, isClicked, isDragging, isScrolling, lastCell, targetPos, isMobile]);

  useEffect(() => {
    if (!isMoving && !isHovered && !isClicked && !isDragging && !showBubbles && !isScrolling) {
      const timer = setTimeout(() => startNewTrip(targetPos), 800);
      return () => clearTimeout(timer);
    }
  }, [isMoving, isHovered, isClicked, isDragging, showBubbles, isScrolling, startNewTrip, targetPos]);

  const handleArrival = () => {
    setIsMoving(false);
    setShowBubbles(true);
    setTimeout(() => {
      setShowBubbles(false);
    }, 2000 + Math.random() * 2000);
  };

  useEffect(() => {
    const timer = setTimeout(() => setMessage(''), 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setIsClicked(true);
    setMessage("BOOM! KNOWLEDGE EXPLOSION! ⚡🔥");
    handleArrival();
    setTimeout(() => {
      setIsClicked(false);
      setMessage('');
    }, 4000);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 1000000,
      contain: 'strict', // Stricter containment
      willChange: isScrolling ? 'auto' : 'contents'
    }}>
      {/* Flying Container - Heavily optimized */}
      <motion.div
        drag={!isScrolling && !isMoving} // Disable drag during scroll AND movement
        dragElastic={0.05} // Reduced from 0.1
        dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }} // Reduced bounce
        onDragStart={() => {
          setIsDragging(true);
          setIsMoving(false);
        }}
        onDragEnd={(event, info) => {
          setIsDragging(false);
          setTargetPos({ 
            x: info.point.x - (isMobile ? 50 : 80), 
            y: info.point.y - (isMobile ? 60 : 100), 
            rotate: 0, 
            scale: 1 
          });
          handleArrival();
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={isDragging || isScrolling ? {} : {
          x: targetPos.x,
          y: targetPos.y,
          rotate: targetPos.rotate,
          scale: targetPos.scale || 1
        }}
        transition={{
          type: "spring",
          // Reduced stiffness for smoother, less CPU-intensive movement
          stiffness: isHovered ? 50 : (isDragging ? 800 : Math.max(15, transitionProps.stiffness * 0.6)), 
          damping: isHovered ? 20 : (isDragging ? 40 : Math.max(20, transitionProps.damping * 1.5)),
          mass: 1.2 // Increased mass for slower, smoother motion
        }}
        style={{
          position: 'absolute',
          width: isMobile ? '100px' : '160px',
          height: 'auto',
          pointerEvents: 'auto',
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: 'none',
          transform: 'translate3d(0,0,0)',
          backfaceVisibility: 'hidden',
          willChange: isScrolling || isDragging ? 'auto' : 'transform'
        }}
        onClick={handleClick}
        onAnimationComplete={() => {
          if (!isClicked && !isDragging && !isScrolling) handleArrival();
        }}
      >
        {/* RESTORED: Full 10 bubbles with GPU optimization */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
           {!isScrolling && (showBubbles || isMoving) && [...Array(10)].map((_, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
               animate={{
                 y: [-5, -60 - (Math.random() * 30)],
                 x: [(Math.random() - 0.5) * 80],
                 opacity: [0, 0.7, 0],
                 scale: [0, 1.3, 0]
               }}
               transition={{
                 duration: isMoving ? 1.0 : 1.8,
                 repeat: isMoving ? Infinity : 0,
                 delay: i * 0.1,
                 ease: "easeOut"
               }}
               style={{
                 position: 'absolute',
                 bottom: '20%',
                 left: '50%',
                 width: '10px',
                 height: '10px',
                 background: 'rgba(255, 255, 255, 0.8)',
                 borderRadius: '50%',
                 boxShadow: '0 0 15px rgba(0, 180, 216, 0.4)',
                 border: '1px solid white',
                 zIndex: 20,
                 transform: 'translate3d(0,0,0)',
                 backfaceVisibility: 'hidden'
               }}
             />
           ))}
        </div>

        {/* Simplified bobbing animation - CSS Powered for zero JS overhead */}
        <div
          className={`mascot-squash ${isScrolling || isMoving || isDragging ? 'animation-paused' : ''}`}
          style={{ 
            position: 'relative',
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d'
          }}
        >
          <div 
            className={`mascot-float ${isScrolling || isMoving || isDragging ? 'animation-paused' : ''}`}
            style={{ 
              width: '100%', 
              height: '100%',
              position: 'relative'
            }}
          >
            {/* Speech Bubble with Bouncy Entry */}
            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, scale: 0, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0, y: 50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'white',
                    padding: '12px 24px',
                    borderRadius: '25px',
                    color: '#1a1a1a',
                    fontWeight: '900',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.5)',
                    border: '4px solid #00b4d8',
                    whiteSpace: 'nowrap',
                    marginBottom: '20px',
                    fontSize: isMobile ? '0.75rem' : '0.9rem',
                    zIndex: 10
                  }}
                >
                  {message}
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    borderLeft: '10px solid transparent',
                    borderRight: '10px solid transparent',
                    borderTop: '12px solid #00b4d8',
                  }} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stickers Explosion - CSS Animation (Zero JS Overhead) */}
            {isClicked && stickers.map((icon, index) => {
              // Deterministic random position based on index for stability
              const angle = (index / stickers.length) * 360; // Spread in circle
              const dist = 150 + (index % 3) * 50; // Varying distances
              const radian = (angle * Math.PI) / 180;
              
              const tx = Math.cos(radian) * dist;
              const ty = Math.sin(radian) * dist;
              const rot = (Math.random() > 0.5 ? 1 : -1) * (360 + Math.random() * 360);

              return (
                <img
                  key={index}
                  src={icon}
                  className="sticker-enabled"
                  style={{
                    position: 'absolute',
                    top: '30%', // Center of owl approximately
                    left: '30%',
                    width: isMobile ? '35px' : '50px',
                    height: isMobile ? '35px' : '50px',
                    zIndex: -1,
                    '--tx': `${tx}px`,
                    '--ty': `${ty}px`,
                    '--r': `${rot}deg`,
                    filter: 'drop-shadow(0 0 10px rgba(0, 180, 216, 0.8))',
                  }}
                  alt=""
                />
              );
            })}

            {/* Owl Image */}
            <div style={{ position: 'relative' }}>
              <img 
                src={owlImg} 
                alt="Owlbert" 
                style={{ 
                  width: '100%', 
                  height: 'auto',
                  filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))',
                  cursor: isDragging ? 'grabbing' : 'pointer',
                  transform: `scaleX(${isFlipped ? -1 : 1})`,
                  transition: 'transform 0.4s ease',
                  userSelect: 'none',
                  WebkitUserDrag: 'none', // Prevent image dragging
                  pointerEvents: isDragging ? 'none' : 'auto'
                }} 
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Mascot;
