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
import { sounds } from './utils/soundEngine';

export function App() {
  // Page sections state with LocalStorage persistence
  const [sections, setSections] = useState(() => {
    try {
      const saved = localStorage.getItem('vexo_custom_layout');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_SECTIONS;
  });

  // Product catalog state
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  // Theme & Performance state
  const [activeTheme, setActiveTheme] = useState(() => {
    return localStorage.getItem('vexo_theme') || 'sunset';
  });

  const [perfMode, setPerfMode] = useState(() => {
    // Auto-detect low memory devices (e.g. 1GB / 2GB RAM phones)
    if (typeof navigator !== 'undefined') {
      if (navigator.deviceMemory && navigator.deviceMemory <= 2) {
        return 'eco';
      }
      if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
        return 'eco';
      }
    }
    return localStorage.getItem('vexo_perf') || 'balanced';
  });

  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem('vexo_sound') !== 'false';
  });

  // Admin authentication state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('vexo_admin') === 'true';
  });

  // Elementor Studio state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState(sections[0]?.id || 'sec-hero');
  const [viewportMode, setViewportMode] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [previewMode, setPreviewMode] = useState(false);

  // Modals state
  const [activeModal, setActiveModal] = useState(null); // 'contact' | 'request_token' | 'settings' | null
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Cart state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('vexo_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  // Sync Theme & Perf to Document Root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', activeTheme);
    localStorage.setItem('vexo_theme', activeTheme);
  }, [activeTheme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-perf', perfMode);
    localStorage.setItem('vexo_perf', perfMode);
  }, [perfMode]);

  useEffect(() => {
    sounds.toggle(soundEnabled);
    localStorage.setItem('vexo_sound', String(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem('vexo_cart', JSON.stringify(cart));
  }, [cart]);

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
    sounds.playLaser();
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
    sounds.playSuccess();
  };

  const handleDeleteSection = (id) => {
    if (sections.length <= 1) return;
    const newSections = sections.filter((s) => s.id !== id);
    setSections(newSections);
    setSelectedSectionId(newSections[0].id);
    sounds.playLaser();
  };

  // Cart Handlers
  const handleAddToCart = (product, size = 'M') => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map((item) => 
          item.id === product.id && item.size === size 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, size, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (id, size, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(id, size);
      return;
    }
    setCart((prev) => 
      prev.map((item) => 
        item.id === id && item.size === size ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveCartItem = (id, size) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
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
          boxShadow: isEditorOpen && viewportMode !== 'desktop' ? '0 0 50px rgba(0, 242, 254, 0.25), 0 0 0 1px var(--border-bright)' : 'none',
          borderRadius: isEditorOpen && viewportMode !== 'desktop' ? '28px' : '0',
          overflow: isEditorOpen && viewportMode !== 'desktop' ? 'hidden' : 'visible'
        }}
      >
        {/* Navigation Bar with 3 requested actions: Contact, Request Token, Settings */}
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
        perfMode={perfMode}
        onSelectPerfMode={setPerfMode}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        isAdminLoggedIn={isAdminLoggedIn}
        onAdminLogin={() => {
          setIsAdminLoggedIn(true);
          localStorage.setItem('vexo_admin', 'true');
        }}
        onAdminLogout={() => {
          setIsAdminLoggedIn(false);
          setIsEditorOpen(false);
          localStorage.removeItem('vexo_admin');
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

      {/* Shopping Cart Drawer */}
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
          background: var(--bg-deep);
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
