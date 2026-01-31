import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/images/logo_rydev.png';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("INITIALIZING...");

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800); 
          return 100;
        }
        // Random usage to simulate real data loading spurts
        const increment = Math.random() * 8 + 2; 
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Effect to change text based on progress
  useEffect(() => {
    if (progress > 30 && progress < 60) setLoadingText("LOADING ASSETS...");
    if (progress >= 60 && progress < 90) setLoadingText("CONFIGURING SYSTEM...");
    if (progress >= 90) setLoadingText("WELCOME, USER.");
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.1,
        transition: { duration: 0.8, ease: "anticipate" }
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#050505',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Background Grid Effect */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(0, 180, 216, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 180, 216, 0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        opacity: 0.5
      }}></div>

      {/* Main Center Container */}
      <div style={{ position: 'relative', width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* Outer Ring - Rotating Slow */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{
            position: 'absolute',
            inset: 0,
            border: '1px dashed rgba(0, 180, 216, 0.3)',
            borderRadius: '50%'
          }}
        />

        {/* Inner Ring - Rotating Fast Reverse */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{
            position: 'absolute',
            inset: '20px',
            borderRight: '2px solid var(--accent-color)',
            borderTop: '2px solid transparent',
            borderLeft: '2px solid var(--accent-color)',
            borderBottom: '2px solid transparent',
            borderRadius: '50%',
            boxShadow: '0 0 15px rgba(0, 180, 216, 0.2)'
          }}
        />

        {/* Pulsing Glow behind Logo */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: 'absolute',
            inset: '40px',
            background: 'radial-gradient(circle, var(--accent-color) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(10px)',
          }}
        />

        {/* Central Logo */}
        <motion.img
          src={logo}
          alt="Logo"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          style={{
            width: '80px',
            zIndex: 10,
            filter: 'drop-shadow(0 0 20px rgba(0, 180, 216, 0.6))'
          }}
        />
      </div>

      {/* Text Info */}
      <div style={{ marginTop: '3rem', textAlign: 'center', zIndex: 10 }}>
        <motion.div
          key={loadingText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            color: 'var(--accent-color)',
            fontFamily: "'Courier New', monospace",
            fontSize: '1.2rem',
            letterSpacing: '3px',
            marginBottom: '1rem',
            textShadow: '0 0 10px var(--accent-color)'
          }}
        >
          {loadingText}
        </motion.div>

        {/* Bar Container */}
        <div style={{
          width: '300px',
          height: '2px',
          background: '#333',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Active Bar */}
          <motion.div
            style={{
              height: '100%',
              background: 'var(--accent-color)',
              width: `${progress}%`,
              boxShadow: '0 0 10px var(--accent-color)'
            }}
          />
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          width: '300px', 
          marginTop: '5px',
          fontSize: '0.7rem',
          color: '#555',
          fontFamily: 'monospace'
        }}>
          <span>SYSTEM_READY</span>
          <span>{Math.floor(progress)}%</span>
        </div>
      </div>

    </motion.div>
  );
};

export default LoadingScreen;
