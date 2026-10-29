import React, { useState } from 'react';
import { IconSliders, IconClose, IconShield, IconEdit, IconMonitor } from './Icons';

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
  const [activeTab, setActiveTab] = useState('user'); // 'user' | 'admin'
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const uid = userId.trim().toLowerCase();
    if ((uid === 'admin' || uid === 'navkar') && (password === 'vexo2026' || password === 'navkar2026')) {
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
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="font-heading text-lg">Website Settings & Admin Login</h3>
          <button className="btn-ghost p-1" onClick={onClose} aria-label="Close">
            <IconClose size={18} />
          </button>
        </div>

        {/* Tab switch */}
        <div className="modal-tabs">
          <button 
            className={`tab-btn ${activeTab === 'user' ? 'active' : ''}`}
            onClick={() => setActiveTab('user')}
          >
            Appearance & Theme
          </button>
          <button 
            className={`tab-btn ${activeTab === 'admin' ? 'active' : ''}`}
            onClick={() => setActiveTab('admin')}
          >
            Admin Editor Access {isAdminLoggedIn && '✓'}
          </button>
        </div>

        <div className="modal-body">
          {activeTab === 'user' ? (
            <div className="theme-selection-view">
              <p className="text-secondary text-sm mb-4">
                Choose your preferred viewing mode. You can toggle between dark luxury and clean light backgrounds anytime.
              </p>

              <div className="grid-2 gap-3 mb-4">
                <button
                  type="button"
                  className={`theme-pick-card ${activeTheme === 'dark' ? 'active' : ''}`}
                  onClick={() => onSelectTheme('dark')}
                >
                  <div className="theme-preview-box dark-preview">
                    <div className="preview-nav"></div>
                    <div className="preview-card"></div>
                  </div>
                  <span className="font-sans-title text-sm mt-2 block">Dark Luxury Mode</span>
                  <span className="text-secondary text-xs">Deep black background</span>
                </button>

                <button
                  type="button"
                  className={`theme-pick-card ${activeTheme === 'light' ? 'active' : ''}`}
                  onClick={() => onSelectTheme('light')}
                >
                  <div className="theme-preview-box light-preview">
                    <div className="preview-nav"></div>
                    <div className="preview-card"></div>
                  </div>
                  <span className="font-sans-title text-sm mt-2 block">Clean Light Mode</span>
                  <span className="text-secondary text-xs">Pure white background</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="admin-view">
              {isAdminLoggedIn ? (
                <div className="admin-unlocked-card">
                  <div className="badge-pill mb-3">Admin Access Active</div>
                  <h3 className="font-heading text-xl mb-2">Visual Page Editor Unlocked</h3>
                  <p className="text-secondary text-sm mb-4">
                    You have administrator permissions. You can now use the desktop Elementor-like visual page editor to add images, add new products, edit headings, and customize the layout in real-time.
                  </p>

                  <div className="desktop-notice mb-4">
                    <div className="flex-align gap-2 mb-1">
                      <IconMonitor size={16} />
                      <strong className="text-sm">Desktop Only Feature</strong>
                    </div>
                    <p className="text-secondary text-xs">
                      The Elementor visual builder is optimized for desktop computers (1024px or wider) for side-by-side editing tools and canvas controls.
                    </p>
                  </div>

                  <button className="btn btn-primary w-full py-3 mb-2" onClick={handleLaunch}>
                    <IconEdit size={16} /> Open Visual Page Editor
                  </button>

                  <button className="btn btn-ghost w-full text-xs text-secondary" onClick={onAdminLogout}>
                    Log Out of Admin
                  </button>
                </div>
              ) : (
                <form onSubmit={handleLoginSubmit}>
                  <p className="text-secondary text-sm mb-3">
                    Enter your admin credentials to access the desktop visual editor for adding images and editing sections.
                  </p>

                  {/* Demo helper */}
                  <div className="demo-credentials-box mb-3">
                    <span className="text-xs font-semibold uppercase text-secondary">Demo Credentials:</span>
                    <div className="flex-align gap-3 text-xs mt-1">
                      <span>User ID: <strong>admin</strong></span>
                      <span>Password: <strong>vexo2026</strong></span>
                    </div>
                  </div>

                  <div className="form-group mb-3">
                    <label className="form-label">User ID</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="admin"
                      className="clean-input"
                      value={userId}
                      onChange={(e) => {
                        setUserId(e.target.value);
                        setAuthError(false);
                      }}
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label className="form-label">Password</label>
                    <input 
                      type="password" 
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
                    <div className="error-text text-xs mb-3">
                      Invalid User ID or Password. Please check demo credentials above.
                    </div>
                  )}

                  <button type="submit" className="btn btn-primary w-full py-3">
                    <IconShield size={16} /> Sign In as Admin
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .theme-pick-card {
          text-align: center;
          padding: 16px;
          border-radius: var(--radius-md);
          background: var(--bg-card);
          border: 2px solid var(--border-subtle);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .theme-pick-card.active {
          border-color: var(--accent);
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
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

        .demo-credentials-box {
          background: var(--bg-card);
          border: 1px dashed var(--border-mid);
          padding: 10px 14px;
          border-radius: var(--radius-sm);
        }

        .desktop-notice {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          padding: 12px 14px;
          border-radius: var(--radius-sm);
        }

        .error-text {
          color: #ef4444;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};
