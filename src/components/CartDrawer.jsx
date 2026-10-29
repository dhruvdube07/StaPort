import React, { useState } from 'react';
import { IconClose, IconTrash, IconCheck, IconExternalLink } from './Icons';

export const CartDrawer = ({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onClearCart }) => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSend = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      onClearCart();
    }, 800);
  };

  const getWhatsappListUrl = () => {
    const list = cart.map((i) => `• ${i.name} (Qty: ${i.quantity})`).join('\n');
    return `https://wa.me/919820012345?text=${encodeURIComponent(`Hello Navkar Creative Arts, please provide an official quote for the following products:\n${list}`)}`;
  };

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h3 className="font-heading text-lg">Your Quote Inquiry List</h3>
          <button className="btn-ghost p-1" onClick={onClose} aria-label="Close">
            <IconClose size={18} />
          </button>
        </div>

        <div className="cart-body">
          {submitted ? (
            <div className="text-center py-6">
              <div className="success-circle">
                <IconCheck size={32} />
              </div>
              <h3 className="font-heading text-xl mb-2">Inquiry Submitted!</h3>
              <p className="text-secondary text-sm mb-4">
                Thank you! We have received your quotation list and will share the best factory-direct rates with you shortly.
              </p>
              <button className="btn btn-secondary w-full" onClick={() => setSubmitted(false)}>
                Back to Catalog
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-secondary text-sm mb-2">Your quote list is empty.</p>
              <p className="text-muted text-xs">Browse our 25+ products and click "Add to Quote" to request pricing.</p>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <h4 className="cart-item-title">{item.name}</h4>
                    <span className="cart-item-cat">{item.category}</span>
                    <div className="flex-align gap-2 mt-2">
                      <button 
                        className="qty-btn"
                        onClick={() => onUpdateQuantity(item.id, null, item.quantity - 1)}
                      >-</button>
                      <span className="qty-number">{item.quantity} Qty</span>
                      <button 
                        className="qty-btn"
                        onClick={() => onUpdateQuantity(item.id, null, item.quantity + 1)}
                      >+</button>
                      <button 
                        className="btn-ghost p-1 ml-auto text-muted"
                        onClick={() => onRemoveItem(item.id)}
                        title="Remove item"
                      >
                        <IconTrash size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && !submitted && (
          <div className="cart-footer">
            <div className="flex-align justify-between mb-3 text-sm text-secondary">
              <span>Total Selected Items:</span>
              <strong className="text-primary">{cart.reduce((a, b) => a + b.quantity, 0)} units</strong>
            </div>

            <button 
              className="btn btn-primary w-full py-3 mb-2"
              disabled={submitting}
              onClick={handleSend}
            >
              {submitting ? 'Submitting...' : 'Submit Quote Request'}
            </button>

            <a 
              href={getWhatsappListUrl()}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary w-full py-2.5 text-xs flex-align justify-center gap-2"
            >
              <IconExternalLink size={14} />
              <span>Send This List on WhatsApp</span>
            </a>
          </div>
        )}
      </div>

      <style>{`
        .cart-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
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
          border-left: 1px solid var(--border-mid);
          display: flex;
          flex-direction: column;
          animation: slideLeft 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: -10px 0 30px rgba(0,0,0,0.3);
        }

        .cart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 20px;
          border-bottom: 1px solid var(--border-subtle);
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
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
        }

        .cart-item-img {
          width: 64px;
          height: 64px;
          object-fit: cover;
          border-radius: var(--radius-sm);
        }

        .cart-item-info {
          flex: 1;
        }

        .cart-item-title {
          font-size: 13.5px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .cart-item-cat {
          font-size: 11px;
          color: var(--text-muted);
        }

        .qty-btn {
          width: 24px;
          height: 24px;
          border: 1px solid var(--border-mid);
          color: var(--text-primary);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .qty-number {
          font-size: 12px;
          font-weight: 600;
        }

        .cart-footer {
          padding: 20px;
          border-top: 1px solid var(--border-subtle);
          background: var(--bg-card);
        }

        .ml-auto { margin-left: auto; }
        .text-primary { color: var(--text-primary); }

        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};
