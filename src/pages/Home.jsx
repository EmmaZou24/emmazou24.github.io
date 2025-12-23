import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import eighthNote from '../assets/eighth note.png';
import './Home.css';

function Home() {
  const staffContainerRef = useRef(null);

  useEffect(() => {
    // No fixed sizing - let everything scale naturally with viewport
  }, []);

  return (
    <div className="home">
      <section className="music-staff-section">
        <div className="staff-container" ref={staffContainerRef}>
          <svg className="music-staff" viewBox="0 0 1200 200" xmlns="http://www.w3.org/2000/svg">
            {/* Staff lines */}
            <line x1="50" y1="40" x2="1150" y2="40" stroke="#333" strokeWidth="2" />
            <line x1="50" y1="58" x2="1150" y2="58" stroke="#333" strokeWidth="2" />
            <line x1="50" y1="76" x2="1150" y2="76" stroke="#333" strokeWidth="2" />
            <line x1="50" y1="94" x2="1150" y2="94" stroke="#333" strokeWidth="2" />
            <line x1="50" y1="112" x2="1150" y2="112" stroke="#333" strokeWidth="2" />
          </svg>

          <div className="notes-container">
            <Link to="/about-me" className="note-link">
              <div className="note-image-wrapper">
                <img
                  src={eighthNote}
                  alt="About Me note"
                  className="music-note"
                />
              </div>
            </Link>

            <Link to="/experience" className="note-link">
              <div className="note-image-wrapper">
                <img
                  src={eighthNote}
                  alt="Experience note"
                  className="music-note"
                />
              </div>
            </Link>

            <Link to="/projects" className="note-link">
              <div className="note-image-wrapper">
                <img
                  src={eighthNote}
                  alt="Projects note"
                  className="music-note"
                />
              </div>
            </Link>

            <Link to="/music" className="note-link">
              <div className="note-image-wrapper">
                <img
                  src={eighthNote}
                  alt="Music note"
                  className="music-note"
                />
              </div>
            </Link>

            <Link to="/resume" className="note-link">
              <div className="note-image-wrapper">
                <img
                  src={eighthNote}
                  alt="Resume note"
                  className="music-note"
                />
              </div>
            </Link>
          </div>

          <div className="labels-container">
            <Link to="/about-me" className="label-link">
              <span className="note-label">About Me</span>
            </Link>
            <Link to="/experience" className="label-link">
              <span className="note-label">Experience</span>
            </Link>
            <Link to="/projects" className="label-link">
              <span className="note-label">Projects</span>
            </Link>
            <Link to="/music" className="label-link">
              <span className="note-label">Music</span>
            </Link>
            <Link to="/resume" className="label-link">
              <span className="note-label">Resume</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

