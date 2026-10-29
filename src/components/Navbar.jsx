import React, { useState } from 'react';
import { 
  IconMail, 
  IconKey, 
  IconSliders, 
  IconCart, 
  IconEdit, 
  IconClose 
} from './Icons';

export const Navbar = ({ 
  onOpenModal, 
  cartCount, 
  onOpenCart, 
  isAdminLoggedIn, 
  isEditorOpen, 
  onToggleEditor,
  activeTheme,
  onToggleTheme
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAction = (modalName) => {
    onOpenModal(modalName);
    setMobileMenuOpen(false);
  };

  return (
    <header className="clean-navbar">
      <div className="navbar-container">
        {/* Brand */}
        <div className="navbar-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="brand-mark">N</div>
          <div className="brand-titles">
            <span className="brand-main">Navkar</span>
            <span className="brand-sub">Creative Arts</span>
          </div>
        </div>

        {/* 3 Main Action Buttons + Theme Switcher (Desktop) */}
        <div className="navbar-actions hide-mobile">
          {/* Button 1: Contact */}
          <button 
            id="nav-btn-contact"
            className="btn btn-secondary nav-action-btn" 
            onClick={() => handleAction('contact')}
          >
            <IconMail size={15} />
            <span>Contact Us</span>
          </button>

          {/* Button 2: Request Quote / Token */}
          <button 
            id="nav-btn-token"
            className="btn btn-secondary nav-action-btn" 
            onClick={() => handleAction('request_token')}
          >
            <IconKey size={15} />
            <span>Request Quote / Token</span>
          </button>

          {/* Button 3: Settings */}
          <button 
            id="nav-btn-settings"
            className="btn btn-secondary nav-action-btn" 
            onClick={() => handleAction('settings')}
          >
            <IconSliders size={15} />
            <span>Settings</span>
          </button>

          {/* Admin Studio Trigger (when logged in) */}
          {isAdminLoggedIn && (
            <button 
              id="nav-btn-elementor"
              className={`btn ${isEditorOpen ? 'btn-primary' : 'btn-secondary'} nav-action-btn admin-studio-btn`}
              onClick={onToggleEditor}
            >
              <IconEdit size={14} />
              <span>{isEditorOpen ? 'Close Editor' : 'Visual Page Editor'}</span>
            </button>
          )}

          {/* One-Click Theme Switcher (Black / White) */}
          <button 
            className="btn btn-ghost theme-toggle-btn"
            onClick={onToggleTheme}
            title={`Switch to ${activeTheme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {activeTheme === 'dark' ? '☀ Light' : '☾ Dark'}
          </button>
        </div>

        {/* Right side: Quote Basket & Mobile Toggle */}
        <div className="navbar-right">
          <button 
            id="nav-btn-cart"
            className="btn btn-secondary cart-trigger-btn" 
            onClick={onOpenCart}
            title="View Quote List"
          >
            <IconCart size={16} />
            <span className="hide-mobile">Quote List</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          {/* Hamburger toggle for mobile */}
          <button 
            className="btn btn-secondary mobile-menu-btn show-mobile" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <IconClose size={18} /> : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-dropdown show-mobile">
          <button 
            className="btn btn-secondary w-full mb-2 text-left" 
            onClick={() => handleAction('contact')}
          >
            <IconMail size={16} /> Contact Us
          </button>
          <button 
            className="btn btn-secondary w-full mb-2 text-left" 
            onClick={() => handleAction('request_token')}
          >
            <IconKey size={16} /> Request Quote / Token
          </button>
          <button 
            className="btn btn-secondary w-full mb-2 text-left" 
            onClick={() => handleAction('settings')}
          >
            <IconSliders size={16} /> Settings
          </button>

          {isAdminLoggedIn && (
            <button 
              className="btn btn-primary w-full mb-2"
              onClick={() => {
                onToggleEditor();
                setMobileMenuOpen(false);
              }}
            >
              <IconEdit size={16} /> Visual Page Editor
            </button>
          )}

          <button 
            className="btn btn-ghost w-full mt-2" 
            onClick={() => {
              onToggleTheme();
              setMobileMenuOpen(false);
            }}
          >
            {activeTheme === 'dark' ? 'Switch to Light Mode ☀' : 'Switch to Dark Mode ☾'}
          </button>
        </div>
      )}

      <style>{`
        .clean-navbar {
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 500;
          background: var(--header-bg);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-subtle);
          transition: background 0.3s ease, border-color 0.3s ease;
        }

        .navbar-container {
          max-width: 1320px;
          margin: 0 auto;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          gap: 16px;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }

        .brand-mark {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: var(--text-primary);
          color: var(--bg-main);
          font-weight: 800;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-heading);
        }

        .brand-titles {
          display: flex;
          flex-direction: column;
        }

        .brand-main {
          font-family: var(--font-heading);
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--text-primary);
          line-height: 1.1;
        }

        .brand-sub {
          font-size: 12px;
          color: var(--text-secondary);
          font-weight: 500;
          letter-spacing: 0.02em;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .nav-action-btn {
          padding: 8px 16px;
          font-size: 13px;
          border-radius: var(--radius-full);
        }

        .admin-studio-btn {
          border-color: var(--accent);
          font-weight: 700;
        }

        .theme-toggle-btn {
          font-size: 13px;
          padding: 8px 14px;
          border-radius: var(--radius-full);
          font-weight: 600;
        }

        .navbar-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .cart-trigger-btn {
          position: relative;
          border-radius: var(--radius-full);
          padding: 8px 16px;
          font-size: 13px;
        }

        .cart-badge {
          background: var(--accent);
          color: var(--accent-text);
          font-size: 11px;
          font-weight: 700;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 4px;
        }

        .mobile-dropdown {
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border-mid);
          padding: 16px 24px 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .text-left { justify-content: flex-start; }
        .w-full { width: 100%; }
        .mb-2 { margin-bottom: 8px; }
        .mt-2 { margin-top: 8px; }

        @media (min-width: 960px) {
          .show-mobile { display: none !important; }
        }

        @media (max-width: 959px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: block; }
        }
      `}</style>
    </header>
  );
};
