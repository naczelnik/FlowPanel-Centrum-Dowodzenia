import React, { useState } from 'react';
import { Users as UsersIcon, CreditCard, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Users from './Users';
import Plans from './Plans';
import AuthModal from './AuthModal';
import './SuperAdmin.css';

const SuperAdmin = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="super-admin-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Sprawdzanie uwierzytelnienia...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="super-admin-container">
        <div className="auth-required">
          <div className="auth-required-content">
            <LogIn size={48} className="auth-icon" />
            <h2>Wymagane uwierzytelnienie</h2>
            <p>Musisz się zalogować, aby uzyskać dostęp do panelu administracyjnego.</p>
            <button 
              className="btn-primary"
              onClick={() => setShowAuthModal(true)}
            >
              Zaloguj się
            </button>
          </div>
        </div>
        
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </div>
    );
  }

  return (
    <div className="super-admin-container">
      <div className="super-admin-header">
        <div className="header-content">
          <h1>Panel Super Administratora</h1>
          <div className="user-info">
            <span>Zalogowany jako: {user.email}</span>
          </div>
        </div>
        
        <div className="admin-tabs">
          <button
            className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <UsersIcon size={16} />
            Użytkownicy
          </button>
          <button
            className={`tab-button ${activeTab === 'plans' ? 'active' : ''}`}
            onClick={() => setActiveTab('plans')}
          >
            <CreditCard size={16} />
            Plany
          </button>
        </div>
      </div>

      <div className="admin-content">
        {activeTab === 'users' && <Users />}
        {activeTab === 'plans' && <Plans />}
      </div>
    </div>
  );
};

export default SuperAdmin;
