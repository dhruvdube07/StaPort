import React, { useState } from 'react';
import { IconClose, IconTrash, IconCheck, IconExternalLink } from './Icons';
import { sounds } from '../utils/soundEngine';

export const CartDrawer = ({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onClearCart }) => {
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    sounds.playLaser();
    setCheckingOut(true);
    setTimeout(() => {
      setCheckingOut(false);
      setCheckoutComplete(true);
      sounds.playSuccess();
      onClearCart();
    }, 1200);
  };

  const getWhatsappMessage = () => {
    const list = cart.map((i) => `• ${i.name} (Qty: ${i.quantity})`).join('%0A');
    return `https://wa.me/919820012345?text=${encodeURIComponent(`Hello Navkar Creative Arts, I would like to request an official factory quotation for the following items:\n`)}${list}`;
  };

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <div className="flex-align gap-2">
            <span className="hud-dot"></span>
            <span className="mono text-accent">[RFQ BASKET // {cart.length} ITEMS]</span>
          </div>
          <button className="btn-ghost p-1" onClick={onClose} aria-label="Close cart">
            <IconClose size={18} />
          </button>
        </div>

        <div className="cart-body">
          {checkoutComplete ? (
            <div className="checkout-success text-center py-6">
              <div className="success-icon-wrap">
                <IconCheck size={36} />
              </div>
              <h3 className="font-display text-xl mb-2">RFQ DISPATCHED</h3>
              <p className="text-muted text-xs mb-4">
                Your quotation request has been routed to Navkar Creative Arts estimation workshop.
              </p>
              <button 
                className="btn btn-cyber w-full"
                onClick={() => setCheckoutComplete(false)}
              >
                CONTINUE BROWSING CATALOG
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="cart-empty text-center py-8">
              <div className="mono text-muted text-xs mb-2">// RFQ BASKET EMPTY</div>
              <p className="text-dim text-xs">Browse the 25+ product divisions and select items to bundle an official factory quotation.</p>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <h4 className="font-display text-xs text-main">{item.name}</h4>
                    <div className="mono text-xs text-accent">{item.category}</div>
                    <div className="flex-align gap-2 mt-2">
                      <button 
                        className="qty-btn"
                        onClick={() => {
                          sounds.playBlip(750);
                          onUpdateQuantity(item.id, null, item.quantity - 1);
                        }}
                      >-</button>
                      <span className="mono text-xs">{item.quantity} QTY</span>
                      <button 
                        className="qty-btn"
                        onClick={() => {
                          sounds.playBlip(750);
                          onUpdateQuantity(item.id, null, item.quantity + 1);
                        }}
                      >+</button>
                      <button 
                        className="btn-ghost p-1 ml-auto text-dim"
                        onClick={() => {
                          sounds.playLaser();
                          onRemoveItem(item.id);
                        }}
                      >
                        <IconTrash size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && !checkoutComplete && (
          <div className="cart-footer">
            <div className="flex-align justify-between mb-3 text-xs mono text-muted">
              <span>ITEMS SELECTED</span>
              <span className="text-accent font-bold">{cart.reduce((a, b) => a + b.quantity, 0)} TOTAL UNITS</span>
            </div>
            
            <button 
              className="btn btn-primary w-full py-3 mb-2"
              disabled={checkingOut}
              onClick={handleCheckout}
            >
              {checkingOut ? (
                <span className="mono text-xs">TRANSMITTING TO WORKSHOP...</span>
              ) : (
                <span className="mono text-xs">SUBMIT OFFICIAL RFQ TO ESTIMATION</span>
              )}
            </button>

            <a
              href={getWhatsappMessage()}
              target="_blank"
              rel="noreferrer"
              className="btn btn-cyber w-full py-2 text-xs flex-align justify-center gap-2"
              onClick={() => sounds.playLaser()}
            >
              <IconExternalLink size={14} />
              <span className="mono">SEND BUNDLE VIA WHATSAPP</span>
            </a>
          </div>
        )}
      </div>

      <style>{`
        .cart-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: var(--backdrop-blur);
          z-index: 1200;
          display: flex;
          justify-content: flex-end;
          animation: fadeIn 0.2s ease-out;
        }

        .cart-drawer {
          width: 100%;
          max-width: 380px;
          height: 100%;
          background: var(--bg-surface);
          border-left: 1px solid var(--border-bright);
          display: flex;
          flex-direction: column;
          animation: slideLeft 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: -10px 0 40px rgba(0,0,0,0.8);
        }

        .cart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border-dim);
        }

        .cart-body {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
        }

        .cart-items-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .cart-item-card {
          display: flex;
          gap: 12px;
          padding: 10px;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border-dim);
          border-radius: var(--radius-sm);
        }

        .cart-item-img {
          width: 64px;
          height: 64px;
          object-fit: cover;
          border-radius: var(--radius-xs);
        }

        .cart-item-info {
          flex: 1;
        }

        .qty-btn {
          width: 22px;
          height: 22px;
          border: 1px solid var(--border-mid);
          color: var(--text-muted);
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .qty-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
        }

        .cart-footer {
          padding: 20px;
          border-top: 1px solid var(--border-dim);
          background: rgba(0,0,0,0.3);
        }

        .ml-auto { margin-left: auto; }
        .py-6 { padding-top: 24px; padding-bottom: 24px; }
        .py-8 { padding-top: 32px; padding-bottom: 32px; }

        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};
