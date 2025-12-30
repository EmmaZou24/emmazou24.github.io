import './Footer.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Footer() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isHomePage) {
      // Delay footer animation to appear last
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500); // Appears after notes/labels (1s delay + 0.6s animation + buffer)
      return () => clearTimeout(timer);
    } else {
      // On other pages, show immediately
      setIsVisible(true);
    }
  }, [isHomePage]);

  return (
    <footer className={`footer ${isHomePage ? (isVisible ? 'animate-in' : 'home-footer-hidden') : ''}`}>
      <div className="footer-content">
        <a href="mailto:emma_zou@brown.edu">emma_zou@brown.edu</a>
        <a href="https://github.com/EmmaZou24" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/emma-zou-8b1487247/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </footer>
  );
}

export default Footer;

