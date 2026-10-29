import React, { useState } from 'react';
import { 
  IconMail, 
  IconKey, 
  IconSliders, 
  IconCart, 
  IconEdit, 
  IconZap, 
  IconClose 
} from './Icons';
import { sounds } from '../utils/soundEngine';

export const Navbar = ({ 
  onOpenModal, 
  cartCount, 
  onOpenCart, 
  isAdminLoggedIn, 
  isEditorOpen, 
  onToggleEditor 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAction = (modalName) => {
    sounds.playLaser();
    onOpenModal(modalName);
    setMobileMenuOpen(false);
  };

  return (
    <header className="lumina-navbar-wrapper">
      <div className="lumina-navbar-inner">
        {/* Brand Logo - Navkar Creative Arts */}
        <div className="navbar-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="brand-hex">
            <svg width="24" height="24" viewBox="0 0 100 100">
              <polygon points="50,4 96,27 96,73 50,96 4,73 4,27" fill="none" stroke="var(--accent)" strokeWidth="9"/>
              <path d="M30,30 L50,70 L70,30" fill="none" stroke="var(--accent)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-title">NAVKAR</span>
            <span className="brand-sub mono">// CREATIVE ARTS</span>
          </div>
          <span className="hud-badge hide-mobile">
            <span className="hud-dot"></span>
            FRP 2026
          </span>
        </div>

        {/* 3 CORE ACTIONS (Lumina Floating Pill Buttons) */}
        <div className="navbar-actions hide-mobile">
          {/* Button 1: Contact & RFQ */}
          <button 
            id="nav-btn-contact"
            className="btn btn-cyber lumina-nav-pill" 
            onClick={() => handleAction('contact')}
            title="Request Direct Quotation / Contact Workshop"
          >
            <IconMail size={14} />
            <span>01 // CONTACT & RFQ</span>
          </button>

          {/* Button 2: Request Token / Catalog */}
          <button 
            id="nav-btn-token"
            className="btn btn-cyber lumina-nav-pill" 
            onClick={() => handleAction('request_token')}
            title="Generate Catalog Access Token or Request Custom Design"
          >
            <IconKey size={14} />
            <span>02 // REQUEST TOKEN</span>
          </button>

          {/* Button 3: Settings & Admin */}
          <button 
            id="nav-btn-settings"
            className="btn btn-cyber lumina-nav-pill" 
            onClick={() => handleAction('settings')}
            title="Configure Visual Theme, 1GB Perf Mode & Admin Sign-in"
          >
            <IconSliders size={14} />
            <span>03 // SETTINGS</span>
          </button>

          {/* Admin Elementor Launcher (Visible when authenticated) */}
          {isAdminLoggedIn && (
            <button 
              id="nav-btn-elementor"
              className={`btn ${isEditorOpen ? 'btn-primary' : 'btn-cyber'} lumina-nav-pill editor-trigger-glow`}
              onClick={() => {
                sounds.playSuccess();
                onToggleEditor();
              }}
              title="Launch Desktop Elementor Visual Studio"
            >
              <IconEdit size={14} />
              <span>{isEditorOpen ? 'CLOSE STUDIO' : '⚡ ELEMENTOR STUDIO'}</span>
            </button>
          )}
        </div>

        {/* Right side: Quote Basket & Mobile Toggle */}
        <div className="navbar-right">
          <button 
            id="nav-btn-cart"
            className="btn btn-cyber quote-basket-btn" 
            onClick={() => {
              sounds.playBlip(900);
              onOpenCart();
            }}
            title="View Selected Quote Inquiries"
          >
            <IconCart size={17} />
            <span className="mono text-xs hide-mobile">QUOTE LIST</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          {/* Mobile hamburger */}
          <button 
            className="mobile-toggle-btn show-mobile" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <IconClose size={20} /> : <IconZap size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer show-mobile">
          <div className="mobile-menu-content">
            <div className="mobile-menu-label mono">// NAVKAR CREATIVE ARTS</div>
            <button 
              className="btn btn-cyber w-full mb-3 text-xs" 
              onClick={() => handleAction('contact')}
            >
              <IconMail size={15} /> 01 // CONTACT & DIRECT RFQ
            </button>
            <button 
              className="btn btn-cyber w-full mb-3 text-xs" 
              onClick={() => handleAction('request_token')}
            >
              <IconKey size={15} /> 02 // REQUEST TOKEN & SPEC SHEET
            </button>
            <button 
              className="btn btn-cyber w-full mb-3 text-xs" 
              onClick={() => handleAction('settings')}
            >
              <IconSliders size={15} /> 03 // SETTINGS & ADMIN PORTAL
            </button>

            {isAdminLoggedIn && (
              <button 
                className="btn btn-primary w-full text-xs"
                onClick={() => {
                  sounds.playSuccess();
                  onToggleEditor();
                  setMobileMenuOpen(false);
                }}
              >
                <IconEdit size={15} /> ⚡ ELEMENTOR STUDIO
              </button>
            )}
          </div>
        </div>
      )}

      <style>{`
        .lumina-navbar-wrapper {
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 500;
          background: rgba(9, 10, 15, 0.88);
          backdrop-filter: var(--backdrop-blur);
          border-bottom: 1px solid var(--border-dim);
          transition: background var(--transition-fast);
        }

        .lumina-navbar-inner {
          max-width: 1360px;
          margin: 0 auto;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          gap: 16px;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          user-select: none;
        }

        .brand-hex {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: float 4s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }

        .brand-title {
          font-family: var(--font-display);
          font-size: 19px;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #ffffff;
        }

        .brand-sub {
          font-size: 11px;
          color: var(--accent);
          margin-left: 6px;
          letter-spacing: 0.08em;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .lumina-nav-pill {
          padding: 8px 14px;
          font-size: 11.5px;
          font-family: var(--font-mono);
          letter-spacing: 0.04em;
          border-radius: var(--radius-sm);
        }

        .editor-trigger-glow {
          border-color: var(--accent);
          box-shadow: 0 0 15px var(--accent-subtle);
          font-weight: 700;
        }

        .navbar-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .quote-basket-btn {
          position: relative;
          padding: 8px 14px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .cart-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: var(--accent);
          color: var(--accent-text);
          font-size: 11px;
          font-weight: 800;
          font-family: var(--font-mono);
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 8px var(--accent);
        }

        .mobile-toggle-btn {
          background: var(--bg-card);
          border: 1px solid var(--border-mid);
          color: var(--text-main);
          padding: 8px;
          border-radius: var(--radius-sm);
          cursor: pointer;
        }

        .mobile-menu-drawer {
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border-mid);
          padding: 16px 20px 24px;
          animation: slideDown 0.2s ease-out;
        }

        .mobile-menu-label {
          font-size: 11px;
          color: var(--accent);
          margin-bottom: 12px;
          letter-spacing: 0.1em;
        }

        .w-full { width: 100%; }
        .mb-3 { margin-bottom: 12px; }

        @media (min-width: 900px) {
          .hide-desktop { display: none !important; }
          .show-mobile { display: none !important; }
        }

        @media (max-width: 899px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: block; }
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
};
