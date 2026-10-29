import React, { useState } from 'react';
import { IconMail, IconClose, IconCheck, IconExternalLink, IconZap, IconTerminal } from './Icons';
import { sounds } from '../utils/soundEngine';

export const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'WATER PARK, RESORT & POOL',
    city: '',
    message: ''
  });
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmissionSuccess, setTransmissionSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    sounds.playLaser();
    setIsTransmitting(true);

    setTimeout(() => {
      setIsTransmitting(false);
      setTransmissionSuccess(true);
      sounds.playSuccess();
    }, 1100);
  };

  const handleReset = () => {
    setTransmissionSuccess(false);
    setFormData({ name: '', phone: '', email: '', category: 'WATER PARK, RESORT & POOL', city: '', message: '' });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog sci-fi-corners" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex-align gap-2">
            <span className="hud-dot"></span>
            <span className="mono text-accent">[01 // NAVKAR CREATIVE ARTS RFQ CENTER]</span>
          </div>
          <button className="btn-ghost p-1" onClick={onClose} aria-label="Close dialog">
            <IconClose size={18} />
          </button>
        </div>

        <div className="modal-body">
          {transmissionSuccess ? (
            <div className="transmission-success-hud">
              <div className="success-icon-wrap">
                <IconCheck size={36} />
              </div>
              <h3 className="font-display mb-2">PROJECT RFQ TRANSMITTED</h3>
              <p className="text-muted text-sm mb-4">
                Inquiry registered as <span className="mono text-accent">#NCA-RFQ-{Math.floor(1000 + Math.random() * 9000)}</span>. Our senior technical estimation team will contact you via WhatsApp / Phone within 2 business hours.
              </p>
              <div className="terminal-log mono text-xs mb-4">
                <div>[STATUS] 200 OK — WORKSHOP DISPATCH LOGGED</div>
                <div>[DEPARTMENT] {formData.category}</div>
                <div>[DESTINATION] NAVKAR CREATIVE ARTS HEAD OFFICE</div>
              </div>
              <button className="btn btn-cyber w-full" onClick={handleReset}>
                TRANSMIT ANOTHER INQUIRY
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="modal-intro mb-4 text-xs text-muted">
                Direct inquiry channel to Navkar Creative Arts estimation workshop. Receive factory-direct pricing, 3D CAD dimensions, and turnkey delivery schedules.
              </div>

              <div className="grid-2 gap-3 mb-3">
                <div className="form-group mb-0">
                  <label className="form-label">YOUR NAME / CLIENT</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Rajesh Sharma" 
                    className="cyber-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group mb-0">
                  <label className="form-label">PHONE / WHATSAPP</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="+91 98765 43210" 
                    className="cyber-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid-2 gap-3 mb-3">
                <div className="form-group mb-0">
                  <label className="form-label">EMAIL ADDRESS</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="rajesh@resort.com" 
                    className="cyber-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="form-group mb-0">
                  <label className="form-label">PROJECT CITY / STATE</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Mumbai, Goa, Jaipur" 
                    className="cyber-input"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group mb-3">
                <label className="form-label">PRIMARY PRODUCT DIVISION</label>
                <select 
                  className="cyber-input"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="DECORATIVE & STATUES">01 - DECORATIVE & STATUES (WILDLIFE, MASCOTS, MURALS)</option>
                  <option value="WATER PARK, RESORT & POOL">02 - WATER PARK & RESORT (SLIDES, POOLS, WATERFALLS)</option>
                  <option value="PLAYGROUND & PARK">03 - PLAYGROUND & PARK (MULTI-PLAY, SLIDES, BENCHES, DUSTBINS)</option>
                </select>
              </div>

              <div className="form-group mb-4">
                <label className="form-label">PROJECT REQUIREMENTS & ESTIMATED SIZES</label>
                <textarea 
                  rows={3} 
                  required 
                  placeholder="Detail items required (e.g. 2x Elephant Statues 8ft, 1x Closed-Tube Water Slide 30ft height, 4x Dolphin Bins)..."
                  className="cyber-input"
                  style={{ resize: 'vertical' }}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-full py-3"
                disabled={isTransmitting}
              >
                {isTransmitting ? (
                  <span className="flex-align gap-2 mono">
                    <IconTerminal size={16} /> TRANSMITTING TO WORKSHOP...
                  </span>
                ) : (
                  <span className="flex-align gap-2 mono">
                    <IconMail size={16} /> SUBMIT RFQ TO NAVKAR // 01
                  </span>
                )}
              </button>
            </form>
          )}

          {/* Direct channels */}
          <div className="contact-channels mt-4 pt-4">
            <div className="channels-title mono text-xs text-muted mb-2">// DIRECT WORKSHOP CHANNELS</div>
            <div className="channel-pills">
              <a 
                href="https://wa.me/919820012345" 
                target="_blank" 
                rel="noreferrer" 
                className="channel-pill"
                onClick={() => sounds.playBlip(700)}
              >
                <span>WhatsApp Instant Inquiry</span>
                <IconExternalLink size={12} />
              </a>
              <a 
                href="tel:+919820012345" 
                className="channel-pill"
                onClick={() => sounds.playBlip(700)}
              >
                <span>Call Workshop: +91 98200 12345</span>
              </a>
              <span className="channel-pill mono text-dim">
                NAVKAR CREATIVE ARTS // EST. 2012
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .flex-align { display: flex; align-items: center; }
        .gap-2 { gap: 8px; }
        .gap-3 { gap: 12px; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; }
        .w-full { width: 100%; }
        .p-1 { padding: 4px; }
        .mt-4 { margin-top: 16px; }
        .pt-4 { border-top: 1px solid var(--border-dim); }
        .text-accent { color: var(--accent); }
        .text-sm { font-size: 13px; }
        .text-xs { font-size: 11px; }

        .terminal-log {
          background: rgba(0,0,0,0.5);
          border: 1px solid var(--border-dim);
          border-left: 3px solid var(--accent);
          padding: 10px 12px;
          border-radius: var(--radius-xs);
          color: var(--accent);
          line-height: 1.6;
        }

        .transmission-success-hud {
          text-align: center;
          padding: 16px 0;
        }

        .success-icon-wrap {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: var(--accent-subtle);
          border: 2px solid var(--accent);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          box-shadow: 0 0 20px var(--accent-glow);
        }

        .channel-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .channel-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-dim);
          border-radius: var(--radius-full);
          font-size: 12px;
          color: var(--text-muted);
          transition: all var(--transition-fast);
        }

        .channel-pill:hover {
          color: var(--accent);
          border-color: var(--accent);
          background: var(--accent-subtle);
        }

        @media (max-width: 580px) {
          .grid-2 { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};
