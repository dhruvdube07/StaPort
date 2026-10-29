import React, { useState } from 'react';
import { IconClose, IconCart, IconCheck, IconExternalLink, IconShield } from './Icons';
import { sounds } from '../utils/soundEngine';

export const ProductQuickViewModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [added, setAdded] = useState(false);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    sounds.playSuccess();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const whatsappUrl = `https://wa.me/919820012345?text=${encodeURIComponent(`Hello Navkar Creative Arts, I am interested in receiving a detailed quote and 3D CAD dimensions for: ${product.name} (${product.subname}).`)}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog quick-view-dialog sci-fi-corners" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex-align gap-2">
            <span className="hud-dot"></span>
            <span className="mono text-accent">[SPEC SHEET // {product.category}]</span>
          </div>
          <button className="btn-ghost p-1" onClick={onClose} aria-label="Close dialog">
            <IconClose size={18} />
          </button>
        </div>

        <div className="modal-body quick-view-body">
          <div className="quick-view-grid">
            <div className="quick-view-img-box">
              <img src={product.image} alt={product.name} className="quick-view-img" />
              <div className="quick-view-badge mono text-xs">
                {product.category}
              </div>
            </div>

            <div className="quick-view-details">
              <div className="flex-align justify-between mb-1">
                <span className="mono text-xs text-accent">SYSTEM ID: #{product.id}</span>
                <span className="mono text-xs text-dim">NAVKAR FRP</span>
              </div>

              <h2 className="font-display text-2xl mb-1">{product.name}</h2>
              <div className="product-sub-headline mono text-xs text-muted mb-3">
                {product.subname}
              </div>

              <p className="text-muted text-sm mb-4 leading-relaxed">
                {product.description}
              </p>

              {/* Material Standard */}
              <div className="material-box mb-3">
                <span className="mono text-xs text-dim block mb-1">// MATERIAL COMPOSITION</span>
                <div className="flex-align gap-2 text-xs mono text-main">
                  <IconShield size={14} className="text-accent" />
                  <span>{product.material}</span>
                </div>
              </div>

              {/* Specs List */}
              <div className="specs-list mb-4">
                <div className="mono text-xs text-dim mb-2">// TECHNICAL SPECIFICATIONS</div>
                <div className="specs-items">
                  {product.specs?.map((spec, idx) => (
                    <div key={idx} className="spec-pill mono text-xs">
                      <IconCheck size={12} className="text-accent" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="quick-view-actions flex-align gap-2">
                <button 
                  className="btn btn-primary flex-1 py-3 text-xs"
                  onClick={handleAdd}
                >
                  {added ? (
                    <>
                      <IconCheck size={16} />
                      <span className="mono">ADDED TO RFQ BASKET</span>
                    </>
                  ) : (
                    <>
                      <IconCart size={16} />
                      <span className="mono">ADD TO QUOTATION RFQ</span>
                    </>
                  )}
                </button>

                <a 
                  href={whatsappUrl}
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn btn-cyber py-3 px-3 text-xs"
                  title="Direct WhatsApp chat regarding this item"
                >
                  <IconExternalLink size={16} />
                  <span className="mono hide-mobile">WHATSAPP</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .quick-view-dialog {
          max-width: 780px;
        }

        .quick-view-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 24px;
        }

        .quick-view-img-box {
          position: relative;
          border-radius: var(--radius-md);
          overflow: hidden;
          background: #090c12;
          border: 1px solid var(--border-dim);
          min-height: 340px;
        }

        .quick-view-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .quick-view-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(9, 10, 15, 0.85);
          border: 1px solid var(--accent);
          color: var(--accent);
          padding: 4px 8px;
          border-radius: var(--radius-xs);
        }

        .material-box {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-dim);
          padding: 8px 12px;
          border-radius: var(--radius-xs);
        }

        .specs-items {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .spec-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.02);
          padding: 6px 10px;
          border-radius: var(--radius-xs);
          border: 1px solid var(--border-dim);
        }

        .product-sub-headline {
          color: var(--accent);
        }

        @media (max-width: 680px) {
          .quick-view-grid { grid-template-columns: 1fr; }
          .quick-view-img-box { min-height: 240px; }
        }
      `}</style>
    </div>
  );
};
