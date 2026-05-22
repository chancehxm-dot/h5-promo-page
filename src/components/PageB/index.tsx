import { useState, useEffect } from 'react';
import type { AppConfig } from '../../config/app.config';
import './styles.css';

interface PageBProps {
  config: AppConfig;
  onInstallClick: () => void;
}

export const PageB = ({ config, onInstallClick }: PageBProps) => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % config.bPageBanners.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [config.bPageBanners.length]);

  const handleInstallClick = () => {
    window.location.href = config.bPageInstallUrl;
    onInstallClick();
  };

  return (
    <main className="page-b">
      {/* Hero Banner Carousel */}
      <div className="banner-carousel">
        {config.bPageBanners.map((banner, index) => (
          <div
            key={index}
            className={`banner-slide ${index === currentBanner ? 'active' : ''}`}
            style={{ opacity: index === currentBanner ? 1 : 0, zIndex: index === currentBanner ? 1 : 0 }}
          >
            <img
              src={banner}
              alt={`Banner ${index + 1}`}
              className={`banner-image ${imageLoaded ? 'loaded' : ''}`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        ))}

        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {config.bPageBanners.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentBanner ? 'active' : ''}`}
              onClick={() => setCurrentBanner(index)}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="content-section">
        <div className="content-wrapper">
          <h1 className="page-title">{config.bPageTitle}</h1>
          <p className="page-description">{config.bPageDescription}</p>

          {/* Feature Cards */}
          <div className="feature-cards">
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Thousands of Novels</h3>
              <p>Explore our vast library of captivating stories across all genres</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast Updates</h3>
              <p>Never wait long for new chapters - fresh content daily</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Beautiful Design</h3>
              <p>Immersive reading experience with customizable themes</p>
            </div>
          </div>

          {/* Install Button */}
          <button className="install-button" onClick={handleInstallClick}>
            <span>Continue Reading</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>

          {/* Alternative Link */}
          <p className="alternative-link">
            Already have the app? <a href={config.installUrl}>Open here</a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="page-footer">
        <p>© 2026 {config.appName}. All rights reserved.</p>
      </footer>
    </main>
  );
};
