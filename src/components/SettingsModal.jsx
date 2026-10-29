import React, { useState, useEffect } from 'react';
import { IconSliders, IconClose, IconShield, IconEdit, IconMonitor, IconCheck } from './Icons';

export const SettingsModal = ({ 
  isOpen, 
  onClose, 
  activeTheme, 
  onSelectTheme, 
  isAdminLoggedIn, 
  onAdminLogin, 
  onAdminLogout, 
  onLaunchEditor 
}) => {
  // Always default to admin login if not logged in yet, so user immediately sees login panel
  const [activeTab, setActiveTab] = useState('admin');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (!isAdminLoggedIn) {
        setActiveTab('admin');
      }
      setAuthError(false);
    }
  }, [isOpen, isAdminLoggedIn]);

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const uid = userId.trim().toLowerCase();
    const pwd = password.trim();
    if ((uid === 'admin.in' && pwd === 'in.admin') || (uid === 'admin' && pwd === 'in.admin')) {
      setAuthError(false);
      onAdminLogin();
    } else {
      setAuthError(true);
    }
  };

  const handleLaunch = () => {
    onClose();
    onLaunchEditor();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog settings-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <h3 className="font-heading text-lg">Admin Login & Settings</h3>
            <p className="text-secondary text-xs mt-1">Configure website appearance and access administrative tools</p>
          </div>
          <button className="btn-ghost p-1" onClick={onClose} aria-label="Close" id="modal-close-btn">
            <IconClose size={18} />
          </button>
        </div>

        {/* Tab switch */}
        <div className="modal-tabs">
          <button 
            type="button"
            id="tab-btn-admin"
            className={`tab-btn ${activeTab === 'admin' ? 'active' : ''}`}
            onClick={() => setActiveTab('admin')}
          >
            <IconShield size={15} />
            <span>Admin Sign In {isAdminLoggedIn ? '✓' : ''}</span>
          </button>
          <button 
            type="button"
            id="tab-btn-theme"
            className={`tab-btn ${activeTab === 'user' ? 'active' : ''}`}
            onClick={() => setActiveTab('user')}
          >
            <IconSliders size={15} />
            <span>Theme & Colors</span>
          </button>
        </div>

        <div className="modal-body">
          {activeTab === 'admin' ? (
            <div className="admin-panel-container">
              {isAdminLoggedIn ? (
                <div className="admin-unlocked-card">
                  <div className="badge-pill mb-3">
                    <IconCheck size={13} />
                    <span>Admin Status: Active</span>
                  </div>
                  
                  <h3 className="font-heading text-xl mb-2">Visual Page Editor Unlocked</h3>
                  <p className="text-secondary text-sm mb-4">
                    You have administrator permissions. You can now use the desktop Elementor-like visual page editor to add images, customize hero titles, and edit product listings in real-time.
                  </p>

                  <div className="desktop-notice mb-4">
                    <div className="flex-align gap-2 mb-1">
                      <IconMonitor size={16} />
                      <strong className="text-sm">Desktop Feature</strong>
                    </div>
                    <p className="text-secondary text-xs">
                      The Elementor visual builder is optimized for desktop computers (1024px or wider) for side-by-side editing tools and canvas controls.
                    </p>
                  </div>

                  <button className="btn btn-primary w-full py-3 mb-2" onClick={handleLaunch} id="btn-open-editor">
                    <IconEdit size={16} /> Open Visual Page Editor
                  </button>

                  <button className="btn btn-ghost w-full py-2 text-xs text-secondary" onClick={onAdminLogout} id="btn-admin-logout">
                    Sign Out of Admin
                  </button>
                </div>
              ) : (
                <div className="admin-form-wrap">
                  <div className="admin-form-header mb-4">
                    <h4 className="font-heading text-base mb-1">Administrator Sign In</h4>
                    <p className="text-secondary text-xs">
                      Enter your administrative credentials to unlock page editor mode and content management.
                    </p>
                  </div>

                  <form onSubmit={handleLoginSubmit} id="admin-login-form">
                    <div className="form-group mb-3">
                      <label className="form-label" htmlFor="admin-login-id">Login ID</label>
                      <input 
                        id="admin-login-id"
                        type="text" 
                        required 
                        placeholder="Enter your login ID"
                        className="clean-input"
                        value={userId}
                        onChange={(e) => {
                          setUserId(e.target.value);
                          setAuthError(false);
                        }}
                      />
                    </div>

                    <div className="form-group mb-4">
                      <div className="flex-between mb-1">
                        <label className="form-label mb-0" htmlFor="admin-password">Password</label>
                        <button 
                          type="button" 
                          className="text-xs text-secondary btn-ghost py-0 px-1"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? 'Hide' : 'Show'}
                        </button>
                      </div>
                      <input 
                        id="admin-password"
                        type={showPassword ? 'text' : 'password'}
                        required 
                        placeholder="••••••••"
                        className="clean-input"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setAuthError(false);
                        }}
                      />
                    </div>

                    {authError && (
                      <div className="error-alert-box mb-4">
                        <span className="error-title">Authentication Failed:</span>
                        <span className="error-desc">Invalid Login ID or Password. Please try again.</span>
                      </div>
                    )}

                    <button type="submit" className="btn btn-primary w-full py-3" id="admin-submit-btn">
                      <IconShield size={16} />
                      <span>Sign In as Admin</span>
                    </button>
                  </form>
                </div>
              )}
            </div>
          ) : (
            <div className="theme-selection-view">
              <p className="text-secondary text-sm mb-4">
                Choose your preferred viewing mode. You can toggle between dark luxury and clean light backgrounds anytime.
              </p>

              <div className="theme-pick-grid mb-4">
                <button
                  type="button"
                  id="theme-pick-dark"
                  className={`theme-pick-card ${activeTheme === 'dark' ? 'active' : ''}`}
                  onClick={() => onSelectTheme('dark')}
                >
                  <div className="theme-preview-box dark-preview">
                    <div className="preview-nav"></div>
                    <div className="preview-card"></div>
                  </div>
                  <div className="theme-card-text">
                    <strong className="theme-title">Dark Luxury Mode</strong>
                    <span className="theme-desc">Deep black background</span>
                  </div>
                </button>

                <button
                  type="button"
                  id="theme-pick-light"
                  className={`theme-pick-card ${activeTheme === 'light' ? 'active' : ''}`}
                  onClick={() => onSelectTheme('light')}
                >
                  <div className="theme-preview-box light-preview">
                    <div className="preview-nav"></div>
                    <div className="preview-card"></div>
                  </div>
                  <div className="theme-card-text">
                    <strong className="theme-title">Clean Light Mode</strong>
                    <span className="theme-desc">Pure white background</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .settings-modal-dialog {
          max-width: 520px;
        }

        .theme-pick-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 500px) {
          .theme-pick-grid {
            grid-template-columns: 1fr;
          }
        }

        .theme-pick-card {
          text-align: center;
          padding: 16px;
          border-radius: var(--radius-md);
          background: var(--bg-card);
          border: 2px solid var(--border-subtle);
          cursor: pointer;
          transition: all var(--transition-fast);
          display: flex;
          flex-direction: column;
        }

        .theme-pick-card:hover {
          border-color: var(--border-mid);
          transform: translateY(-2px);
        }

        .theme-pick-card.active {
          border-color: var(--accent);
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }

        .theme-card-text {
          margin-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .theme-title {
          font-family: var(--font-sans);
          font-size: 13.5px;
          font-weight: 700;
          color: var(--text-primary);
          display: block;
        }

        .theme-desc {
          font-size: 11.5px;
          color: var(--text-secondary);
          display: block;
        }

        .theme-preview-box {
          height: 80px;
          border-radius: 8px;
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .dark-preview {
          background: #0c0d11;
          border: 1px solid #27272a;
        }
        .dark-preview .preview-nav { height: 12px; background: #1f2430; border-radius: 4px; }
        .dark-preview .preview-card { flex: 1; background: #14161f; border-radius: 6px; }

        .light-preview {
          background: #fbfbfb;
          border: 1px solid #e4e4e7;
        }
        .light-preview .preview-nav { height: 12px; background: #e4e4e7; border-radius: 4px; }
        .light-preview .preview-card { flex: 1; background: #ffffff; border-radius: 6px; border: 1px solid #e4e4e7; }

        .desktop-notice {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          padding: 12px 14px;
          border-radius: var(--radius-sm);
        }

        .error-alert-box {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: var(--radius-sm);
          padding: 10px 12px;
          font-size: 12px;
          color: #ef4444;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .error-title {
          font-weight: 700;
        }

        .error-desc {
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
};
