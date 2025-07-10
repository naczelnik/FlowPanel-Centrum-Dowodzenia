import React, { useState } from 'react';
import { Plus, Edit, Trash2, Users, Package, Shield, Save, X, Check, Search, Eye, MoreHorizontal } from 'lucide-react';
import AddUserModal from './AddUserModal';
import './SuperAdmin.css';

const SuperAdmin = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [showAddPlanModal, setShowAddPlanModal] = useState(false);
  const [showEditPlanModal, setShowEditPlanModal] = useState(false);
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);

  const [plans, setPlans] = useState([
    {
      id: 1,
      name: 'Panel AI Starter',
      price: 29,
      currency: 'USD',
      billing: 'monthly',
      tokens: 100000,
      features: ['Podstawowe AI', 'Email support', '10 projektów'],
      color: '#06b6d4',
      active: true
    },
    {
      id: 2,
      name: 'Panel AI PRO',
      price: 97,
      currency: 'USD',
      billing: 'monthly',
      tokens: 5000000,
      features: ['Zaawansowane AI', 'Priority support', 'Unlimited projekty', 'API access'],
      color: '#06b6d4',
      active: true
    },
    {
      id: 3,
      name: 'Panel AI Vanta Black',
      price: 297,
      currency: 'USD',
      billing: 'monthly',
      tokens: 10000000,
      features: ['Premium AI', '24/7 support', 'White-label', 'Custom integrations'],
      color: '#f59e0b',
      active: true
    },
    {
      id: 4,
      name: 'Panel AI DFY Command Center',
      price: 497,
      currency: 'USD',
      billing: 'monthly',
      tokens: 15000000,
      features: ['Enterprise AI', 'Dedicated support', 'Custom development', 'Training'],
      color: '#10b981',
      active: true
    }
  ]);

  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'User',
      displayName: 'Użytkownik',
      permissions: ['read_own_data', 'update_own_profile'],
      color: '#8b5cf6',
      active: true
    },
    {
      id: 2,
      name: 'Admin',
      displayName: 'Administrator',
      permissions: ['read_all_users', 'manage_users', 'view_analytics', 'manage_plans'],
      color: '#06b6d4',
      active: true
    },
    {
      id: 3,
      name: 'SuperAdmin',
      displayName: 'Superadministrator',
      permissions: ['full_access', 'manage_roles', 'manage_plans', 'system_settings'],
      color: '#ef4444',
      active: true
    }
  ]);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'David Cassar',
      email: 'me@davidcassar.com',
      avatar: 'D',
      status: 'Active',
      plan: 'Panel AI PRO',
      tokens: { used: 0, total: 5000000 },
      lastActivity: '6h ago',
      lastActivityDate: 'Jul 7',
      created: 'Jul 7, 25',
      createdTime: '06:36 PM'
    },
    {
      id: 2,
      name: 'kevin',
      email: 'kevin.monsieur018@gmail.com',
      avatar: 'K',
      status: 'Active',
      plan: 'Panel AI PRO',
      tokens: { used: 0, total: 5000000 },
      lastActivity: '5h ago',
      lastActivityDate: 'Jul 7',
      created: 'Jul 7, 25',
      createdTime: '02:21 PM'
    },
    {
      id: 3,
      name: 'No name',
      email: 'arnayparashar040907@gmail.com',
      avatar: 'A',
      status: 'Active',
      plan: 'Panel AI PRO',
      tokens: { used: 859416, total: 5000000 },
      lastActivity: '16h ago',
      lastActivityDate: 'Jul 7',
      created: 'Jul 7, 25',
      createdTime: '09:04 AM'
    },
    {
      id: 4,
      name: 'Arnav Parashar',
      email: 'arnayparashar.work@gmail.com',
      avatar: 'A',
      status: 'Active',
      plan: 'Panel AI PRO',
      tokens: { used: 859416, total: 5000000 },
      lastActivity: '16h ago',
      lastActivityDate: 'Jul 7',
      created: 'Jul 7, 25',
      createdTime: '07:00 AM'
    },
    {
      id: 5,
      name: 'Eric',
      email: 'eric.zuber@rimworldforge.com',
      avatar: 'E',
      status: 'Active',
      plan: 'Panel AI PRO',
      tokens: { used: 1900, total: 5000000 },
      lastActivity: '1d ago',
      lastActivityDate: 'Jul 7',
      created: 'Jul 7, 25',
      createdTime: '01:10 AM'
    },
    {
      id: 6,
      name: '6bd04cd2-6457-4006-95...',
      email: '6bd04cd2-6457-4006-955a-054ef...',
      avatar: 'G',
      status: 'Active',
      plan: 'Panel AI Starter',
      tokens: { used: 100, total: 5000000 },
      lastActivity: 'Never',
      lastActivityDate: '',
      created: 'Jul 6, 25',
      createdTime: '10:28 AM'
    },
    {
      id: 7,
      name: 'foufeur',
      email: 'acharnett@gmail.com',
      avatar: 'F',
      status: 'Active',
      plan: 'Panel AI PRO',
      tokens: { used: 0, total: 5000000 },
      lastActivity: '3d ago',
      lastActivityDate: 'Jul 6',
      created: 'Jul 4, 25',
      createdTime: '04:29 AM'
    },
    {
      id: 8,
      name: 'Nicolas Dieque',
      email: 'marketing@nicedcommunity.com',
      avatar: 'N',
      status: 'Pending',
      plan: 'Panel AI PRO',
      tokens: { used: 0, total: 5000000 },
      lastActivity: 'Never',
      lastActivityDate: '',
      created: 'Jul 3, 25',
      createdTime: '05:36 PM'
    }
  ]);

  const [newPlan, setNewPlan] = useState({
    name: '',
    price: '',
    currency: 'USD',
    billing: 'monthly',
    tokens: '',
    features: [''],
    color: '#6366f1'
  });

  const [editPlan, setEditPlan] = useState({
    name: '',
    price: '',
    currency: 'USD',
    billing: 'monthly',
    tokens: '',
    features: [''],
    color: '#6366f1'
  });

  const [newRole, setNewRole] = useState({
    name: '',
    displayName: '',
    permissions: [],
    color: '#6366f1'
  });

  const availablePermissions = [
    { id: 'read_own_data', name: 'Odczyt własnych danych' },
    { id: 'update_own_profile', name: 'Aktualizacja profilu' },
    { id: 'read_all_users', name: 'Odczyt wszystkich użytkowników' },
    { id: 'manage_users', name: 'Zarządzanie użytkownikami' },
    { id: 'view_analytics', name: 'Przeglądanie analityki' },
    { id: 'manage_plans', name: 'Zarządzanie planami' },
    { id: 'manage_roles', name: 'Zarządzanie rolami' },
    { id: 'system_settings', name: 'Ustawienia systemowe' },
    { id: 'full_access', name: 'Pełny dostęp' }
  ];

  const handleAddPlan = () => {
    if (newPlan.name && newPlan.price && newPlan.tokens) {
      const plan = {
        id: Date.now(),
        ...newPlan,
        price: parseFloat(newPlan.price),
        tokens: parseInt(newPlan.tokens),
        features: newPlan.features.filter(f => f.trim() !== ''),
        active: true
      };
      setPlans([...plans, plan]);
      setNewPlan({
        name: '',
        price: '',
        currency: 'USD',
        billing: 'monthly',
        tokens: '',
        features: [''],
        color: '#6366f1'
      });
      setShowAddPlanModal(false);
    }
  };

  const handleEditPlan = (plan) => {
    setEditingPlan(plan);
    setEditPlan({
      name: plan.name,
      price: plan.price.toString(),
      currency: plan.currency,
      billing: plan.billing,
      tokens: plan.tokens.toString(),
      features: [...plan.features],
      color: plan.color
    });
    setShowEditPlanModal(true);
  };

  const handleUpdatePlan = () => {
    if (editPlan.name && editPlan.price && editPlan.tokens && editingPlan) {
      const updatedPlan = {
        ...editingPlan,
        name: editPlan.name,
        price: parseFloat(editPlan.price),
        currency: editPlan.currency,
        billing: editPlan.billing,
        tokens: parseInt(editPlan.tokens),
        features: editPlan.features.filter(f => f.trim() !== ''),
        color: editPlan.color
      };
      
      setPlans(plans.map(plan => 
        plan.id === editingPlan.id ? updatedPlan : plan
      ));
      
      setEditPlan({
        name: '',
        price: '',
        currency: 'USD',
        billing: 'monthly',
        tokens: '',
        features: [''],
        color: '#6366f1'
      });
      setEditingPlan(null);
      setShowEditPlanModal(false);
    }
  };

  const handleAddRole = () => {
    if (newRole.name && newRole.displayName && newRole.permissions.length > 0) {
      const role = {
        id: Date.now(),
        ...newRole,
        active: true
      };
      setRoles([...roles, role]);
      setNewRole({
        name: '',
        displayName: '',
        permissions: [],
        color: '#6366f1'
      });
      setShowAddRoleModal(false);
    }
  };

  const handleAddUser = (userData) => {
    const newUser = {
      id: Date.now(),
      name: userData.fullName,
      email: userData.email,
      avatar: userData.fullName.charAt(0).toUpperCase(),
      status: userData.status === 'active' ? 'Active' : userData.status === 'pending' ? 'Pending' : 'Suspended',
      plan: userData.plan,
      tokens: { used: 0, total: 5000000 },
      lastActivity: 'Never',
      lastActivityDate: '',
      created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' }),
      createdTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    
    setUsers(prev => [newUser, ...prev]);
  };

  const handleDeletePlan = (id) => {
    setPlans(plans.filter(plan => plan.id !== id));
  };

  const handleDeleteRole = (id) => {
    setRoles(roles.filter(role => role.id !== id));
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(selectedUsers.length === users.length ? [] : users.map(u => u.id));
  };

  const addFeature = (isEdit = false) => {
    if (isEdit) {
      setEditPlan({
        ...editPlan,
        features: [...editPlan.features, '']
      });
    } else {
      setNewPlan({
        ...newPlan,
        features: [...newPlan.features, '']
      });
    }
  };

  const updateFeature = (index, value, isEdit = false) => {
    if (isEdit) {
      const updatedFeatures = [...editPlan.features];
      updatedFeatures[index] = value;
      setEditPlan({
        ...editPlan,
        features: updatedFeatures
      });
    } else {
      const updatedFeatures = [...newPlan.features];
      updatedFeatures[index] = value;
      setNewPlan({
        ...newPlan,
        features: updatedFeatures
      });
    }
  };

  const removeFeature = (index, isEdit = false) => {
    if (isEdit) {
      setEditPlan({
        ...editPlan,
        features: editPlan.features.filter((_, i) => i !== index)
      });
    } else {
      setNewPlan({
        ...newPlan,
        features: newPlan.features.filter((_, i) => i !== index)
      });
    }
  };

  const togglePermission = (permissionId) => {
    const updatedPermissions = newRole.permissions.includes(permissionId)
      ? newRole.permissions.filter(p => p !== permissionId)
      : [...newRole.permissions, permissionId];
    
    setNewRole({
      ...newRole,
      permissions: updatedPermissions
    });
  };

  const getTokensPercentage = (used, total) => {
    return Math.round((used / total) * 100);
  };

  const getPlanColor = (planName) => {
    const planColors = {
      'Panel AI PRO': '#06b6d4',
      'Panel BUNDLE': '#ef4444',
      'Panel AI Starter': '#06b6d4',
      'Panel AI Vanta Black': '#f59e0b',
      'Panel AI DFY Command Center': '#10b981',
      'Panel 360 Agency': '#10b981',
      'Panel Reseller 25 License': '#ef4444'
    };
    return planColors[planName] || '#8b5cf6';
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderUsersTab = () => (
    <div className="super-admin-content">
      <div className="content-header">
        <div>
          <h3>Zarządzanie Użytkownikami</h3>
          <p>Zarządzaj wszystkimi użytkownikami w systemie. Łącznie: {users.length} użytkowników</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowAddUserModal(true)}
        >
          <Plus size={16} />
          Dodaj Użytkownika
        </button>
      </div>

      <div className="users-search">
        <div className="search-input-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Szukaj użytkowników po emailu lub nazwie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th className="checkbox-column">
                <input
                  type="checkbox"
                  checked={selectedUsers.length === users.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="user-column">
                Użytkownik
                <span className="sort-icon">↕</span>
              </th>
              <th className="plan-column">
                Plan
                <span className="sort-icon">↕</span>
              </th>
              <th className="tokens-column">Tokeny</th>
              <th className="activity-column">
                Ostatnia Aktywność
                <span className="sort-icon">↕</span>
              </th>
              <th className="created-column">
                Utworzono
                <span className="sort-icon">↕</span>
              </th>
              <th className="actions-column"></th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="user-row">
                <td className="checkbox-cell">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleSelectUser(user.id)}
                  />
                </td>
                <td className="user-cell">
                  <div className="user-info">
                    <div className="user-avatar">{user.avatar}</div>
                    <div className="user-details">
                      <div className="user-name">{user.name}</div>
                      <div className="user-email">{user.email}</div>
                    </div>
                    <span className={`status-badge ${user.status.toLowerCase()}`}>
                      {user.status === 'Active' ? 'Aktywny' : user.status === 'Pending' ? 'Oczekujący' : 'Zawieszony'}
                    </span>
                  </div>
                </td>
                <td className="plan-cell">
                  <span 
                    className="plan-badge" 
                    style={{ backgroundColor: getPlanColor(user.plan) }}
                  >
                    {user.plan}
                  </span>
                </td>
                <td className="tokens-cell">
                  <div className="tokens-info">
                    <div className="tokens-numbers">
                      {user.tokens.used.toLocaleString()} / {user.tokens.total.toLocaleString()}
                    </div>
                    <div className="tokens-percentage">
                      {getTokensPercentage(user.tokens.used, user.tokens.total)}%
                    </div>
                  </div>
                </td>
                <td className="activity-cell">
                  <div className="activity-info">
                    <div className="activity-time">{user.lastActivity}</div>
                    <div className="activity-date">{user.lastActivityDate}</div>
                  </div>
                </td>
                <td className="created-cell">
                  <div className="created-info">
                    <div className="created-date">{user.created}</div>
                    <div className="created-time">{user.createdTime}</div>
                  </div>
                </td>
                <td className="actions-cell">
                  <div className="action-buttons">
                    <button className="action-btn view-btn" title="Zobacz">
                      <Eye size={14} />
                    </button>
                    <button className="action-btn edit-btn" title="Edytuj">
                      <Edit size={14} />
                    </button>
                    <button className="action-btn delete-btn" title="Usuń">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPlansTab = () => (
    <div className="super-admin-content">
      <div className="content-header">
        <div>
          <h3>Zarządzanie Planami</h3>
          <p>Twórz i edytuj plany subskrypcji dla użytkowników</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowAddPlanModal(true)}
        >
          <Plus size={16} />
          Dodaj Plan
        </button>
      </div>

      <div className="plans-grid">
        {plans.map((plan) => (
          <div key={plan.id} className="plan-card">
            <div className="plan-header">
              <div 
                className="plan-color-indicator"
                style={{ backgroundColor: plan.color }}
              ></div>
              <div className="plan-info">
                <h4>{plan.name}</h4>
                <div className="plan-price">
                  ${plan.price}/{plan.billing === 'monthly' ? 'mies' : 'rok'}
                </div>
              </div>
              <div className="plan-actions">
                <button 
                  className="action-btn edit-btn"
                  onClick={() => handleEditPlan(plan)}
                  title="Edytuj plan"
                >
                  <Edit size={14} />
                </button>
                <button 
                  className="action-btn delete-btn"
                  onClick={() => handleDeletePlan(plan.id)}
                  title="Usuń plan"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            
            <div className="plan-details">
              <div className="plan-tokens">
                <strong>Tokeny:</strong> {plan.tokens.toLocaleString()}
              </div>
              <div className="plan-features">
                <strong>Funkcje:</strong>
                <ul>
                  {plan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderRolesTab = () => (
    <div className="super-admin-content">
      <div className="content-header">
        <div>
          <h3>Zarządzanie Rolami</h3>
          <p>Definiuj role użytkowników i ich uprawnienia</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowAddRoleModal(true)}
        >
          <Plus size={16} />
          Dodaj Rolę
        </button>
      </div>

      <div className="roles-grid">
        {roles.map((role) => (
          <div key={role.id} className="role-card">
            <div className="role-header">
              <div 
                className="role-color-indicator"
                style={{ backgroundColor: role.color }}
              ></div>
              <div className="role-info">
                <h4>{role.displayName}</h4>
                <div className="role-name">({role.name})</div>
              </div>
              <div className="role-actions">
                <button className="action-btn edit-btn">
                  <Edit size={14} />
                </button>
                <button 
                  className="action-btn delete-btn"
                  onClick={() => handleDeleteRole(role.id)}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            
            <div className="role-permissions">
              <strong>Uprawnienia:</strong>
              <div className="permissions-list">
                {role.permissions.map((permission) => {
                  const perm = availablePermissions.find(p => p.id === permission);
                  return (
                    <span key={permission} className="permission-badge">
                      {perm?.name || permission}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="super-admin-container">
      <div className="super-admin-header">
        <h2>Użytkownicy i Plany</h2>
        <p>Zarządzaj użytkownikami, planami i rolami systemu</p>
      </div>

      <div className="super-admin-tabs">
        <button
          className={`super-admin-tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <Users size={18} />
          <span>Użytkownicy</span>
        </button>
        <button
          className={`super-admin-tab ${activeTab === 'plans' ? 'active' : ''}`}
          onClick={() => setActiveTab('plans')}
        >
          <Package size={18} />
          <span>Plany</span>
        </button>
        <button
          className={`super-admin-tab ${activeTab === 'roles' ? 'active' : ''}`}
          onClick={() => setActiveTab('roles')}
        >
          <Shield size={18} />
          <span>Role</span>
        </button>
      </div>

      {activeTab === 'users' && renderUsersTab()}
      {activeTab === 'plans' && renderPlansTab()}
      {activeTab === 'roles' && renderRolesTab()}

      {/* Add User Modal */}
      <AddUserModal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        onAddUser={handleAddUser}
        availablePlans={plans}
      />

      {/* Add Plan Modal */}
      {showAddPlanModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Dodaj Nowy Plan</h3>
              <button 
                className="modal-close"
                onClick={() => setShowAddPlanModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Nazwa planu *</label>
                  <input
                    type="text"
                    value={newPlan.name}
                    onChange={(e) => setNewPlan({...newPlan, name: e.target.value})}
                    placeholder="np. Panel AI Premium"
                  />
                </div>
                
                <div className="form-group">
                  <label>Cena *</label>
                  <div className="price-input">
                    <input
                      type="number"
                      value={newPlan.price}
                      onChange={(e) => setNewPlan({...newPlan, price: e.target.value})}
                      placeholder="97"
                    />
                    <select
                      value={newPlan.currency}
                      onChange={(e) => setNewPlan({...newPlan, currency: e.target.value})}
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="PLN">PLN</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Okres rozliczeniowy</label>
                  <select
                    value={newPlan.billing}
                    onChange={(e) => setNewPlan({...newPlan, billing: e.target.value})}
                  >
                    <option value="monthly">Miesięczny</option>
                    <option value="yearly">Roczny</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Liczba tokenów *</label>
                  <input
                    type="number"
                    value={newPlan.tokens}
                    onChange={(e) => setNewPlan({...newPlan, tokens: e.target.value})}
                    placeholder="5000000"
                  />
                </div>
                
                <div className="form-group">
                  <label>Kolor planu</label>
                  <div className="color-picker">
                    {['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'].map((color) => (
                      <button
                        key={color}
                        className={`color-option ${newPlan.color === color ? 'active' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setNewPlan({...newPlan, color})}
                      >
                        {newPlan.color === color && <Check size={12} />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label>Funkcje planu</label>
                {newPlan.features.map((feature, index) => (
                  <div key={index} className="feature-input">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder="Opisz funkcję planu"
                    />
                    {newPlan.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="remove-feature-btn"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addFeature()}
                  className="add-feature-btn"
                >
                  <Plus size={16} />
                  Dodaj funkcję
                </button>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setShowAddPlanModal(false)}
              >
                Anuluj
              </button>
              <button 
                className="btn-primary"
                onClick={handleAddPlan}
              >
                <Save size={16} />
                Zapisz Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Plan Modal */}
      {showEditPlanModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Edytuj Plan</h3>
              <button 
                className="modal-close"
                onClick={() => setShowEditPlanModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Nazwa planu *</label>
                  <input
                    type="text"
                    value={editPlan.name}
                    onChange={(e) => setEditPlan({...editPlan, name: e.target.value})}
                    placeholder="np. Panel AI Premium"
                  />
                </div>
                
                <div className="form-group">
                  <label>Cena *</label>
                  <div className="price-input">
                    <input
                      type="number"
                      value={editPlan.price}
                      onChange={(e) => setEditPlan({...editPlan, price: e.target.value})}
                      placeholder="97"
                    />
                    <select
                      value={editPlan.currency}
                      onChange={(e) => setEditPlan({...editPlan, currency: e.target.value})}
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="PLN">PLN</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Okres rozliczeniowy</label>
                  <select
                    value={editPlan.billing}
                    onChange={(e) => setEditPlan({...editPlan, billing: e.target.value})}
                  >
                    <option value="monthly">Miesięczny</option>
                    <option value="yearly">Roczny</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Liczba tokenów *</label>
                  <input
                    type="number"
                    value={editPlan.tokens}
                    onChange={(e) => setEditPlan({...editPlan, tokens: e.target.value})}
                    placeholder="5000000"
                  />
                </div>
                
                <div className="form-group">
                  <label>Kolor planu</label>
                  <div className="color-picker">
                    {['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'].map((color) => (
                      <button
                        key={color}
                        className={`color-option ${editPlan.color === color ? 'active' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setEditPlan({...editPlan, color})}
                      >
                        {editPlan.color === color && <Check size={12} />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label>Funkcje planu</label>
                {editPlan.features.map((feature, index) => (
                  <div key={index} className="feature-input">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value, true)}
                      placeholder="Opisz funkcję planu"
                    />
                    {editPlan.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index, true)}
                        className="remove-feature-btn"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addFeature(true)}
                  className="add-feature-btn"
                >
                  <Plus size={16} />
                  Dodaj funkcję
                </button>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setShowEditPlanModal(false)}
              >
                Anuluj
              </button>
              <button 
                className="btn-primary"
                onClick={handleUpdatePlan}
              >
                <Save size={16} />
                Zaktualizuj Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Role Modal */}
      {showAddRoleModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Dodaj Nową Rolę</h3>
              <button 
                className="modal-close"
                onClick={() => setShowAddRoleModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Nazwa systemowa *</label>
                  <input
                    type="text"
                    value={newRole.name}
                    onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                    placeholder="np. moderator"
                  />
                </div>
                
                <div className="form-group">
                  <label>Nazwa wyświetlana *</label>
                  <input
                    type="text"
                    value={newRole.displayName}
                    onChange={(e) => setNewRole({...newRole, displayName: e.target.value})}
                    placeholder="np. Moderator"
                  />
                </div>
                
                <div className="form-group">
                  <label>Kolor roli</label>
                  <div className="color-picker">
                    {['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'].map((color) => (
                      <button
                        key={color}
                        className={`color-option ${newRole.color === color ? 'active' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setNewRole({...newRole, color})}
                      >
                        {newRole.color === color && <Check size={12} />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label>Uprawnienia *</label>
                <div className="permissions-grid">
                  {availablePermissions.map((permission) => (
                    <label key={permission.id} className="permission-checkbox">
                      <input
                        type="checkbox"
                        checked={newRole.permissions.includes(permission.id)}
                        onChange={() => togglePermission(permission.id)}
                      />
                      <span className="checkmark"></span>
                      <span>{permission.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setShowAddRoleModal(false)}
              >
                Anuluj
              </button>
              <button 
                className="btn-primary"
                onClick={handleAddRole}
              >
                <Save size={16} />
                Zapisz Rolę
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdmin;
