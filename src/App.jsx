import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import projectTemora from './assets/images/project_temora.png';
import projectDeepchock from './assets/images/project_deepchock.png';
import projectNeoRain from './assets/images/project_neorain.png';
import aboutProfileImg from './assets/images/about_profile.jpg';
import aboutBg from './assets/images/Group 19.png';
import ParticleBackground from './components/ParticleBackground';
import certAI from './assets/images/cert_ai.png';
import certFinance from './assets/images/cert_finance.png';
import arrowRight from './assets/images/arrow-right 1.png';
import htmlIcon from './assets/images/html.png';
import jsIcon from './assets/images/javascript.png';
import css3Icon from './assets/images/css3.png';
import figmaIcon from './assets/images/icon_figma.png';
import nodejsIcon from './assets/images/nodejs.png';
import bootstrapIcon from './assets/images/bootstrap.png';
import tailwindIcon from './assets/images/tailwind.png';
import reactIcon from './assets/react.svg';
import vscodeIcon from './assets/images/vscode.png';
import { Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BackToTop from './components/BackToTop';


import LoadingScreen from './components/LoadingScreen';

function App() {
  // Loading state
  const [loading, setLoading] = React.useState(true);
  
  // Theme state
  const [theme, setTheme] = React.useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  // Responsive state
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = React.useState(window.innerWidth <= 1024 && window.innerWidth > 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth <= 1024 && window.innerWidth > 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Theme effect
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Form state
  const [formData, setFormData] = React.useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [showAllProjects, setShowAllProjects] = React.useState(false);

  const projectsData = [
    {
      id: 1,
      name: "Temora Coffee",
      category: "Web Development",
      description: "Website landing page untuk brand kopi dengan desain elegan dan modern.",
      image: projectTemora,
      link: "https://temora-coffee-khaki.vercel.app/"
    },
    {
      id: 2,
      name: "Deep Chock Ubi",
      category: "Web Development",
      description: "Platform e-commerce untuk produk camilan ubi dengan antarmuka yang menarik.",
      image: projectDeepchock,
      link: "https://www.deepchock.shop/"
    },
    {
      id: 3,
      name: "NeoRain",
      category: "Web Development (AI Support)",
      description: "Platform komprehensif untuk memantau, mengevaluasi, dan meningkatkan kesehatan mentalmu dengan dukungan AI dan analisis mendalam.",
      image: projectNeoRain,
      link: "https://neorain.vercel.app/"
    }
  ];

  // Certificate Modal State
  const [selectedCert, setSelectedCert] = React.useState(null);

  const certificates = [
    {
      id: 1,
      title: "Belajar Dasar AI",
      issuer: "Dicoding Indonesia",
      image: certAI,
      downloadName: "Sertifikat_AI.png",
      description: "Sertifikat ini menunjukkan pemahaman mendasar tentang konsep Artificial Intelligence, Machine Learning, dan bagaimana AI mentransformasi industri modern."
    },
    {
      id: 2,
      title: "Introduction to Financial Literacy",
      issuer: "Dicoding Indonesia",
      image: certFinance,
      downloadName: "Sertifikat_Finance.png",
      description: "Menyelesaikan kursus literasi keuangan yang mencakup pengelolaan anggaran, investasi dasar, dan perencanaan keuangan strategis untuk masa depan."
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const subject = encodeURIComponent(`Contact from ${formData.name} ${formData.lastName}`);
    const body = encodeURIComponent(
      `Name: ${formData.name} ${formData.lastName}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n\n` +
      `Message:\n${formData.message}`
    );
    
    window.location.href = `mailto:raflyhermansyah565@gmail.com?subject=${subject}&body=${body}`;
    
    // Reset form after opening email
    setFormData({ name: '', lastName: '', email: '', phone: '', message: '' });
  };

  const inputStyle = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid var(--border-color)',
    padding: '0.8rem 0',
    color: 'var(--text-primary)',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s'
  };

  const labelStyle = {
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
    display: 'block',
    marginBottom: '0.2rem'
  };

  const inputGroupStyle = {
    flex: '1',
    minWidth: '250px'
  };

  const toolCardStyle = {
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    transition: 'all 0.3s ease',
    boxShadow: 'var(--card-shadow)',
    cursor: 'pointer'
  };

  const toolIconContainerStyle = {
    width: '45px',
    height: '45px',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  };

  const toolIconStyle = {
    width: '28px',
    height: '28px',
    objectFit: 'contain'
  };

  const toolTitleStyle = {
    margin: 0,
    fontSize: '0.95rem',
    fontWeight: '600',
    color: 'var(--text-primary)'
  };

  const toolCategoryStyle = {
    margin: 0,
    fontSize: '0.8rem',
    color: 'var(--text-secondary)'
  };
  return (
    <div className={`app ${theme}`}>
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-animation"></div>
            <ParticleBackground />
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <main>
              <HeroSection theme={theme} />
        
        <section id="about" style={{ padding: isMobile ? '5rem 0' : '8rem 0', overflow: 'hidden' }}>
          <div className="container" style={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center', 
            gap: isMobile ? '3rem' : '4rem', 
            flexWrap: 'wrap' 
          }}>
            
            {/* Left Column - Image */}
            <div style={{ flex: '1', minWidth: '300px', position: 'relative' }}>
               {/* Background Decoration - Recreated with CSS for precise control */}
               {/* Large Dark Circle */}
               <div style={{
                 position: 'absolute',
                 top: '-30%',
                 right: '-20%',
                 width: '300px',
                 height: '300px',
                 borderRadius: '50%',
                 background: 'var(--bg-secondary)',
                 zIndex: -3,
                 opacity: 0.8
               }}></div>

               {/* Rotated Teal Square */}
               <div style={{
                 position: 'absolute',
                 top: '-10%',
                 left: '0%',
                 width: '100%',
                 height: '100%',
                 background: 'linear-gradient(45deg, rgba(0, 180, 216, 0.2), rgba(0, 180, 216, 0))',
                 transform: 'rotate(-5deg)',
                 zIndex: -2,
                 borderRadius: '20px'
               }}></div>

               {/* Darker Overlay Rectangle */}
               <div style={{
                 position: 'absolute',
                 top: '5%',
                 left: '-10%',
                 width: '100%',
                 height: '100%',
                 background: 'rgba(255, 255, 255, 0.05)',
                 transform: 'rotate(5deg)',
                 zIndex: -1,
                 borderRadius: '20px',
                 backdropFilter: 'blur(5px)'
               }}></div>

               {/* Image Card */}
                <div style={{ 
                  position: 'relative',
                  background: 'var(--bg-secondary)', 
                  padding: '10px', 
                  maxWidth: '350px',
                  margin: '0 auto',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '24px',
                  boxShadow: 'var(--card-shadow)'
                }}>
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <img src={aboutProfileImg} alt="About Rafly" style={{ width: '100%', display: 'block', filter: 'grayscale(20%) contrast(1.1)' }} />
                     {/* Overlay gradient for premium look */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }}></div>
                  </div>
               </div>
            </div>

            {/* Right Column - Text */}
            <div style={{ flex: '1', minWidth: '300px', textAlign: isMobile ? 'center' : 'left' }}>
              <h2 style={{ fontSize: isMobile ? '2rem' : '2.5rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>
                About <span style={{ color: 'var(--accent-color)' }}>Me</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
                Halo! Saya Rafly, seorang developer yang berdedikasi menciptakan website yang tidak hanya indah secara visual, tetapi juga fungsional dan responsif. Menguasai ekosistem modern mulai dari <strong>HTML</strong>, <strong>CSS</strong>, hingga <strong>JavaScript</strong>, dan <strong>React JS</strong>.
              </p>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
                Fokus utama saya adalah menghadirkan performa terbaik melalui kode yang bersih dan terstruktur. Saya senang mengubah ide kompleks menjadi solusi digital yang elegan dan mudah digunakan bagi pengguna.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                 Saya selalu terbuka untuk kolaborasi menarik dan tantangan baru dalam dunia pengembangan web. Mari bangun masa depan digital bersama!
              </p>
            </div>

          </div>
        </section>

        <section id="certificates" style={{ padding: isMobile ? '5rem 0' : '8rem 0', background: 'transparent' }}>
          <div className="container">
            <h2 style={{ fontSize: isMobile ? '2rem' : '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>
              Certificates & <span style={{ color: 'var(--accent-color)' }}>Achievements</span>
            </h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(auto-fit, minmax(400px, 1fr))', 
              gap: isMobile ? '2rem' : '3rem', 
              marginBottom: '3rem' 
            }}>
              {certificates.map((cert) => (
                <div key={cert.id} style={{ position: 'relative' }}>
                  <motion.div 
                    whileHover={{ y: -10 }}
                    onClick={() => setSelectedCert(cert)}
                    style={{ 
                      background: 'var(--bg-secondary)', 
                      borderRadius: '24px', 
                      padding: '1.5rem',
                      border: '1px solid var(--border-color)',
                      boxShadow: 'var(--card-shadow)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ overflow: 'hidden', borderRadius: '12px', marginBottom: '1rem' }}>
                      <img src={cert.image} alt={cert.title} style={{ width: '100%', display: 'block' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ color: 'var(--text-primary)', margin: 0 }}>{cert.title}</h4>
                      <a 
                        href={cert.image} 
                        download={cert.downloadName} 
                        onClick={(e) => e.stopPropagation()}
                        style={{ 
                          color: 'var(--accent-color)', 
                          fontSize: '0.9rem',
                          textDecoration: 'none',
                          fontWeight: '500'
                        }}
                      >
                        Download
                      </a>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Show All Button */}
            <div style={{ textAlign: 'center' }}>
              <button style={{
                background: 'var(--accent-color)',
                color: 'white',
                padding: '0.8rem 2rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '500',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 20px rgba(0, 180, 216, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
              >
                Show All
                <img src={arrowRight} alt="" style={{ width: '16px', height: '16px', filter: 'invert(1)' }} />
              </button>
            </div>
          </div>
        </section>

        <section id="project" style={{ padding: isMobile ? '5rem 0' : '8rem 0', background: 'transparent' }}>
          <div className="container">
            {/* Title and Description */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: isMobile ? '2rem' : '2.5rem', marginBottom: '1rem' }}>
                <span style={{ color: 'var(--accent-color)' }}>My</span> Project
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: '1.6', fontSize: '1.05rem' }}>
                Koleksi karya pilihan yang mencakup pengembangan web dinamis dan desain antarmuka modern yang dibangun dengan <strong>JavaScript</strong>, <strong>React</strong>, <strong>Tailwind CSS</strong>, dan teknologi terkini lainnya.
              </p>
              
              {/* Filter Buttons */}
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button style={{
                  background: 'var(--accent-color)',
                  color: 'white',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  border: 'none'
                }}>
                  #Web
                </button>
              </div>
            </div>

            {/* Project Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : (showAllProjects || isTablet) ? '1fr 1fr' : 'repeat(auto-fit, minmax(350px, 1fr))', 
              gap: '2rem', 
              marginBottom: '3rem' 
            }}>
              {projectsData.slice(0, showAllProjects ? projectsData.length : 2).map((project) => (
                <div 
                  key={project.id}
                  style={{ 
                    background: 'var(--bg-primary)', 
                    borderRadius: '24px', 
                    overflow: 'hidden', 
                    border: '1px solid var(--border-color)',
                    boxShadow: 'var(--card-shadow)',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <img src={project.image} alt={project.name} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                  <div style={{ padding: '1.5rem' }}>
                    <span style={{ 
                      color: 'var(--accent-color)', 
                      fontSize: '0.85rem',
                      fontWeight: '500',
                      display: 'block',
                      marginBottom: '0.8rem'
                    }}>
                      {project.category}
                    </span>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ 
                      color: 'var(--text-primary)', 
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      marginBottom: '0.5rem'
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--accent-color)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--text-primary)'}
                    >
                      {project.name}
                    </a>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Show All Button */}
            <div style={{ textAlign: 'center' }}>
              <button 
                onClick={() => setShowAllProjects(!showAllProjects)}
                style={{
                  background: 'var(--accent-color)',
                  color: 'white',
                  padding: '0.8rem 2rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                  border: 'none'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 10px 20px rgba(0, 180, 216, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                {showAllProjects ? 'Show Less' : 'Show All'}
                <motion.img 
                  animate={{ rotate: showAllProjects ? 180 : 0 }}
                  src={arrowRight} 
                  alt="" 
                  style={{ width: '16px', height: '16px', filter: 'invert(1)' }} 
                />
              </button>
            </div>
          </div>
        </section>

        <section id="skill" style={{ padding: isMobile ? '5rem 0' : '8rem 0', background: 'transparent' }}>
          <div className="container">
            {/* Title */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: isMobile ? '2rem' : '2.5rem', marginBottom: '1rem' }}>
                <span style={{ color: 'var(--text-primary)' }}>My</span> <span style={{ color: 'var(--accent-color)' }}>Skill</span>
              </h2>
            </div>

            {/* Intro Text */}
            <p style={{ 
              color: 'var(--text-secondary)', 
              marginBottom: '3rem', 
              fontSize: '1.05rem', 
              maxWidth: '800px', 
              margin: '0 auto 3rem auto',
              textAlign: 'center',
              lineHeight: '1.8'
            }}>
              Kombinasi teknologi dan tools mulai dari fundamental <strong>HTML, CSS</strong>, <strong>JavaScript</strong>, hingga framework modern <strong>React</strong> yang saya gunakan untuk mentransformasi ide menjadi produk digital.
            </p>

            {/* Tools Grid Refactored for Animations */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.2rem'
            }}>
              {[
                { name: "Visual Studio Code", category: "Code Editor", icon: vscodeIcon },
                { name: "HTML", category: "Language", icon: htmlIcon },
                { name: "CSS", category: "Language", icon: css3Icon },
                { name: "Javascript", category: "Language", icon: jsIcon },
                { name: "React JS", category: "Framework", icon: reactIcon },
                { name: "Tailwind CSS", category: "Framework", icon: tailwindIcon },
                { name: "Github", category: "Repository", icon: Github, isComponent: true, bg: '#181717' },
                { name: "Canva", category: "Design App", icon: null, isText: true, bg: '#00C4CC' }
              ].map((skill, index) => (
                <div 
                  key={index}
                  style={toolCardStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 180, 216, 0.2)';
                    e.currentTarget.style.borderColor = 'var(--accent-color)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--card-shadow)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                  }}
                >
                  <div style={{
                    ...toolIconContainerStyle, 
                    background: skill.bg || 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {skill.isComponent ? (
                      <skill.icon size={24} color="white" />
                    ) : skill.isText ? (
                      <span style={{color: 'white', fontWeight: 'bold', fontSize: '0.8rem'}}>{skill.name}</span>
                    ) : (
                      <img src={skill.icon} alt={skill.name} style={toolIconStyle} />
                    )}
                  </div>
                  <div>
                    <h4 style={toolTitleStyle}>{skill.name}</h4>
                    <p style={toolCategoryStyle}>{skill.category}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        <section id="contact" style={{ padding: isMobile ? '5rem 0' : '8rem 0', background: 'transparent' }}>
          <div className="container">
            {/* Title & Description */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: isMobile ? '2rem' : '2.5rem', marginBottom: '1.5rem' }}>
                <span style={{ color: 'var(--accent-color)' }}>Contact</span> <span style={{ color: 'var(--text-primary)' }}>Me</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6', fontSize: '1.05rem' }}>
                Tertarik untuk berkolaborasi dalam project <strong>React</strong> atau punya pertanyaan? Mari terhubung dan diskusikan bagaimana kita bisa mewujudkan ide hebat Anda!
              </p>
            </div>

            {/* Contact Form Card */}
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '24px',
              padding: isMobile ? '2.5rem 1.5rem' : '4rem 3rem',
              maxWidth: '1000px',
              margin: '0 auto',
              boxShadow: 'var(--card-shadow)',
              transition: 'all 0.4s ease'
            }}>
              <form onSubmit={handleSubmit}>
                {/* Row 1: Name & Last Name */}
                <div style={{ display: 'flex', gap: isMobile ? '1.5rem' : '3rem', flexDirection: isMobile ? 'column' : 'row', marginBottom: isMobile ? '1.5rem' : '3rem' }}>
                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John"
                      style={inputStyle} 
                      onFocus={(e) => e.target.style.borderBottomColor = 'var(--accent-color)'}
                      onBlur={(e) => e.target.style.borderBottomColor = 'var(--border-color)'}
                      required
                    />
                  </div>
                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Last Name</label>
                    <input 
                      type="text" 
                      name="lastName" 
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      style={inputStyle} 
                      onFocus={(e) => e.target.style.borderBottomColor = 'var(--accent-color)'}
                      onBlur={(e) => e.target.style.borderBottomColor = 'var(--border-color)'}
                      required
                    />
                  </div>
                </div>

                {/* Row 2: Email & Phone Number */}
                <div style={{ display: 'flex', gap: isMobile ? '1.5rem' : '3rem', flexDirection: isMobile ? 'column' : 'row', marginBottom: isMobile ? '1.5rem' : '3rem' }}>
                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john.doe@example.com"
                      style={inputStyle} 
                      onFocus={(e) => e.target.style.borderBottomColor = 'var(--accent-color)'}
                      onBlur={(e) => e.target.style.borderBottomColor = 'var(--border-color)'}
                      required
                    />
                  </div>
                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+62 812 3456 7890"
                      style={inputStyle} 
                      onFocus={(e) => e.target.style.borderBottomColor = 'var(--accent-color)'}
                      onBlur={(e) => e.target.style.borderBottomColor = 'var(--border-color)'}
                      required
                    />
                  </div>
                </div>

                {/* Row 3: Message */}
                <div style={{ marginBottom: isMobile ? '2.5rem' : '4rem' }}>
                  <label style={labelStyle}>Message</label>
                  <textarea 
                    name="message" 
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Hi, I'd like to discuss about a React project..."
                    style={{ 
                      ...inputStyle, 
                      minHeight: '120px', 
                      resize: 'none',
                      border: '1px solid rgba(0, 180, 216, 0.3)',
                      borderRadius: '8px',
                      padding: '1rem',
                      marginTop: '1rem'
                    }} 
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-color)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(0, 180, 216, 0.3)'}
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div style={{ textAlign: 'center' }}>
                  <button type="submit" style={{
                    background: 'var(--accent-color)',
                    color: 'white',
                    padding: '1rem 3rem',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 10px 20px rgba(0, 180, 216, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      
      <BackToTop />

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 3000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'var(--bg-secondary)',
                borderRadius: '24px',
                maxWidth: '900px',
                width: '100%',
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
                <div style={{ background: '#f8f9fa', padding: '10px', display: 'flex', alignItems: 'center' }}>
                  <img src={selectedCert.image} alt={selectedCert.title} style={{ width: '100%', borderRadius: '10px' }} />
                </div>
                <div style={{ padding: '3rem', position: 'relative' }}>
                  <button 
                    onClick={() => setSelectedCert(null)}
                    style={{
                      position: 'absolute',
                      top: '1.5rem',
                      right: '1.5rem',
                      background: 'transparent',
                      color: 'var(--text-primary)',
                      fontSize: '1.5rem',
                      cursor: 'pointer',
                      opacity: 0.5
                    }}
                  >
                    ×
                  </button>
                  <span style={{ color: 'var(--accent-color)', fontWeight: 'bold', fontSize: '0.9rem' }}>{selectedCert.issuer}</span>
                  <h3 style={{ fontSize: '1.8rem', margin: '0.5rem 0 1.5rem 0', color: 'var(--text-primary)' }}>{selectedCert.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '2rem' }}>
                    {selectedCert.description}
                  </p>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <a 
                      href={selectedCert.image} 
                      download={selectedCert.downloadName}
                      style={{
                        background: 'var(--accent-color)',
                        color: 'white',
                        padding: '0.8rem 1.5rem',
                        borderRadius: '8px',
                        fontWeight: '600',
                        fontSize: '0.9rem'
                      }}
                    >
                      Download Certificate
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer style={{ padding: '2rem 0', borderTop: '1px solid rgba(255, 255, 255, 0.05)', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          © 2026 RY Dev. All rights reserved.
        </p>
      </footer>
      

      
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
