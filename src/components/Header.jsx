import React from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';
import './Header.css';

const Header = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="mobile-menu-btn"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          <Menu size={20} />
        </button>
        <h1 className="page-title">Pulpit</h1>
      </div>
      
      <div className="header-center">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Szukaj użytkowników, planów..."
            className="search-input"
          />
        </div>
      </div>
      
      <div className="header-right">
        <button className="notification-btn">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button>
        
        <div className="user-menu">
          <div className="user-avatar">
            <User size={18} />
          </div>
          <div className="user-info">
            <span className="user-name">Admin</span>
            <span className="user-role">Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
