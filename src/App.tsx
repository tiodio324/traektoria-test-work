import { useState } from 'react';
import { VehicleList } from './components/VehicleList';
import { VehicleMap } from './components/VehicleMap';
import './App.scss';

function App() {
  const [currentView, setCurrentView] = useState<'list' | 'map'>('list');

  return (
    <div className="app">
      <header className="app-header">
        <h1>Траектория: Вступительное</h1>
        <nav className="app-nav">
          <button
            className={`nav-btn ${currentView === 'list' ? 'active' : ''}`}
            onClick={() => setCurrentView('list')}
          >
            Список
          </button>
          <button
            className={`nav-btn ${currentView === 'map' ? 'active' : ''}`}
            onClick={() => setCurrentView('map')}
          >
            Карта
          </button>
        </nav>
      </header>

      <main className="app-main">
        {currentView === 'list' && <VehicleList />}
        {currentView === 'map' && <VehicleMap />}
      </main>
    </div>
  );
}

export default App;
