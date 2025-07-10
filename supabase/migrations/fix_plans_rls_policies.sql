/*
  # Fix Plans RLS Policies

  1. Changes
    - Drop existing restrictive policies
    - Add permissive policies for authenticated users
    - Allow all authenticated users to manage plans (for testing)

  2. Security
    - Temporarily allow all authenticated users to insert/update/delete plans
    - This can be restricted later to admin-only access
*/

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Plans are manageable by admins" ON plans;

-- Create more permissive policies for testing
CREATE POLICY "Authenticated users can insert plans"
  ON plans
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update plans"
  ON plans
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete plans"
  ON plans
  FOR DELETE
  TO authenticated
  USING (true);