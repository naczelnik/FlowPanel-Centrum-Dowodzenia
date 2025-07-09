import React from 'react';
import './GrowthInsights.css';

const GrowthInsights = () => {
  const insights = [
    {
      value: '48',
      title: 'Nowi Użytkownicy (30 dni)',
      subtitle: '+3.8% wskaźnik wzrostu',
      color: '#6366f1'
    },
    {
      value: '154',
      title: 'Ostatnio Aktywni Użytkownicy',
      subtitle: 'Aktywni w ostatnich 7 dniach',
      color: '#10b981'
    },
    {
      value: '$521',
      title: 'Średni Przychód na Użytkownika',
      subtitle: 'Na płatnego użytkownika',
      color: '#8b5cf6'
    }
  ];

  return (
    <div className="growth-insights">
      <h3 className="section-title">Wgląd w Wzrost</h3>
      <div className="insights-grid">
        {insights.map((insight, index) => (
          <div key={index} className="insight-card">
            <div className="insight-value" style={{ color: insight.color }}>
              {insight.value}
            </div>
            <div className="insight-title">{insight.title}</div>
            <div className="insight-subtitle">{insight.subtitle}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrowthInsights;
