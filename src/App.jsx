import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SectionRenderer } from './components/SectionRenderer';
import { ElementorStudio } from './components/ElementorStudio';
import { ContactModal } from './components/ContactModal';
import { RequestTokenModal } from './components/RequestTokenModal';
import { SettingsModal } from './components/SettingsModal';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { INITIAL_SECTIONS, INITIAL_PRODUCTS } from './data/initialData';

export function App() {
  // Page sections state with LocalStorage persistence
  const [sections, setSections] = useState(() => {
    try {
      const saved = localStorage.getItem('navkar_clean_layout');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_SECTIONS;
  });

  // Product catalog state (all 25 products)
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  // Simple Theme State: 'dark' (black) or 'light' (white)
  const [activeTheme, setActiveTheme] = useState(() => {
    return localStorage.getItem('navkar_theme') || 'dark';
  });

  // Admin authentication state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('navkar_admin') === 'true';
  });

  // Elementor Studio state (Desktop Page Builder)
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState(sections[0]?.id || 'sec-hero');
  const [viewportMode, setViewportMode] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [previewMode, setPreviewMode] = useState(false);

  // Modals state
  const [activeModal, setActiveModal] = useState(null); // 'contact' | 'request_token' | 'settings' | null
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Quote Basket state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('navkar_quote_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  // Sync Theme to Document Root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', activeTheme);
    localStorage.setItem('navkar_theme', activeTheme);
  }, [activeTheme]);

  useEffect(() => {
    localStorage.setItem('navkar_quote_cart', JSON.stringify(cart));
  }, [cart]);

  const toggleTheme = () => {
    setActiveTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Section Handlers for Elementor
  const handleMoveSection = (id, direction) => {
    const index = sections.findIndex((s) => s.id === id);
    if (index === -1) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const newSections = [...sections];
    const [moved] = newSections.splice(index, 1);
    newSections.splice(targetIndex, 0, moved);
    setSections(newSections);
  };

  const handleDuplicateSection = (id) => {
    const secToDup = sections.find((s) => s.id === id);
    if (!secToDup) return;
    const duplicated = {
      ...JSON.parse(JSON.stringify(secToDup)),
      id: `sec-${Date.now()}`
    };
    const index = sections.findIndex((s) => s.id === id);
    const newSections = [...sections];
    newSections.splice(index + 1, 0, duplicated);
    setSections(newSections);
    setSelectedSectionId(duplicated.id);
  };

  const handleDeleteSection = (id) => {
    if (sections.length <= 1) return;
    const newSections = sections.filter((s) => s.id !== id);
    setSections(newSections);
    setSelectedSectionId(newSections[0].id);
  };

  // Quote Basket Handlers
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (id, _unused, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    setCart((prev) => 
      prev.map((item) => 
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveCartItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={`app-root ${isEditorOpen ? 'elementor-mode-active' : ''}`}>
      {/* Elementor Studio Overlay/Dock (Desktop only) */}
      <ElementorStudio
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        sections={sections}
        onUpdateSections={setSections}
        selectedSectionId={selectedSectionId}
        onSelectSection={setSelectedSectionId}
        viewportMode={viewportMode}
        onChangeViewport={setViewportMode}
        previewMode={previewMode}
        onTogglePreviewMode={setPreviewMode}
      />

      {/* Main Canvas Container (Adapts viewport width when in Elementor responsive mode) */}
      <div 
        className={`app-canvas-container ${isEditorOpen && !previewMode ? 'editor-dock-offset' : ''}`}
        style={{
          maxWidth: isEditorOpen && viewportMode === 'mobile' ? '390px' : isEditorOpen && viewportMode === 'tablet' ? '768px' : '100%',
          margin: isEditorOpen && viewportMode !== 'desktop' ? '30px auto' : '0 auto',
          boxShadow: isEditorOpen && viewportMode !== 'desktop' ? '0 10px 40px rgba(0, 0, 0, 0.3)' : 'none',
          borderRadius: isEditorOpen && viewportMode !== 'desktop' ? '24px' : '0',
          overflow: isEditorOpen && viewportMode !== 'desktop' ? 'hidden' : 'visible'
        }}
      >
        {/* Navigation Bar with 3 requested actions: Contact, Request Quote / Token, Settings */}
        <Navbar 
          onOpenModal={(modal) => setActiveModal(modal)}
          cartCount={totalCartCount}
          onOpenCart={() => setCartDrawerOpen(true)}
          isAdminLoggedIn={isAdminLoggedIn}
          isEditorOpen={isEditorOpen}
          onToggleEditor={() => {
            if (!isAdminLoggedIn) {
              setActiveModal('settings');
            } else {
              setIsEditorOpen(!isEditorOpen);
            }
          }}
          activeTheme={activeTheme}
          onToggleTheme={toggleTheme}
        />

        {/* Dynamic Page Sections */}
        <main className="main-content-flow">
          {sections.map((section) => (
            <SectionRenderer 
              key={section.id}
              section={section}
              isEditorOpen={isEditorOpen}
              previewMode={previewMode}
              isSelected={selectedSectionId === section.id}
              onSelect={setSelectedSectionId}
              onMoveUp={() => handleMoveSection(section.id, 'up')}
              onMoveDown={() => handleMoveSection(section.id, 'down')}
              onDuplicate={() => handleDuplicateSection(section.id)}
              onDelete={() => handleDeleteSection(section.id)}
              products={products}
              onOpenQuickView={(p) => setQuickViewProduct(p)}
              onAddToCart={handleAddToCart}
              onOpenModal={(modal) => setActiveModal(modal)}
            />
          ))}
        </main>

        {/* Global Footer */}
        <Footer onOpenModal={(modal) => setActiveModal(modal)} />
      </div>

      {/* ================= MODALS & DRAWERS ================= */}
      {/* 1. Contact Modal */}
      <ContactModal 
        isOpen={activeModal === 'contact'}
        onClose={() => setActiveModal(null)}
      />

      {/* 2. Request Update / Token Modal */}
      <RequestTokenModal 
        isOpen={activeModal === 'request_token'}
        onClose={() => setActiveModal(null)}
      />

      {/* 3. Settings & Admin Authentication Modal */}
      <SettingsModal 
        isOpen={activeModal === 'settings'}
        onClose={() => setActiveModal(null)}
        activeTheme={activeTheme}
        onSelectTheme={setActiveTheme}
        isAdminLoggedIn={isAdminLoggedIn}
        onAdminLogin={() => {
          setIsAdminLoggedIn(true);
          localStorage.setItem('navkar_admin', 'true');
        }}
        onAdminLogout={() => {
          setIsAdminLoggedIn(false);
          setIsEditorOpen(false);
          localStorage.removeItem('navkar_admin');
        }}
        onLaunchEditor={() => setIsEditorOpen(true)}
      />

      {/* Product Quick View Spec Modal */}
      <ProductQuickViewModal 
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping / Quote Inquiry Drawer */}
      <CartDrawer 
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCart([])}
      />

      <style>{`
        .app-root {
          min-height: 100vh;
          position: relative;
        }

        .elementor-mode-active {
          padding-top: 48px;
        }

        .app-canvas-container {
          transition: max-width 0.3s cubic-bezier(0.16, 1, 0.3, 1), margin 0.3s ease;
          background: var(--bg-main);
          min-height: 100vh;
        }

        @media (min-width: 1024px) {
          .editor-dock-offset {
            margin-left: 330px !important;
            width: calc(100% - 330px) !important;
          }
        }
      `}</style>
    </div>
  );
}
export default App;
