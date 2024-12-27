import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { MdLightMode, MdDarkMode, MdVisibility, MdSecurity } from 'react-icons/md';
import { FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';

const Header = ({ onToggleIncidents,onToggleThreats }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleAboutUsClick = () => {
    window.open('https://polysia.com/', '_blank');
  };

  const handleRedirect = (url) => {
    window.open(url, '_blank');
  };
  
  return (
    <header className="header">
      <div className="header-left" style={{ flexGrow: 0, flexShrink: 0, marginRight: 'auto' }}>
        <img src="/polysia.png" alt="Polysia Logo" style={{ height: '47px', marginLeft: '-20px' }} /> 
      </div>
      <div className="header-center">
        <button onClick={onToggleIncidents} className="incident-toggle" title="Show Incidents">
          <MdVisibility size={28} />
        </button>
        <button onClick={onToggleThreats} className="threat-toggle" title="Show Threats">
          <MdSecurity size={28} />
        </button> 
        <button onClick={toggleTheme} className="theme-toggle" title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}>
          {theme === 'dark' ? <MdLightMode size={28} /> : <MdDarkMode size={28} />}
        </button>
      </div>
      <div className="header-right">
        <button onClick={handleAboutUsClick} className="about-us" >
          ABOUT US
        </button>
        <button onClick={() => handleRedirect('https://www.linkedin.com/in/polysia-tech/')} className="social-icon">
          <FaLinkedin size={28} />
        </button>
        <button onClick={() => handleRedirect('https://www.instagram.com/polysiatech/')} className="social-icon">
          <FaInstagram size={28} />
        </button>
        <button onClick={() => handleRedirect('https://www.youtube.com/@PolysiaTech')} className="social-icon">
          <FaYoutube size={28} />
        </button>
      </div>
    </header>
  );
};

export default Header;
