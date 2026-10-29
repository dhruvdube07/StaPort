import React, { useState } from 'react';
import { 
  IconSliders, 
  IconClose, 
  IconShield, 
  IconCheck, 
  IconEdit, 
  IconVolume, 
  IconVolumeX, 
  IconMonitor 
} from './Icons';
import { sounds } from '../utils/soundEngine';

export const SettingsModal = ({ 
  isOpen, 
  onClose, 
  activeTheme, 
  onSelectTheme, 
  perfMode, 
  onSelectPerfMode, 
  soundEnabled, 
  onToggleSound, 
  isAdminLoggedIn, 
  onAdminLogin, 
  onAdminLogout, 
  onLaunchEditor 
}) => {
  const [activeTab, setActiveTab] = useState('user'); // 'user' | 'admin'
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  if (!isOpen) return null;

  const themes = [
    { id: 'sunset', name: 'Lumina Sunset', color: '#F15A24' },
    { id: 'gold', name: 'Royal Gold', color: '#eab308' },
    { id: 'emerald', name: 'Resort Emerald', color: '#10b981' },
    { id: 'cyan', name: 'Water Aqua', color: '#00f2fe' },
    { id: 'stealth', name: 'Stealth Onyx', color: '#f8fafc' },
  ];

  const perfOptions = [
    { id: 'eco', name: '1GB Phone Eco Mode', desc: 'Disables backdrop blur. Locks 60FPS on 1GB RAM budget smartphones' },
    { id: 'balanced', name: 'Balanced Architecture', desc: 'Optimal smooth rendering for tablets and everyday laptops' },
    { id: 'ultra', name: 'Ultra Studio 60FPS', desc: 'Maximum glowing depth and glassmorphism highlights' }
  ];

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    sounds.playLaser();
    
    const uid = userId.trim().toLowerCase();
    if ((uid === 'admin' || uid === 'navkar') && (password === 'vexo2026' || password === 'navkar2026')) {
      setAuthError(false);
      setLoginSuccess(true);
      sounds.playSuccess();
      onAdminLogin();
      setTimeout(() => {
        setLoginSuccess(false);
      }, 1500);
    } else {
      setAuthError(true);
      sounds.playError();
    }
  };

  const handleEditorLaunch = () => {
    sounds.playSuccess();
    onClose();
    onLaunchEditor();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog sci-fi-corners" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex-align gap-2">
            <span className="hud-dot"></span>
            <span className="mono text-accent">[03 // NAVKAR SETTINGS & ADMIN]</span>
          </div>
          <button className="btn-ghost p-1" onClick={onClose} aria-label="Close dialog">
            <IconClose size={18} />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="settings-tabs">
          <button 
            className={`settings-tab-btn ${activeTab === 'user' ? 'active' : ''}`}
            onClick={() => {
              sounds.playBlip(750);
              setActiveTab('user');
            }}
          >
            <IconSliders size={14} />
            <span>CLIENT PREFERENCES</span>
          </button>
          <button 
            className={`settings-tab-btn ${activeTab === 'admin' ? 'active' : ''}`}
            onClick={() => {
              sounds.playBlip(750);
              setActiveTab('admin');
            }}
          >
            <IconShield size={14} />
            <span>ADMIN & ELEMENTOR {isAdminLoggedIn && '✓'}</span>
          </button>
        </div>

        <div className="modal-body">
          {activeTab === 'user' ? (
            <div className="user-preferences">
              {/* Theme Selector */}
              <div className="pref-section mb-4">
                <div className="form-label mb-2 flex-align justify-between">
                  <span>VISUAL ACCENT THEME</span>
                  <span className="text-accent mono">{activeTheme.toUpperCase()}</span>
                </div>
                <div className="theme-grid">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      className={`theme-card ${activeTheme === t.id ? 'active' : ''}`}
                      onClick={() => {
                        sounds.playBlip(850);
                        onSelectTheme(t.id);
                      }}
                    >
                      <span className="theme-swatch" style={{ background: t.color }}></span>
                      <span className="theme-name">{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Performance Mode (engineered for 1GB Phone to 8GB Laptop) */}
              <div className="pref-section mb-4">
                <div className="form-label mb-2 flex-align justify-between">
                  <span>HARDWARE PERFORMANCE GOVERNOR</span>
                  <span className="hud-badge text-xs">{perfMode.toUpperCase()}</span>
                </div>
                <div className="perf-cards">
                  {perfOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      className={`perf-card ${perfMode === opt.id ? 'active' : ''}`}
                      onClick={() => {
                        sounds.playBlip(800);
                        onSelectPerfMode(opt.id);
                      }}
                    >
                      <div className="flex-align justify-between">
                        <span className="mono font-bold text-xs">{opt.name}</span>
                        {perfMode === opt.id && <IconCheck size={14} className="text-accent" />}
                      </div>
                      <p className="perf-desc">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sound Engine Toggle */}
              <div className="pref-section flex-align justify-between pt-2">
                <div>
                  <div className="mono text-xs font-bold text-main">TACTILE AUDIO FEEDBACK</div>
                  <div className="text-muted text-xs">Acoustic click & confirmation synthesizers</div>
                </div>
                <button 
                  className={`btn ${soundEnabled ? 'btn-cyber' : 'btn-ghost'}`}
                  style={{ borderColor: soundEnabled ? 'var(--accent)' : 'var(--border-dim)' }}
                  onClick={onToggleSound}
                >
                  {soundEnabled ? (
                    <>
                      <IconVolume size={15} className="text-accent" />
                      <span className="mono text-xs">AUDIO ON</span>
                    </>
                  ) : (
                    <>
                      <IconVolumeX size={15} />
                      <span className="mono text-xs">MUTED</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="admin-portal">
              {isAdminLoggedIn ? (
                <div className="admin-authenticated-box">
                  <div className="auth-status-badge mb-3">
                    <span className="hud-dot"></span>
                    <span className="mono text-xs text-accent">NAVKAR MASTER ADMIN UNLOCKED</span>
                  </div>
                  <h3 className="font-display text-lg mb-2">WELCOME, ADMINISTRATOR</h3>
                  <p className="text-muted text-sm mb-4">
                    Full Elementor-grade visual page builder access unlocked. You can live-edit catalog text, change product images, insert new sections, and re-order elements directly on desktop.
                  </p>

                  <div className="elementor-launcher-box mb-4">
                    <div className="flex-align gap-2 mb-2">
                      <IconMonitor size={18} className="text-accent" />
                      <span className="mono text-xs font-bold">DESKTOP VISUAL ENGINE</span>
                    </div>
                    <p className="text-xs text-muted mb-3">
                      Engineered for desktop monitors (&gt;= 1024px) for side-by-side widget drag-and-drop and live typography tweaking.
                    </p>
                    <button 
                      className="btn btn-primary w-full py-3"
                      onClick={handleEditorLaunch}
                    >
                      <IconEdit size={16} />
                      <span className="mono">LAUNCH ELEMENTOR VISUAL STUDIO</span>
                    </button>
                  </div>

                  <button 
                    className="btn btn-ghost w-full text-xs text-dim"
                    onClick={() => {
                      sounds.playLaser();
                      onAdminLogout();
                    }}
                  >
                    LOGOUT FROM ADMIN CONSOLE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleLoginSubmit}>
                  <div className="admin-notice mb-3">
                    <span className="mono text-accent text-xs">// ADMIN AUTHENTICATION REQUIRED</span>
                    <p className="text-xs text-muted mt-1">
                      Sign in with administrator credentials to unlock the desktop Elementor-like page builder and live content management suite.
                    </p>
                  </div>

                  {/* Pre-filled hint for effortless testing */}
                  <div className="cred-hint mb-3">
                    <span className="mono text-xs">DEMO CREDENTIALS:</span>
                    <div className="flex-align gap-3 text-xs mono mt-1">
                      <span>User ID: <strong className="text-accent">admin</strong></span>
                      <span>Password: <strong className="text-accent">vexo2026</strong> (or navkar2026)</span>
                    </div>
                  </div>

                  <div className="form-group mb-3">
                    <label className="form-label">ADMIN USER ID</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="admin"
                      className="cyber-input"
                      value={userId}
                      onChange={(e) => {
                        setUserId(e.target.value);
                        setAuthError(false);
                      }}
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label className="form-label">SECURITY PASSWORD</label>
                    <input 
                      type="password" 
                      required 
                      placeholder="••••••••"
                      className="cyber-input"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setAuthError(false);
                      }}
                    />
                  </div>

                  {authError && (
                    <div className="auth-error-msg mono text-xs mb-3">
                      [ERROR] INVALID CREDENTIALS. CHECK USER ID AND PASSWORD.
                    </div>
                  )}

                  {loginSuccess && (
                    <div className="auth-success-msg mono text-xs mb-3">
                      [SUCCESS] IDENTITY VERIFIED. INITIALIZING ELEMENTOR WORKSPACE...
                    </div>
                  )}

                  <button type="submit" className="btn btn-primary w-full py-3">
                    <IconShield size={16} />
                    <span className="mono">AUTHENTICATE & UNLOCK ELEMENTOR</span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .settings-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-bottom: 1px solid var(--border-dim);
          background: rgba(0,0,0,0.25);
        }

        .settings-tab-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          font-family: var(--font-mono);
          font-size: 11.5px;
          color: var(--text-muted);
          border-bottom: 2px solid transparent;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .settings-tab-btn.active {
          color: var(--accent);
          border-bottom-color: var(--accent);
          background: var(--accent-subtle);
        }

        .theme-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 8px;
        }

        .theme-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 12px 8px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-dim);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .theme-card:hover {
          border-color: var(--border-mid);
          background: rgba(255, 255, 255, 0.05);
        }

        .theme-card.active {
          border-color: var(--accent);
          background: var(--accent-subtle);
          box-shadow: 0 0 15px var(--accent-subtle);
        }

        .theme-swatch {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          box-shadow: 0 0 8px currentColor;
        }

        .theme-name {
          font-size: 11px;
          font-family: var(--font-mono);
          color: var(--text-main);
          text-align: center;
        }

        .perf-cards {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .perf-card {
          text-align: left;
          padding: 10px 14px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-dim);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .perf-card.active {
          border-color: var(--accent);
          background: var(--accent-subtle);
        }

        .perf-desc {
          font-size: 11.5px;
          color: var(--text-muted);
          margin-top: 3px;
        }

        .cred-hint {
          background: rgba(0,0,0,0.4);
          border: 1px dashed var(--accent);
          padding: 10px 12px;
          border-radius: var(--radius-xs);
          color: var(--text-muted);
        }

        .auth-error-msg {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid #ef4444;
          color: #ef4444;
          padding: 8px 12px;
          border-radius: var(--radius-xs);
        }

        .auth-success-msg {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid #10b981;
          color: #10b981;
          padding: 8px 12px;
          border-radius: var(--radius-xs);
        }

        .elementor-launcher-box {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid var(--border-mid);
          padding: 16px;
          border-radius: var(--radius-sm);
        }
      `}</style>
    </div>
  );
};
