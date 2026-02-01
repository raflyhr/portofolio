import React, { useState, useEffect, useCallback, useRef } from 'react';
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

/**
 * Clamps dialog text to prevent overflow
 */
function clampDialogText(text, maxLength = 60) {
  if (typeof text !== 'string') return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 1) + '…';
}

const Mascot = ({ isMobile }) => {
  // Position and movement
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [targetPos, setTargetPos] = useState({ x: 100, y: 100 });
  const [isMoving, setIsMoving] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Personality and interaction
  const [personality, setPersonality] = useState('happy');
  const [dialog, setDialog] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [eyeExpression, setEyeExpression] = useState('● ●');
  
  // Animation states
  const [isClicked, setIsClicked] = useState(false);
  const [showBubbles, setShowBubbles] = useState(false);
  const [showStickers, setShowStickers] = useState(false);
  
  const dialogTimeout = useRef(null);
  const stickers = [htmlIcon, jsIcon, cssIcon, reactIcon, tailwindIcon, bootstrapIcon, figmaIcon, nodejsIcon];

  // Eye expressions
  const eyeExpressions = {
    happy: '● ●',
    excited: '> <',
    curious: '○ ○',
    sleepy: '- -',
    angry: '> <',
    surprised: '● ●',
    confused: '? ?',
    love: '♥ ♥',
    shine: '✨ ✨'
  };

  // Dialog messages with personality
  const dialogMessages = {
    happy: [
      'Hi! Nice to meet you! ^^',
      'I like today!',
      'You are cool!',
      'Let\'s play together!',
      'I feel happy!'
    ],
    excited: [
      'WOW! This is so fun! > <',
      'I am very excited!',
      'Yay! Yay! Yay!',
      'This is amazing!',
      'I can\'t contain my excitement!'
    ],
    curious: [
      'Hmm... what is that? ○ ○',
      'I am curious...',
      'Can I take a look?',
      'What are you doing?',
      'This is interesting!'
    ],
    sleepy: [
      'Haa... I am sleepy... - -',
      'Zzz...',
      'I need sleep...',
      'Very tired...',
      'My eyes are heavy...'
    ],
    angry: [
      'WOOOIIII!!! LET ME GO! > <',
      'STOP! STOP! I AM ANGRY!',
      'DON\'T DRAG ME AGAIN!',
      'I DON\'T LIKE THIS! GRRR!',
      'YOU MAKE ME ANNOYED!'
    ],
    love: [
      'I love you! <3 <3',
      'You are special!',
      'I love you!',
      'You are the best!',
      'I am happy with you!'
    ]
  };

  // Update eye expression when personality changes
  useEffect(() => {
    setEyeExpression(eyeExpressions[personality] || '● ●');
  }, [personality]);

  // Autonomous movement behavior
  useEffect(() => {
    if (isDragging || isMoving || showDialog) return;

    const moveInterval = setInterval(() => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const playerWidth = isMobile ? 100 : 160;
      const playerHeight = isMobile ? 120 : 200;
      
      const newX = Math.random() * (width - playerWidth - 80);
      const newY = Math.random() * (height - playerHeight - 80);
      
      setIsFlipped(newX < position.x);
      setIsMoving(true);
      setTargetPos({ x: newX, y: newY });
      
      setTimeout(() => {
        setIsMoving(false);
        setShowBubbles(true);
        setTimeout(() => setShowBubbles(false), 2000);
      }, 3000);
    }, 7000 + Math.random() * 5000);

    return () => clearInterval(moveInterval);
  }, [isDragging, isMoving, showDialog, position, isMobile]);

  // Show dialog with personality
  const showMessage = useCallback((msg, mood = 'happy', duration = 3000) => {
    setPersonality(mood);
    setDialog(clampDialogText(msg));
    setShowDialog(true);
    
    if (dialogTimeout.current) clearTimeout(dialogTimeout.current);
    dialogTimeout.current = setTimeout(() => {
      setShowDialog(false);
      setPersonality('happy');
    }, duration);
  }, []);

  // Add particle effect
  const addParticles = (x, y, count = 5) => {
    const particles = ['♥', '★', '✨', '○', '●'];
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.textContent = particles[Math.floor(Math.random() * particles.length)];
      particle.style.left = `${x + (Math.random() - 0.5) * 40}px`;
      particle.style.top = `${y + (Math.random() - 0.5) * 40}px`;
      
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 1000);
    }
  };

  // Click interaction
  const handleClick = (e) => {
    e.stopPropagation();
    
    if (isClicked) return;
    
    setIsClicked(true);
    setShowStickers(true);
    setPersonality('excited');
    
    const excitedMessages = dialogMessages.excited;
    const randomMsg = excitedMessages[Math.floor(Math.random() * excitedMessages.length)];
    showMessage(randomMsg, 'excited', 4000);
    
    addParticles(position.x + 80, position.y + 100, 12);
    
    setTimeout(() => {
      setShowStickers(false);
      setIsClicked(false);
      setPersonality('happy');
    }, 4000);
  };

  // Double click for love
  const handleDoubleClick = (e) => {
    e.stopPropagation();
    setPersonality('love');
    const loveMessages = dialogMessages.love;
    const randomMsg = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    showMessage(randomMsg, 'love', 3000);
    addParticles(position.x + 80, position.y + 100, 15);
  };

  // Drag interactions
  const handleDragStart = () => {
    setIsDragging(true);
    setIsMoving(false);
    setPersonality('surprised');
    
    setTimeout(() => {
      if (isDragging) {
        setPersonality('angry');
        const angryMessages = dialogMessages.angry;
        const randomMsg = angryMessages[Math.floor(Math.random() * angryMessages.length)];
        showMessage(randomMsg, 'angry', 5000);
        addParticles(position.x + 80, position.y + 100, 8);
      }
    }, 500);
  };

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    const newX = info.point.x - (isMobile ? 50 : 80);
    const newY = info.point.y - (isMobile ? 60 : 100);
    setPosition({ x: newX, y: newY });
    setTargetPos({ x: newX, y: newY });
    
    // Show relieved message
    setTimeout(() => {
      setPersonality('sleepy');
      showMessage('Finally... I am free!', 'sleepy', 2000);
    }, 500);
    
    setTimeout(() => {
      setPersonality('happy');
    }, 2500);
  };

  const eyes = eyeExpression.split(' ');

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 1000000,
    }}>
      {/* Owl Container */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.05}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        animate={{
          x: isDragging ? undefined : targetPos.x,
          y: isDragging ? undefined : targetPos.y,
        }}
        transition={{
          type: 'spring',
          stiffness: isMoving ? 25 : 50,
          damping: isMoving ? 15 : 20
        }}
        style={{
          position: 'absolute',
          width: isMobile ? '100px' : '160px',
          height: 'auto',
          pointerEvents: 'auto',
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: 'none',
        }}
      >
        {/* Bubbles */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {(showBubbles || isMoving) && [...Array(10)].map((_, i) => (
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
              }}
            />
          ))}
        </div>

        {/* Owl with floating animation */}
        <div className="mascot-squash">
          <div className="mascot-float">
            {/* Speech Bubble */}
            <AnimatePresence>
              {showDialog && (
                <motion.div
                  initial={{ opacity: 0, scale: 0, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0, y: 50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className={`slime-dialog ${personality} show`}
                  style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginBottom: '20px',
                    fontSize: isMobile ? '0.75rem' : '0.9rem',
                    zIndex: 10,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {dialog}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stickers Explosion */}
            {showStickers && stickers.map((icon, index) => {
              const angle = (index / stickers.length) * 360;
              const dist = 150 + (index % 3) * 50;
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
                    top: '30%',
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

            {/* Owl Image with eyes overlay */}
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
                  WebkitUserDrag: 'none',
                }} 
              />
              
              {/* Eye expressions overlay */}
              <div style={{
                position: 'absolute',
                top: '35%',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '20px',
                fontSize: '16px',
                pointerEvents: 'none',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}>
                <span>{eyes[0] || '●'}</span>
                <span>{eyes[1] || '●'}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Mascot;
