import React, { useState } from 'react';
import { X, DollarSign, Zap, Plus, Trash2 } from 'lucide-react';
import './AddPlanModal.css';

const AddPlanModal = ({ isOpen, onClose, onAddPlan }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    currency: 'USD',
    billing: 'monthly',
    tokens: '',
    features: [''],
    color: '#6366f1',
    active: true
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nazwa planu jest wymagana';
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Cena musi być większa od 0';
    }
    
    if (!formData.tokens || parseInt(formData.tokens) <= 0) {
      newErrors.tokens = 'Liczba tokenów musi być większa od 0';
    }
    
    const validFeatures = formData.features.filter(f => f.trim());
    if (validFeatures.length === 0) {
      newErrors.features = 'Dodaj przynajmniej jedną funkcję';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const planData = {
        ...formData,
        price: parseFloat(formData.price),
        tokens: parseInt(formData.tokens),
        features: formData.features.filter(f => f.trim())
      };
      
      console.log('Submitting plan data:', planData);
      await onAddPlan(planData);
      
      // Reset form
      setFormData({
        name: '',
        price: '',
        currency: 'USD',
        billing: 'monthly',
        tokens: '',
        features: [''],
        color: '#6366f1',
        active: true
      });
      setErrors({});
    } catch (error) {
      console.error('Error in form submission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index) => {
    if (formData.features.length > 1) {
      const newFeatures = formData.features.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        features: newFeatures
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content add-plan-modal">
        <div className="modal-header">
          <h3>Dodaj Nowy Plan</h3>
          <button className="modal-close" onClick={onClose} disabled={isSubmitting}>
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-grid">
            <div className="form-group">
              <label>Nazwa Planu *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="np. Premium Plan"
                className={errors.name ? 'error' : ''}
                disabled={isSubmitting}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            
            <div className="form-group">
              <label>Kolor</label>
              <div className="color-input-wrapper">
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) => handleInputChange('color', e.target.value)}
                  className="color-input"
                  disabled={isSubmitting}
                />
                <span className="color-value">{formData.color}</span>
              </div>
            </div>
          </div>
          
          <div className="form-grid">
            <div className="form-group">
              <label>Cena *</label>
              <div className="price-input-wrapper">
                <DollarSign size={16} className="input-icon" />
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="29.99"
                  className={errors.price ? 'error' : ''}
                  disabled={isSubmitting}
                />
              </div>
              {errors.price && <span className="error-message">{errors.price}</span>}
            </div>
            
            <div className="form-group">
              <label>Waluta</label>
              <select
                value={formData.currency}
                onChange={(e) => handleInputChange('currency', e.target.value)}
                disabled={isSubmitting}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="PLN">PLN</option>
              </select>
            </div>
          </div>
          
          <div className="form-grid">
            <div className="form-group">
              <label>Okres rozliczeniowy</label>
              <select
                value={formData.billing}
                onChange={(e) => handleInputChange('billing', e.target.value)}
                disabled={isSubmitting}
              >
                <option value="monthly">Miesięczny</option>
                <option value="yearly">Roczny</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Liczba tokenów *</label>
              <div className="tokens-input-wrapper">
                <Zap size={16} className="input-icon" />
                <input
                  type="number"
                  min="1"
                  value={formData.tokens}
                  onChange={(e) => handleInputChange('tokens', e.target.value)}
                  placeholder="100000"
                  className={errors.tokens ? 'error' : ''}
                  disabled={isSubmitting}
                />
              </div>
              {errors.tokens && <span className="error-message">{errors.tokens}</span>}
            </div>
          </div>
          
          <div className="form-group">
            <label>Funkcje planu *</label>
            <div className="features-list">
              {formData.features.map((feature, index) => (
                <div key={index} className="feature-input-wrapper">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder={`Funkcja ${index + 1}`}
                    className={errors.features ? 'error' : ''}
                    disabled={isSubmitting}
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="remove-feature-btn"
                      disabled={isSubmitting}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addFeature}
                className="add-feature-btn"
                disabled={isSubmitting}
              >
                <Plus size={14} />
                Dodaj funkcję
              </button>
            </div>
            {errors.features && <span className="error-message">{errors.features}</span>}
          </div>
          
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => handleInputChange('active', e.target.checked)}
                disabled={isSubmitting}
              />
              Plan aktywny
            </label>
            <small className="form-help">
              Nieaktywne plany nie będą widoczne dla użytkowników
            </small>
          </div>
        </form>
        
        <div className="modal-footer">
          <button 
            type="button" 
            className="btn-secondary" 
            onClick={onClose}
            disabled={isSubmitting}
          >
            Anuluj
          </button>
          <button 
            type="submit" 
            className="btn-primary" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Dodawanie...' : 'Utwórz Plan'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPlanModal;
