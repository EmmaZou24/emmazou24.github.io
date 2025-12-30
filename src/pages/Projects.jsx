import './Page.css';
import { useState, useRef, useEffect } from 'react';
import pianoImage from '../assets/piano bigger.png';
import fermataImage from '../assets/fermata pixel.png';
import integralImage from '../assets/projects/integral.png';
import cabImage from '../assets/projects/cabnet.png';
import goImage from '../assets/projects/mcts_figure.png';
import proofImage from '../assets/projects/proof.png';

import floodImage from '../assets/projects/utra.png';
import dsbImage from '../assets/projects/dsb.png';
import drp1 from '../assets/projects/drp1.png';
import drp2 from '../assets/projects/drp2.png';

function Projects() {
  const [activeTab, setActiveTab] = useState('projects');
  const [projectsIndex, setProjectsIndex] = useState(0);
  const [researchIndex, setResearchIndex] = useState(0);
  const [pianoDirection, setPianoDirection] = useState(null); // 'left' or 'right'
  const [pianoKey, setPianoKey] = useState(0); // Force re-render for animation reset
  const [swipeDirection, setSwipeDirection] = useState(null); // 'left' or 'right' for swipe animation
  const [isAnimating, setIsAnimating] = useState(false);
  const [prevProjectsIndex, setPrevProjectsIndex] = useState(0);
  const [prevResearchIndex, setPrevResearchIndex] = useState(0);
  const [fermataPosition, setFermataPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [projectsTabVisible, setProjectsTabVisible] = useState(true); // Start as true since 'projects' is the default tab
  const [researchTabVisible, setResearchTabVisible] = useState(false);
  const projectsButtonRef = useRef(null);
  const researchButtonRef = useRef(null);

  // Sample project data - replace with your actual projects
  const projects = [
    { 
      title: 'Integral', 
      description: 'Implemented and deployed core features for the education platform Integral serving 50k+ students. Redesigned the subpage navigation system of the entire website and created the navigation bar feature. Created new interactive button components used throughout different pages. Wrote and worked with existing APIs to retrieve real data from school districts and integrate it into features like calendars and schedule presets.',
      image: integralImage, // Optional: path to image
      techStack: 'Tech Stack: JavaScript/HTML/CSS, Dart/Flutter, React, Firebase', // Optional: tech stack text
      link: 'https://useintegral.app/' // Optional: URL to link to
    },
    { 
      title: 'C@Bnet', 
      description: 'Currently developing a Chrome extension to add integrated course ratings/warnings, a complex recommendation system, and degree pathway visualization to the current Courses@Brown website used by all Brown students and professors for course registration. Wrote and deployed complex scripts for parsing user data, intercepting web API calls, and altering client/server interactions. Designed and implemented accessible and interactive UI/UX components to display course ratings, warning icons, etc. Project code available upon request.',
      image: cabImage, // Optional: path to image
      techStack: 'Tech Stack: Typescript/HTML/CSS, React, Chrome Extensions', // Optional: tech stack text
      link: null // Optional: URL to link to
    },
    { 
      title: 'Go Agent', 
      description: 'Built a hybrid Go Agent using Monte-Carlo tree sampling and iterative alpha-beta pruning as the capstone project for the Foundations of AI course. Rewarded and guided agent behavior with a weighted combination of heuristics based on territory score calculation, spatial weighting, supervised feature learning, and more. Achieved #2 in performance against agents built by other students in the class.',
      image: goImage, // Optional: path to image
      techStack: 'Tech Stack: Python, PyTorch', // Optional: tech stack text
      link: null // Optional: URL to link to
    },
    { 
      title: 'Proof-writing Portfolio', 
      description: 'Wrote over 30 formal mathematical proofs and analyses as the capstone project for the Art of Writing Mathematics course. Explored and justified theorems and algorithms in set theory, number theory, discrete mathematics, real analysis, and more.',
      image: proofImage,
      techStack: null,
      link: 'https://drive.google.com/file/d/1peSTzIrVRh4KjIqM_HbPePtNyjXBQB3w/view?usp=sharing'
    },
  ];

  // Sample research data - replace with your actual research
  const research = [
    { 
      title: '3D Hotspot Analysis and Flood Vulnerability', 
      description: 'Created scalable open-source code to statistically analyze and visualize 3D spatio-temporal hotspots in multi-dimensional data, supporting 10+ configurable statistical and modeling parameters for flexible exploratory analysis. Implemented advanced geospatial statistical techniques for 3D inputs, such as Getis-Ord Gi* and the Mann-Kendall trend test. Compiled, cleaned, and analyzed flood event data with the code to uncover spatially varying relationships between social vulnerability and flood risk. Awarded funding from the Brown University Undergraduate Teaching and Research Award and the Equitable Climate Futures initiative for research. Project code and documentation available upon request.',
      image: floodImage,
      techStack: 'Tech Stack: Python, GeoPandas, scipy, xarray, etc.',
      link: null
    },
    { 
      title: 'Narrative Data Analysis and Flood Impact Scores', 
      description: 'Developed an algorithm using ML and NLP to extract impact tags and create composite Flood Impact Scores from 5k+ unstructured narrative storm event datapoints. Analyzed, visualized, and interpreted spatio-temporal data distributions to improve understanding of flood impacts in different socio-economic contexts throughout the D.C., Maryland, and Virginia area. Presented findings at a Public Interest Technology University Network research symposium.',
      image: dsbImage,
      techStack: 'Tech Stack: Python, GeoPands, NLTK, etc.',
      link: 'https://github.com/JL72005/PIT-UN-Project4'
    },
    { 
      title: 'Counting Sudoku Solutions', 
      description: 'Researched applications of graph theory, color theory, and chromatic polynomials to the generation of unique and solvable Sudoku puzzles. Presented and awarded the Best Poster Award at the Brown Directed Reading Program poster session.',
      image: drp1,
      techStack: null,
      link: null
    },
    { 
      title: 'Graph Planarity Testing and Street Networks', 
      description: 'Researched and visualized the Hopcroft-Tarjan algorithm for determining the planarity of a graph, and how it can be applied to street network planning and the reduction of street network congestion. Presented at the Brown Directed Reading Program poster session.',
      image: drp2,
      techStack: null,
      link: null
    },
  ];

  const handleNext = (tab) => {
    // Check if we're wrapping around (going from last to first)
    let isWrapping = false;
    if (tab === 'projects') {
      isWrapping = projectsIndex === projects.length - 1;
    } else {
      isWrapping = researchIndex === research.length - 1;
    }
    
    // If wrapping, go opposite direction (right), otherwise normal (left)
    setPianoDirection(isWrapping ? 'right' : 'left');
    setPianoKey(prev => prev + 1);
    // If wrapping, swipe right (opposite), otherwise swipe left (normal)
    setSwipeDirection(isWrapping ? 'right' : 'left');
    setIsAnimating(true);
    
    // Store previous index
    if (tab === 'projects') {
      setPrevProjectsIndex(projectsIndex);
      setProjectsIndex((prev) => (prev + 1) % projects.length);
    } else {
      setPrevResearchIndex(researchIndex);
      setResearchIndex((prev) => (prev + 1) % research.length);
    }
    
    setTimeout(() => {
      setPianoDirection(null);
      setSwipeDirection(null);
      setIsAnimating(false);
    }, 300); // Reset after animation
  };

  const handlePrevious = (tab) => {
    // Check if we're wrapping around (going from first to last)
    let isWrapping = false;
    if (tab === 'projects') {
      isWrapping = projectsIndex === 0;
    } else {
      isWrapping = researchIndex === 0;
    }
    
    // If wrapping, go opposite direction (left), otherwise normal (right)
    setPianoDirection(isWrapping ? 'left' : 'right');
    setPianoKey(prev => prev + 1);
    // If wrapping, swipe left (opposite), otherwise swipe right (normal)
    setSwipeDirection(isWrapping ? 'left' : 'right');
    setIsAnimating(true);
    
    // Store previous index
    if (tab === 'projects') {
      setPrevProjectsIndex(projectsIndex);
      setProjectsIndex((prev) => (prev - 1 + projects.length) % projects.length);
    } else {
      setPrevResearchIndex(researchIndex);
      setResearchIndex((prev) => (prev - 1 + research.length) % research.length);
    }
    
    setTimeout(() => {
      setPianoDirection(null);
      setSwipeDirection(null);
      setIsAnimating(false);
    }, 300); // Reset after animation
  };

  useEffect(() => {
    // Trigger fade-in animation on mount
    setIsVisible(true);
    setProjectsTabVisible(true); // Also trigger projects tab animation on initial load
  }, []);

  useEffect(() => {
    // Reset animation when switching tabs
    if (activeTab === 'projects') {
      setProjectsTabVisible(false);
      setResearchTabVisible(false);
      // Small delay to reset animation
      setTimeout(() => {
        setProjectsTabVisible(true);
      }, 10);
    } else if (activeTab === 'research') {
      setResearchTabVisible(false);
      setProjectsTabVisible(false);
      // Small delay to reset animation
      setTimeout(() => {
        setResearchTabVisible(true);
      }, 10);
    }
  }, [activeTab]);

  useEffect(() => {
    const updateFermataPosition = () => {
      if (activeTab === 'projects' && projectsButtonRef.current) {
        const buttonRect = projectsButtonRef.current.getBoundingClientRect();
        const containerRect = projectsButtonRef.current.parentElement.getBoundingClientRect();
        const position = buttonRect.left - containerRect.left + (buttonRect.width / 2) - 12; // 12px is half of fermata width
        setFermataPosition(position);
      } else if (activeTab === 'research' && researchButtonRef.current) {
        const buttonRect = researchButtonRef.current.getBoundingClientRect();
        const containerRect = researchButtonRef.current.parentElement.getBoundingClientRect();
        const position = buttonRect.left - containerRect.left + (buttonRect.width / 2) - 15;
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
          className="projects-tab-fermata"
          style={{ transform: `translateX(${fermataPosition}px)` }}
        />
        <button 
          ref={projectsButtonRef}
          className={`projects-tab-button ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </button>
        <button 
          ref={researchButtonRef}
          className={`projects-tab-button ${activeTab === 'research' ? 'active' : ''}`}
          onClick={() => setActiveTab('research')}
        >
          Research
        </button>
      </div>
      <div className="projects-content">
        {activeTab === 'projects' && (
          <>
            <div className={`carousel-container ${projectsTabVisible ? 'animate-in-projects-content' : ''}`}>
              <div className="carousel-content-wrapper">
                {isAnimating && (
                  <div className={`carousel-content swipe-exit-${swipeDirection}`}>
                    {projects[prevProjectsIndex].image && (
                      <img 
                        src={projects[prevProjectsIndex].image} 
                        alt={projects[prevProjectsIndex].title}
                        className="carousel-project-image"
                      />
                    )}
                    <div className="carousel-text-content">
                      <h2>{projects[prevProjectsIndex].title}</h2>
                      {projects[prevProjectsIndex].link && (
                        <a 
                          href={projects[prevProjectsIndex].link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="carousel-project-link"
                        >
                          Link
                        </a>
                      )}
                      {projects[prevProjectsIndex].techStack && (
                        <div className="carousel-tech-stack">{projects[prevProjectsIndex].techStack}</div>
                      )}
                      <p>{projects[prevProjectsIndex].description}</p>
                    </div>
                  </div>
                )}
                <div className={`carousel-content ${swipeDirection ? `swipe-enter-${swipeDirection}` : ''}`}>
                  {projects[projectsIndex].image && (
                    <img 
                      src={projects[projectsIndex].image} 
                      alt={projects[projectsIndex].title}
                      className="carousel-project-image"
                    />
                  )}
                  <div className="carousel-text-content">
                    <h2>{projects[projectsIndex].title}</h2>
                    {projects[projectsIndex].link && (
                      <a 
                        href={projects[projectsIndex].link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="carousel-project-link"
                      >
                        Link
                      </a>
                    )}
                    {projects[projectsIndex].techStack && (
                      <div className="carousel-tech-stack">{projects[projectsIndex].techStack}</div>
                    )}
                    <p>{projects[projectsIndex].description}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={`carousel-controls ${projectsTabVisible ? 'animate-in-projects-controls' : ''}`}>
              <button 
                className="carousel-button carousel-button-triangle"
                onClick={() => handlePrevious('projects')}
                aria-label="Previous"
              >
                ◀
              </button>
              <div className={`piano-conveyor-container ${pianoDirection ? `piano-${pianoDirection}` : ''}`} key={pianoKey}>
                <div className="piano-conveyor-track">
                  <img src={pianoImage} alt="Piano" className="carousel-indicator-image" />
                  <img src={pianoImage} alt="Piano" className="carousel-indicator-image" />
                  <img src={pianoImage} alt="Piano" className="carousel-indicator-image" />
                  <img src={pianoImage} alt="Piano" className="carousel-indicator-image" />
                  <img src={pianoImage} alt="Piano" className="carousel-indicator-image" />
                </div>
              </div>
              <button 
                className="carousel-button carousel-button-triangle"
                onClick={() => handleNext('projects')}
                aria-label="Next"
              >
                ▶
              </button>
            </div>
          </>
        )}
        {activeTab === 'research' && (
          <>
            <div className={`carousel-container ${researchTabVisible ? 'animate-in-projects-content' : ''}`}>
              <div className="carousel-content-wrapper">
                {isAnimating && (
                  <div className={`carousel-content swipe-exit-${swipeDirection}`}>
                    {research[prevResearchIndex].image && (
                      <img 
                        src={research[prevResearchIndex].image} 
                        alt={research[prevResearchIndex].title}
                        className="carousel-project-image"
                      />
                    )}
                    <div className="carousel-text-content">
                      <h2>{research[prevResearchIndex].title}</h2>
                      {research[prevResearchIndex].link && (
                        <a 
                          href={research[prevResearchIndex].link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="carousel-project-link"
                        >
                          Link
                        </a>
                      )}
                      {research[prevResearchIndex].techStack && (
                        <div className="carousel-tech-stack">{research[prevResearchIndex].techStack}</div>
                      )}
                      <p>{research[prevResearchIndex].description}</p>
                    </div>
                  </div>
                )}
                <div className={`carousel-content ${swipeDirection ? `swipe-enter-${swipeDirection}` : ''}`}>
                  {research[researchIndex].image && (
                    <img 
                      src={research[researchIndex].image} 
                      alt={research[researchIndex].title}
                      className="carousel-project-image"
                    />
                  )}
                  <div className="carousel-text-content">
                    <h2>{research[researchIndex].title}</h2>
                    {research[researchIndex].link && (
                      <a 
                        href={research[researchIndex].link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="carousel-project-link"
                      >
                        Link
                      </a>
                    )}
                    {research[researchIndex].techStack && (
                      <div className="carousel-tech-stack">{research[researchIndex].techStack}</div>
                    )}
                    <p>{research[researchIndex].description}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={`carousel-controls ${researchTabVisible ? 'animate-in-projects-controls' : ''}`}>
              <button 
                className="carousel-button carousel-button-triangle"
                onClick={() => handlePrevious('research')}
                aria-label="Previous"
              >
                ◀
              </button>
              <div className={`piano-conveyor-container ${pianoDirection ? `piano-${pianoDirection}` : ''}`} key={pianoKey}>
                <div className="piano-conveyor-track">
                  <img src={pianoImage} alt="Piano" className="carousel-indicator-image" />
                  <img src={pianoImage} alt="Piano" className="carousel-indicator-image" />
                  <img src={pianoImage} alt="Piano" className="carousel-indicator-image" />
                  <img src={pianoImage} alt="Piano" className="carousel-indicator-image" />
                  <img src={pianoImage} alt="Piano" className="carousel-indicator-image" />
                </div>
              </div>
              <button 
                className="carousel-button carousel-button-triangle"
                onClick={() => handleNext('research')}
                aria-label="Next"
              >
                ▶
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Projects;

