import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import './AddUserModal.css';

const AddUserModal = ({ isOpen, onClose, onAddUser, availablePlans }) => {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    plan: '',
    status: 'active',
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email jest wymagany';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Nieprawidłowy format email';
    }
    
    if (!formData.fullName) {
      newErrors.fullName = 'Imię i nazwisko jest wymagane';
    }
    
    if (!formData.plan) {
      newErrors.plan = 'Plan jest wymagany';
    }
    
    if (!formData.password) {
      newErrors.password = 'Hasło jest wymagane';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Hasło musi mieć co najmniej 8 znaków';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Hasła nie są identyczne';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAddUser(formData);
      setFormData({
        email: '',
        fullName: '',
        plan: '',
        status: 'active',
        password: '',
        confirmPassword: ''
      });
      setErrors({});
      onClose();
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content add-user-modal">
        <div className="modal-header">
          <h3>Dodaj Nowego Użytkownika</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-grid">
            <div className="form-group">
              <label>Adres Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="user@example.com"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label>Imię i Nazwisko *</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Wprowadź pełne imię i nazwisko"
                className={errors.fullName ? 'error' : ''}
              />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>
          </div>
          
          <div className="form-grid">
            <div className="form-group">
              <label>Plan Subskrypcji *</label>
              <select
                value={formData.plan}
                onChange={(e) => handleInputChange('plan', e.target.value)}
                className={errors.plan ? 'error' : ''}
              >
                <option value="">Wybierz plan</option>
                {availablePlans.map((plan) => (
                  <option key={plan.id} value={plan.name}>
                    {plan.name}
                  </option>
                ))}
              </select>
              {errors.plan && <span className="error-message">{errors.plan}</span>}
            </div>
            
            <div className="form-group">
              <label>Status Konta</label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
              >
                <option value="active">Aktywny</option>
                <option value="pending">Oczekujący</option>
                <option value="suspended">Zawieszony</option>
              </select>
              <small className="form-help">
                Nieaktywni użytkownicy nie mogą uzyskać dostępu do systemu
              </small>
            </div>
          </div>
          
          <div className="form-grid">
            <div className="form-group">
              <label>Hasło *</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Wprowadź hasło"
                  className={errors.password ? 'error' : ''}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            
            <div className="form-group">
              <label>Potwierdź Hasło *</label>
              <div className="password-input">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Potwierdź hasło"
                  className={errors.confirmPassword ? 'error' : ''}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="password-toggle"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
          </div>
        </form>
        
        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Anuluj
          </button>
          <button type="submit" className="btn-primary" onClick={handleSubmit}>
            Utwórz Użytkownika
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
