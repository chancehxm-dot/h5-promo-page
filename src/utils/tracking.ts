// GIF 上报工具
export interface TrackingOptions {
  eventName: string;
  platform?: string;
}

export const trackPageShow = (eventName: string, platform = 'facebook', cb?: () => void) => {
  const img = document.createElement('img');
  img.style.display = 'none';

  const url = location.href;
  const domain = new URL(url).hostname.replace('www.', '').split('.')[0];

  const isMobile = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );

  const trackingUrl = isMobile
    ? `https://${location.hostname}/${domain.substring(0, 1)}.gif?s=${domain}m&a=${platform}m&t=${eventName}&_=${Date.now()}`
    : `https://${location.hostname}/${domain.substring(0, 1)}.gif?s=${domain}&a=${platform}&t=${eventName}&_=${Date.now()}`;

  img.src = trackingUrl;
  img.onload = () => {
    cb && cb();
  };
  img.onerror = () => {
    cb && cb();
  };
  document.body.appendChild(img);

  // 清理 img 元素
  setTimeout(() => {
    document.body.removeChild(img);
  }, 100);
};

export const trackInstallClick = (eventName: string, platform = 'facebook') => {
  trackPageShow(eventName, platform);
};
