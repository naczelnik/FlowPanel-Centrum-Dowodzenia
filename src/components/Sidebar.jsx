import React from 'react';
import { BarChart3, Users, Upload, Folder, Shield, Settings, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ activeTab, setActiveTab, collapsed, setCollapsed }) => {
  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Panel Główny', 
      icon: BarChart3, 
      active: activeTab === 'dashboard',
      size: 18
    },
    { 
      id: 'users', 
      label: 'Użytkownicy', 
      icon: Users, 
      active: activeTab === 'users',
      size: 18
    },
    { 
      id: 'advertising', 
      label: 'Analityka Reklam', 
      icon: TrendingUp, 
      active: activeTab === 'advertising',
      size: 18
    },
    { 
      id: 'bulk-import', 
      label: 'Import Masowy', 
      icon: Upload, 
      active: activeTab === 'bulk-import',
      size: 18
    },
    { 
      id: 'plans', 
      label: 'Plany', 
      icon: Folder, 
      active: activeTab === 'plans',
      size: 18
    },
    { 
      id: 'security', 
      label: 'Bezpieczeństwo', 
      icon: Shield, 
      active: activeTab === 'security',
      size: 18
    },
    { 
      id: 'settings', 
      label: 'Ustawienia', 
      icon: Settings, 
      active: activeTab === 'settings',
      size: 18
    },
  ];

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">⚡</span>
          {!collapsed && <span className="logo-text">Flow Panel</span>}
        </div>
        <button 
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? 'Rozwiń menu' : 'Zwiń menu'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item ${item.active ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
              title={collapsed ? item.label : ''}
            >
              <Icon size={item.size} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="sidebar-footer">
          <div className="admin-panel-info">
            <div className="admin-icon">⚡</div>
            <div className="admin-text">
              <div className="admin-title">Panel Admina</div>
              <div className="admin-version">v2.0.1</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
