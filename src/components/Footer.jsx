import React from 'react';
import { IconExternalLink, IconMail, IconKey, IconSliders } from './Icons';

export const Footer = ({ onOpenModal }) => {
  return (
    <footer className="clean-footer">
      <div className="footer-container">
        <div className="footer-top-grid">
          {/* Brand */}
          <div className="footer-brand-col">
            <h3 className="footer-brand-title">Navkar Creative Arts</h3>
            <p className="footer-brand-desc">
              Manufacturer of handcrafted fiberglass animal statues, contemporary abstract sculptures, resort water park slides, swimming pools, and outdoor playground equipment.
            </p>
            <div className="footer-contact-info">
              <div>Phone: +91 98200 12345</div>
              <div>Email: info@navkarcreativearts.com</div>
              <div>Factory: Gujarat & Maharashtra, India</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Actions</h4>
            <div className="footer-links">
              <button className="footer-link-btn" onClick={() => onOpenModal('contact')}>
                <IconMail size={13} />
                <span>Contact & Inquiries</span>
              </button>
              <button className="footer-link-btn" onClick={() => onOpenModal('request_token')}>
                <IconKey size={13} />
                <span>Request Quote Token</span>
              </button>
              <button className="footer-link-btn" onClick={() => onOpenModal('settings')}>
                <IconSliders size={13} />
                <span>Settings & Admin</span>
              </button>
            </div>
          </div>

          {/* Direct WhatsApp & Repos */}
          <div className="footer-col">
            <h4 className="footer-col-title">Direct Connect</h4>
            <div className="footer-links">
              <a 
                href="https://wa.me/919820012345" 
                target="_blank" 
                rel="noreferrer" 
                className="footer-link-a"
              >
                <span>WhatsApp Workshop</span>
                <IconExternalLink size={12} />
              </a>
              <a 
                href="https://github.com/dhruvdube07/StaPort" 
                target="_blank" 
                rel="noreferrer" 
                className="footer-link-a"
              >
                <span>GitHub Repository</span>
                <IconExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} Navkar Creative Arts. All rights reserved.</div>
          <div className="text-secondary text-xs">Direct Factory Manufacturer • All India Delivery</div>
        </div>
      </div>

      <style>{`
        .clean-footer {
          background: var(--bg-surface);
          border-top: 1px solid var(--border-subtle);
          padding: 60px 0 32px;
          color: var(--text-primary);
        }

        .footer-container {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .footer-top-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 40px;
        }

        .footer-brand-title {
          font-family: var(--font-heading);
          font-size: 20px;
          margin-bottom: 12px;
        }

        .footer-brand-desc {
          color: var(--text-secondary);
          font-size: 13.5px;
          line-height: 1.6;
          max-width: 380px;
          margin-bottom: 16px;
        }

        .footer-contact-info {
          font-size: 13px;
          color: var(--text-secondary);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .footer-col-title {
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-link-btn, .footer-link-a {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 13.5px;
          cursor: pointer;
          transition: color 0.2s;
          text-align: left;
        }

        .footer-link-btn:hover, .footer-link-a:hover {
          color: var(--text-primary);
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 24px;
          border-top: 1px solid var(--border-subtle);
          font-size: 13px;
          color: var(--text-muted);
        }

        @media (max-width: 800px) {
          .footer-top-grid { grid-template-columns: 1fr; gap: 32px; }
          .footer-bottom { flex-direction: column; gap: 12px; align-items: flex-start; }
        }
      `}</style>
    </footer>
  );
};
