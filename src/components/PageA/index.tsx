import { useEffect, useMemo } from 'react';
import type { AppConfig } from '../../config/app.config';
import { allChapters, novelTitle, novelAuthor } from '../../data/novel-chapters';
import { trackPageShow, trackInstallClick } from '../../utils/tracking';
import './styles.css';

interface PageAProps {
  config: AppConfig;
  onInstallClick: () => void;
}

var getStoreUrl = function (config: AppConfig) {
  var userAgent = window.navigator.userAgent.toLowerCase();
  var platform = window.navigator.platform.toLowerCase();
  var maxTouchPoints = window.navigator.maxTouchPoints || 0;
  var isAndroid = userAgent.indexOf('android') !== -1;
  var isIOS =
    /iphone|ipad|ipod/.test(userAgent) ||
    (platform === 'macintel' && maxTouchPoints > 1);

  if (isAndroid) {
    return config.aPageAndroidInstallUrl;
  }
  return config.aPageInstallUrl;
};

export var PageA = function (_a: PageAProps) {
  var config = _a.config;
  var onInstallClick = _a.onInstallClick;

  var storeUrl = useMemo(function () { return getStoreUrl(config); }, [config]);

  useEffect(function () {
    trackPageShow('a_page_show');
  }, []);

  var handleInstallClick = function (e: React.MouseEvent) {
    e.preventDefault();
    trackInstallClick('a_install_click');
    window.location.href = storeUrl;
    onInstallClick();
  };

  return (
    <div className="novel-page">
      {/* Hero Section: Left image + Right info */}
      <section className="hero">
        <div className="hero__inner">
          <img
            src={config.aPageAppIcon}
            alt={novelTitle}
            className="hero__cover"
          />
          <div className="hero__info">
            <h1 className="hero__title">{novelTitle}</h1>
            <p className="hero__author">{novelAuthor}</p>
            <p className="hero__desc">{config.aPageDescription}</p>
          </div>
        </div>
      </section>

      {/* Bounce CTA Button */}
      <div className="cta-bar">
        <a
          href={storeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-bar__button"
          onClick={handleInstallClick}
        >
          {config.aPageButtonText}
        </a>
      </div>

      {/* Trust Signals */}
      <div className="trust">
        <span className="trust__item">
          <span className="trust__check">&#10003;</span> No sign-up to preview
        </span>
        <span className="trust__item">iPhone &amp; Android</span>
      </div>

      {/* Divider */}
      <div className="divider">
        <span className="divider__line"></span>
      </div>

      {/* Reading Area: All 6 Chapters */}
      <section className="reading">
        {allChapters.map(function (chapter) {
          return (
            <div key={chapter.title} className="reading__chapter">
              <h2 className="reading__chapter-title">{chapter.title}</h2>
              {chapter.paragraphs.map(function (paragraph, index) {
                return (
                  <p key={index} className="reading__paragraph">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          );
        })}

        {/* Bottom CTA */}
        <div className="reading__cta">
          <p className="reading__cta-text">
            Enjoyed the preview? Read the full story in the app.
          </p>
          <a
            href={storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-bar__button"
            onClick={handleInstallClick}
          >
            {config.aPageButtonText}
          </a>
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
