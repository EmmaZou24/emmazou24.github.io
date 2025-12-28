import './Page.css';
import { useEffect, useRef } from 'react';
import musicBrace from '../assets/Bracket-cropped.svg';
import barLine from '../assets/bar line.png';

function AboutMe() {
  const textBoxRef = useRef(null);
  const bracketRef = useRef(null);
  const barlineRef = useRef(null);

  useEffect(() => {
    // Calculate sizes once on initial load based on viewport dimensions
    // These values will remain fixed even if window is resized
    const initialViewportWidth = window.innerWidth;
    const initialViewportHeight = window.innerHeight;
    
    // Calculate container height based on viewport (60vh at initial load)
    const containerHeight = Math.max(400, initialViewportHeight * 0.6);
    
    // Calculate bracket width (clamp based on viewport width)
    const bracketWidth = Math.max(40, Math.min(initialViewportWidth * 0.018, 90)); // Compressed horizontally
    
    // Calculate bracket height (scaled by 1.75 to match previous scaleY effect)
    const bracketHeight = containerHeight * 1;
    
    // Calculate barline width (fixed small width)
    const barlineWidth = 20;
    
    // Calculate text box width (clamp based on viewport width)
    const textWidth = Math.max(600, Math.min(initialViewportWidth * 0.83, 1400)); // Increased to 85% and max 1400px
    
    // Calculate all margins/gaps based on initial viewport width (scale with screen size)
    // These will remain static after initial calculation
    const leftEdgeToBracketMargin = Math.max(20, initialViewportWidth * 0.02); // 2% of viewport width, min 20px
    const bracketToTextGap = Math.max(24, initialViewportWidth * 0.02); // 2% of viewport width, min 24px
    const textToBarlineGap = Math.max(24, initialViewportWidth * 0.02); // 2% of viewport width, min 24px
    const barlineToRightEdgeMargin = Math.max(20, initialViewportWidth * 0.02); // 2% of viewport width, min 20px
    
    // Calculate positions for bracket and barline based on fixed margins/gaps
    const bracketLeft = leftEdgeToBracketMargin;
    const barlineRight = barlineToRightEdgeMargin;
    
    // Calculate container padding to account for margins
    const leftMargin = leftEdgeToBracketMargin;
    const rightMargin = barlineToRightEdgeMargin;
    
    // Set CSS custom properties with fixed values (calculated once, remain static)
    document.documentElement.style.setProperty('--about-container-height', `${containerHeight}px`);
    document.documentElement.style.setProperty('--bracket-width', `${bracketWidth}px`);
    document.documentElement.style.setProperty('--bracket-height', `${bracketHeight}px`);
    document.documentElement.style.setProperty('--barline-width', `${barlineWidth}px`);
    document.documentElement.style.setProperty('--barline-height', `${containerHeight}px`);
    document.documentElement.style.setProperty('--text-width', `${textWidth}px`);
    document.documentElement.style.setProperty('--left-margin', `${leftMargin}px`);
    document.documentElement.style.setProperty('--right-margin', `${rightMargin}px`);
    document.documentElement.style.setProperty('--left-edge-to-bracket-margin', `${leftEdgeToBracketMargin}px`);
    document.documentElement.style.setProperty('--bracket-to-text-gap', `${bracketToTextGap}px`);
    document.documentElement.style.setProperty('--text-to-barline-gap', `${textToBarlineGap}px`);
    document.documentElement.style.setProperty('--barline-to-right-edge-margin', `${barlineToRightEdgeMargin}px`);
    document.documentElement.style.setProperty('--bracket-left', `${bracketLeft}px`);
    document.documentElement.style.setProperty('--barline-right', `${barlineRight}px`);
  }, []); // Empty dependency array - only runs once on mount

  // Update bracket and barline heights and positions to match text box
  useEffect(() => {
    const updateHeightsAndPositions = () => {
      if (textBoxRef.current && bracketRef.current && barlineRef.current) {
        const textBox = textBoxRef.current;
        const container = textBox.closest('.about-me-container');
        
        if (container) {
          const textBoxRect = textBox.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          
          const textBoxHeight = textBoxRect.height;
          const textBoxTop = textBoxRect.top - containerRect.top;
          
          // Set heights to match text box
          bracketRef.current.style.height = `${textBoxHeight}px`;
          barlineRef.current.style.height = `${textBoxHeight}px`;
          
          // Position to align with text box top relative to container
          bracketRef.current.style.top = `${textBoxTop}px`;
          barlineRef.current.style.top = `${textBoxTop}px`;
        }
      }
    };

    // Update on mount and when text box height/position changes
    updateHeightsAndPositions();

    // Use ResizeObserver to watch for text box and container changes
    const resizeObserver = new ResizeObserver(() => {
      updateHeightsAndPositions();
    });

    if (textBoxRef.current) {
      resizeObserver.observe(textBoxRef.current);
      const container = textBoxRef.current.closest('.about-me-container');
      if (container) {
        resizeObserver.observe(container);
      }
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="page">
      <h1 className="about-me-heading">About Me</h1>
      <div className="about-me-container">
        <div className="music-brace-container" ref={bracketRef}>
          <img src={musicBrace} alt="Music brace" className="music-brace" />
        </div>
        <div className="page-content" ref={textBoxRef}>
          <p>Hi! I'm Emma, a sophomore at Brown University. I'm pursuing an Sc.B. in Applied Mathematics-Computer Science, and an A.B. in Music.</p>
          <p>I am passionate about how technology interacts with tangible, real-world issues in the environment, equity, education, and more! I have had the pleasure to work on projects applying software engineering, statistics, data science, and AI/ML to flood impact indices, health equity research, and education platforms. In my future work, I hope to explore applications of math and technology to economics, healthcare, and human interaction.
          </p>
          <p>
          At Brown, I am a web developer in the pro-bono Full Stack organization and a mentee in the Mathematics Directed Reading Program studying graph theory and game theory. I am also involved with the music community as an active member of the Brown University Orchestra and chamber music program. Outside of class and extracurriculars, my hobbies include playing viola and piano, solving puzzles, taking photos, and journalling.
          </p>
          <p>
            Please feel free to reach out to me through any of my socials linked below. I'm always happy to chat!
          </p>
        </div>
        <div className="bar-line-container" ref={barlineRef}>
          <img src={barLine} alt="Bar line" className="bar-line" />
        </div>
      </div>
    </div>
  );
}

export default AboutMe;

