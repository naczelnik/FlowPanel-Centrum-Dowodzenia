import React from 'react';
import { Users, TrendingUp, AlertTriangle, Zap } from 'lucide-react';
import './SystemHealth.css';

const SystemHealth = () => {
  const healthMetrics = [
    {
      icon: Users,
      title: 'Wzrost Użytkowników',
      status: 'Dobry',
      statusColor: '#6366f1',
      iconBg: '#ede9fe'
    },
    {
      icon: TrendingUp,
      title: 'Przychody',
      status: 'Doskonały',
      statusColor: '#10b981',
      iconBg: '#d1fae5'
    },
    {
      icon: AlertTriangle,
      title: 'Zaangażowanie',
      status: 'Wymaga Uwagi',
      statusColor: '#f59e0b',
      iconBg: '#fef3c7'
    },
    {
      icon: Zap,
      title: 'Użycie Tokenów',
      status: 'Niski',
      statusColor: '#6b7280',
      iconBg: '#f3f4f6'
    }
  ];

  return (
    <div className="system-health">
      <h3 className="section-title">Przegląd Kondycji Systemu</h3>
      <div className="health-grid">
        {healthMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="health-card">
              <div className="health-icon" style={{ backgroundColor: metric.iconBg }}>
                <Icon size={24} color={metric.statusColor} />
              </div>
              <div className="health-content">
                <div className="health-title">{metric.title}</div>
                <div className="health-status" style={{ color: metric.statusColor }}>
                  {metric.status}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SystemHealth;
