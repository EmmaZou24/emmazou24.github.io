import './Footer.css';
import { useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <footer className={`footer ${isHomePage ? 'home-footer-hidden animate-in' : ''}`}>
      <div className="footer-content">
        <a href="mailto:emma_zou@brown.edu">emma_zou@brown.edu</a>
        <a href="https://github.com/EmmaZou24" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/emma-zou-8b1487247/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </footer>
  );
}

export default Footer;

