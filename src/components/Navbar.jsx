import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Sun, Moon, Music, Pause, Volume2, VolumeX, Menu, X } from "lucide-react";
import "../index.css";
import logo from "../assets/images/logo_rydev.png";
import bgMusic from "../assets/musik/bg_music.mp3";

const Navbar = ({ theme, toggleTheme }) => {
  const [activeLink, setActiveLink] = useState('home');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false); // NEW: Track scroll state
  const audioRef = useRef(null);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // NEW: Scroll detection for blur effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Music Logic
  useEffect(() => {
    audioRef.current = new Audio(bgMusic);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3; // Default pleasant volume

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log("User gesture required for audio"));
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Responsive state
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
      if (window.innerWidth > 1024) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Helper function to scroll to section with offset
  const scrollToSection = (id) => {
    // Immediate state change for better responsiveness
    setActiveLink(id);
    
    const isMobile = window.innerWidth <= 1024;
    
    const performScroll = () => {
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      setIsMobileMenuOpen(false);
    };

    if (isMobile) {
      // Close menu first, then scroll to avoid UI glitches on mobile
      setIsMobileMenuOpen(false);
      setTimeout(performScroll, 50); 
    } else {
      performScroll();
    }
  };

  // Section Observer for real-time scroll lighting
  useEffect(() => {
    const sections = ['about', 'project', 'skill', 'contact'];
    
    const options = {
      root: null,
      rootMargin: '-30% 0px -50% 0px', // More balanced margin for mobile/desktop
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Only update if we are not in the middle of a manual scroll
          setActiveLink(entry.target.id);
        }
      });
      
      if (window.scrollY < 100) {
        setActiveLink('home');
      }
    }, options);

    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: 'About me', id: 'about' },
    { name: 'Project', id: 'project' },
    { name: 'My skill', id: 'skill' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <>
      <motion.div
        style={{
          scaleX,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "var(--accent-color)",
          transformOrigin: "0%",
          zIndex: 2000,
          boxShadow: "0 0 10px rgba(0, 180, 216, 0.5)"
        }}
      />

      {/* Background Overlay when Mobile Menu is Open */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(4px)',
              zIndex: 998
            }}
          />
        )}
      </AnimatePresence>

      <nav
        className="glass"
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
          height: "70px",
          display: "flex",
          alignItems: "center",
          // Dynamic blur effect when scrolled
          background: scrolled 
            ? (theme === 'dark' ? 'rgba(26, 26, 26, 0.8)' : 'rgba(255, 255, 255, 0.8)') 
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-color)' : 'none',
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: 'background, backdrop-filter'
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            position: "relative"
          }}
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            style={{ display: "flex", alignItems: "center", cursor: "pointer", zIndex: 1001 }}
          >
            <img 
              src={logo} 
              alt="RY Dev" 
              style={{
                height: "60px",
                width: "auto",
                filter: theme === 'dark' ? "brightness(1.2)" : "none",
                transition: "filter var(--transition-speed)"
              }} 
            />
          </a>

          {/* Desktop Navigation */}
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            {isDesktop && (
              <div style={{ display: 'flex', gap: '0.2rem', alignItems: 'center' }}>
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.id);
                    }}
                    style={{
                      position: 'relative',
                      padding: '0.6rem 1.2rem',
                      color: activeLink === link.id ? 'white' : 'var(--text-secondary)',
                      fontSize: '0.95rem',
                      fontWeight: activeLink === link.id ? '600' : '400',
                      transition: 'color 0.3s ease',
                      zIndex: 1
                    }}
                  >
                    {link.name}
                    {activeLink === link.id && (
                      <motion.div
                        layoutId="active-pill"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'var(--accent-color)',
                          borderRadius: '20px',
                          zIndex: -1,
                          boxShadow: '0 0 15px rgba(0, 180, 216, 0.5)'
                        }}
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </a>
                ))}
              </div>
            )}

            {/* Always Visible Controls */}
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMusic}
                style={{
                  background: isPlaying ? 'var(--accent-color)' : 'transparent',
                  border: '1px solid var(--text-secondary)',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px',
                  color: isPlaying ? 'white' : 'var(--text-primary)',
                  transition: 'all 0.3s ease',
                  boxShadow: isPlaying ? '0 0 15px rgba(0, 180, 216, 0.4)' : 'none'
                }}
                title={isPlaying ? "Pause Music" : "Play Music"}
              >
                {isPlaying ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <Volume2 size={20} />
                  </motion.div>
                ) : (
                  <VolumeX size={20} />
                )}
              </motion.button>

              <button 
                onClick={toggleTheme}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--text-secondary)',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px',
                  color: 'var(--text-primary)',
                  transition: 'all 0.3s ease'
                }}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Hamburger Menu Toggle (Mobile & Tablet) */}
              {!isDesktop && (
                <button 
                  onClick={toggleMobileMenu}
                  style={{
                    background: isMobileMenuOpen ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    padding: '8px',
                    color: isMobileMenuOpen ? 'white' : 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: '0.5rem',
                    zIndex: 1001,
                    transition: 'all 0.3s ease',
                    boxShadow: isMobileMenuOpen ? '0 0 15px rgba(0, 180, 216, 0.4)' : 'none'
                  }}
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: -10 }}
              animate={{ height: 'auto', opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: "70px",
                left: 0,
                right: 0,
                background: theme === 'dark' ? "rgba(26, 26, 26, 0.95)" : "rgba(255, 255, 255, 0.95)",
                backdropFilter: 'blur(15px)',
                borderBottom: "1px solid var(--border-color)",
                overflow: "hidden",
                zIndex: 999,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem 2rem' }}>
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.id);
                    }}
                    style={{
                      padding: '1.2rem 0',
                      color: activeLink === link.id ? 'var(--accent-color)' : 'var(--text-primary)',
                      fontSize: '1.1rem',
                      fontWeight: activeLink === link.id ? '700' : '500',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      transition: 'all 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    {link.name}
                    {activeLink === link.id && (
                      <motion.div
                        layoutId="active-dot"
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: 'var(--accent-color)',
                          boxShadow: '0 0 10px var(--accent-color)'
                        }}
                      />
                    )}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
