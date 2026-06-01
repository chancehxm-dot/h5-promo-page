import { useEffect, useMemo, useState } from 'react';
import * as CryptoJS from 'crypto-js';
import type { AppConfig } from '../../config/app.config';
import './styles.css';

interface PageBProps {
  config: AppConfig;
  onInstallClick: () => void;
}

interface EncryptedArticleResponse {
  version: number;
  algorithm: 'AES-CBC';
  keyHint: string;
  iv: string;
  data: string;
}

interface ArticleContent {
  title: string;
  chapter: string;
  summary: string;
  paragraphs: string[];
}

const articleEndpoint = '/article.json';
const articleKeyPhrase = 'ReadWave PageB article key 2026';
// const IOS_STORE_BASE_URL = 'https://apps.apple.com/us/app/readwave/id6758969190';
// const ANDROID_STORE_URL = 'https://play.google.com/store/apps/details?id=com.nlyt.readwave';
const IOS_STORE_BASE_URL = 'https://apps.apple.com/us/app/novelaria-read-book-booktok/id6587560745';
const ANDROID_STORE_URL = 'https://play.google.com/store/apps/details?id=com.block.juggle';

const getStoreUrl = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  const platform = window.navigator.platform.toLowerCase();
  const maxTouchPoints = window.navigator.maxTouchPoints || 0;
  const isAndroid = userAgent.includes('android');
  const isIOS =
    /iphone|ipad|ipod/.test(userAgent) ||
    (platform === 'macintel' && maxTouchPoints > 1);

  if (isAndroid) {
    return ANDROID_STORE_URL;
  }

  if (isIOS) {
    return IOS_STORE_BASE_URL;
  }

  return IOS_STORE_BASE_URL;
};

const decodeBase64 = (value: string) => {
  const binary = window.atob(value);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
};

const decryptArticleWithWebCrypto = async (payload: EncryptedArticleResponse): Promise<ArticleContent> => {
  if (!window.crypto?.subtle) {
    throw new Error('WebCrypto is unavailable in this browser context');
  }

  const encoder = new TextEncoder();
  const keyDigest = await window.crypto.subtle.digest('SHA-256', encoder.encode(articleKeyPhrase));
  const key = await window.crypto.subtle.importKey('raw', keyDigest, 'AES-CBC', false, ['decrypt']);
  const decrypted = await window.crypto.subtle.decrypt(
    { name: 'AES-CBC', iv: decodeBase64(payload.iv) },
    key,
    decodeBase64(payload.data),
  );

  return JSON.parse(new TextDecoder().decode(decrypted)) as ArticleContent;
};

