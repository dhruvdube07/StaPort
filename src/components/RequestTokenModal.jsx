import React, { useState } from 'react';
import { 
  IconKey, 
  IconClose, 
  IconCheck, 
  IconCopy, 
  IconZap, 
  IconTerminal, 
  IconCpu 
} from './Icons';
import { sounds } from '../utils/soundEngine';

export const RequestTokenModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('token'); // 'token' | 'update'
  
  // Token Generator state
  const [generatedToken, setGeneratedToken] = useState('NAVKAR-CATALOG-9842-VIP');
  const [tokenTier, setTokenTier] = useState('TRADE_ARCHITECT');
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Update Request state
  const [updateType, setUpdateType] = useState('BESPOKE_SCULPTURE');
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateDetails, setUpdateDetails] = useState('');
  const [updateSubmitted, setUpdateSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleGenerateNewToken = () => {
    sounds.playLaser();
    setIsGenerating(true);
    setTimeout(() => {
      const randHex = () => Math.random().toString(36).substring(2, 6).toUpperCase();
      const newToken = `NAVKAR-${randHex()}-${tokenTier.slice(0, 5)}-${randHex()}`;
      setGeneratedToken(newToken);
      setIsGenerating(false);
      sounds.playSuccess();
    }, 600);
  };

  const handleCopyToken = () => {
    sounds.playBlip(1000);
    navigator.clipboard.writeText(generatedToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    sounds.playLaser();
    setUpdateSubmitted(true);
    sounds.playSuccess();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog sci-fi-corners" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex-align gap-2">
            <span className="hud-dot"></span>
            <span className="mono text-accent">[02 // REQUEST TOKEN & CUSTOM DESIGN]</span>
          </div>
          <button className="btn-ghost p-1" onClick={onClose} aria-label="Close dialog">
            <IconClose size={18} />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="token-modal-tabs">
          <button 
            className={`token-tab-btn ${activeTab === 'token' ? 'active' : ''}`}
            onClick={() => {
              sounds.playBlip(750);
              setActiveTab('token');
            }}
          >
            <IconKey size={14} />
            <span>MINT CATALOG TOKEN</span>
          </button>
          <button 
            className={`token-tab-btn ${activeTab === 'update' ? 'active' : ''}`}
            onClick={() => {
              sounds.playBlip(750);
              setActiveTab('update');
            }}
          >
            <IconCpu size={14} />
            <span>BESPOKE DESIGN REQUEST</span>
          </button>
        </div>

        <div className="modal-body">
          {activeTab === 'token' ? (
            <div className="token-generator-view">
              <p className="text-muted text-sm mb-4">
                Navkar Access Tokens provide digital clearance to download technical 3D CAD step files, high-resolution finish swatches, and trade wholesale discount brackets.
              </p>

              <div className="form-group mb-3">
                <label className="form-label">CLIENT / TIER CLEARANCE</label>
                <div className="tier-pills">
                  {['TRADE_ARCHITECT', 'RESORT_DEVELOPER', 'CONTRACTOR_VIP'].map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      className={`tier-pill ${tokenTier === tier ? 'active' : ''}`}
                      onClick={() => {
                        sounds.playBlip(800);
                        setTokenTier(tier);
                      }}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              {/* Glowing Token Output Box */}
              <div className="token-display-box mb-4">
                <div className="token-header flex-align justify-between">
                  <span className="mono text-xs text-accent">AUTHORIZED ACCESS TOKEN</span>
                  <span className="hud-badge text-xs">ACTIVE</span>
                </div>
                <div className="token-string mono">{generatedToken}</div>
                <div className="token-actions flex-align gap-2 mt-3">
                  <button 
                    className="btn btn-primary flex-1 py-2 text-xs" 
                    onClick={handleCopyToken}
                  >
                    {copied ? (
                      <>
                        <IconCheck size={14} />
                        <span>COPIED TO CLIPBOARD</span>
                      </>
                    ) : (
                      <>
                        <IconCopy size={14} />
                        <span>COPY TOKEN</span>
                      </>
                    )}
                  </button>
                  <button 
                    className="btn btn-cyber py-2 text-xs" 
                    onClick={handleGenerateNewToken}
                    disabled={isGenerating}
                  >
                    <IconZap size={14} />
                    <span>{isGenerating ? 'MINTING...' : 'RE-MINT'}</span>
                  </button>
                </div>
              </div>

              <div className="token-specs-card">
                <div className="mono text-xs text-dim mb-1">// ACCESS PERMISSIONS</div>
                <div className="grid-2 text-xs mono text-muted">
                  <div>CAD BLUEPRINTS: <span className="text-main">UNLOCKED</span></div>
                  <div>FACTORY VISITS: <span className="text-main">PRIORITY</span></div>
                  <div>PRICE SCHEDULE: <span className="text-main">WHOLESALE</span></div>
                  <div>STATUS: <span className="text-accent">VERIFIED</span></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="update-request-view">
              {updateSubmitted ? (
                <div className="text-center py-4">
                  <div className="success-icon-wrap">
                    <IconCheck size={32} />
                  </div>
                  <h3 className="font-display mb-2">CUSTOM DESIGN BRIEF RECEIVED</h3>
                  <p className="text-muted text-sm mb-4">
                    Tracking ID: <span className="mono text-accent">#DES-{Math.floor(1000 + Math.random() * 9000)}</span>. Our 3D clay modeling studio has received your brief.
                  </p>
                  <button 
                    className="btn btn-cyber w-full"
                    onClick={() => {
                      setUpdateSubmitted(false);
                      setUpdateTitle('');
                      setUpdateDetails('');
                    }}
                  >
                    SUBMIT ANOTHER PROPOSAL
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitUpdate}>
                  <p className="text-muted text-sm mb-4">
                    Require a custom animal mascot, unique water slide trajectory, or specialized architectural mural? Detail your vision here.
                  </p>

                  <div className="form-group mb-3">
                    <label className="form-label">PROJECT TYPE</label>
                    <select 
                      className="cyber-input"
                      value={updateType}
                      onChange={(e) => setUpdateType(e.target.value)}
                    >
                      <option value="BESPOKE_SCULPTURE">CUSTOM SCULPTURE / MASCOT DESIGN</option>
                      <option value="WATERPARK_LAYOUT">TURNKEY WATER PARK FLUME ENGINEERING</option>
                      <option value="PLAYGROUND_CUSTOM">THEMATIC PLAYGROUND ARCHITECTURE</option>
                      <option value="CATALOG_ADDITION">REQUEST ADDITION TO NAVKAR CATALOG</option>
                    </select>
                  </div>

                  <div className="form-group mb-3">
                    <label className="form-label">PROJECT CONCEPT TITLE</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. 18ft Golden Peacock Fountain for Resort Atrium" 
                      className="cyber-input"
                      value={updateTitle}
                      onChange={(e) => setUpdateTitle(e.target.value)}
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label className="form-label">TECHNICAL SPECIFICATIONS & DIMENSIONS</label>
                    <textarea 
                      rows={3} 
                      required 
                      placeholder="Detail height, structural mounting, outdoor vs indoor, timeline..."
                      className="cyber-input"
                      value={updateDetails}
                      onChange={(e) => setUpdateDetails(e.target.value)}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary w-full py-3">
                    <IconTerminal size={16} />
                    <span className="mono">TRANSMIT DESIGN BRIEF // 02</span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .token-modal-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-bottom: 1px solid var(--border-dim);
          background: rgba(0,0,0,0.25);
        }

        .token-tab-btn {
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

        .token-tab-btn.active {
          color: var(--accent);
          border-bottom-color: var(--accent);
          background: var(--accent-subtle);
        }

        .tier-pills {
          display: flex;
          gap: 8px;
        }

        .tier-pill {
          flex: 1;
          padding: 8px 6px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-dim);
          border-radius: var(--radius-xs);
          font-family: var(--font-mono);
          font-size: 10.5px;
          color: var(--text-muted);
          cursor: pointer;
          transition: all var(--transition-fast);
          text-align: center;
        }

        .tier-pill.active {
          border-color: var(--accent);
          color: var(--accent);
          background: var(--accent-subtle);
          font-weight: 700;
        }

        .token-display-box {
          background: #040508;
          border: 1px solid var(--accent);
          border-radius: var(--radius-sm);
          padding: 16px;
          box-shadow: 0 0 20px var(--accent-subtle);
        }

        .token-string {
          font-size: 16px;
          font-weight: 700;
          color: #ffffff;
          padding: 10px 0;
          letter-spacing: 0.08em;
          text-align: center;
          word-break: break-all;
          text-shadow: 0 0 10px var(--accent-glow);
        }

        .token-specs-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border-dim);
          padding: 12px;
          border-radius: var(--radius-xs);
        }

        .justify-between { justify-content: space-between; }
        .flex-1 { flex: 1; }
        .text-center { text-align: center; }
        .py-4 { padding-top: 16px; padding-bottom: 16px; }
      `}</style>
    </div>
  );
};
