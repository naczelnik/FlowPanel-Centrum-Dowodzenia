/*
  # Flow Panel Admin Database Schema

  1. New Tables
    - `plans` - Subscription plans with pricing and features
      - `id` (uuid, primary key)
      - `name` (text, plan name)
      - `price` (decimal, plan price)
      - `currency` (text, currency code)
      - `billing` (text, billing period)
      - `tokens` (bigint, token allocation)
      - `features` (jsonb, array of features)
      - `color` (text, hex color code)
      - `active` (boolean, plan status)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `roles` - User roles and permissions
      - `id` (uuid, primary key)
      - `name` (text, system role name)
      - `display_name` (text, human readable name)
      - `permissions` (jsonb, array of permissions)
      - `color` (text, hex color code)
      - `active` (boolean, role status)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `user_profiles` - Extended user information
      - `id` (uuid, primary key, references auth.users)
      - `full_name` (text, user's full name)
      - `avatar_url` (text, profile picture URL)
      - `plan_id` (uuid, references plans)
      - `role_id` (uuid, references roles)
      - `tokens_used` (bigint, consumed tokens)
      - `tokens_total` (bigint, total token allocation)
      - `status` (text, account status)
      - `last_activity` (timestamp, last login)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `system_metrics` - Dashboard analytics data
      - `id` (uuid, primary key)
      - `metric_name` (text, metric identifier)
      - `metric_value` (text, metric value)
      - `metric_subtitle` (text, additional info)
      - `metric_color` (text, display color)
      - `metric_icon` (text, icon identifier)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add admin-only policies for management tables
*/

-- Create plans table
CREATE TABLE IF NOT EXISTS plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price decimal(10,2) NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  billing text NOT NULL DEFAULT 'monthly',
  tokens bigint NOT NULL DEFAULT 0,
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  color text NOT NULL DEFAULT '#6366f1',
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  display_name text NOT NULL,
  permissions jsonb NOT NULL DEFAULT '[]'::jsonb,
  color text NOT NULL DEFAULT '#6366f1',
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  plan_id uuid REFERENCES plans(id),
  role_id uuid REFERENCES roles(id),
  tokens_used bigint DEFAULT 0,
  tokens_total bigint DEFAULT 0,
  status text DEFAULT 'active',
  last_activity timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create system_metrics table
CREATE TABLE IF NOT EXISTS system_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name text UNIQUE NOT NULL,
  metric_value text NOT NULL,
  metric_subtitle text,
  metric_color text DEFAULT '#6366f1',
  metric_icon text,
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_metrics ENABLE ROW LEVEL SECURITY;

-- Plans policies
CREATE POLICY "Plans are viewable by authenticated users"
  ON plans
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Plans are manageable by admins"
  ON plans
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      JOIN roles r ON up.role_id = r.id
      WHERE up.id = auth.uid()
      AND (r.name = 'Admin' OR r.name = 'SuperAdmin')
    )
  );

-- Roles policies
CREATE POLICY "Roles are viewable by authenticated users"
  ON roles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Roles are manageable by super admins"
  ON roles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      JOIN roles r ON up.role_id = r.id
      WHERE up.id = auth.uid()
      AND r.name = 'SuperAdmin'
    )
  );

-- User profiles policies
CREATE POLICY "Users can view own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      JOIN roles r ON up.role_id = r.id
      WHERE up.id = auth.uid()
      AND (r.name = 'Admin' OR r.name = 'SuperAdmin')
    )
  );

CREATE POLICY "Admins can manage all profiles"
  ON user_profiles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      JOIN roles r ON up.role_id = r.id
      WHERE up.id = auth.uid()
      AND (r.name = 'Admin' OR r.name = 'SuperAdmin')
    )
  );

-- System metrics policies
CREATE POLICY "Metrics are viewable by authenticated users"
  ON system_metrics
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Metrics are manageable by admins"
  ON system_metrics
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      JOIN roles r ON up.role_id = r.id
      WHERE up.id = auth.uid()
      AND (r.name = 'Admin' OR r.name = 'SuperAdmin')
    )
  );

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_plans_updated_at
  BEFORE UPDATE ON plans
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_roles_updated_at
  BEFORE UPDATE ON roles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_system_metrics_updated_at
  BEFORE UPDATE ON system_metrics
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
