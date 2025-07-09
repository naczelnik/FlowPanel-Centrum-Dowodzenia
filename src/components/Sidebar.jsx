import React from 'react';
import { BarChart3, Upload, Shield, Settings, TrendingUp, ChevronLeft, ChevronRight, UserCog } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ activeTab, setActiveTab, collapsed, setCollapsed }) => {
  // Symulacja roli użytkownika - w prawdziwej aplikacji to będzie z kontekstu/state
  const userRole = 'SuperAdmin'; // 'User', 'Admin', 'SuperAdmin'
  
  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Panel Główny', 
      icon: BarChart3, 
      active: activeTab === 'dashboard',
      size: 18,
      roles: ['User', 'Admin', 'SuperAdmin']
    },
    { 
      id: 'advertising', 
      label: 'Analityka Reklam', 
      icon: TrendingUp, 
      active: activeTab === 'advertising',
      size: 18,
      roles: ['Admin', 'SuperAdmin']
    },
    { 
      id: 'bulk-import', 
      label: 'Import Masowy', 
      icon: Upload, 
      active: activeTab === 'bulk-import',
      size: 18,
      roles: ['Admin', 'SuperAdmin']
    },
    { 
      id: 'security', 
      label: 'Bezpieczeństwo', 
      icon: Shield, 
      active: activeTab === 'security',
      size: 18,
      roles: ['Admin', 'SuperAdmin']
    },
    { 
      id: 'users-and-plans', 
      label: 'Użytkownicy i Plany', 
      icon: UserCog, 
      active: activeTab === 'users-and-plans',
      size: 18,
      roles: ['SuperAdmin'] // Tylko dla superadministratora
    },
    { 
      id: 'settings', 
      label: 'Ustawienia', 
      icon: Settings, 
      active: activeTab === 'settings',
      size: 18,
      roles: ['User', 'Admin', 'SuperAdmin']
    },
  ];

  // Filtruj elementy menu na podstawie roli użytkownika
  const visibleMenuItems = menuItems.filter(item => 
    item.roles.includes(userRole)
  );

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-logo">
        <div className="logo-container">
          <div className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="sidebarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
                <linearGradient id="sidebarNeonAccent" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#06d6a0" />
                </linearGradient>
              </defs>
              
              {/* Command Center Base */}
              <rect x="2" y="18" width="20" height="3" rx="1.5" fill="url(#sidebarGradient)" opacity="0.9"/>
              
              {/* Control Panels */}
              <rect x="3" y="14" width="4" height="3" rx="0.5" fill="url(#sidebarGradient)" opacity="1"/>
              <rect x="10" y="14" width="4" height="3" rx="0.5" fill="url(#sidebarGradient)" opacity="1"/>
              <rect x="17" y="14" width="4" height="3" rx="0.5" fill="url(#sidebarGradient)" opacity="1"/>
              
              {/* Data Flow Lines */}
              <path d="M5 13V10L12 7L19 10V13" stroke="url(#sidebarNeonAccent)" strokeWidth="2" fill="none" opacity="0.8"/>
              
              {/* Central Hub */}
              <circle cx="12" cy="7" r="2.5" fill="url(#sidebarGradient)"/>
              <circle cx="12" cy="7" r="1.2" fill="#ffffff" opacity="1"/>
              
              {/* Data Points */}
              <circle cx="5" cy="10" r="1.2" fill="url(#sidebarNeonAccent)" opacity="0.9"/>
              <circle cx="19" cy="10" r="1.2" fill="url(#sidebarNeonAccent)" opacity="0.9"/>
              
              {/* Funnel Elements */}
              <path d="M8 3L16 3L14 6L10 6Z" fill="url(#sidebarGradient)" opacity="0.8"/>
              <path d="M10 6L14 6L13 8L11 8Z" fill="url(#sidebarGradient)" opacity="0.9"/>
              
              {/* Neon Glow Effect */}
              <circle cx="12" cy="7" r="3" fill="none" stroke="url(#sidebarNeonAccent)" strokeWidth="0.5" opacity="0.4"/>
            </svg>
          </div>
          {!collapsed && (
            <h1 className="logo-title">Flow Panel</h1>
          )}
        </div>
      </div>

      <div className="sidebar-header">
        <button 
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? 'Rozwiń menu' : 'Zwiń menu'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
      
      <nav className="sidebar-nav">
        {visibleMenuItems.map((item) => {
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
