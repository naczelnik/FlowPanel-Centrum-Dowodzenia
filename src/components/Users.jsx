import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye } from 'lucide-react';
import './Users.css';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Mock data - w prawdziwej aplikacji to będzie z Supabase
  const [users] = useState([
    {
      id: 1,
      name: 'David Cassar',
      email: 'me@davidcassar.com',
      avatar: 'D',
      status: 'Active',
      plan: 'Panel AI PRO',
      tokens: { used: 0, total: 5000000 },
      lastActivity: '6h ago',
      created: 'Jul 7, 25'
    },
    {
      id: 2,
      name: 'Kevin',
      email: 'kevin.monsieur018@gmail.com',
      avatar: 'K',
      status: 'Active',
      plan: 'Panel AI PRO',
      tokens: { used: 0, total: 5000000 },
      lastActivity: '5h ago',
      created: 'Jul 7, 25'
    }
  ]);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <div className="users-container">
      <div className="users-header">
        <div className="users-title-section">
          <h1>Zarządzanie Użytkownikami</h1>
          <p>Zarządzaj wszystkimi użytkownikami w systemie. Łącznie: {users.length} użytkowników</p>
        </div>
        <button className="add-user-btn">
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
              <th>Użytkownik</th>
              <th>Plan</th>
              <th>Tokeny</th>
              <th>Ostatnia Aktywność</th>
              <th>Utworzono</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="user-row">
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleSelectUser(user.id)}
                  />
                </td>
                <td>
                  <div className="user-info">
                    <div className="user-avatar">{user.avatar}</div>
                    <div className="user-details">
                      <div className="user-name">{user.name}</div>
                      <div className="user-email">{user.email}</div>
                    </div>
                    <span className={`status-badge ${user.status.toLowerCase()}`}>
                      {user.status === 'Active' ? 'Aktywny' : 'Nieaktywny'}
                    </span>
                  </div>
                </td>
                <td>
                  <span className="plan-badge">
                    {user.plan}
                  </span>
                </td>
                <td>
                  <div className="tokens-info">
                    <div className="tokens-numbers">
                      {user.tokens.used.toLocaleString()} / {user.tokens.total.toLocaleString()}
                    </div>
                  </div>
                </td>
                <td>{user.lastActivity}</td>
                <td>{user.created}</td>
                <td>
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
};

export default Users;
