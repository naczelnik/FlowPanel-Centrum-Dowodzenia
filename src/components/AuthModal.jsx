import React, { useState } from 'react';
import { X, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      let result;
      if (isLogin) {
        result = await signIn(formData.email, formData.password);
      } else {
        result = await signUp(formData.email, formData.password);
      }

      if (result.error) {
        setError(result.error.message);
      } else {
        console.log('Auth successful:', result.data);
        onClose();
        setFormData({ email: '', password: '' });
      }
    } catch (err) {
      setError('Wystąpił błąd podczas uwierzytelniania');
      console.error('Auth error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content auth-modal">
        <div className="modal-header">
          <h3>{isLogin ? 'Zaloguj się' : 'Zarejestruj się'}</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-body">
          {error && (
            <div className="error-banner">
              <AlertCircle size={16} />
              {error}
            </div>
          )}
          
          <div className="form-group">
            <label>Email</label>
            <div className="input-wrapper">
              <Mail size={16} className="input-icon" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="admin@example.com"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Hasło</label>
            <div className="input-wrapper">
              <Lock size={16} className="input-icon" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
                minLength={6}
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn-primary full-width"
            disabled={isLoading}
          >
            {isLoading ? 'Ładowanie...' : (isLogin ? 'Zaloguj się' : 'Zarejestruj się')}
          </button>
          
          <div className="auth-switch">
            {isLogin ? 'Nie masz konta?' : 'Masz już konto?'}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="link-button"
              disabled={isLoading}
            >
              {isLogin ? 'Zarejestruj się' : 'Zaloguj się'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
