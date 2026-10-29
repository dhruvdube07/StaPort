import React from 'react';
import { IconExternalLink, IconMail, IconKey, IconSliders } from './Icons';
import { sounds } from '../utils/soundEngine';

export const Footer = ({ onOpenModal }) => {
  return (
    <footer className="footer-wrap">
      <div className="footer-container">
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <div className="flex-align gap-2 mb-2">
              <span className="hud-dot"></span>
              <span className="font-display font-bold text-lg text-main">NAVKAR CREATIVE ARTS</span>
            </div>
            <p className="text-muted text-xs leading-relaxed max-w-sm mb-3">
              Master artisans and composite engineers. Delivering museum-grade animal sculptures, high-speed resort water flumes, readymade pools, and playground structures across India and globally.
            </p>
            <div className="mono text-xs text-dim">
              DEPLOYED VIA VERCEL EDGE RUNTIME // ZERO BOTTLENECK
            </div>
          </div>

          {/* Core Home Actions Col */}
          <div className="footer-col">
            <div className="mono text-xs text-accent mb-3">// ACTION HUDS</div>
            <div className="footer-links-list">
              <button 
                className="footer-link-btn" 
                onClick={() => {
                  sounds.playLaser();
                  onOpenModal('contact');
                }}
              >
                <IconMail size={12} />
                <span>01 // Contact & Direct RFQ</span>
              </button>
              <button 
                className="footer-link-btn" 
                onClick={() => {
                  sounds.playLaser();
                  onOpenModal('request_token');
                }}
              >
                <IconKey size={12} />
                <span>02 // Request Token & Catalog</span>
              </button>
              <button 
                className="footer-link-btn" 
                onClick={() => {
                  sounds.playLaser();
                  onOpenModal('settings');
                }}
              >
                <IconSliders size={12} />
                <span>03 // Settings & Admin Portal</span>
              </button>
            </div>
          </div>

          {/* Repositories & Reference Col */}
          <div className="footer-col">
            <div className="mono text-xs text-accent mb-3">// CONNECTIVITY</div>
            <div className="footer-links-list">
              <a 
                href="https://github.com/dhruvdube07/StaPort" 
                target="_blank" 
                rel="noreferrer" 
                className="footer-link-a"
                onClick={() => sounds.playBlip(750)}
              >
                <span>GitHub // dhruvdube07/StaPort</span>
                <IconExternalLink size={12} />
              </a>
              <a 
                href="https://www.lumina-design.co/" 
                target="_blank" 
                rel="noreferrer" 
                className="footer-link-a"
                onClick={() => sounds.playBlip(750)}
              >
                <span>UI Inspiration // Lumina Global Design</span>
                <IconExternalLink size={12} />
              </a>
              <span className="mono text-xs text-dim">WORKSHOP: +91 98200 12345</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom flex-align justify-between pt-4 mt-4">
          <div className="mono text-xs text-dim">
            © 2026 NAVKAR CREATIVE ARTS. ALL RIGHTS RESERVED.
          </div>
          <div className="flex-align gap-3 mono text-xs text-dim">
            <span>LOCATION: GUJARAT / MAHARASHTRA WORKSHOPS</span>
            <span>SPEC: ASTM COMPLIANT</span>
            <span className="text-accent font-bold">STATUS: WORKSHOP ACTIVE</span>
          </div>
        </div>
      </div>

      <style>{`
        .footer-wrap {
          background: #040508;
          border-top: 1px solid var(--border-dim);
          padding: 60px 0 32px;
          position: relative;
          z-index: 10;
        }

        .footer-container {
          max-width: 1360px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .footer-top-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1.2fr;
          gap: 40px;
        }

        .max-w-sm { max-width: 320px; }

        .footer-links-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-link-btn, .footer-link-a {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: 12px;
          cursor: pointer;
          transition: color var(--transition-fast);
          text-align: left;
        }

        .footer-link-btn:hover, .footer-link-a:hover {
          color: var(--accent);
        }

        .footer-bottom {
          border-top: 1px solid var(--border-dim);
        }

        @media (max-width: 850px) {
          .footer-top-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
};
