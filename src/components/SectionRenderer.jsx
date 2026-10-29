import React, { useState } from 'react';
import { 
  IconPlus, 
  IconArrowUp, 
  IconArrowDown, 
  IconCopy, 
  IconTrash, 
  IconCart, 
  IconZap, 
  IconTerminal, 
  IconCheck, 
  IconEye,
  IconShield
} from './Icons';
import { sounds } from '../utils/soundEngine';

export const SectionRenderer = ({ 
  section, 
  isEditorOpen, 
  previewMode, 
  isSelected, 
  onSelect, 
  onMoveUp, 
  onMoveDown, 
  onDuplicate, 
  onDelete, 
  products, 
  onOpenQuickView, 
  onAddToCart, 
  onOpenModal 
}) => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const isEditing = isEditorOpen && !previewMode;

  const categories = [
    'ALL', 
    'DECORATIVE & STATUES', 
    'WATER PARK, RESORT & POOL', 
    'PLAYGROUND & PARK'
  ];

  const marqueeItems = [
    "ARCHITECTURAL STATUES", "FIBERGLASS WILDLIFE", "RESTAURANT MASCOTS", 
    "WATER PARK FLUMES", "CLOSED TUBE SLIDES", "TIPPING SPLASH BUCKETS", 
    "READYMADE FIBERGLASS POOLS", "MULTI-PLAY CASTLES", "ROLLER SLIDES", 
    "ANIMAL-SHAPED DUSTBINS", "GRADE-A FRP COMPOSITE", "MUSEUM CRAFTSMANSHIP"
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCat = activeCategory === 'ALL' || p.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section 
      id={section.id}
      className={`page-section section-${section.type} ${isEditing ? 'editor-section-wrapper' : ''} ${isSelected && isEditing ? 'editor-active-section' : ''}`}
      onClick={(e) => {
        if (isEditing) {
          e.stopPropagation();
          onSelect(section.id);
        }
      }}
      style={{
        paddingTop: section.style?.padding === 'small' ? '28px' : section.style?.padding === 'large' ? '80px' : '50px',
        paddingBottom: section.style?.padding === 'small' ? '28px' : section.style?.padding === 'large' ? '80px' : '50px',
        textAlign: section.style?.align || 'left'
      }}
    >
      {/* ELEMENTOR ON-CANVAS SECTION CONTROLS */}
      {isEditing && (
        <div className="editor-section-handle" onClick={(e) => e.stopPropagation()}>
          <span className="mono font-bold">:: {section.type.toUpperCase()}</span>
          <button className="editor-h-btn" onClick={onMoveUp} title="Move Up"><IconArrowUp size={12} /></button>
          <button className="editor-h-btn" onClick={onMoveDown} title="Move Down"><IconArrowDown size={12} /></button>
          <button className="editor-h-btn" onClick={onDuplicate} title="Duplicate"><IconCopy size={12} /></button>
          <button className="editor-h-btn text-danger" onClick={onDelete} title="Delete"><IconTrash size={12} /></button>
        </div>
      )}

      <div className="section-container">
        {/* ================= HERO SECTION ================= */}
        {section.type === 'hero' && (
          <div className="lumina-hero-layout">
            <div className="lumina-hero-content">
              {section.badge && (
                <div className="mb-3">
                  <span className="hud-badge">
                    <span className="hud-dot"></span>
                    {section.badge}
                  </span>
                </div>
              )}
              
              <h1 className="lumina-hero-headline font-display">
                {section.title}
              </h1>

              <p className="lumina-hero-subtitle">
                {section.subtitle}
              </p>

              <div className="lumina-hero-cta-group">
                <button 
                  className="btn btn-primary hero-btn"
                  onClick={() => {
                    sounds.playSuccess();
                    document.getElementById('sec-products')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <IconZap size={16} />
                  <span>{section.primaryBtn || 'EXPLORE CATALOG'}</span>
                </button>

                <button 
                  className="btn btn-cyber hero-btn"
                  onClick={() => {
                    sounds.playLaser();
                    onOpenModal('contact');
                  }}
                >
                  <IconTerminal size={16} />
                  <span>{section.secondaryBtn || 'REQUEST QUOTATION'}</span>
                </button>
              </div>

              {/* Telemetry Bar */}
              <div className="hero-telemetry mono text-xs text-muted">
                <span>MATERIAL: <strong className="text-accent">A-GRADE FRP</strong></span>
                <span className="telemetry-sep">|</span>
                <span>CATALOG: <strong className="text-main">25+ SYSTEMS</strong></span>
                <span className="telemetry-sep">|</span>
                <span>ENGINE: <strong className="text-accent">60FPS LITE</strong></span>
              </div>
            </div>

            {section.heroImage && (
              <div className="lumina-hero-visual-wrap">
                <div className="hero-img-box sci-fi-corners">
                  <img 
                    src={section.heroImage} 
                    alt="Navkar Creative Arts Master Sculptures" 
                    className="hero-image"
                    loading="eager"
                  />
                  <div className="hero-floating-hud">
                    <span className="mono text-xs text-accent">[NAVKAR CREATIVE ARTS]</span>
                    <span className="mono text-xs text-muted">SCULPTURES & WATERPARKS</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= HUD METRICS STRIP ================= */}
        {section.type === 'hud_metrics' && (
          <>
            <div className="hud-metrics-grid">
              {(section.metrics || []).map((m, idx) => (
                <div key={idx} className="hud-metric-card sci-fi-corners">
                  <div className="hud-metric-label mono text-xs text-dim">// {m.label}</div>
                  <div className="hud-metric-value font-display">{m.value}</div>
                  <div className="hud-metric-desc mono text-xs text-muted">{m.desc}</div>
                </div>
              ))}
            </div>

            {/* Continuous sliding marquee ribbon (Pure CSS 60FPS) */}
            <div className="marquee-ribbon-container mt-4">
              <div className="marquee-track">
                {marqueeItems.concat(marqueeItems).map((item, idx) => (
                  <span key={idx} className="marquee-item">
                    <span className="hud-dot"></span>
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ================= PRODUCT SHOWCASE GRID (ALL 25 ITEMS) ================= */}
        {section.type === 'products_grid' && (
          <div className="products-section-wrap">
            <div className="section-header-row">
              <div>
                <span className="hud-badge mb-2">COMPLETE COMMERCIAL CATALOG</span>
                <h2 className="font-display text-3xl">{section.title}</h2>
                <p className="text-muted text-sm mt-1">{section.subtitle}</p>
              </div>

              {/* Instant Search Bar */}
              <div className="catalog-search-wrap">
                <input 
                  type="text" 
                  placeholder="Search slides, elephants, fountains, dustbins..."
                  className="cyber-input catalog-search-input mono text-xs"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Division Filter Pills */}
            <div className="category-filter-pills mb-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`btn-glow-pill ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => {
                    sounds.playBlip(800);
                    setActiveCategory(cat);
                  }}
                >
                  {cat} {cat === 'ALL' ? `(${products.length})` : ''}
                </button>
              ))}
            </div>

            {/* Product Cards Grid */}
            <div className="product-cards-grid">
              {filteredProducts.map((prod) => (
                <div key={prod.id} className="cyber-card product-card glow-hover">
                  <div className="product-media-wrap">
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="product-img"
                      loading="lazy" 
                    />
                    <span className="product-stock-tag mono text-xs">
                      {prod.category}
                    </span>
                    <button 
                      className="quick-view-btn"
                      onClick={() => {
                        sounds.playBlip(950);
                        onOpenQuickView(prod);
                      }}
                      title="View Detailed Specifications"
                    >
                      <IconEye size={14} /> TECH SPECS
                    </button>
                  </div>

                  <div className="product-info-wrap">
                    <div className="flex-align justify-between mb-1">
                      <span className="mono text-xs text-accent">ID: #{prod.id}</span>
                      <span className="mono text-xs text-dim">FRP COMPOSITE</span>
                    </div>

                    <h3 className="product-name font-display">{prod.name}</h3>
                    <p className="product-tagline text-xs text-muted mb-2">{prod.subname}</p>

                    <div className="product-specs-preview mb-3">
                      <span className="spec-mini-pill mono text-xs">
                        <IconShield size={11} className="text-accent" />
                        {prod.specs[0]}
                      </span>
                    </div>

                    <div className="product-footer flex-align justify-between pt-2">
                      <div className="product-price font-display text-accent text-sm">
                        DIRECT RFQ
                      </div>

                      <button 
                        className="btn btn-primary product-add-btn"
                        onClick={() => {
                          sounds.playSuccess();
                          onAddToCart(prod);
                        }}
                        title="Add to quotation inquiry bag"
                      >
                        <IconCart size={14} />
                        <span>ADD TO RFQ</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= FEATURE SPLIT BLOCK ================= */}
        {section.type === 'feature_split' && (
          <div className={`feature-split-layout ${section.style?.imagePosition === 'left' ? 'reverse' : ''}`}>
            <div className="feature-text-side">
              {section.badge && (
                <span className="hud-badge mb-3">
                  <span className="hud-dot"></span>
                  {section.badge}
                </span>
              )}
              <h2 className="font-display text-3xl mb-3">{section.title}</h2>
              <p className="text-muted text-sm mb-4 leading-relaxed">{section.subtitle}</p>

              <div className="feature-bullets-list">
                {(section.bullets || []).map((b, idx) => (
                  <div key={idx} className="feature-bullet-item flex-align gap-3">
                    <div className="bullet-icon-box">
                      <IconCheck size={14} className="text-accent" />
                    </div>
                    <div>
                      <h4 className="font-display text-sm text-main">{b.title}</h4>
                      <p className="text-xs text-muted">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {section.image && (
              <div className="feature-img-side">
                <div className="feature-img-box sci-fi-corners">
                  <img src={section.image} alt="Navkar Manufacturing Precision" className="feature-image" loading="lazy" />
                  <div className="feature-floating-tag mono text-xs">
                    NAVKAR WORKSHOP // 25+ DIVISIONS
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= CALL TO ACTION BANNER ================= */}
        {section.type === 'cta_banner' && (
          <div className="cta-banner-card sci-fi-corners">
            <div className="cta-banner-content">
              {section.badge && <span className="hud-badge mb-2">{section.badge}</span>}
              <h2 className="font-display text-3xl mb-2">{section.title}</h2>
              <p className="text-muted text-sm max-w-xl mx-auto mb-4">{section.subtitle}</p>
              
              <div className="cta-action-btns flex-align justify-center gap-3">
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    sounds.playLaser();
                    onOpenModal('request_token');
                  }}
                >
                  <IconZap size={15} />
                  <span>{section.buttonText || 'REQUEST CATALOG TOKEN'}</span>
                </button>
                <button 
                  className="btn btn-cyber"
                  onClick={() => {
                    sounds.playLaser();
                    onOpenModal('contact');
                  }}
                >
                  <IconTerminal size={15} />
                  <span>{section.secondaryText || 'CONTACT WORKSHOP'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= RICH TEXT / BULLETIN ================= */}
        {section.type === 'text_block' && (
          <div className="text-block-wrapper cyber-card sci-fi-corners max-w-2xl mx-auto">
            {section.badge && <span className="hud-badge mb-2">{section.badge}</span>}
            <h2 className="font-display text-2xl mb-3">{section.title}</h2>
            <p className="text-muted text-sm leading-relaxed">{section.content}</p>
          </div>
        )}
      </div>

      <style>{`
        .section-container {
          max-width: 1360px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
        }

        .editor-section-wrapper {
          position: relative;
          outline: 1px dashed rgba(255, 255, 255, 0.15);
          outline-offset: -1px;
          transition: outline-color var(--transition-fast);
        }

        .editor-section-wrapper:hover {
          outline-color: var(--accent);
        }

        .editor-section-handle {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translate(-50%, -100%);
          background: #090b10;
          border: 1px solid var(--accent);
          border-bottom: none;
          padding: 4px 12px;
          border-radius: var(--radius-xs) var(--radius-xs) 0 0;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          color: var(--accent);
          z-index: 100;
          box-shadow: 0 -4px 12px rgba(0,0,0,0.5);
        }

        .editor-h-btn {
          color: var(--text-muted);
          padding: 2px;
          cursor: pointer;
        }

        .editor-h-btn:hover { color: var(--text-main); }
        .editor-h-btn.text-danger:hover { color: #f87171; }

        /* LUMINA HERO */
        .lumina-hero-layout {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          align-items: center;
          gap: 48px;
        }

        .lumina-hero-headline {
          font-size: clamp(2.3rem, 4.3vw, 4.1rem);
          line-height: 1.08;
          margin-bottom: 20px;
          background: linear-gradient(180deg, #ffffff 40%, var(--text-muted) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .lumina-hero-subtitle {
          font-size: clamp(14px, 1.2vw, 16.5px);
          color: var(--text-muted);
          max-width: 540px;
          line-height: 1.6;
          margin-bottom: 30px;
        }

        .lumina-hero-cta-group {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 14px;
          margin-bottom: 32px;
        }

        .hero-btn {
          padding: 12px 26px;
          font-size: 13.5px;
        }

        .hero-telemetry {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .telemetry-sep { color: var(--border-mid); }

        .lumina-hero-visual-wrap {
          position: relative;
        }

        .hero-img-box {
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--bg-card);
          border: 1px solid var(--border-mid);
          box-shadow: 0 20px 50px rgba(0,0,0,0.7), 0 0 35px var(--accent-subtle);
          position: relative;
        }

        .hero-image {
          width: 100%;
          height: 500px;
          object-fit: cover;
          display: block;
          filter: contrast(1.05) saturate(1.1);
        }

        .hero-floating-hud {
          position: absolute;
          bottom: 16px;
          left: 16px;
          right: 16px;
          background: rgba(9, 10, 15, 0.85);
          backdrop-filter: var(--backdrop-blur);
          border: 1px solid var(--border-bright);
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* HUD METRICS */
        .hud-metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
        }

        .hud-metric-card {
          background: var(--bg-card);
          border: 1px solid var(--border-dim);
          border-radius: var(--radius-sm);
          padding: 20px;
          transition: border-color var(--transition-fast);
        }

        .hud-metric-card:hover {
          border-color: var(--accent);
        }

        .hud-metric-value {
          font-size: 30px;
          font-weight: 800;
          color: #ffffff;
          margin: 6px 0;
          letter-spacing: -0.02em;
        }

        /* PRODUCTS GRID */
        .section-header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 24px;
        }

        .catalog-search-wrap {
          width: 100%;
          max-width: 360px;
        }

        .catalog-search-input {
          padding: 10px 14px;
        }

        .category-filter-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .product-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }

        .product-card {
          padding: 0;
          border-radius: var(--radius-md);
        }

        .product-media-wrap {
          position: relative;
          overflow: hidden;
          background: #090c12;
          height: 290px;
        }

        .product-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .product-card:hover .product-img {
          transform: scale(1.05);
        }

        .product-stock-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(0,0,0,0.75);
          backdrop-filter: var(--backdrop-blur);
          border: 1px solid var(--border-dim);
          padding: 4px 8px;
          border-radius: var(--radius-xs);
          color: var(--accent);
        }

        .quick-view-btn {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translate(-50%, 20px);
          opacity: 0;
          background: rgba(9, 10, 15, 0.9);
          backdrop-filter: var(--backdrop-blur);
          border: 1px solid var(--accent);
          color: var(--accent);
          padding: 7px 16px;
          border-radius: var(--radius-full);
          font-family: var(--font-mono);
          font-size: 11px;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: all var(--transition-smooth);
        }

        .product-card:hover .quick-view-btn {
          transform: translate(-50%, 0);
          opacity: 1;
        }

        .product-info-wrap {
          padding: 20px;
        }

        .product-name {
          font-size: 17px;
          font-weight: 700;
          color: #ffffff;
        }

        .product-specs-preview {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .spec-mini-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.03);
          padding: 3px 8px;
          border-radius: var(--radius-xs);
          border: 1px solid var(--border-dim);
        }

        .product-add-btn {
          padding: 8px 16px;
          font-size: 12px;
          border-radius: var(--radius-sm);
        }

        /* FEATURE SPLIT */
        .feature-split-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 48px;
        }

        .feature-split-layout.reverse {
          direction: rtl;
        }

        .feature-split-layout.reverse > * {
          direction: ltr;
        }

        .feature-img-box {
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid var(--border-dim);
          box-shadow: var(--card-shadow);
          position: relative;
        }

        .feature-image {
          width: 100%;
          height: 420px;
          object-fit: cover;
        }

        .feature-floating-tag {
          position: absolute;
          top: 14px;
          right: 14px;
          background: rgba(9, 10, 15, 0.85);
          border: 1px solid var(--accent);
          color: var(--accent);
          padding: 4px 10px;
          border-radius: var(--radius-xs);
        }

        .feature-bullets-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .bullet-icon-box {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--accent-subtle);
          border: 1px solid var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* CTA BANNER */
        .cta-banner-card {
          background: linear-gradient(135deg, rgba(241, 90, 36, 0.09) 0%, rgba(18, 20, 28, 0.95) 100%);
          border: 1px solid var(--accent);
          border-radius: var(--radius-lg);
          padding: 60px 24px;
          text-align: center;
          box-shadow: 0 0 50px var(--accent-subtle);
        }

        .max-w-xl { max-width: 580px; }
        .max-w-2xl { max-width: 680px; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .leading-relaxed { line-height: 1.7; }
        .text-3xl { font-size: clamp(24px, 3.2vw, 36px); }
        .text-2xl { font-size: 22px; }

        @media (max-width: 900px) {
          .lumina-hero-layout { grid-template-columns: 1fr; gap: 32px; }
          .hero-image { height: 360px; }
          .feature-split-layout { grid-template-columns: 1fr; gap: 32px; }
          .feature-split-layout.reverse { direction: ltr; }
          .section-header-row { flex-direction: column; align-items: flex-start; }
          .catalog-search-wrap { max-width: 100%; }
        }
      `}</style>
    </section>
  );
};
