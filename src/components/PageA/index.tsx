import { useEffect } from 'react';
import type { AppConfig } from '../../config/app.config';
import { chapter1Paragraphs, chapter1Title, novelTitle, novelAuthor } from '../../data/novel-chapters';
import { trackPageShow, trackInstallClick } from '../../utils/tracking';
import './styles.css';

interface PageAProps {
  config: AppConfig;
  onInstallClick: () => void;
}

export const PageA = ({ config, onInstallClick }: PageAProps) => {
  useEffect(() => {
    trackPageShow('a_page_show');
  }, []);

  const handleInstallClick = (e: React.MouseEvent) => {
    e.preventDefault();
    trackInstallClick('a_install_click');
    window.location.href = config.aPageInstallUrl;
    onInstallClick();
  };

  return (
    <div className="novel-page">
      {/* Cover Section */}
      <section className="novel-cover">
        <img
          src={config.aPageAppIcon}
          alt={novelTitle}
          className="novel-cover__image"
        />
        <div className="novel-cover__overlay">
          <h1 className="novel-cover__title">{novelTitle}</h1>
          <p className="novel-cover__author">{novelAuthor}</p>
        </div>
      </section>

      {/* Story Content */}
      <section className="novel-content">
        <div className="novel-content__inner">
          <h2 className="novel-content__chapter-title">{chapter1Title}</h2>

          {chapter1Paragraphs.map(function (paragraph, index) {
            return (
              <p key={index} className="novel-content__paragraph">
                {paragraph}
              </p>
            );
          })}

          {/* Mid-content CTA */}
          <div className="novel-cta">
            <p className="novel-cta__teaser">
              Ready to find out what happens next?
            </p>
            <a
              href={config.aPageInstallUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="novel-cta__button"
              onClick={handleInstallClick}
            >
              {config.aPageButtonText}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="novel-footer">
        <div className="novel-footer__links">
          <a href={config.aPagePrivacyUrl} target="_self" rel="noopener noreferrer">
            Privacy Policy
          </a>
          <span className="novel-footer__divider">|</span>
          <a href={config.aPageTermsUrl} target="_self" rel="noopener noreferrer">
            Terms of Service
          </a>
        </div>
        <div className="novel-footer__copyright">{config.aPageCopyright}</div>
      </footer>
    </div>
  );
};
