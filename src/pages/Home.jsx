import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import eighthNote from '../assets/svg music pixel.svg';
import './Home.css';

function Home() {
  const staffContainerRef = useRef(null);

  useEffect(() => {
    // Calculate sizes once on initial load based on viewport width
    // These values will remain fixed even if window is resized
    const initialViewportWidth = window.innerWidth;
    
    // Calculate staff width (min(95vw, 1425px) at initial load)
    const staffWidth = Math.min(initialViewportWidth * 0.95, 1425);
    
    // Calculate staff height (aspect ratio 1200/200 = 6:1, so height = width/6)
    const staffHeight = staffWidth / 6;
    
    // Calculate note size (clamp(50px, 6vw, 90px) at initial load)
    // Reduced slightly: clamp(45px, 5.4vw, 81px)
    const noteSize = Math.max(45, Math.min(initialViewportWidth * 0.054, 81));
    
    // Calculate label font size (clamp(0.9rem, 1.8vw, 1.6875rem) at initial load)
    // Convert rem to px (assuming 16px base): 0.9rem = 14.4px, 1.6875rem = 27px
    // Slightly bigger than reduced version: 0.75rem = 12px, 1.4375rem = 23px
    const labelFontSize = Math.max(12, Math.min(initialViewportWidth * 0.015, 23));
    
    // Calculate staff line stroke width (clamp(1px, 0.15vw, 2.25px) at initial load)
    const strokeWidth = Math.max(1, Math.min(initialViewportWidth * 0.0015, 2.25));
    
    // Calculate fixed spacing between notes (10% of staff width at initial load)
    const noteGap = staffWidth * 0.10;
    
    // Calculate fixed padding for notes container (20% left, 6.67% right at initial load)
    const notesLeftPadding = staffWidth * 0.20;
    const notesRightPadding = staffWidth * 0.0667;
    
    // Calculate fixed padding for labels container (19.33% left, 6.67% right at initial load)
    const labelsLeftPadding = staffWidth * 0.1933;
    const labelsRightPadding = staffWidth * 0.0667;
    
    // Set CSS custom properties with fixed values
    document.documentElement.style.setProperty('--staff-width', `${staffWidth}px`);
    document.documentElement.style.setProperty('--staff-height', `${staffHeight}px`);
    document.documentElement.style.setProperty('--note-size', `${noteSize}px`);
    document.documentElement.style.setProperty('--label-font-size', `${labelFontSize}px`);
    document.documentElement.style.setProperty('--stroke-width', `${strokeWidth}px`);
    document.documentElement.style.setProperty('--note-gap', `${noteGap}px`);
    document.documentElement.style.setProperty('--notes-left-padding', `${notesLeftPadding}px`);
    document.documentElement.style.setProperty('--notes-right-padding', `${notesRightPadding}px`);
    document.documentElement.style.setProperty('--labels-left-padding', `${labelsLeftPadding}px`);
    document.documentElement.style.setProperty('--labels-right-padding', `${labelsRightPadding}px`);
    
    // Also measure header and footer heights once
    const header = document.querySelector('.header');
    const footer = document.querySelector('.footer');
    
    if (header && footer) {
      const headerHeight = header.offsetHeight;
      const footerHeight = footer.offsetHeight;
      
      document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
      document.documentElement.style.setProperty('--footer-height', `${footerHeight}px`);
    }
  }, []); // Empty dependency array - only runs once on mount

  return (
    <div className="home">
      <section className="music-staff-section">
        <div className="staff-container" ref={staffContainerRef}>
          <svg className="music-staff" viewBox="0 0 1200 200" xmlns="http://www.w3.org/2000/svg">
            {/* Staff lines */}
            <line x1="50" y1="40" x2="1150" y2="40" stroke="#333" className="staff-line" />
            <line x1="50" y1="58" x2="1150" y2="58" stroke="#333" className="staff-line" />
            <line x1="50" y1="76" x2="1150" y2="76" stroke="#333" className="staff-line" />
            <line x1="50" y1="94" x2="1150" y2="94" stroke="#333" className="staff-line" />
            <line x1="50" y1="112" x2="1150" y2="112" stroke="#333" className="staff-line" />
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

