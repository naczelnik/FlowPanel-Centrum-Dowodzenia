import React from 'react';
import './StatsCards.css';

const StatsCards = () => {
  const stats = [
    {
      icon: '⚡',
      title: 'Użycie tokenów',
      value: '245,910,918',
      subtitle: '/ 69,031,000,000 tokenów',
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.1)'
    },
    {
      icon: '📊',
      title: 'Wskaźnik rezygnacji',
      value: '30.6%',
      subtitle: 'Użytkownicy nieaktywni przez 30+ dni',
      color: '#ef4444',
      bgColor: 'rgba(239, 68, 68, 0.1)'
    },
    {
      icon: '📈',
      title: 'Nowi w tym tygodniu',
      value: '4',
      subtitle: '4 dołączyło dzisiaj',
      color: '#6366f1',
      bgColor: 'rgba(99, 102, 241, 0.1)'
    },
    {
      icon: '👥',
      title: 'Użytkownicy administracyjni',
      value: '1',
      subtitle: 'Administratorzy systemu',
      color: '#8b5cf6',
      bgColor: 'rgba(139, 92, 246, 0.1)'
    }
  ];

  return (
    <div className="stats-cards">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card" style={{ backgroundColor: stat.bgColor }}>
          <div className="stat-icon" style={{ color: stat.color }}>
            {stat.icon}
          </div>
          <div className="stat-content">
            <div className="stat-title">{stat.title}</div>
            <div className="stat-value" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="stat-subtitle">{stat.subtitle}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
