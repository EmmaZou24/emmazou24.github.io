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
import fholeImage from './assets/fhole orange.png';
import './App.css';

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAboutMePage = location.pathname === '/about-me';
  const isMusicPage = location.pathname === '/music';
  const showFooter = isHomePage || isAboutMePage || isMusicPage;

  // Preload f-hole image early (before Header mounts) to reduce loading delay
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = fholeImage;
    document.head.appendChild(link);
    
    return () => {
      // Cleanup on unmount
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

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
