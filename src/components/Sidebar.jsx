import React from 'react';
import { BarChart3, Users, Upload, Folder, Shield, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ activeTab, setActiveTab, collapsed, setCollapsed }) => {
  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: BarChart3, 
      active: activeTab === 'dashboard',
      size: 18
    },
    { 
      id: 'users', 
      label: 'Users', 
      icon: Users, 
      active: activeTab === 'users',
      size: 18
    },
    { 
      id: 'bulk-import', 
      label: 'Bulk Import', 
      icon: Upload, 
      active: activeTab === 'bulk-import',
      size: 18
    },
    { 
      id: 'plans', 
      label: 'Plans', 
      icon: Folder, 
      active: activeTab === 'plans',
      size: 18
    },
    { 
      id: 'security', 
      label: 'Security', 
      icon: Shield, 
      active: activeTab === 'security',
      size: 18
    },
    { 
      id: 'settings', 
      label: 'Settings', 
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
          title={collapsed ? 'Expand menu' : 'Collapse menu'}
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
              <div className="admin-title">Admin Panel</div>
              <div className="admin-version">v2.0.1</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
