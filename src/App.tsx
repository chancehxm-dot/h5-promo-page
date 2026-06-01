import { useState, useCallback } from 'react';
import { PageA } from './components/PageA';
import { FacebookFeed } from './components/FacebookFeed';
import { defaultConfig } from './config/app.config';
import './App.css';

function App() {
  const [showPageB, setShowPageB] = useState(false);

  const handleTransitionToPageB = useCallback(() => {
    setShowPageB(true);
  }, []);

  return (
    <div className="app">
      {showPageB ? (
        <FacebookFeed />
      ) : (
        <PageA config={defaultConfig}  onTransition={handleTransitionToPageB} transitionDelay={3500} />
      )}
    </div>
  );
}

export default App;
