import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import SuperAdmin from './components/SuperAdmin';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'advertising':
        return <div className="tab-content">Analityka Reklam - Coming Soon</div>;
      case 'bulk-import':
        return <div className="tab-content">Import Masowy - Coming Soon</div>;
      case 'security':
        return <div className="tab-content">Bezpieczeństwo - Coming Soon</div>;
      case 'users-and-plans':
        return <SuperAdmin />;
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
