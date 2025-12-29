import './Page.css';
import { useEffect, useRef, useState } from 'react';
import musicBrace from '../assets/Bracket-cropped.svg';
import barLine from '../assets/bar line.png';
import emmaFruitImage from '../assets/emma fruit.jpg';

function AboutMe() {
  const textBoxRef = useRef(null);
  const bracketRef = useRef(null);
  const barlineRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Calculate sizes once on initial load based on viewport dimensions
    // These values will remain fixed even if window is resized
    const initialViewportWidth = window.innerWidth;
    const initialViewportHeight = window.innerHeight;
    
    // Calculate container height based on viewport (60vh at initial load)
    const containerHeight = Math.max(400, initialViewportHeight * 0.6);
    
    // Calculate bracket width (clamp based on viewport width)
    // const bracketWidth = Math.max(40, Math.min(initialViewportWidth * 0.018, 90)); // Compressed horizontally
    const bracketWidth = 40;

    // Calculate bracket height (scaled by 1.75 to match previous scaleY effect)
    const bracketHeight = containerHeight * 1;
    
    // Calculate barline width (fixed small width)
    const barlineWidth = 30;
    
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
          
          // Set heights slightly smaller than text box (reduce by 10%)
          const targetBracketHeight = textBoxHeight * 0.93;
          const heightOffset = (textBoxHeight - targetBracketHeight) / 2; // Center the reduced height
          
          // Account for transparent margins in bracket image
          // If bracket has transparent margins (e.g., 10% top + 10% bottom = 20% total),
          // then visible content is 80% of image height
          // Adjust these values based on your actual image margins
          const bracketVisibleContentRatio = 0.998; // 80% of image is actual bracket (20% is margins)
          const bracketImageHeight = targetBracketHeight / bracketVisibleContentRatio; // Scale up to account for margins
          
          // Set height on containers (container shows only the visible bracket part)
          bracketRef.current.style.height = `${targetBracketHeight}px`;
          barlineRef.current.style.height = `${targetBracketHeight}px`;
          
          // Also set height directly on the images to override CSS
          const bracketImage = bracketRef.current.querySelector('.music-brace');
          const barlineImage = barlineRef.current.querySelector('.bar-line');
          
          if (bracketImage) {
            // Set image height to match container height exactly (will compress/stretch)
            bracketImage.style.height = `${targetBracketHeight}px`;
            bracketImage.style.minHeight = `${targetBracketHeight}px`;
            bracketImage.style.maxHeight = `${targetBracketHeight}px`;
            // Position image to show only the bracket part (center it vertically)
            bracketImage.style.objectPosition = 'center';
            bracketImage.style.objectFit = 'fill'; // Use 'fill' to compress/stretch instead of crop
          }
          
          if (barlineImage) {
            barlineImage.style.height = `${targetBracketHeight}px`;
            barlineImage.style.minHeight = `${targetBracketHeight}px`;
            barlineImage.style.maxHeight = `${targetBracketHeight}px`;
          }
          
          // Adjust top position to center the reduced height
          bracketRef.current.style.top = `${textBoxTop + heightOffset}px`;
          barlineRef.current.style.top = `${textBoxTop + heightOffset}px`;
          
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

  useEffect(() => {
    // Trigger fade-in animation on mount
    setIsVisible(true);
  }, []);

  return (
    <div className="page">
      <div className="about-me-container">
        <div className={`music-brace-container ${isVisible ? 'animate-in-bracket' : ''}`} ref={bracketRef}>
          <img src={musicBrace} alt="Music brace" className="music-brace" />
        </div>
        <div className={`page-content ${isVisible ? 'animate-in-content' : ''}`} ref={textBoxRef}>
          <img src={emmaFruitImage} alt="Emma at fruit market" className="emma-fruit-image" />
          <p>Hi! I'm Emma, a sophomore at Brown University pursuing an <b>Sc.B. in Applied Mathematics-Computer Science</b> and an <b>A.B. in Music.</b></p>
          <p>I'm passionate about how technology interacts with tangible, real-world issues in the environment, equity, education, and more! So far, I've enjoyed working on projects that apply software engineering, statistics, data science, and AI/ML to flood impact analysis, health equity research, and education platforms. In my future work, I hope to explore applications of math and technology to economics, healthcare, and human-centered systems.</p>
          <p>At Brown, I'm a web developer in the pro-bono <a href="https://www.fullstackatbrown.com/" target="_blank" rel="noopener noreferrer">Full Stack</a> organization and a mentee in the <a href="https://sites.google.com/brown.edu/drp-brown-math/home?authuser=0" target="_blank" rel="noopener noreferrer">Mathematics Directed Reading Program</a> studying graph theory and game theory. I'm also active in the music community as a member of the <a href="https://orchestra.brown.edu/" target="_blank" rel="noopener noreferrer">Brown University Orchestra</a> and the chamber music program. Outside of academics, I enjoy playing viola and piano, solving puzzles, photography, and journaling.</p>
          <p>Please feel free to reach out to me through any of my socials linked below. I'm always happy to chat!</p>
        </div>
        <div className={`bar-line-container ${isVisible ? 'animate-in-bracket' : ''}`} ref={barlineRef}>
          <img src={barLine} alt="Bar line" className="bar-line" />
        </div>
      </div>
    </div>
  );
}

export default AboutMe;

