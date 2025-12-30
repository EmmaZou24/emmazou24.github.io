import './Page.css';
import resumePdf from '../files/Emma Zou - Resume.pdf';

function Resume() {
  const handleOpenFullScreen = () => {
    window.open(resumePdf, '_blank');
  };

  return (
    <div className="page resume-page">
      <div className="resume-container">
        <div className="resume-controls">
          <button 
            className="resume-fullscreen-button"
            onClick={handleOpenFullScreen}
            aria-label="Open resume in new tab"
          >
            Open in New Tab
          </button>
        </div>
        <iframe
          src={resumePdf}
          className="resume-pdf"
          title="Resume PDF"
          type="application/pdf"
        />
      </div>
    </div>
  );
}

export default Resume;

