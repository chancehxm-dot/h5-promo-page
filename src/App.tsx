import { PageA } from './components/PageA';
// import { PageB } from './components/PageB';
import { PageC } from './components/PageC';
import { usePageVisibility } from './hooks/usePageVisibility';
import { defaultConfig } from './config/app.config';
import './App.css';

function App() {
  const { hasReturned, markInstallClicked } = usePageVisibility();

  // 确定应该显示哪个页面：A面 → 点击安装后返回 → C面
  // B面保留但暂时不使用
  const shouldShowPageC = hasReturned;

  // 处理安装按钮点击
  const handleInstallClick = () => {
    // 标记点击了安装按钮
    markInstallClicked();
  };

  return (
    <div className="app">
      {shouldShowPageC ? (
        <PageC config={defaultConfig} onInstallClick={handleInstallClick} />
      ) : (
        <PageA config={defaultConfig} onInstallClick={handleInstallClick} />
      )}
    </div>
  );
}

export default App;
