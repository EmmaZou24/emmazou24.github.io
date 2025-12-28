import { Link, NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <h1>Emma Zou</h1>
        </Link>
        <nav className="nav-links">
          {/* <NavLink to="/" end>Home</NavLink> */}
          <NavLink to="/about-me">About Me</NavLink>
          <NavLink to="/experience">Experience</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/music">Music</NavLink>
          <NavLink to="/resume">Resume</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
