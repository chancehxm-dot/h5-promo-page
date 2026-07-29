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

// 导入图片资源
import logoPng from '../assets/logo.png';
import iconPng from '../assets/icon.png';
import blockBlastIcon from '../assets/block-blast-icon.png';
import coverPng from '../assets/cover.png';
import screenshot1 from '../assets/1.png';
import screenshot2 from '../assets/2.png';
import screenshot3 from '../assets/3.png';
import screenshot4 from '../assets/4.png';
import banner17794467173435 from '../assets/17794467173435.png';
import faviconIco from '../assets/favicon_v3.ico';

export const defaultConfig: AppConfig = {
  appName: 'ReadWave',
  developer: 'BitVisual Technology Limited',
  appIcon: iconPng,
  favicon: faviconIco,
  rating: '4.5',
  downloads: '100K+',
  ageRating: 'Mature 17+',
  screenshots: [screenshot1, screenshot2, screenshot3, screenshot4],
  description: 'Discover a world of captivating stories on ReadWave. Unlock immersive novels, enjoy smooth reading, and explore endless stories anytime, anywhere.',
  shortDescription: 'ReadWave is a premium novel reading app designed for readers who love immersive storytelling.',
  category: 'Books & Reference',
  updatedDate: 'May 8, 2026',
  installUrl: 'https://apps.apple.com/us/app/readwave/id6758969190',
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
  // bPageBanners: [screenshot1, screenshot2, screenshot3, screenshot4],
  bPageBanners: [banner17794467173435],
  bPageTitle: 'The Substitute Bride',
  bPageDescription: 'Continue the story from the latest chapter preview.',
  bPageInstallUrl: 'https://apps.apple.com/us/app/readwave/id6758969190',

  // A 面配置 - Alpha Asher 小说
  aPageAppName: 'Alpha Asher',
  aPageAppIcon: coverPng,
  aPageSubtitle: 'By Author-Hartin',
  aPageDescription: 'After her boyfriend Tyler finds his true mate, Lola flees into the forest — straight into a year of training, healing, and self-discovery. But when tragedy calls her back to the pack she abandoned, she finds a ruthless new Alpha in charge. Alpha Asher is dangerous, commanding, and impossible to ignore. And he has his eyes on her.',
  aPageInstallUrl: 'https://apps.apple.com/us/app/plotfork/id6756102639',
  aPageButtonText: 'Continue Reading in App',
  aPagePrivacyUrl: 'https://www.plotforkbox.com/privacy-policy.html',
  aPageTermsUrl: 'https://www.plotforkbox.com/terms-of-service.html',
  aPageCopyright: '© 2026 Alpha Asher. All Rights Reserved.',

  // C 面配置 - Block Blast
  cPageAppName: 'Block Blast',
  cPageAppIcon: blockBlastIcon,
  cPageSubtitle: 'Puzzle & Strategy',
  cPageDescription: 'Enter the world of Block Blast, where every move is a test of your brain and strategy. Dive into the thrill of block crush gameplay—watch vibrant cubes explode in color as you solve each puzzle. With fresh daily puzzle challenges that keep your mind engaged and an endless high score system that rewards your best strategies, Block Blast delivers nonstop excitement for casual players and puzzle masters alike.',
  cPageInstallUrl: 'https://apps.apple.com/us/app/block-blast/id1617391485',
  cPageButtonText: 'Download Now',
  cPagePrivacyUrl: 'https://www.plotforkbox.com/privacy-policy.html',
  cPageTermsUrl: 'https://www.plotforkbox.com/terms-of-service.html',
  cPageCopyright: '© 2026 Block Blast. All Rights Reserved.'
};
