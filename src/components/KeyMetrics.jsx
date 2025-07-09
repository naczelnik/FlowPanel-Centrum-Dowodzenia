import React from 'react';
import { Target, TrendingUp, Users, Activity } from 'lucide-react';
import './KeyMetrics.css';

const KeyMetrics = () => {
  const metrics = [
    {
      icon: Target,
      title: 'Wskaźnik Konwersji',
      subtitle: 'Bezpłatna do płatnej konwersji',
      value: '100.0%',
      color: '#6366f1'
    },
    {
      icon: TrendingUp,
      title: 'Miesięczne Przychody Cykliczne',
      subtitle: 'Całkowity MRR',
      value: '$676,795',
      color: '#10b981'
    },
    {
      icon: Users,
      title: 'Średnia Tokenów na Użytkownika',
      subtitle: 'Efektywność użytkowania',
      value: '574,219,336',
      color: '#8b5cf6'
    },
    {
      icon: Activity,
      title: 'Wskaźnik Aktywności Użytkowników',
      subtitle: 'Aktywni w ostatnich 7 dniach',
      value: '11.9%',
      color: '#f59e0b'
    }
  ];

  return (
    <div className="key-metrics">
      <h3 className="section-title">Kluczowe Wskaźniki</h3>
      <div className="metrics-list">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="metric-item">
              <div className="metric-icon" style={{ color: metric.color }}>
                <Icon size={20} />
              </div>
              <div className="metric-content">
                <div className="metric-title">{metric.title}</div>
                <div className="metric-subtitle">{metric.subtitle}</div>
              </div>
              <div className="metric-value" style={{ color: metric.color }}>
                {metric.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KeyMetrics;
