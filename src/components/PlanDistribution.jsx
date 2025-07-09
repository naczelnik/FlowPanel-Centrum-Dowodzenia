import React from 'react';
import './PlanDistribution.css';

const PlanDistribution = () => {
  const plans = [
    {
      name: 'Panel AI PRO',
      users: 397,
      percentage: 30.6,
      revenue: '$38,509',
      color: '#06b6d4'
    },
    {
      name: 'Panel BUNDLE',
      users: 253,
      percentage: 19.5,
      revenue: '$252,241',
      color: '#ef4444'
    },
    {
      name: 'Panel AI Starter',
      users: 231,
      percentage: 17.8,
      revenue: '$6,699',
      color: '#06b6d4'
    },
    {
      name: 'Panel AI Vanta Black',
      users: 221,
      percentage: 17.0,
      revenue: '$109,837',
      color: '#f59e0b'
    },
    {
      name: 'Panel AI DFY Command Center',
      users: 87,
      percentage: 6.7,
      revenue: '$86,739',
      color: '#10b981'
    },
    {
      name: 'Panel 360 Agency',
      users: 87,
      percentage: 6.7,
      revenue: '$173,739',
      color: '#10b981'
    },
    {
      name: 'Panel Reseller 25 License',
      users: 11,
      percentage: 0.8,
      revenue: '$3,467',
      color: '#ef4444'
    }
  ];

  return (
    <div className="plan-distribution">
      <h3 className="section-title">Dystrybucja Planów</h3>
      <div className="plans-list">
        {plans.map((plan, index) => (
          <div key={index} className="plan-item">
            <div className="plan-info">
              <div className="plan-indicator" style={{ backgroundColor: plan.color }}></div>
              <span className="plan-name">{plan.name}</span>
            </div>
            <div className="plan-stats">
              <div className="plan-users">
                <span className="users-count">{plan.users}</span>
                <span className="users-percentage">({plan.percentage}%)</span>
              </div>
              <div className="plan-revenue">{plan.revenue}</div>
            </div>
            <div className="plan-bar">
              <div 
                className="plan-progress" 
                style={{ 
                  width: `${plan.percentage * 3}%`,
                  backgroundColor: plan.color 
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanDistribution;
