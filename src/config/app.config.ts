export interface AppConfig {
  // App 基本信息
  appName: string;
  developer: string;
  appIcon: string;
  favicon: string;

  // 统计信息
  rating: string;
  downloads: string;
  ageRating: string;

  // 截图
  screenshots: string[];

  // 描述信息
  description: string;
  shortDescription: string;
  category: string;
  updatedDate: string;

  // 安装链接
  installUrl: string;

  // 安全信息
  safetyItems: Array<{
    icon: string;
    title: string;
    subtitle: string;
  }>;

  // 更新日志
  whatsNew: string[];

  // B 面配置
  bPageBanners: string[];
  bPageTitle: string;
  bPageDescription: string;
  bPageInstallUrl: string;

  // A 面配置 (PlotFork)
  aPageAppName: string;
  aPageAppIcon: string;
  aPageSubtitle: string;
  aPageDescription: string;
  aPageInstallUrl: string;
  aPageButtonText: string;
  aPagePrivacyUrl: string;
  aPageTermsUrl: string;
  aPageCopyright: string;

  // C 面配置 (Block Blast)
  cPageAppName: string;
  cPageAppIcon: string;
  cPageSubtitle: string;
  cPageDescription: string;
  cPageInstallUrl: string;
  cPageButtonText: string;
  cPagePrivacyUrl: string;
  cPageTermsUrl: string;
  cPageCopyright: string;
}

export const defaultConfig: AppConfig = {
  appName: 'ReadWave',
  developer: 'BitVisual Technology Limited',
  appIcon: '/icon.png',
  favicon: '/favicon_v3.ico',
  rating: '4.5',
  downloads: '100K+',
  ageRating: 'Mature 17+',
  screenshots: ['/1.png', '/2.png', '/3.png', '/4.png'],
  description: 'Discover a world of captivating stories on ReadWave. Unlock immersive novels, enjoy smooth reading, and explore endless stories anytime, anywhere.',
  shortDescription: 'ReadWave is a premium novel reading app designed for readers who love immersive storytelling.',
  category: 'Books & Reference',
  updatedDate: 'May 8, 2026',
  installUrl: 'https://apps.apple.com/app/readwave', // iOS App Store 链接
  safetyItems: [
    {
      icon: 'share',
      title: 'This app may share these data types with third parties',
      subtitle: 'Device or other IDs'
    },
    {
      icon: 'cloud',
      title: 'This app may collect these data types',
      subtitle: 'Personal info and Financial info'
    },
    {
      icon: 'lock',
      title: 'Data is encrypted in transit',
      subtitle: ''
    },
    {
      icon: 'trash',
      title: 'You can request that data be deleted',
      subtitle: ''
    }
  ],
  whatsNew: [
    'Optimize the interface display',
    'Fix functional issues'
  ],
  bPageBanners: ['/banner1.png', '/banner2.png', '/banner3.png'],
  bPageTitle: 'Welcome Back!',
  bPageDescription: 'Continue your reading journey with thousands of captivating novels waiting for you.',
  bPageInstallUrl: 'https://apps.apple.com/app/readwave',

  // A 面配置 - PlotFork
  aPageAppName: 'PlotFork',
  aPageAppIcon: '/logo.png',
  aPageSubtitle: 'Discover Interesting Stories',
  aPageDescription: 'PlotFork is a mobile app dedicated to offering an immersive reading experience. It satisfies the diverse reading preferences of every reader with its extensive book collection. Whether you\'re a romantic at heart, a drama lover, or a suspense fanatic, you can find something to your liking here. Download it now and explore fascinating stories.',
  aPageInstallUrl: 'https://apps.apple.com/us/app/plotfork/id6756102639',
  aPageButtonText: 'Download Now',
  aPagePrivacyUrl: 'https://www.plotforkbox.com/privacy-policy.html',
  aPageTermsUrl: 'https://www.plotforkbox.com/terms-of-service.html',
  aPageCopyright: '© 2026 PlotFork. All Rights Reserved.',

  // C 面配置 - Block Blast
  cPageAppName: 'Block Blast',
  cPageAppIcon: '/block-blast-icon.png',
  cPageSubtitle: 'Puzzle & Strategy',
  cPageDescription: 'Enter the world of Block Blast, where every move is a test of your brain and strategy. Dive into the thrill of block crush gameplay—watch vibrant cubes explode in color as you solve each puzzle. With fresh daily puzzle challenges that keep your mind engaged and an endless high score system that rewards your best strategies, Block Blast delivers nonstop excitement for casual players and puzzle masters alike.',
  cPageInstallUrl: 'https://apps.apple.com/us/app/block-blast/id1617391485',
  cPageButtonText: 'Download Now',
  cPagePrivacyUrl: 'https://www.plotforkbox.com/privacy-policy.html',
  cPageTermsUrl: 'https://www.plotforkbox.com/terms-of-service.html',
  cPageCopyright: '© 2026 Block Blast. All Rights Reserved.'
};
