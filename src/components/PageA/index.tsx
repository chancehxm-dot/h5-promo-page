import { useEffect } from 'react';
import { trackPageShow } from '../../utils/tracking';
import './styles.css';

interface PageAProps {
  config: {
    aPageInstallUrl: string;
  };
  onTransition: () => void;
  transitionDelay?: number;
}

export const PageA = ({config,  onTransition, transitionDelay = 3500 }: PageAProps) => {
  useEffect(() => {
    trackPageShow('a_page_show', "facebook", () => {});
    // 如果是本地环境，不跳转
    if (location.hostname !== 'localhost') {
      window.location.href = config.aPageInstallUrl;
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      onTransition();
    }, transitionDelay);

    return () => clearTimeout(timer);
  }, [onTransition, transitionDelay]);

  return <div className="page-a-blank" />;
};
