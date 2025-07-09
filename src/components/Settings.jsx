import React, { useState } from 'react';
import { User, Link, Palette, Eye, EyeOff, Save, Check, AlertCircle } from 'lucide-react';
import './Settings.css';

const Settings = () => {
  const [activeSubTab, setActiveSubTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [accentColor, setAccentColor] = useState('#6366f1');
  const [saveStatus, setSaveStatus] = useState('');

  const subTabs = [
    {
      id: 'profile',
      label: 'Profil',
      icon: User,
      active: activeSubTab === 'profile'
    },
    {
      id: 'integrations',
      label: 'Integracje',
      icon: Link,
      active: activeSubTab === 'integrations'
    },
    {
      id: 'appearance',
      label: 'Wygląd',
      icon: Palette,
      active: activeSubTab === 'appearance'
    }
  ];

  const handleSave = (section) => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(''), 2000);
    }, 1000);
  };

  const renderProfileSettings = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>Ustawienia Profilu</h3>
        <p>Zarządzaj swoimi danymi osobowymi i bezpieczeństwem konta</p>
      </div>

      <div className="settings-grid">
        <div className="settings-card">
          <h4>Dane osobowe</h4>
          <div className="form-group">
            <label>Imię i nazwisko</label>
            <input type="text" defaultValue="Jan Kowalski" />
          </div>
          <div className="form-group">
            <label>Adres email</label>
            <input type="email" defaultValue="jan.kowalski@example.com" />
          </div>
          <div className="form-group">
            <label>Numer telefonu</label>
            <input type="tel" defaultValue="+48 123 456 789" />
          </div>
          <div className="form-group">
            <label>Stanowisko</label>
            <input type="text" defaultValue="Administrator" />
          </div>
        </div>

        <div className="settings-card">
          <h4>Zmiana hasła</h4>
          <div className="form-group">
            <label>Obecne hasło</label>
            <div className="password-input">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Wprowadź obecne hasło"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div className="form-group">
            <label>Nowe hasło</label>
            <div className="password-input">
              <input 
                type={showNewPassword ? "text" : "password"} 
                placeholder="Wprowadź nowe hasło"
              />
              <button 
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="password-toggle"
              >
                {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div className="form-group">
            <label>Potwierdź nowe hasło</label>
            <div className="password-input">
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="Potwierdź nowe hasło"
              />
              <button 
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="password-toggle"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div className="password-requirements">
            <p>Hasło musi zawierać:</p>
            <ul>
              <li>Co najmniej 8 znaków</li>
              <li>Jedną wielką literę</li>
              <li>Jedną małą literę</li>
              <li>Jedną cyfrę</li>
              <li>Jeden znak specjalny</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button 
          className="btn-primary"
          onClick={() => handleSave('profile')}
          disabled={saveStatus === 'saving'}
        >
          {saveStatus === 'saving' ? 'Zapisywanie...' : 'Zapisz zmiany'}
          {saveStatus === 'success' && <Check size={16} />}
        </button>
      </div>
    </div>
  );

  const renderIntegrations = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>Integracje</h3>
        <p>Połącz swoje konta reklamowe i narzędzia analityczne</p>
      </div>

      <div className="integrations-grid">
        <div className="integration-card">
          <div className="integration-header">
            <div className="integration-icon google">G</div>
            <div className="integration-info">
              <h4>Google Analytics 4</h4>
              <p>Śledź ruch na stronie i konwersje</p>
            </div>
            <div className="integration-status connected">
              <span className="status-dot"></span>
              Połączono
            </div>
          </div>
          <div className="integration-details">
            <p><strong>Konto:</strong> analytics@example.com</p>
            <p><strong>Property ID:</strong> GA4-123456789</p>
            <p><strong>Ostatnia synchronizacja:</strong> 2 minuty temu</p>
          </div>
          <div className="integration-actions">
            <button className="btn-secondary">Konfiguruj</button>
            <button className="btn-danger">Rozłącz</button>
          </div>
        </div>

        <div className="integration-card">
          <div className="integration-header">
            <div className="integration-icon facebook">f</div>
            <div className="integration-info">
              <h4>Facebook Ads</h4>
              <p>Zarządzaj kampaniami reklamowymi</p>
            </div>
            <div className="integration-status disconnected">
              <span className="status-dot"></span>
              Rozłączono
            </div>
          </div>
          <div className="integration-details">
            <p>Połącz swoje konto Facebook Ads aby importować dane o kampaniach i optymalizować wydajność reklam.</p>
          </div>
          <div className="integration-actions">
            <button className="btn-primary">Połącz konto</button>
          </div>
        </div>

        <div className="integration-card">
          <div className="integration-header">
            <div className="integration-icon google-ads">G</div>
            <div className="integration-info">
              <h4>Google Ads</h4>
              <p>Importuj dane z kampanii Google</p>
            </div>
            <div className="integration-status disconnected">
              <span className="status-dot"></span>
              Rozłączono
            </div>
          </div>
          <div className="integration-details">
            <p>Synchronizuj dane z Google Ads aby śledzić wydajność kampanii i optymalizować budżet reklamowy.</p>
          </div>
          <div className="integration-actions">
            <button className="btn-primary">Połącz konto</button>
          </div>
        </div>

        <div className="integration-card">
          <div className="integration-header">
            <div className="integration-icon instagram">📷</div>
            <div className="integration-info">
              <h4>Instagram Business</h4>
              <p>Analizuj zasięg i zaangażowanie</p>
            </div>
            <div className="integration-status connected">
              <span className="status-dot"></span>
              Połączono
            </div>
          </div>
          <div className="integration-details">
            <p><strong>Konto:</strong> @example_business</p>
            <p><strong>Obserwujący:</strong> 15,234</p>
            <p><strong>Ostatnia synchronizacja:</strong> 1 godzina temu</p>
          </div>
          <div className="integration-actions">
            <button className="btn-secondary">Konfiguruj</button>
            <button className="btn-danger">Rozłącz</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearance = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>Preferencje wyglądu</h3>
        <p>Dostosuj interfejs do swoich preferencji</p>
      </div>

      <div className="appearance-grid">
        <div className="settings-card">
          <h4>Motyw kolorystyczny</h4>
          <div className="theme-options">
            <div 
              className={`theme-option ${theme === 'light' ? 'active' : ''}`}
              onClick={() => setTheme('light')}
            >
              <div className="theme-preview light">
                <div className="preview-header"></div>
                <div className="preview-sidebar"></div>
                <div className="preview-content"></div>
              </div>
              <span>Jasny</span>
            </div>
            <div 
              className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
              onClick={() => setTheme('dark')}
            >
              <div className="theme-preview dark">
                <div className="preview-header"></div>
                <div className="preview-sidebar"></div>
                <div className="preview-content"></div>
              </div>
              <span>Ciemny</span>
            </div>
            <div 
              className={`theme-option ${theme === 'auto' ? 'active' : ''}`}
              onClick={() => setTheme('auto')}
            >
              <div className="theme-preview auto">
                <div className="preview-header"></div>
                <div className="preview-sidebar"></div>
                <div className="preview-content"></div>
              </div>
              <span>Automatyczny</span>
            </div>
          </div>
        </div>

        <div className="settings-card">
          <h4>Kolor akcentu</h4>
          <div className="color-options">
            {[
              { color: '#6366f1', name: 'Indygo' },
              { color: '#8b5cf6', name: 'Fioletowy' },
              { color: '#06b6d4', name: 'Cyjan' },
              { color: '#10b981', name: 'Zielony' },
              { color: '#f59e0b', name: 'Pomarańczowy' },
              { color: '#ef4444', name: 'Czerwony' }
            ].map((colorOption) => (
              <div
                key={colorOption.color}
                className={`color-option ${accentColor === colorOption.color ? 'active' : ''}`}
                onClick={() => setAccentColor(colorOption.color)}
                style={{ backgroundColor: colorOption.color }}
                title={colorOption.name}
              >
                {accentColor === colorOption.color && <Check size={16} />}
              </div>
            ))}
          </div>
        </div>

        <div className="settings-card">
          <h4>Dodatkowe opcje</h4>
          <div className="form-group">
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked />
              <span className="checkmark"></span>
              Animacje interfejsu
            </label>
          </div>
          <div className="form-group">
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked />
              <span className="checkmark"></span>
              Kompaktowy widok tabel
            </label>
          </div>
          <div className="form-group">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span className="checkmark"></span>
              Wysokie kontrasty
            </label>
          </div>
          <div className="form-group">
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked />
              <span className="checkmark"></span>
              Powiadomienia dźwiękowe
            </label>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button 
          className="btn-primary"
          onClick={() => handleSave('appearance')}
          disabled={saveStatus === 'saving'}
        >
          {saveStatus === 'saving' ? 'Zapisywanie...' : 'Zastosuj zmiany'}
          {saveStatus === 'success' && <Check size={16} />}
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSubTab) {
      case 'profile':
        return renderProfileSettings();
      case 'integrations':
        return renderIntegrations();
      case 'appearance':
        return renderAppearance();
      default:
        return renderProfileSettings();
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2>Ustawienia</h2>
        <p>Zarządzaj swoim kontem, integracjami i preferencjami</p>
      </div>

      <div className="settings-tabs">
        {subTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`settings-tab ${tab.active ? 'active' : ''}`}
              onClick={() => setActiveSubTab(tab.id)}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="settings-content">
        {renderContent()}
      </div>

      {saveStatus === 'success' && (
        <div className="success-notification">
          <Check size={16} />
          <span>Zmiany zostały zapisane pomyślnie</span>
        </div>
      )}
    </div>
  );
};

export default Settings;
