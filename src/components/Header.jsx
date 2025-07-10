import React, { useState, useRef, useEffect } from 'react';
import { Bell, User, Menu, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

const Header = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const { user, signOut } = useAuth();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowUserDropdown(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleProfileEdit = () => {
    setShowUserDropdown(false);
    // TODO: Implement profile edit functionality
    console.log('Opening profile edit...');
  };

  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="mobile-menu-btn"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          <Menu size={20} />
        </button>
      </div>
      
      <div className="header-right">
        <button className="notification-btn">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button>
        
        <div className="user-menu-container" ref={dropdownRef}>
          <div 
            className="user-menu"
            onClick={() => setShowUserDropdown(!showUserDropdown)}
          >
            <div className="user-avatar">
              <User size={18} />
            </div>
            <div className="user-info">
              <span className="user-name">
                {user ? user.email.split('@')[0] : 'Gość'}
              </span>
              <span className="user-role">
                {user ? 'Zalogowany' : 'Niezalogowany'}
              </span>
            </div>
            <ChevronDown 
              size={16} 
              className={`dropdown-arrow ${showUserDropdown ? 'rotated' : ''}`}
            />
          </div>

          {showUserDropdown && user && (
            <div className="user-dropdown">
              <div className="dropdown-header">
                <div className="dropdown-user-info">
                  <div className="dropdown-avatar">
                    <User size={16} />
                  </div>
                  <div className="dropdown-details">
                    <span className="dropdown-name">{user.email.split('@')[0]}</span>
                    <span className="dropdown-email">{user.email}</span>
                  </div>
                </div>
              </div>
              
              <div className="dropdown-divider"></div>
              
              <div className="dropdown-menu">
                <button 
                  className="dropdown-item"
                  onClick={handleProfileEdit}
                >
                  <Settings size={16} />
                  <span>Edytuj profil</span>
                </button>
                
                <button 
                  className="dropdown-item logout-item"
                  onClick={handleSignOut}
                >
                  <LogOut size={16} />
                  <span>Wyloguj się</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
