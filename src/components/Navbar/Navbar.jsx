import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';

const Navbar = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (href) => {
    onNavigate(href);
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`navbar ${isOpen ? 'open' : ''} ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <motion.a 
          href="#home" 
          className="logo"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <img src="/jpg_to_png-removebg-preview.png" alt="FM MECA" />
        </motion.a>

        <div className={`menu-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </motion.div>
        </div>

        <motion.ul 
          className={`nav-links ${isOpen ? 'active' : ''}`}
          initial={{ opacity: 1, x: 0 }}  // Start visible on desktop
          animate={
            window.innerWidth <= 768  // Only animate on mobile
              ? { 
                  x: isOpen ? 0 : "100%",
                  opacity: isOpen ? 1 : 0 
                }
              : { opacity: 1, x: 0 }
          }
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {navLinks.map((link, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 1 }}  // Start visible
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href={link.href} 
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(link.href);
                }}
              >
                <span>{link.name}</span>
                <span>{link.name}</span>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </nav>
  );
};

export default Navbar;