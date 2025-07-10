import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, DollarSign, Zap } from 'lucide-react';
import AddPlanModal from './AddPlanModal';
import { supabase } from '../lib/supabase';
import './Plans.css';

const Plans = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [plans, setPlans] = useState([]);
  const [showAddPlanModal, setShowAddPlanModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      console.log('Fetching plans...');
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching plans:', error);
      } else {
        console.log('Plans fetched:', data);
        setPlans(data || []);
      }
    } catch (error) {
      console.error('Error in fetchPlans:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPlan = async (planData) => {
    try {
      console.log('Adding plan with data:', planData);
      
      const { data, error } = await supabase
        .from('plans')
        .insert([planData])
        .select();

      if (error) {
        console.error('Error adding plan:', error);
        alert('Błąd podczas dodawania planu: ' + error.message);
      } else {
        console.log('Plan added successfully:', data);
        setPlans(prev => [data[0], ...prev]);
        setShowAddPlanModal(false);
        alert('Plan został pomyślnie dodany!');
      }
    } catch (error) {
      console.error('Error in handleAddPlan:', error);
      alert('Wystąpił błąd podczas dodawania planu');
    }
  };

  const handleDeletePlan = async (planId) => {
    if (!confirm('Czy na pewno chcesz usunąć ten plan?')) return;

    try {
      const { error } = await supabase
        .from('plans')
        .delete()
        .eq('id', planId);

      if (error) {
        console.error('Error deleting plan:', error);
        alert('Błąd podczas usuwania planu: ' + error.message);
      } else {
        setPlans(prev => prev.filter(plan => plan.id !== planId));
        alert('Plan został usunięty!');
      }
    } catch (error) {
      console.error('Error in handleDeletePlan:', error);
      alert('Wystąpił błąd podczas usuwania planu');
    }
  };

  const filteredPlans = plans.filter(plan => 
    plan.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="plans-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Ładowanie planów...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="plans-container">
      <div className="plans-header">
        <div className="plans-title-section">
          <h1>Zarządzanie Planami</h1>
          <p>Zarządzaj wszystkimi planami subskrypcji. Łącznie: {plans.length} planów</p>
        </div>
        <button 
          className="add-plan-btn"
          onClick={() => setShowAddPlanModal(true)}
        >
          <Plus size={16} />
          Dodaj Plan
        </button>
      </div>

      <div className="plans-search">
        <div className="search-input-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Szukaj planów po nazwie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="plans-grid">
        {filteredPlans.map((plan) => (
          <div key={plan.id} className="plan-card">
            <div className="plan-header">
              <div 
                className="plan-color-indicator" 
                style={{ backgroundColor: plan.color }}
              ></div>
              <div className="plan-title">
                <h3>{plan.name}</h3>
                <div className="plan-price">
                  <DollarSign size={16} />
                  {plan.price}/{plan.billing === 'monthly' ? 'mies' : 'rok'}
                </div>
              </div>
              <div className="plan-actions">
                <button className="action-btn edit-btn" title="Edytuj">
                  <Edit size={14} />
                </button>
                <button 
                  className="action-btn delete-btn" 
                  title="Usuń"
                  onClick={() => handleDeletePlan(plan.id)}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            
            <div className="plan-tokens">
              <Zap size={16} />
              Tokeny: {plan.tokens.toLocaleString()}
            </div>
            
            <div className="plan-features">
              <h4>Funkcje:</h4>
              <ul>
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="plan-status">
              <span className={`status-badge ${plan.active ? 'active' : 'inactive'}`}>
                {plan.active ? 'Aktywny' : 'Nieaktywny'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredPlans.length === 0 && !isLoading && (
        <div className="empty-state">
          <div className="empty-content">
            <CreditCard size={48} className="empty-icon" />
            <h3>Brak planów</h3>
            <p>
              {searchTerm 
                ? 'Nie znaleziono planów pasujących do wyszukiwania.' 
                : 'Nie masz jeszcze żadnych planów. Dodaj pierwszy plan, aby rozpocząć.'
              }
            </p>
            {!searchTerm && (
              <button 
                className="btn-primary"
                onClick={() => setShowAddPlanModal(true)}
              >
                <Plus size={16} />
                Dodaj pierwszy plan
              </button>
            )}
          </div>
        </div>
      )}

      <AddPlanModal
        isOpen={showAddPlanModal}
        onClose={() => setShowAddPlanModal(false)}
        onAddPlan={handleAddPlan}
      />
    </div>
  );
};

export default Plans;
