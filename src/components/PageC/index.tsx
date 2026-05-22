import { useEffect } from 'react';
import type { AppConfig } from '../../config/app.config';
import { trackPageShow, trackInstallClick } from '../../utils/tracking';
import '../PageA/styles.css';

interface PageCProps {
  config: AppConfig;
  onInstallClick: () => void;
}

export const PageC = ({ config, onInstallClick }: PageCProps) => {
  // 页面加载时上报 b_page_show
  useEffect(() => {
    trackPageShow('b_page_show');
  }, []);

  const handleInstallClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // 上报 b_install_click
    trackInstallClick('b_install_click');
    window.location.href = config.cPageInstallUrl;
    onInstallClick();
  };

  return (
    <div className="page-wrap">
      {/* App Icon */}
      <div className="app-icon">
        <img src={config.cPageAppIcon} alt={config.cPageAppName} />
      </div>

      {/* Title */}
      <h1>{config.cPageAppName}</h1>

      {/* Subtitle */}
      <div className="stars">{config.cPageSubtitle}</div>

      {/* Description */}
      <div className="desc">{config.cPageDescription}</div>

      {/* Download Button */}
      <a
        href={config.cPageInstallUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="download-btn"
        onClick={handleInstallClick}
      >
        {config.cPageButtonText}
      </a>

      {/* Footer Links */}
      <div className="footer-links">
        <a href={config.cPagePrivacyUrl} target="_self" rel="noopener noreferrer">
          Privacy Policy
        </a>
        <span className="divider">|</span>
        <a href={config.cPageTermsUrl} target="_self" rel="noopener noreferrer">
          Terms of Service
        </a>
      </div>

      {/* Company Info */}
      <div className="company-info">{config.cPageCopyright}</div>
    </div>
  );
};
