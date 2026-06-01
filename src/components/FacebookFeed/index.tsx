import { useEffect } from 'react';
import { trackPageShow, trackInstallClick } from '../../utils/tracking';
import './styles.css';

const APP_STORE_URL = 'https://apps.apple.com/us/app/plotfork/id6756102639';

const novelPng = new URL('../../assets/novel.png', import.meta.url).href;
const avatarAlbert = new URL('../../assets/avatar-albert.svg', import.meta.url).href;
const novel1Mp4 = new URL('../../assets/novel-2.mp4', import.meta.url).href;
const novel1Png = new URL('../../assets/novel-1.png', import.meta.url).href;

const trackClick = (eventName: string) => {
  if (eventName === 'b_read_btn_click_1' || eventName === 'b_read_btn_click_2') {
    trackInstallClick(eventName);
  }
};

export const FacebookFeed = () => {
  useEffect(() => {
    trackPageShow('b_page_show', 'facebook', () => {});
  }, []);

  return (
    <main className="fb-page" aria-label="Facebook feed mock page">
      <header className="fb-topbar" aria-label="Facebook navigation">
        <div className="top-actions">
          <button className="circle-action" aria-label="Create" onClick={() => trackClick('b_create_click')}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z" />
            </svg>
          </button>
          <button className="plain-action" aria-label="Search" onClick={() => trackClick('b_search_click')}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M10.8 3.2a7.6 7.6 0 0 1 6.03 12.22l4.06 4.07-1.4 1.4-4.07-4.06A7.6 7.6 0 1 1 10.8 3.2Zm0 2a5.6 5.6 0 1 0 0 11.2 5.6 5.6 0 0 0 0-11.2Z" />
            </svg>
          </button>
          <button className="circle-action messenger" aria-label="Messenger" onClick={() => trackClick('b_messenger_click')}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3.2c-5.03 0-8.8 3.43-8.8 8.08 0 2.65 1.22 5.02 3.18 6.53v3.06l2.9-1.6c.86.23 1.77.35 2.72.35 5.03 0 8.8-3.43 8.8-8.08S17.03 3.2 12 3.2Zm.9 10.83-2.22-2.38-4.34 2.38 4.78-5.06 2.22 2.38 4.34-2.38-4.78 5.06Z" />
            </svg>
          </button>
        </div>

        <nav className="feed-tabs" aria-label="Feed tabs">
          <button className="tab-item active" aria-label="Home" onClick={() => trackClick('b_home_tab_click')}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3.4 10.25 12 3.5l8.6 6.75v9.2c0 .58-.47 1.05-1.05 1.05h-4.62v-6.02H9.07v6.02H4.45c-.58 0-1.05-.47-1.05-1.05v-9.2Z" />
            </svg>
          </button>
          <button className="tab-item" aria-label="Watch" onClick={() => trackClick('b_watch_tab_click')}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="2.9" y="5.2" width="18.2" height="12.7" rx="2.4" />
              <path className="cut" d="m10.3 8.8 5 3-5 3z" />
              <path d="M8.3 20.1h7.4" />
            </svg>
          </button>
          <button className="tab-item" aria-label="Groups" onClick={() => trackClick('b_groups_tab_click')}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="8.2" cy="8.2" r="2.8" />
              <circle cx="16.2" cy="8.9" r="2.3" />
              <path d="M3.7 18.5c.5-3 2.2-4.5 4.7-4.5s4.2 1.5 4.7 4.5" />
              <path d="M13.5 17.8c.44-2.15 1.78-3.24 3.95-3.24 1.83 0 3.11 1.03 3.85 3.09" />
            </svg>
          </button>
          <button className="tab-item" aria-label="Profile" onClick={() => trackClick('b_profile_tab_click')}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8.35" r="4.2" />
              <path d="M5.1 20.1c.78-3.8 3.08-5.7 6.9-5.7s6.12 1.9 6.9 5.7" />
            </svg>
          </button>
          <button className="tab-item" aria-label="Notifications" onClick={() => trackClick('b_notifications_tab_click')}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.45 10.2c0-3.53 2.18-5.77 5.55-5.77s5.55 2.24 5.55 5.77v4.2l1.9 2.8H4.55l1.9-2.8v-4.2Z" />
              <path d="M9.4 19.3c.55 1 1.41 1.5 2.6 1.5s2.05-.5 2.6-1.5" />
            </svg>
          </button>
        </nav>
      </header>

      <section className="post-card">
        <header className="post-header">
          <img className="avatar" src={novelPng} alt="Ryan avatar placeholder" />
          <div className="post-meta">
            <strong className="post-name">Novel</strong>
            <div className="sponsor-line">
              Sponsored · 3h
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm0 1.35c.6.6 1.03 1.38 1.3 2.34H6.7C6.97 4.23 7.4 3.45 8 2.85Zm-3.82 3.7h2.19a9.56 9.56 0 0 0 0 2.9H4.18a5.05 5.05 0 0 1 0-2.9Zm.68 4.25h1.85c.23.86.58 1.6 1.03 2.17a5.18 5.18 0 0 1-2.88-2.17Zm2.95 0h.38c.4 0 .9-.01 1.02 0A6.3 6.3 0 0 1 8 13.15a6.3 6.3 0 0 1-1.21-2.35h1.02Zm1.45 2.17c.45-.57.8-1.31 1.03-2.17h1.85a5.18 5.18 0 0 1-2.88 2.17Zm2.56-3.52H9.63a9.56 9.56 0 0 0 0-2.9h2.19a5.05 5.05 0 0 1 0 2.9Zm-.68-4.25H9.29a7.21 7.21 0 0 0-1.03-2.17 5.18 5.18 0 0 1 2.88 2.17Z" />
              </svg>
            </div>
          </div>
        </header>
        <p className="post-copy">Where The Ice Gives Way by Author-Hartin</p>
        <p className="post-copy">Novel app to read the full story for free.</p>
        <div className="media-stage media-stage-one">
          <video controls autoPlay muted playsInline preload="metadata">
            <source src={novel1Mp4} type="video/mp4" />
          </video>
        </div>
        <div className="caption-row">
          <div className="caption-text">
            <span></span>
            <strong>#Friend Recommended</strong>
          </div>
          <a href={APP_STORE_URL} onClick={() => trackClick('b_read_btn_click_1')}>
            <button className="read-btn">Click to read</button>
          </a>
        </div>
        <div className="engagement-row">
          <div className="reactions">
            <span className="reaction like-dot">●</span>
            <span className="reaction love-dot">●</span>
            <span>8767</span>
          </div>
          <span>30K views</span>
        </div>
        <div className="actions-row">
          <button onClick={() => trackClick('b_like_click_1')}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.7 20.4H4.8V10.2h3.9v10.2Zm2.1-10.2 2.1-5.35c.34-.82 1.36-.98 1.92-.29.28.34.42.77.38 1.21l-.38 4.43h5.15c.9 0 1.55.87 1.3 1.72l-1.95 6.58c-.25.86-1.04 1.45-1.93 1.45h-6.6V10.2Z" />
            </svg>
            Like
          </button>
          <button onClick={() => trackClick('b_comment_click_1')}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4.1 11.5c0-4.04 3.28-7.1 7.9-7.1s7.9 3.06 7.9 7.1-3.28 7.1-7.9 7.1c-.91 0-1.77-.12-2.56-.36L5.2 20l.93-3.47A6.61 6.61 0 0 1 4.1 11.5Z" />
            </svg>
            Comment
          </button>
          <button onClick={() => trackClick('b_share_click_1')}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.2 12.2 12.8 5v4.2C6.9 9.6 4.2 12.77 3.4 18.1c2.08-2.92 4.9-4.25 9.4-4.05v4.35l7.4-6.2Z" />
            </svg>
            Share
          </button>
        </div>
      </section>

      <section className="post-card second-card">
        <header className="post-header">
          <img className="avatar" src={avatarAlbert} alt="Albert avatar placeholder" />
          <div className="post-meta">
            <strong className="post-name">Albert</strong>
            <div className="sponsor-line">
              Sponsored · 2h
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm0 1.35c.6.6 1.03 1.38 1.3 2.34H6.7C6.97 4.23 7.4 3.45 8 2.85Zm-3.82 3.7h2.19a9.56 9.56 0 0 0 0 2.9H4.18a5.05 5.05 0 0 1 0-2.9Zm.68 4.25h1.85c.23.86.58 1.6 1.03 2.17a5.18 5.18 0 0 1-2.88-2.17Zm2.95 0h.38c.4 0 .9-.01 1.02 0A6.3 6.3 0 0 1 8 13.15a6.3 6.3 0 0 1-1.21-2.35h1.02Zm1.45 2.17c.45-.57.8-1.31 1.03-2.17h1.85a5.18 5.18 0 0 1-2.88 2.17Zm2.56-3.52H9.63a9.56 9.56 0 0 0 0-2.9h2.19a5.05 5.05 0 0 1 0 2.9Zm-.68-4.25H9.29a7.21 7.21 0 0 0-1.03-2.17 5.18 5.18 0 0 1 2.88 2.17Z" />
              </svg>
            </div>
          </div>
        </header>
        <p className="post-copy">Must read!!
Most amazing author I have read, these stories go
in order and are addicting and amazing to say the
least, please read and get her more of an au...</p>
        <div className="media-stage media-stage-two">
          <img className="creative creative-two" src={novel1Png} alt="Ad creative placeholder two" />
        </div>
        <div className="caption-row">
          <div className="caption-text">
            <span>The Wolf's Hour</span>
            <strong>#Friend Recommended</strong>
          </div>
          <a href={APP_STORE_URL} onClick={() => trackClick('b_read_btn_click_2')}>
            <button className="read-btn">Click to read</button>
          </a>
        </div>
        <div className="engagement-row">
          <div className="reactions">
            <span className="reaction like-dot">●</span>
            <span className="reaction love-dot">●</span>
            <span>2568</span>
          </div>
          <span>20K views</span>
        </div>
        <div className="actions-row">
          <button onClick={() => trackClick('b_like_click_2')}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.7 20.4H4.8V10.2h3.9v10.2Zm2.1-10.2 2.1-5.35c.34-.82 1.36-.98 1.92-.29.28.34.42.77.38 1.21l-.38 4.43h5.15c.9 0 1.55.87 1.3 1.72l-1.95 6.58c-.25.86-1.04 1.45-1.93 1.45h-6.6V10.2Z" />
            </svg>
            Like
          </button>
          <button onClick={() => trackClick('b_comment_click_2')}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4.1 11.5c0-4.04 3.28-7.1 7.9-7.1s7.9 3.06 7.9 7.1-3.28 7.1-7.9 7.1c-.91 0-1.77-.12-2.56-.36L5.2 20l.93-3.47A6.61 6.61 0 0 1 4.1 11.5Z" />
            </svg>
            Comment
          </button>
          <button onClick={() => trackClick('b_share_click_2')}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.2 12.2 12.8 5v4.2C6.9 9.6 4.2 12.77 3.4 18.1c2.08-2.92 4.9-4.25 9.4-4.05v4.35l7.4-6.2Z" />
            </svg>
            Share
          </button>
        </div>
      </section>
    </main>
  );
};
