import React, { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2, MoreHorizontal } from 'lucide-react';
import AddUserModal from './AddUserModal';
import './Users.css';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const availablePlans = [
    { id: 1, name: 'xBesh AI Starter' },
    { id: 2, name: 'xBesh AI PRO' },
    { id: 3, name: 'xBesh AI Vanta Black' },
    { id: 4, name: 'xBesh AI DFY Command Center' },
    { id: 5, name: 'xBesh 360 Agency' },
    { id: 6, name: 'xBesh Reseller 25 License' },
    { id: 7, name: 'xBesh BUNDLE' }
  ];

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'David Cassar',
      email: 'me@davidcassar.com',
      avatar: 'D',
      status: 'Active',
      plan: 'xBesh AI PRO',
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
      plan: 'xBesh AI PRO',
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
      plan: 'xBesh AI PRO',
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
      plan: 'xBesh AI PRO',
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
      plan: 'xBesh AI PRO',
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
      plan: 'xBesh AI Starter',
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
      plan: 'xBesh AI PRO',
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
      plan: 'xBesh AI PRO',
      tokens: { used: 0, total: 5000000 },
      lastActivity: 'Never',
      lastActivityDate: '',
      created: 'Jul 3, 25',
      createdTime: '05:36 PM'
    }
  ]);

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

  const getTokensPercentage = (used, total) => {
    return Math.round((used / total) * 100);
  };

  const getPlanColor = (planName) => {
    const planColors = {
      'xBesh AI PRO': '#06b6d4',
      'xBesh BUNDLE': '#ef4444',
      'xBesh AI Starter': '#06b6d4',
      'xBesh AI Vanta Black': '#f59e0b',
      'xBesh AI DFY Command Center': '#10b981',
      'xBesh 360 Agency': '#10b981',
      'xBesh Reseller 25 License': '#ef4444'
    };
    return planColors[planName] || '#8b5cf6';
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="users-container">
      <div className="users-header">
        <div className="users-title-section">
          <h1>Zarządzanie Użytkownikami</h1>
          <p>Zarządzaj wszystkimi użytkownikami w systemie. Łącznie: {users.length} użytkowników</p>
        </div>
        <button 
          className="add-user-btn"
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

      <AddUserModal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        onAddUser={handleAddUser}
        availablePlans={availablePlans}
      />
    </div>
  );
};

export default Users;
