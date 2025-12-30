import './Page.css';
import { useState, useRef, useEffect } from 'react';
import musicNoteImage from '../assets/music pixel.png';
import fermataImage from '../assets/fermata pixel.png';
import trebleImage from '../assets/treble pixel.png';
import altoImage from '../assets/pixel alto.png';
import bassImage from '../assets/bass pixel.png';

function Experience() {
  const [activeTab, setActiveTab] = useState('experience');
  const [experienceIndex, setExperienceIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null); // 'left' or 'right' for swipe animation
  const [isAnimating, setIsAnimating] = useState(false);
  const [prevExperienceIndex, setPrevExperienceIndex] = useState(0);
  const [fermataPosition, setFermataPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [skillsTabVisible, setSkillsTabVisible] = useState(false);
  const [experienceTabVisible, setExperienceTabVisible] = useState(false);
  const [musicNoteAnimation, setMusicNoteAnimation] = useState(null); // 'left', 'right', or null
  const [musicNoteKey, setMusicNoteKey] = useState(0); // Force re-render for animation reset
  const experienceButtonRef = useRef(null);
  const technicalSkillsButtonRef = useRef(null);

  // Sample experience data - replace with your actual experience
  // org field can be a string OR an array of objects: [{text: 'Part', link: 'url'}, {text: ' rest'}]
  const experience = [
    { 
      title: 'Software Engineering Intern', 
      description: 'End-to-end engineered core UI/UX and backend components for the education platform Integral serving 50,000+ active students. Participated in regular design meetings and code reviews. Utilized version control, CI/CD pipelines, and Agile development practices to implement central features for a major platform update deployed across 3 school districts.',
      year: 'Summer – Fall 2025',
      org: [{text: 'Integral', link: 'https://useintegral.app/'}]
      // Can also be: [{text: 'Organization', link: 'https://...'}, {text: ' Name'}]
    },
    { 
      title: 'Undergraduate Researcher', 
      description: 'Collaborated with researchers and faculty to apply geospatial statistical methods to flood vulnerability analysis. Awarded funding from the Brown University Undergraduate Teaching and Research Award and the Equitable Climate Futures Initiative for leading flood hotspot analysis and integrating results with population disaggregation models developed by other researchers, producing visualizations of demographic-based flood risk.',
      year: 'Summer – Fall 2025',
      org: [
        {text: 'Brown Data Science Institute', link: 'https://dsi.brown.edu/research'},
        {text: ' and '},
        {text: 'Institute at Brown for Environment and Society', link: 'https://ibes.brown.edu/research'},
      ]
    },
    { 
      title: 'Website Master', 
      description: 'Deploys page and information updates for the orchestra website used by the Brown and Providence community to view concert and orchestra information. Conducts maintenance, using JavaScript and React.',
      year: 'Fall 2025 – Present',
      org: [{text: 'Brown University Orchestra', link: 'https://orchestra.brown.edu/'}]
      // Can also be: [{text: 'Organization', link: 'https://...'}, {text: ' Name'}]
    },
    { 
      title: 'Web Developer', 
      description: 'Works with a team of developers, designers, and product managers to end-to-end develop pro-bono websites for non-profits, Brown student organizations, and research groups.',
      year: 'Fall 2025 – Present',
      org: [{text: 'Full Stack @ Brown', link: 'https://www.fullstackatbrown.com/'}]
      // Can also be: [{text: 'Organization', link: 'https://...'}, {text: ' Name'}]
    },
    { 
      title: 'Technical Fellow', 
      description: 'Collaborated with other fellows to discuss classic and recent studies of AI safety and alignment. Participated in workshops to evaluate model robustness, alignment, and interpretability.',
      year: 'Spring 2025',
      org: [{text: 'Brown AI Safety Team', link: 'https://www.baist.ai/'}]
      // Can also be: [{text: 'Organization', link: 'https://...'}, {text: ' Name'}]
    },
  ];

  // Technical skills data - three columns
  const technicalSkills = {
    column1: [
      'Python', 'Java', 'R', 'JavaScript/TypeScript', 'HTML/CSS', 'Node.js', 'React', 'PyTorch', 'Tensorflow', 'Dart/Flutter'
    ],
    column2: ['Git', 'Firebase', 'Google Colab', 'Chrome DevTools', 'Microsoft Office Suite', 'Google Workspace', 'LaTeX', 'ArcGIS Pro'],
    column3: ['Data visualization', 'Reusable data pipelines', 'Model evaluation', 'Version control', 'CI/CD', 'Full stack development', 'AI-assisted workflows', 'Code review & debugging', 'Technical writing', 'Geospatial statistics', 'Machine learning']
  };

  const handleNext = (tab) => {
    // Check if we're wrapping around (going from last to first)
    let isWrapping = false;
    if (tab === 'experience') {
      isWrapping = experienceIndex === experience.length - 1;
    }
    
    // If wrapping, animate leftmost note (opposite), otherwise animate rightmost note (normal)
    setMusicNoteAnimation(isWrapping ? 'left' : 'right');
    setMusicNoteKey(prev => prev + 1);
    
    // If wrapping, swipe right (opposite), otherwise swipe left (normal)
    setSwipeDirection(isWrapping ? 'right' : 'left');
    setIsAnimating(true);
    
    // Store previous index
    if (tab === 'experience') {
      setPrevExperienceIndex(experienceIndex);
      setExperienceIndex((prev) => (prev + 1) % experience.length);
    }
    
    setTimeout(() => {
      setMusicNoteAnimation(null);
      setSwipeDirection(null);
      setIsAnimating(false);
    }, 500); // Reset after animation
  };

  const handlePrevious = (tab) => {
    // Check if we're wrapping around (going from first to last)
    let isWrapping = false;
    if (tab === 'experience') {
      isWrapping = experienceIndex === 0;
    }
    
    // If wrapping, animate rightmost note (opposite), otherwise animate leftmost note (normal)
    setMusicNoteAnimation(isWrapping ? 'right' : 'left');
    setMusicNoteKey(prev => prev + 1);
    
    // If wrapping, swipe left (opposite), otherwise swipe right (normal)
    setSwipeDirection(isWrapping ? 'left' : 'right');
    setIsAnimating(true);
    
    // Store previous index
    if (tab === 'experience') {
      setPrevExperienceIndex(experienceIndex);
      setExperienceIndex((prev) => (prev - 1 + experience.length) % experience.length);
    }
    
    setTimeout(() => {
      setMusicNoteAnimation(null);
      setSwipeDirection(null);
      setIsAnimating(false);
    }, 500); // Reset after animation
  };

  useEffect(() => {
    // Trigger fade-in animation on mount
    setIsVisible(true);
    setExperienceTabVisible(true); // Also trigger experience tab animation on initial load
    // Disable initial load flag after animation completes
    setTimeout(() => {
      setIsInitialLoad(false);
    }, 1000); // After animation completes (0.7s animation + buffer)
  }, []);

  useEffect(() => {
    // Reset animation when switching to technical skills tab
    if (activeTab === 'technicalSkills') {
      setSkillsTabVisible(false);
      setExperienceTabVisible(false);
      // Small delay to reset animation
      setTimeout(() => {
        setSkillsTabVisible(true);
      }, 10);
    } else if (activeTab === 'experience') {
      setExperienceTabVisible(false);
      setSkillsTabVisible(false);
      // Small delay to reset animation
      setTimeout(() => {
        setExperienceTabVisible(true);
      }, 10);
    }
  }, [activeTab]);

  useEffect(() => {
    const updateFermataPosition = () => {
      if (activeTab === 'experience' && experienceButtonRef.current) {
        const buttonRect = experienceButtonRef.current.getBoundingClientRect();
        const containerRect = experienceButtonRef.current.parentElement.getBoundingClientRect();
        const position = buttonRect.left - containerRect.left + (buttonRect.width / 2) - 12; // 12px is half of fermata width
        setFermataPosition(position);
      } else if (activeTab === 'technicalSkills' && technicalSkillsButtonRef.current) {
        const buttonRect = technicalSkillsButtonRef.current.getBoundingClientRect();
        const containerRect = technicalSkillsButtonRef.current.parentElement.getBoundingClientRect();
        const position = buttonRect.left - containerRect.left + (buttonRect.width / 2) - 12;
        setFermataPosition(position);
      }
    };

    updateFermataPosition();
    window.addEventListener('resize', updateFermataPosition);
    return () => window.removeEventListener('resize', updateFermataPosition);
  }, [activeTab]);

  return (
    <div className="page">
      <div className={`projects-tabs-container ${isVisible ? 'animate-in' : ''}`}>
        <img 
          src={fermataImage} 
          alt="Fermata" 
          className={`projects-tab-fermata ${!isInitialLoad ? 'fermata-transition-enabled' : ''}`}
          style={{ transform: `translateX(${fermataPosition}px)` }}
        />
        <button 
          ref={experienceButtonRef}
          className={`projects-tab-button ${activeTab === 'experience' ? 'active' : ''}`}
          onClick={() => setActiveTab('experience')}
        >
          Experience
        </button>
        <button 
          ref={technicalSkillsButtonRef}
          className={`projects-tab-button ${activeTab === 'technicalSkills' ? 'active' : ''}`}
          onClick={() => setActiveTab('technicalSkills')}
        >
          Tech Skills
        </button>
      </div>
      <div className="projects-content">
        {activeTab === 'experience' && (
          <>
            <div className={`carousel-container experience-tab ${experienceTabVisible ? (isInitialLoad ? 'animate-in-experience-content-initial' : 'animate-in-experience-content') : ''}`}>
              <div className="carousel-content-wrapper">
                {isAnimating && (
                  <div className={`carousel-content swipe-exit-${swipeDirection}`}>
                    <div className="carousel-text-content">
                      <h2>{experience[prevExperienceIndex].title}</h2>
                      <div className="carousel-experience-meta">
                        <span className="carousel-experience-org">
                          {Array.isArray(experience[prevExperienceIndex].org) ? (
                            experience[prevExperienceIndex].org.map((part, idx) => 
                              part.link ? (
                                <a key={idx} href={part.link} target="_blank" rel="noopener noreferrer" className="carousel-experience-org-link">
                                  {part.text}
                                </a>
                              ) : (
                                <span key={idx}>{part.text}</span>
                              )
                            )
                          ) : (
                            experience[prevExperienceIndex].org
                          )}
                        </span>
                        <span className="carousel-experience-year">{experience[prevExperienceIndex].year}</span>
                      </div>
                      <p>{experience[prevExperienceIndex].description}</p>
                    </div>
                  </div>
                )}
                <div className={`carousel-content ${swipeDirection ? `swipe-enter-${swipeDirection}` : ''}`}>
                  <div className="carousel-text-content">
                    <h2>{experience[experienceIndex].title}</h2>
                    <div className="carousel-experience-meta">
                      <span className="carousel-experience-org">
                        {Array.isArray(experience[experienceIndex].org) ? (
                          experience[experienceIndex].org.map((part, idx) => 
                            part.link ? (
                              <a key={idx} href={part.link} target="_blank" rel="noopener noreferrer" className="carousel-experience-org-link">
                                {part.text}
                              </a>
                            ) : (
                              <span key={idx}>{part.text}</span>
                            )
                          )
                        ) : (
                          experience[experienceIndex].org
                        )}
                      </span>
                      <span className="carousel-experience-year">{experience[experienceIndex].year}</span>
                    </div>
                    <p>{experience[experienceIndex].description}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={`carousel-controls experience-carousel-controls ${experienceTabVisible ? (isInitialLoad ? 'animate-in-experience-controls-initial' : 'animate-in-experience-controls') : ''}`}>
              <button 
                className="carousel-button carousel-button-triangle"
                onClick={() => handlePrevious('experience')}
                aria-label="Previous"
              >
                ◀
              </button>
              <div className="music-notes-container" key={musicNoteKey}>
                <img 
                  src={musicNoteImage} 
                  alt="Music Note" 
                  className={`music-note-indicator ${musicNoteAnimation === 'left' ? 'music-note-up' : ''}`}
                />
                <img 
                  src={musicNoteImage} 
                  alt="Music Note" 
                  className="music-note-indicator"
                />
                <img 
                  src={musicNoteImage} 
                  alt="Music Note" 
                  className={`music-note-indicator ${musicNoteAnimation === 'right' ? 'music-note-up' : ''}`}
                />
              </div>
              <button 
                className="carousel-button carousel-button-triangle"
                onClick={() => handleNext('experience')}
                aria-label="Next"
              >
                ▶
              </button>
            </div>
          </>
        )}
        {activeTab === 'technicalSkills' && (
          <div className="technical-skills-container">
            <div className="technical-skills-column">
              <div className={`technical-skills-icon-container technical-skills-icon-container-treble ${skillsTabVisible ? (isInitialLoad ? 'animate-in-skills-icons-initial' : 'animate-in-skills-icons') : ''}`}>
                <img src={trebleImage} alt="Treble clef" className="technical-skills-icon technical-skills-icon-treble" />
              </div>
              <div className={`technical-skills-column-content ${skillsTabVisible ? (isInitialLoad ? 'animate-in-skills-columns-initial' : 'animate-in-skills-columns') : ''}`}>
                {technicalSkills.column1.map((skill, index) => (
                  <div key={index} className="technical-skill-item">{skill}</div>
                ))}
              </div>
            </div>
            <div className="technical-skills-column">
              <div className={`technical-skills-icon-container technical-skills-icon-container-alto ${skillsTabVisible ? (isInitialLoad ? 'animate-in-skills-icons-initial' : 'animate-in-skills-icons') : ''}`}>
                <img src={altoImage} alt="Alto clef" className="technical-skills-icon technical-skills-icon-alto" />
              </div>
              <div className={`technical-skills-column-content ${skillsTabVisible ? (isInitialLoad ? 'animate-in-skills-columns-initial' : 'animate-in-skills-columns') : ''}`}>
                {technicalSkills.column2.map((skill, index) => (
                  <div key={index} className="technical-skill-item">{skill}</div>
                ))}
              </div>
            </div>
            <div className="technical-skills-column">
              <div className={`technical-skills-icon-container technical-skills-icon-container-bass ${skillsTabVisible ? (isInitialLoad ? 'animate-in-skills-icons-initial' : 'animate-in-skills-icons') : ''}`}>
                <img src={bassImage} alt="Bass clef" className="technical-skills-icon technical-skills-icon-bass" />
              </div>
              <div className={`technical-skills-column-content ${skillsTabVisible ? (isInitialLoad ? 'animate-in-skills-columns-initial' : 'animate-in-skills-columns') : ''}`}>
                {technicalSkills.column3.map((skill, index) => (
                  <div key={index} className="technical-skill-item">{skill}</div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Experience;
