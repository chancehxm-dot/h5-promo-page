import { useEffect } from 'react';
import type { AppConfig } from '../../config/app.config';
import { trackPageShow, trackInstallClick } from '../../utils/tracking';
import './styles.css';

interface PageAProps {
  config: AppConfig;
  onInstallClick: () => void;
}

export const PageA = ({ config, onInstallClick }: PageAProps) => {
  // 页面加载时上报 a_page_show
  useEffect(() => {
    // 为什么会执行两次？
    trackPageShow('a_page_show');
  }, []);

  const handleInstallClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // 上报 a_install_click
    trackInstallClick('a_install_click');
    window.location.href = config.aPageInstallUrl;
    onInstallClick();
  };

  return (
    <div className="page-wrap">
      {/* App Icon */}
      <div className="app-icon">
        <img src={config.aPageAppIcon} alt={config.aPageAppName} />
      </div>

      {/* Title */}
      <h1>{config.aPageAppName}</h1>

      {/* Subtitle */}
      <div className="stars">{config.aPageSubtitle}</div>

      {/* Description */}
      <div className="desc">{config.aPageDescription}</div>

      {/* Download Button */}
      <a
        href={config.aPageInstallUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="download-btn"
        onClick={handleInstallClick}
      >
        {config.aPageButtonText}
      </a>

      {/* Footer Links */}
      <div className="footer-links">
        <a href={config.aPagePrivacyUrl} target="_self" rel="noopener noreferrer">
          Privacy Policy
        </a>
        <span className="divider">|</span>
        <a href={config.aPageTermsUrl} target="_self" rel="noopener noreferrer">
          Terms of Service
        </a>
      </div>

      {/* Company Info */}
      <div className="company-info">{config.aPageCopyright}</div>
    </div>
  );
};
