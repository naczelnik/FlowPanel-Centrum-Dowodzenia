import React from 'react';
import { Users, Crown, TrendingUp } from 'lucide-react';
import './QuickActions.css';

const QuickActions = () => {
  const actions = [
    {
      icon: Users,
      title: 'Zarządzaj Użytkownikami',
      subtitle: 'Przeglądaj i edytuj konta użytkowników',
      color: '#6366f1'
    },
    {
      icon: Crown,
      title: 'Zarządzanie Planami',
      subtitle: 'Konfiguruj plany subskrypcji',
      color: '#8b5cf6'
    },
    {
      icon: TrendingUp,
      title: 'Zaawansowana Analityka',
      subtitle: 'Szczegółowe wglądy w wydajność',
      color: '#10b981'
    }
  ];

  return (
    <div className="quick-actions">
      <h3 className="section-title">Szybkie Akcje</h3>
      <div className="actions-grid">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <div key={index} className="action-card">
              <div className="action-icon" style={{ color: action.color }}>
                <Icon size={24} />
              </div>
              <div className="action-content">
                <div className="action-title">{action.title}</div>
                <div className="action-subtitle">{action.subtitle}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
