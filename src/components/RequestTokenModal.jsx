import React, { useState } from 'react';
import { IconKey, IconClose, IconCheck, IconCopy, IconZap } from './Icons';

export const RequestTokenModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('token');
  
  // Quote Token State
  const [token, setToken] = useState('NAVKAR-QUOTE-8421');
  const [copied, setCopied] = useState(false);

  // Custom Request State
  const [requestTitle, setRequestTitle] = useState('');
  const [requestDetails, setRequestDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleGenerateNew = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setToken(`NAVKAR-QUOTE-${randomNum}`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappTokenUrl = `https://wa.me/919820012345?text=${encodeURIComponent(`Hello Navkar Creative Arts, my Quote Reference Token is ${token}. Please share your pricing list and catalogs.`)}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="font-heading text-lg">Request a Quote or Custom Design</h3>
          <button className="btn-ghost p-1" onClick={onClose} aria-label="Close">
            <IconClose size={18} />
          </button>
        </div>

        {/* Tab switch */}
        <div className="modal-tabs">
          <button 
            className={`tab-btn ${activeTab === 'token' ? 'active' : ''}`}
            onClick={() => setActiveTab('token')}
          >
            Quote Reference Token
          </button>
          <button 
            className={`tab-btn ${activeTab === 'custom' ? 'active' : ''}`}
            onClick={() => setActiveTab('custom')}
          >
            Request Custom Design
          </button>
        </div>

        <div className="modal-body">
          {activeTab === 'token' ? (
            <div className="token-view">
              <p className="text-secondary text-sm mb-4">
                You can use this reference token when calling or messaging us on WhatsApp to quickly track your quotation and get direct wholesale pricing.
              </p>

              <div className="token-display-box mb-4">
                <div className="text-secondary text-xs font-semibold uppercase mb-1">Your Quote Reference Code</div>
                <div className="token-code">{token}</div>
                <div className="flex-align gap-2 mt-3">
                  <button className="btn btn-secondary flex-1 py-2 text-xs" onClick={handleCopy}>
                    {copied ? (
                      <>
                        <IconCheck size={14} /> Copied!
                      </>
                    ) : (
                      <>
                        <IconCopy size={14} /> Copy Code
                      </>
                    )}
                  </button>
                  <button className="btn btn-ghost py-2 text-xs" onClick={handleGenerateNew}>
                    <IconZap size={14} /> New Code
                  </button>
                </div>
              </div>

              <a 
                href={whatsappTokenUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary w-full py-3 text-center"
              >
                Send Code via WhatsApp to Get Price
              </a>
            </div>
          ) : (
            <div className="custom-view">
              {submitted ? (
                <div className="text-center py-4">
                  <div className="success-circle">
                    <IconCheck size={32} />
                  </div>
                  <h3 className="font-heading text-lg mb-2">Request Received!</h3>
                  <p className="text-secondary text-sm mb-4">
                    Our 3D modeling and engineering team has received your concept. We will get in touch with you shortly.
                  </p>
                  <button className="btn btn-secondary w-full" onClick={() => setSubmitted(false)}>
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitRequest}>
                  <p className="text-secondary text-sm mb-3">
                    Want a specific animal statue, unique water park slide shape, or custom playground combination?
                  </p>

                  <div className="form-group mb-3">
                    <label className="form-label">What do you want us to make?</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. 15 ft Elephant with Fountain, or Custom Spiral Slide"
                      className="clean-input"
                      value={requestTitle}
                      onChange={(e) => setRequestTitle(e.target.value)}
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label className="form-label">Details / Dimensions</label>
                    <textarea 
                      rows={3} 
                      required 
                      placeholder="Describe preferred height, colors, where it will be installed..."
                      className="clean-input"
                      value={requestDetails}
                      onChange={(e) => setRequestDetails(e.target.value)}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary w-full py-3">
                    Submit Custom Request
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .modal-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-bottom: 1px solid var(--border-subtle);
        }

        .tab-btn {
          padding: 12px;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
          border-bottom: 2px solid transparent;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .tab-btn.active {
          color: var(--text-primary);
          border-bottom-color: var(--text-primary);
          background: var(--border-subtle);
        }

        .token-display-box {
          background: var(--bg-card);
          border: 1px solid var(--border-mid);
          border-radius: var(--radius-sm);
          padding: 18px;
          text-align: center;
        }

        .token-code {
          font-size: 20px;
          font-weight: 800;
          letter-spacing: 0.05em;
          color: var(--text-primary);
          padding: 8px 0;
        }
      `}</style>
    </div>
  );
};
