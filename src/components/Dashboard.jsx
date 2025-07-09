import React from 'react';
import StatsCards from './StatsCards';
import PlanDistribution from './PlanDistribution';
import GrowthInsights from './GrowthInsights';
import QuickActions from './QuickActions';
import SystemHealth from './SystemHealth';
import KeyMetrics from './KeyMetrics';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <StatsCards />
      <GrowthInsights />
      <SystemHealth />
      <div className="dashboard-grid">
        <PlanDistribution />
        <KeyMetrics />
      </div>
      <QuickActions />
    </div>
  );
};

export default Dashboard;
