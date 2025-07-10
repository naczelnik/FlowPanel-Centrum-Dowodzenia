/*
  # Insert Sample Data for Flow Panel

  1. Sample Data
    - Default roles (User, Admin, SuperAdmin)
    - Sample subscription plans
    - System metrics for dashboard
    - Sample user profiles (will be created when users register)

  2. Data Structure
    - Roles with proper permissions
    - Plans with realistic pricing and features
    - Metrics matching dashboard requirements
*/

-- Insert default roles
INSERT INTO roles (name, display_name, permissions, color) VALUES
  ('User', 'Użytkownik', '["read_own_data", "update_own_profile"]'::jsonb, '#8b5cf6'),
  ('Admin', 'Administrator', '["read_all_users", "manage_users", "view_analytics", "manage_plans"]'::jsonb, '#06b6d4'),
  ('SuperAdmin', 'Superadministrator', '["full_access", "manage_roles", "manage_plans", "system_settings"]'::jsonb, '#ef4444')
ON CONFLICT (name) DO NOTHING;

-- Insert sample plans
INSERT INTO plans (name, price, currency, billing, tokens, features, color) VALUES
  ('Panel AI Starter', 29.00, 'USD', 'monthly', 100000, '["Podstawowe AI", "Email support", "10 projektów"]'::jsonb, '#06b6d4'),
  ('Panel AI PRO', 97.00, 'USD', 'monthly', 5000000, '["Zaawansowane AI", "Priority support", "Unlimited projekty", "API access"]'::jsonb, '#06b6d4'),
  ('Panel AI Vanta Black', 297.00, 'USD', 'monthly', 10000000, '["Premium AI", "24/7 support", "White-label", "Custom integrations"]'::jsonb, '#f59e0b'),
  ('Panel AI DFY Command Center', 497.00, 'USD', 'monthly', 15000000, '["Enterprise AI", "Dedicated support", "Custom development", "Training"]'::jsonb, '#10b981'),
  ('Panel 360 Agency', 997.00, 'USD', 'monthly', 20000000, '["Agency tools", "Multi-client", "White-label", "Priority support"]'::jsonb, '#10b981'),
  ('Panel Reseller 25 License', 1497.00, 'USD', 'monthly', 50000000, '["25 licenses", "Reseller rights", "Custom branding", "Training"]'::jsonb, '#ef4444'),
  ('Panel BUNDLE', 1997.00, 'USD', 'monthly', 100000000, '["All features", "Unlimited everything", "Premium support", "Custom development"]'::jsonb, '#ef4444');

-- Insert system metrics for dashboard
INSERT INTO system_metrics (metric_name, metric_value, metric_subtitle, metric_color, metric_icon) VALUES
  ('token_usage', '245,910,918', '/ 69,031,000,000 tokenów', '#f59e0b', '⚡'),
  ('churn_rate', '30.6%', 'Użytkownicy nieaktywni przez 30+ dni', '#ef4444', '📊'),
  ('new_users_week', '4', '4 dołączyło dzisiaj', '#6366f1', '📈'),
  ('admin_users', '1', 'Administratorzy systemu', '#8b5cf6', '👥'),
  ('total_users', '1,287', 'Aktywni użytkownicy', '#10b981', '👥'),
  ('monthly_revenue', '$670,691', 'Przychód miesięczny', '#06b6d4', '💰'),
  ('active_plans', '7', 'Dostępne plany', '#f59e0b', '📦'),
  ('system_health', '98.5%', 'Dostępność systemu', '#10b981', '🔧');