const decryptArticleWithFallback = (payload: EncryptedArticleResponse): ArticleContent => {
  const key = CryptoJS.SHA256(articleKeyPhrase);
  const iv = CryptoJS.enc.Base64.parse(payload.iv);
  const ciphertext = CryptoJS.enc.Base64.parse(payload.data);
  const decrypted = CryptoJS.AES.decrypt({ ciphertext } as CryptoJS.lib.CipherParams, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const content = decrypted.toString(CryptoJS.enc.Utf8);

  if (!content) {
    throw new Error('Article fallback decrypt failed');
  }

  return JSON.parse(content) as ArticleContent;
};

const decryptArticle = async (payload: EncryptedArticleResponse): Promise<ArticleContent> => {
  if (payload.algorithm !== 'AES-CBC') {
    throw new Error(`Unsupported article algorithm: ${payload.algorithm}`);
  }

  try {
    return await decryptArticleWithWebCrypto(payload);
  } catch {
    return decryptArticleWithFallback(payload);
  }
};

export const PageB = ({ config, onInstallClick }: PageBProps) => {
  const banners = useMemo(
    () => (config.bPageBanners.length > 0 ? config.bPageBanners : ['/1.png', '/2.png', '/3.png', '/4.png']),
    [config.bPageBanners],
  );
  const [currentBanner, setCurrentBanner] = useState(0);
  const [article, setArticle] = useState<ArticleContent | null>(null);
  const [isArticleLoading, setIsArticleLoading] = useState(true);
  const [articleError, setArticleError] = useState('');
  const storeUrl = useMemo(() => getStoreUrl(), []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [banners.length]);

  useEffect(() => {
    let isMounted = true;

    const loadArticle = async () => {
      try {
        setIsArticleLoading(true);
        const response = await fetch(articleEndpoint, { cache: 'no-store' });

        if (!response.ok) {
          throw new Error(`Article request failed: ${response.status}`);
        }

        const encryptedPayload = (await response.json()) as EncryptedArticleResponse;
        const nextArticle = await decryptArticle(encryptedPayload);

        if (isMounted) {
          setArticle(nextArticle);
          setArticleError('');
        }
      } catch (error) {
        if (isMounted) {
          setArticleError(error instanceof Error ? error.message : 'Article failed to load');
        }
      } finally {
        if (isMounted) {
          setIsArticleLoading(false);
        }
      }
    };

    loadArticle();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleInstallClick = () => {
    onInstallClick();
    window.location.href = storeUrl;
  };

  // const goToPreviousBanner = () => {
  //   setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  // };

  // const goToNextBanner = () => {
  //   setCurrentBanner((prev) => (prev + 1) % banners.length);
  // };

  return (
    <main className="page-b">
      <section className="story-carousel" aria-label="Featured story preview">
        <div className="story-carousel__track">
          {banners.map((banner, index) => (
            <img
              key={banner}
              src={banner}
              alt={`Story preview ${index + 1}`}
              className={`story-carousel__image ${index === currentBanner ? 'is-active' : ''}`}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          ))}
        </div>

        {/* <button
          className="story-carousel__control story-carousel__control--prev"
          type="button"
          onClick={goToPreviousBanner}
          aria-label="Previous image"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M15.7 5.3 9 12l6.7 6.7-1.4 1.4L6.2 12l8.1-8.1 1.4 1.4Z" />
          </svg>
        </button>
        <button
          className="story-carousel__control story-carousel__control--next"
          type="button"
          onClick={goToNextBanner}
          aria-label="Next image"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="m8.3 18.7 6.7-6.7-6.7-6.7 1.4-1.4 8.1 8.1-8.1 8.1-1.4-1.4Z" />
          </svg>
        </button> */}

        <div className="story-carousel__dots" aria-label="Choose preview image">
          {banners.map((banner, index) => (
            <button
              key={`${banner}-dot`}
              type="button"
              className={`story-carousel__dot ${index === currentBanner ? 'is-active' : ''}`}
              onClick={() => setCurrentBanner(index)}
              aria-label={`Show image ${index + 1}`}
              aria-current={index === currentBanner}
            />
          ))}
        </div>
      </section>

      <section className="article-shell" aria-live="polite">
        <div className="article-meta">
          <span>{config.appName}</span>
          <span>Exclusive Story</span>
        </div>

        {isArticleLoading ? (
          <div className="article-state">
            <div className="article-state__line" />
            <div className="article-state__line article-state__line--short" />
            <div className="article-state__block" />
          </div>
        ) : articleError ? (
          <div className="article-error" role="alert">
            Content is temporarily unavailable.
          </div>
        ) : article ? (
          <article className="article-content">
            <p className="article-chapter">{article.chapter}</p>
            <h1>{article.title}</h1>
            <p className="article-summary">{article.summary}</p>
            <div className="article-body">
              {article.paragraphs.map((paragraph, index) => (
                <p key={`${paragraph.slice(0, 16)}-${index}`}>{paragraph}</p>
              ))}
            </div>
          </article>
        ) : null}

        <div className="article-actions">
          <button className="install-button" type="button" onClick={handleInstallClick}>
            Continue Reading
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7L8 5Z" />
            </svg>
          </button>
          {/* <a className="open-link" href={storeUrl}>
            Open in app
          </a> */}
        </div>
      </section>
    </main>
  );
};
