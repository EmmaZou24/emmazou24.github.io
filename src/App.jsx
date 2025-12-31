import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutMe from './pages/AboutMe';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Music from './pages/Music';
import Resume from './pages/Resume';
import './App.css';

// Import all images for preloading
import soloImage from './assets/music/solo cool.jpg';
import violasImage from './assets/music/violas.jpg';
import chamberImage from './assets/music/chamber.jpg';
import altoClefSvg from './assets/pixel alto.png';
import barLineImage from './assets/bar line.png';
import musicNoteImage from './assets/music pixel.png';
import fermataImage from './assets/fermata pixel.png';
import trebleImage from './assets/treble pixel.png';
import altoImage from './assets/pixel alto.png';
import bassImage from './assets/bass pixel.png';
import pianoImage from './assets/piano bigger.png';
import integralImage from './assets/projects/integral.png';
import cabImage from './assets/projects/cabnet.png';
import goImage from './assets/projects/mcts_figure.png';
import proofImage from './assets/projects/proof.png';
import floodImage from './assets/projects/utra.png';
import dsbImage from './assets/projects/dsb.png';
import drp1 from './assets/projects/drp1.png';
import drp2 from './assets/projects/drp2.png';
import musicBrace from './assets/Bracket-cropped.svg';
import emmaFruitImage from './assets/emma fruit.jpg';
import fholeImage from './assets/fhole orange.png';

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAboutMePage = location.pathname === '/about-me';
  const isMusicPage = location.pathname === '/music';
  const showFooter = isHomePage || isAboutMePage || isMusicPage;

  // Preload all images when app first loads
  useEffect(() => {
    const imagesToPreload = [
      soloImage,
      violasImage,
      chamberImage,
      altoClefSvg,
      barLineImage,
      musicNoteImage,
      fermataImage,
      trebleImage,
      altoImage,
      bassImage,
      pianoImage,
      integralImage,
      cabImage,
      goImage,
      proofImage,
      floodImage,
      dsbImage,
      drp1,
      drp2,
      musicBrace,
      emmaFruitImage,
      fholeImage,
    ];

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []); // Run once on mount

  // Handle GitHub Pages redirect from 404.html
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const redirectPath = searchParams.get('p');
    if (redirectPath) {
      // Remove the query parameter and update the URL
      const newPath = '/' + redirectPath + location.hash;
      window.history.replaceState(null, '', newPath);
    }
  }, [location]);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="app">
      {!isHomePage && <Header />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-me" element={<AboutMe />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/music" element={<Music />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </main>
      {showFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
