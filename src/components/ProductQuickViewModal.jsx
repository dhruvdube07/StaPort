import React, { useState } from 'react';
import { IconClose, IconCart, IconCheck, IconExternalLink } from './Icons';

export const ProductQuickViewModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [added, setAdded] = useState(false);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const whatsappUrl = `https://wa.me/919820012345?text=${encodeURIComponent(`Hello Navkar Creative Arts, I am interested in: ${product.name} (${product.subname}). Please provide specifications, sizes, and price details.`)}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog quick-view-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="badge-pill">{product.category}</span>
          <button className="btn-ghost p-1" onClick={onClose} aria-label="Close">
            <IconClose size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="quick-view-grid">
            <div className="quick-view-img-box">
              <img src={product.image} alt={product.name} className="quick-view-img" />
            </div>

            <div className="quick-view-info">
              <h2 className="font-sans-title text-2xl mb-1">{product.name}</h2>
              <p className="text-secondary text-sm mb-3">{product.subname}</p>

              <p className="text-secondary text-sm mb-4 leading-relaxed">
                {product.description}
              </p>

              <div className="material-highlight mb-3">
                <span className="text-xs text-muted block mb-1 uppercase font-semibold">Material:</span>
                <span className="text-sm font-semibold text-primary">{product.material}</span>
              </div>

              {/* Specs */}
              <div className="specs-box mb-4">
                <span className="text-xs text-muted block mb-2 uppercase font-semibold">Key Highlights:</span>
                <div className="specs-items">
                  {product.specs?.map((spec, idx) => (
                    <div key={idx} className="spec-row">
                      <IconCheck size={14} className="spec-check-icon" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="quick-view-actions">
                <button className="btn btn-primary flex-1 py-3" onClick={handleAdd}>
                  {added ? (
                    <>
                      <IconCheck size={16} /> Added to Quote List!
                    </>
                  ) : (
                    <>
                      <IconCart size={16} /> Add to Quote List
                    </>
                  )}
                </button>

                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary py-3 px-4"
                  title="Ask on WhatsApp"
                >
                  <IconExternalLink size={16} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .quick-view-dialog {
          max-width: 800px;
        }

        .quick-view-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 28px;
        }

        .quick-view-img-box {
          border-radius: var(--radius-md);
          overflow: hidden;
          background: var(--bg-card);
          min-height: 320px;
          border: 1px solid var(--border-subtle);
        }

        .quick-view-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .material-highlight {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          padding: 10px 14px;
          border-radius: var(--radius-sm);
        }

        .specs-items {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .spec-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--text-secondary);
        }

        .spec-check-icon {
          color: var(--accent);
          flex-shrink: 0;
        }

        .quick-view-actions {
          display: flex;
          gap: 10px;
        }

        .leading-relaxed { line-height: 1.6; }
        .text-2xl { font-size: 22px; }

        @media (max-width: 640px) {
          .quick-view-grid { grid-template-columns: 1fr; }
          .quick-view-img-box { min-height: 240px; }
        }
      `}</style>
    </div>
  );
};
