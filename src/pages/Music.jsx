import './Page.css';
import { useState, useEffect } from 'react';
import soloImage from '../assets/music/solo cool.jpg';
import violasImage from '../assets/music/violas.jpg';
import chamberImage from '../assets/music/chamber.jpg';
import altoClefSvg from '../assets/pixel alto.png';
import barLineImage from '../assets/bar line.png';

function Music() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setIsVisible(true);
  }, []);

  return (
    <div className="page music-page">
      <div className={`page-content ${isVisible ? 'animate-in-music-content' : ''}`}>
        <svg className={`music-staff-image ${isVisible ? 'animate-in-music-content' : ''}`} viewBox="0 0 1600 30" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          {/* Alto clef at the leftmost edge */}
          <image 
            href={altoClefSvg} 
            x="47" 
            y="4" 
            width="22" 
            height="22" 
            preserveAspectRatio="xMidYMid meet"
            className="alto-clef-staff"
          />
          {/* Staff lines */}
          <line x1="50" y1="5" x2="1550" y2="5" stroke="#333" className="staff-line" />
          <line x1="50" y1="10" x2="1550" y2="10" stroke="#333" className="staff-line" />
          <line x1="50" y1="15" x2="1550" y2="15" stroke="#333" className="staff-line" />
          <line x1="50" y1="20" x2="1550" y2="20" stroke="#333" className="staff-line" />
          <line x1="50" y1="25" x2="1550" y2="25" stroke="#333" className="staff-line" />
          {/* Bar line at the right end */}
          <g transform="translate(1410, 15) rotate(180)">
            <image 
              href={barLineImage} 
              x="295" 
              y="-15" 
              width="20" 
              height="30" 
              preserveAspectRatio="xMidYMid meet"
              className="bar-line-staff"
            />
          </g>
        </svg>
        <div className={`music-images-container ${isVisible ? 'animate-in-music-content' : ''}`}>
          <img src={soloImage} alt="Solo performance" className="music-image" />
          <img src={violasImage} alt="Violas section" className="music-image" />
          <img src={chamberImage} alt="Chamber music" className="music-image" />
        </div>
        <p>When I'm not spending my time on math and CS, I am an avid classical musician! I have been playing viola for 8 years and piano for 13. Currently, I am in rotation as a principal violist in the Brown University Orchestra, and I play in a string quartet. I've been involved in groups that incorporate different artists too, such as the Brown Ballet Company's Nutcracker pit orchestra, the Brown Arts Institute's Spring Festival of Dance pit orchestra, and the Falmouth Chorale musicians. I also love teaching beginner and intermediate students, and I spend time volunteering in the music community, both as a performer and a teacher.</p>
        <p>In the past, I participated as a violist in music programs like the Boston University Tanglewood Institute's viola workshop, the National Symphony Orchestra (NSO) Summer Music Institute, and the NSO Youth Fellowship chamber music program. I had the honor of performing Enescu Concertpiece as a viola soloist with the Accord Symphony Orchestra and the Montgomery Symphony Orchestra in 2024.</p>
        <p>Some of my favorite pieces I've played are Clarke Viola Sonata, Liszt Un Sospiro, Ravel La Valse, and Debussy String Quartet. You can find some of my recordings <a href="https://www.youtube.com/@memazou/featured" target="_blank" rel="noopener noreferrer">here</a>! My current listening obsessions include Sibelius Symphony No. 1, Janáček String Quartet No. 2, and Stravinsky Petrushka; as for non-classical music, I've been loving Serotinalia by Cricket Blue, Eurus by The Oh Hellos, and anything by The Crane Wives.</p>
        <p>Please reach out if you have any performance, teaching, or volunteering requests, or if you want to chat about anything music-related!</p>
      </div>
    </div>
  );
}

export default Music;

