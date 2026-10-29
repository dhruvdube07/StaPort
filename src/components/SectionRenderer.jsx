import React, { useState } from 'react';
import { 
  IconArrowUp, 
  IconArrowDown, 
  IconCopy, 
  IconTrash, 
  IconCart, 
  IconEye,
  IconCheck
} from './Icons';

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
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const isEditing = isEditorOpen && !previewMode;

  const categories = [
    'All', 
    'Statues & Sculptures', 
    'Water Park & Pool', 
    'Playground & Park'
  ];

  const marqueeWords = [
    "Decorative Statues", "Resort Water Slides", "Fiberglass Swimming Pools", 
    "Kids Playgrounds", "Restaurant Mascots", "Water Mushrooms", 
    "Outdoor Park Benches", "Animal Dustbins", "Custom Sizing & Colors"
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCat = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section 
      id={section.id}
      className={`page-section section-${section.type} ${isEditing ? 'editor-section-box' : ''} ${isSelected && isEditing ? 'editor-selected' : ''}`}
      onClick={(e) => {
        if (isEditing) {
          e.stopPropagation();
          onSelect(section.id);
        }
      }}
      style={{
        paddingTop: section.style?.padding === 'small' ? '30px' : section.style?.padding === 'large' ? '80px' : '50px',
        paddingBottom: section.style?.padding === 'small' ? '30px' : section.style?.padding === 'large' ? '80px' : '50px',
        textAlign: section.style?.align || 'left'
      }}
    >
      {/* On-Canvas Editor Toolbar */}
      {isEditing && (
        <div className="editor-controls-bar" onClick={(e) => e.stopPropagation()}>
          <span className="editor-title">{section.type.replace('_', ' ').toUpperCase()}</span>
          <button className="editor-btn" onClick={onMoveUp} title="Move Up"><IconArrowUp size={12} /></button>
          <button className="editor-btn" onClick={onMoveDown} title="Move Down"><IconArrowDown size={12} /></button>
          <button className="editor-btn" onClick={onDuplicate} title="Duplicate"><IconCopy size={12} /></button>
          <button className="editor-btn text-danger" onClick={onDelete} title="Delete"><IconTrash size={12} /></button>
        </div>
      )}

      <div className="section-container">
        {/* ================= HERO SECTION ================= */}
        {section.type === 'hero' && (
          <div className="hero-grid">
            <div className="hero-text-col">
              {section.badge && (
                <div className="mb-3">
                  <span className="badge-pill">
                    {section.badge}
                  </span>
                </div>
              )}
              
              <h1 className="hero-title">
                {section.title}
              </h1>

              <p className="hero-subtitle">
                {section.subtitle}
              </p>

              <div className="hero-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    document.getElementById('sec-products')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {section.primaryBtn || 'Browse Products'}
                </button>

                <button 
                  className="btn btn-secondary"
                  onClick={() => onOpenModal('contact')}
                >
                  {section.secondaryBtn || 'Contact Us'}
                </button>
              </div>
            </div>

            {section.heroImage && (
              <div className="hero-image-col">
                <div className="hero-card">
                  <img 
                    src={section.heroImage} 
                    alt="Navkar Creative Arts Showcase" 
                    className="hero-img"
                    loading="eager"
                  />
                  <div className="hero-img-badge">
                    <span>Direct Workshop Manufacturer</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= HIGHLIGHTS STRIP ================= */}
        {section.type === 'highlights_strip' && (
          <>
            <div className="highlights-grid">
              {(section.items || []).map((m, idx) => (
                <div key={idx} className="luxury-card highlight-card">
                  <div className="highlight-label">{m.label}</div>
                  <div className="highlight-value">{m.value}</div>
                  <div className="highlight-desc">{m.desc}</div>
                </div>
              ))}
            </div>

            {/* Continuous Clean Ribbon */}
            <div className="clean-marquee-wrap mt-4">
              <div className="clean-marquee-track">
                {marqueeWords.concat(marqueeWords).map((word, idx) => (
                  <span key={idx} className="clean-marquee-item">
                    <span className="clean-marquee-dot"></span>
                    <span>{word}</span>
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ================= PRODUCTS GRID (ALL 25 PRODUCTS) ================= */}
        {section.type === 'products_grid' && (
          <div className="products-container">
            <div className="products-header">
              <div>
                <span className="badge-pill mb-2">Our Complete Catalog</span>
                <h2 className="products-title">{section.title}</h2>
                <p className="text-secondary">{section.subtitle}</p>
              </div>

              {/* Clean Instant Search */}
              <div className="search-box-wrap">
                <input 
                  type="text" 
                  placeholder="Search products (e.g. Elephant, Slide, Pool)..."
                  className="clean-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="category-pills-row">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`btn-pill ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat} {cat === 'All' ? `(${products.length})` : ''}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="products-grid">
              {filteredProducts.map((prod) => (
                <div key={prod.id} className="luxury-card product-card">
                  <div className="product-image-wrap">
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="product-image"
                      loading="lazy" 
                    />
                    <span className="product-category-tag">
                      {prod.category}
                    </span>
                    <button 
                      className="quick-view-overlay-btn"
                      onClick={() => onOpenQuickView(prod)}
                      title="View Details"
                    >
                      <IconEye size={14} /> View Details
                    </button>
                  </div>

                  <div className="product-body">
                    <div className="product-meta">
                      <span className="product-material">{prod.material}</span>
                    </div>

                    <h3 className="product-title">{prod.name}</h3>
                    <p className="product-subtext">{prod.subname}</p>

                    <div className="product-bottom-row">
                      <button 
                        className="btn btn-secondary product-view-btn"
                        onClick={() => onOpenQuickView(prod)}
                      >
                        Details
                      </button>

                      <button 
                        className="btn btn-primary product-add-btn"
                        onClick={() => onAddToCart(prod)}
                      >
                        <IconCart size={14} />
                        <span>Add to Quote</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= ABOUT / FEATURE SPLIT ================= */}
        {section.type === 'about_split' && (
          <div className={`about-split-grid ${section.style?.imagePosition === 'left' ? 'reverse' : ''}`}>
            <div className="about-text-col">
              {section.badge && (
                <span className="badge-pill mb-3">
                  {section.badge}
                </span>
              )}
              <h2 className="about-title">{section.title}</h2>
              <p className="about-desc">{section.subtitle}</p>

              <div className="points-list">
                {(section.points || []).map((pt, idx) => (
                  <div key={idx} className="point-item">
                    <div className="point-check">
                      <IconCheck size={14} />
                    </div>
                    <div>
                      <h4 className="point-heading">{pt.title}</h4>
                      <p className="point-text">{pt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {section.image && (
              <div className="about-img-col">
                <div className="about-image-card">
                  <img src={section.image} alt="Navkar Manufacturing" className="about-image" loading="lazy" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= CALL TO ACTION BANNER ================= */}
        {section.type === 'cta_banner' && (
          <div className="luxury-card cta-box">
            {section.badge && <span className="badge-pill mb-2">{section.badge}</span>}
            <h2 className="cta-title">{section.title}</h2>
            <p className="cta-subtitle">{section.subtitle}</p>
            
            <div className="cta-actions">
              <button 
                className="btn btn-primary"
                onClick={() => onOpenModal('contact')}
              >
                {section.buttonText || 'Request a Quote'}
              </button>
              <a 
                href="https://wa.me/919820012345"
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
              >
                {section.secondaryText || 'Chat on WhatsApp'}
              </a>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .section-container {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .editor-section-box {
          position: relative;
          outline: 1px dashed var(--border-mid);
        }

        .editor-section-box:hover {
          outline-color: var(--accent);
        }

        .editor-controls-bar {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translate(-50%, -100%);
          background: var(--bg-surface);
          border: 1px solid var(--border-mid);
          padding: 4px 12px;
          border-radius: var(--radius-sm) var(--radius-sm) 0 0;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          z-index: 100;
        }

        .editor-btn {
          color: var(--text-secondary);
          padding: 2px;
          cursor: pointer;
        }

        .editor-btn:hover { color: var(--text-primary); }
        .text-danger:hover { color: #ef4444; }

        /* HERO */
        .hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          align-items: center;
          gap: 48px;
        }

        .hero-title {
          font-size: clamp(2.2rem, 4vw, 3.8rem);
          line-height: 1.12;
          color: var(--text-primary);
          margin-bottom: 20px;
        }

        .hero-subtitle {
          font-size: clamp(15px, 1.2vw, 17px);
          color: var(--text-secondary);
          max-width: 540px;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .hero-card {
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          box-shadow: var(--card-shadow);
          position: relative;
        }

        .hero-img {
          width: 100%;
          height: 480px;
          object-fit: cover;
        }

        .hero-img-badge {
          position: absolute;
          bottom: 16px;
          left: 16px;
          background: var(--bg-surface);
          padding: 8px 14px;
          border-radius: var(--radius-full);
          font-size: 12px;
          font-weight: 600;
          border: 1px solid var(--border-subtle);
        }

        /* HIGHLIGHTS */
        .highlights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
        }

        .highlight-card {
          padding: 24px;
        }

        .highlight-label {
          font-size: 12px;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 600;
        }

        .highlight-value {
          font-size: 24px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 6px 0;
        }

        .highlight-desc {
          font-size: 13px;
          color: var(--text-secondary);
        }

        /* PRODUCTS */
        .products-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 24px;
        }

        .products-title {
          font-size: clamp(24px, 3vw, 36px);
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .search-box-wrap {
          width: 100%;
          max-width: 340px;
        }

        .category-pills-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 28px;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
          gap: 24px;
        }

        .product-card {
          padding: 0;
          border-radius: var(--radius-md);
        }

        .product-image-wrap {
          position: relative;
          height: 270px;
          overflow: hidden;
          background: var(--bg-card-hover);
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .product-card:hover .product-image {
          transform: scale(1.04);
        }

        .product-category-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          padding: 4px 10px;
          border-radius: var(--radius-full);
          font-size: 11px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .quick-view-overlay-btn {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translate(-50%, 15px);
          opacity: 0;
          background: var(--bg-surface);
          border: 1px solid var(--border-mid);
          color: var(--text-primary);
          padding: 8px 16px;
          border-radius: var(--radius-full);
          font-size: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: all var(--transition-smooth);
        }

        .product-card:hover .quick-view-overlay-btn {
          transform: translate(-50%, 0);
          opacity: 1;
        }

        .product-body {
          padding: 20px;
        }

        .product-material {
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
        }

        .product-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 4px 0 2px;
          font-family: var(--font-sans);
        }

        .product-subtext {
          font-size: 13px;
          color: var(--text-secondary);
          margin-bottom: 16px;
        }

        .product-bottom-row {
          display: flex;
          align-items: center;
          gap: 8px;
          border-top: 1px solid var(--border-subtle);
          padding-top: 14px;
        }

        .product-view-btn {
          padding: 8px 14px;
          font-size: 12.5px;
        }

        .product-add-btn {
          flex: 1;
          padding: 8px 14px;
          font-size: 12.5px;
        }

        /* ABOUT SPLIT */
        .about-split-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 48px;
        }

        .about-split-grid.reverse {
          direction: rtl;
        }

        .about-split-grid.reverse > * {
          direction: ltr;
        }

        .about-title {
          font-size: clamp(24px, 3vw, 36px);
          margin-bottom: 16px;
        }

        .about-desc {
          color: var(--text-secondary);
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .points-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .point-item {
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }

        .point-check {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--accent-subtle);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .point-heading {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .point-text {
          font-size: 13px;
          color: var(--text-secondary);
        }

        .about-image-card {
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--card-shadow);
        }

        .about-image {
          width: 100%;
          height: 420px;
          object-fit: cover;
        }

        /* CTA */
        .cta-box {
          text-align: center;
          padding: 60px 24px;
        }

        .cta-title {
          font-size: clamp(24px, 3vw, 36px);
          margin-bottom: 12px;
        }

        .cta-subtitle {
          color: var(--text-secondary);
          max-width: 580px;
          margin: 0 auto 24px;
        }

        .cta-actions {
          display: flex;
          justify-content: center;
          gap: 12px;
        }

        .mt-4 { margin-top: 16px; }
        .mb-2 { margin-bottom: 8px; }
        .mb-3 { margin-bottom: 12px; }
        .text-secondary { color: var(--text-secondary); }

        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; gap: 32px; }
          .hero-img { height: 340px; }
          .about-split-grid { grid-template-columns: 1fr; gap: 32px; }
          .about-split-grid.reverse { direction: ltr; }
          .products-header { flex-direction: column; align-items: flex-start; }
          .search-box-wrap { max-width: 100%; }
        }
      `}</style>
    </section>
  );
};
