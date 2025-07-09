import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Settings from './components/Settings';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <Users />;
      case 'advertising':
        return <div className="tab-content">Analityka Reklam - Coming Soon</div>;
      case 'bulk-import':
        return <div className="tab-content">Import Masowy - Coming Soon</div>;
      case 'plans':
        return <div className="tab-content">Plany - Coming Soon</div>;
      case 'security':
        return <div className="tab-content">Bezpieczeństwo - Coming Soon</div>;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Header 
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
