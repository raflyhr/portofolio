import React, { useState, useEffect } from 'react';
import { Download, Github, Instagram, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import profileImg from '../assets/images/profile.png';
import htmlIcon from '../assets/images/html.png';
import tailwindIcon from '../assets/images/tailwind.png';
import figmaIcon from '../assets/images/icon_figma.png';
import reactIcon from '../assets/react.svg';
import laravelIcon from '../assets/images/laravel.png';
import jsIcon from '../assets/images/javascript.png';

const HeroSection = ({ theme }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024 && window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth <= 1024 && window.innerWidth > 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section style={{ 
      paddingTop: isMobile ? '7rem' : '10rem', 
      paddingBottom: '5rem',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="container" style={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column-reverse' : 'row',
        justifyContent: 'space-between', 
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
        gap: isMobile ? '3rem' : '4rem'
      }}>
        <div style={{ 
          maxWidth: isMobile ? '100%' : '800px',
          textAlign: isMobile ? 'center' : 'left'
        }}>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ 
              fontSize: isMobile ? '2.5rem' : isTablet ? '3rem' : '3.5rem', 
              marginBottom: '0.5rem',
              lineHeight: 1.2
            }}
          >
            Hi I’m Rafly <span style={{ color: 'var(--accent-color)' }}>Hermansyah</span>
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ 
              fontSize: isMobile ? '1.2rem' : '1.5rem', 
              color: 'var(--accent-color)', 
              marginBottom: '1.5rem' 
            }}
          >
            Frontend Developer
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{ 
              color: 'var(--text-secondary)', 
              marginBottom: '2.5rem', 
              fontSize: isMobile ? '1rem' : '1.1rem', 
              lineHeight: '1.8' 
            }}
          >
            Seorang Frontend Developer yang berdedikasi menciptakan antarmuka web modern dengan keahlian utama pada <strong>HTML</strong>, <strong>CSS</strong>, <strong>JavaScript</strong>, dan <strong>React JS</strong>. Saya menggabungkan desain estetis dengan kode berperforma tinggi untuk menghadirkan pengalaman digital terbaik bagi setiap pengguna.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: isMobile ? 'center' : 'flex-start',
              gap: '1.5rem', 
              flexWrap: 'wrap' 
            }}
          >
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ 
                background: 'var(--accent-color)', 
                color: 'white', 
                padding: '0.8rem 2rem', 
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                border: 'none',
                width: isMobile ? '100%' : 'auto'
              }}
            >
              Contact Me
            </button>
            <div style={{ display: 'flex', gap: '1.2rem', color: 'var(--text-primary)' }}>
              <a href="https://www.instagram.com/rafly_hernyeni/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                <Instagram size={24} style={{ cursor: 'pointer', transition: 'color 0.3s' }} />
              </a>
              <a href="https://www.linkedin.com/in/rafly-hr-0893b02b9/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                <Linkedin size={24} style={{ cursor: 'pointer', transition: 'color 0.3s' }} />
              </a>
              <a href="https://x.com/Rafly270107" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                <Twitter size={24} style={{ cursor: 'pointer', transition: 'color 0.3s' }} />
              </a>
              <a href="https://github.com/raflyhr" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                <Github size={24} style={{ cursor: 'pointer', transition: 'color 0.3s' }} />
              </a>
            </div>
          </motion.div>

          <motion.a 
            href="/CV-Rafly-Hermansyah.png"
            download="CV-Rafly-Hermansyah.png"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            style={{ 
              marginTop: '2.5rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: isMobile ? 'center' : 'flex-start',
              gap: '0.8rem', 
              color: 'var(--text-primary)', 
              fontWeight: 'bold', 
              cursor: 'pointer',
              width: isMobile ? '100%' : 'fit-content',
              padding: '0.8rem 1.2rem',
              borderRadius: '12px',
              border: '2px dashed var(--accent-color)',
              transition: 'all 0.3s ease',
              margin: isMobile ? '2.5rem auto 0 auto' : '2rem 0 0 0',
              textDecoration: 'none'
            }}
            whileHover={{ scale: 1.05, background: 'rgba(0, 180, 216, 0.1)' }}
          >
            <Download size={20} color="var(--accent-color)" />
            <span>Download CV</span>
          </motion.a>
        </div>

        <div style={{ position: 'relative', width: isMobile ? '100%' : 'auto', display: 'flex', justifyContent: 'center' }}>
          {/* Circular Background Decor */}
          <div style={{
            position: 'absolute',
            width: isMobile ? '280px' : '450px',
            height: isMobile ? '280px' : '450px',
            background: theme === 'light' ? 'rgba(0,180,216,0.05)' : 'rgba(255, 255, 255, 0.05)',
            borderRadius: '50%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: -1,
            transition: 'background 0.3s'
          }}></div>

          {/* Profile Image Container */}
          <div style={{
            width: isMobile ? '220px' : isTablet ? '260px' : '300px',
            height: isMobile ? '300px' : isTablet ? '350px' : '400px',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
            position: 'relative',
            boxShadow: theme === 'light' ? '0 10px 40px rgba(0,0,0,0.1)' : '0 10px 30px rgba(0,0,0,0.5)',
            transition: 'all 0.3s',
            background: 'var(--bg-secondary)'
          }}>
            <img 
              src={profileImg} 
              alt="Rafly" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>

          {/* Floating Tech Icons */}
          {[
            { icon: jsIcon, alt: 'JavaScript', top: '5%', right: isMobile ? '-5%' : '-10%' },
            { icon: reactIcon, alt: 'React', bottom: '15%', right: isMobile ? '-8%' : '-15%' },
            { icon: figmaIcon, alt: 'Figma', left: isMobile ? '-5%' : '-15%', top: '25%' },
            { icon: tailwindIcon, alt: 'Tailwind', bottom: '5%', left: isMobile ? '-5%' : '-10%' },
          ].map((tech, index) => (
            <motion.div
              key={index}   
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
              whileHover={{ scale: 1.1, zIndex: 10 }}
              style={{
                position: 'absolute',
                top: tech.top,
                bottom: tech.bottom,
                left: tech.left,
                right: tech.right,
                background: 'var(--bg-secondary)',
                padding: isMobile ? '0.5rem' : '0.8rem',
                borderRadius: '12px',
                boxShadow: 'var(--card-shadow)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2
              }}
            >
              <img src={tech.icon} alt={tech.alt} style={{ width: isMobile ? '24px' : '32px', height: isMobile ? '24px' : '32px', objectFit: 'contain' }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
