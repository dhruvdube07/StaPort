import React, { useState } from 'react';
import { 
  IconEdit, 
  IconLayout, 
  IconLayers, 
  IconSliders, 
  IconMonitor, 
  IconTablet, 
  IconPhone, 
  IconPlus, 
  IconTrash, 
  IconCopy, 
  IconArrowUp, 
  IconArrowDown, 
  IconDownload, 
  IconCheck, 
  IconClose, 
  IconEye, 
  IconZap, 
  IconTerminal 
} from './Icons';
import { sounds } from '../utils/soundEngine';

export const ElementorStudio = ({ 
  isOpen, 
  onClose, 
  sections, 
  onUpdateSections, 
  selectedSectionId, 
  onSelectSection, 
  viewportMode, 
  onChangeViewport, 
  previewMode, 
  onTogglePreviewMode 
}) => {
  const [activeTab, setActiveTab] = useState('widgets'); // 'widgets' | 'inspector' | 'navigator'
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');

  if (!isOpen) return null;

  // Selected Section
  const currentSection = sections.find((s) => s.id === selectedSectionId) || sections[0];

  // Available Presets for Image Picker (Navkar Creative Arts)
  const imagePresets = [
    { name: "Elephant Wildlife Statue", url: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=80" },
    { name: "Resort Water Slides", url: "https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=1200&q=80" },
    { name: "Playground Multi-Station", url: "https://images.unsplash.com/photo-1575783970733-1aaedde1db74?auto=format&fit=crop&w=1200&q=80" },
    { name: "Fiberglass Pool & Spa", url: "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=1200&q=80" },
    { name: "Restaurant Chef Mascot", url: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=80" },
  ];

  // Widget Templates to Add
  const widgetTemplates = [
    {
      type: "hero",
      title: "Hero Banner",
      desc: "Architectural headline, badge, dual CTA, high-res visual",
      icon: IconZap,
      create: () => ({
        id: `sec-hero-${Date.now()}`,
        type: "hero",
        title: "ARCHITECTURAL SCULPTURES & WATERPARK ENGINEERING",
        subtitle: "Museum-grade fiberglass craftsmanship tailored for resorts, theme parks, and public spaces.",
        badge: "NAVKAR CREATIVE ARTS // WORKSHOP",
        primaryBtn: "EXPLORE CATALOG",
        secondaryBtn: "REQUEST RFQ",
        heroImage: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=80",
        style: { align: "left", glowIntensity: "high", padding: "large" }
      })
    },
    {
      type: "products_grid",
      title: "25+ Products Showcase Grid",
      desc: "Filterable product cards across Statues, Waterparks & Playgrounds",
      icon: IconLayout,
      create: () => ({
        id: `sec-prod-${Date.now()}`,
        type: "products_grid",
        title: "COMPLETE COMMERCIAL CATALOG",
        subtitle: "Factory-direct fiberglass products built to international safety standards.",
        filterCategory: "ALL",
        style: { padding: "large", columns: 3 }
      })
    },
    {
      type: "hud_metrics",
      title: "Workshop Telemetry Strip",
      desc: "4 metrics with continuous sliding ribbon (FRP Grade, Reach, FPS)",
      icon: IconTerminal,
      create: () => ({
        id: `sec-hud-${Date.now()}`,
        type: "hud_metrics",
        metrics: [
          { label: "PRODUCT DIVISIONS", value: "25+ SYSTEMS", desc: "SCULPTURES & WATERPARKS" },
          { label: "MATERIAL", value: "GRADE-A FRP", desc: "WEATHERPROOF GELCOAT" },
          { label: "PROJECTS", value: "500+ DELIVERED", desc: "RESORTS & PARKS" },
          { label: "PERFORMANCE", value: "60 FPS LITE", desc: "1GB RAM ADAPTIVE" }
        ],
        style: { padding: "small" }
      })
    },
    {
      type: "feature_split",
      title: "Feature Split Block",
      desc: "High-contrast technical bullet list paired with imagery",
      icon: IconLayers,
      create: () => ({
        id: `sec-feat-${Date.now()}`,
        type: "feature_split",
        badge: "TECHNICAL BREAKTHROUGH",
        title: "ERGO-KINETIC ARCHITECTURE",
        subtitle: "Ultra-responsive dynamic styling designed without heavy 3D bloat.",
        image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
        bullets: [
          { title: "Pure CSS GPU Acceleration", desc: "Locks animations to screen refresh rate." },
          { title: "Self-Healing State", desc: "Auto-synced with browser storage." },
          { title: "Zero Dependencies Overhead", desc: "Micro-footprint bundle under 85KB." }
        ],
        style: { padding: "large", imagePosition: "left" }
      })
    },
    {
      type: "cta_banner",
      title: "Call To Action Banner",
      desc: "High impact neon banner for newsletter or drop alert",
      icon: IconZap,
      create: () => ({
        id: `sec-cta-${Date.now()}`,
        type: "cta_banner",
        badge: "SPECIAL CLEARANCE",
        title: "REQUEST IMMEDIATE DISPATCH",
        subtitle: "Claim priority access tokens to preview unreleased drops.",
        buttonText: "REQUEST ACCESS",
        secondaryText: "SYSTEM LOGS",
        style: { padding: "large", glow: true }
      })
    },
    {
      type: "text_block",
      title: "Rich Text / Notice Block",
      desc: "Standalone cyber announcement or editorial note",
      icon: IconEdit,
      create: () => ({
        id: `sec-text-${Date.now()}`,
        type: "text_block",
        badge: "TRANSMISSION BULLETIN",
        title: "CORE ARCHITECTURE ANNOUNCEMENT",
        content: "StaPort and VEXO represent the culmination of hyper-optimized, zero-latency digital design. Every element is tested to run flawlessly across devices from 1GB RAM budget phones to 32-core workstations.",
        style: { padding: "medium", align: "center" }
      })
    }
  ];

  // Actions
  const handleAddWidget = (template) => {
    sounds.playSuccess();
    const newSec = template.create();
    const newSections = [...sections, newSec];
    onUpdateSections(newSections);
    onSelectSection(newSec.id);
    setActiveTab('inspector');
  };

  const handleUpdateCurrentSection = (updatedFields) => {
    const updated = sections.map((sec) => 
      sec.id === currentSection.id ? { ...sec, ...updatedFields } : sec
    );
    onUpdateSections(updated);
  };

  const handleUpdateStyle = (styleKey, value) => {
    const currentStyle = currentSection.style || {};
    handleUpdateCurrentSection({
      style: { ...currentStyle, [styleKey]: value }
    });
  };

  const handleMoveSection = (id, direction) => {
    sounds.playLaser();
    const index = sections.findIndex((s) => s.id === id);
    if (index === -1) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const newSections = [...sections];
    const [moved] = newSections.splice(index, 1);
    newSections.splice(targetIndex, 0, moved);
    onUpdateSections(newSections);
  };

  const handleDuplicateSection = (id) => {
    sounds.playSuccess();
    const secToDup = sections.find((s) => s.id === id);
    if (!secToDup) return;
    const duplicated = {
      ...JSON.parse(JSON.stringify(secToDup)),
      id: `sec-${Date.now()}`
    };
    const index = sections.findIndex((s) => s.id === id);
    const newSections = [...sections];
    newSections.splice(index + 1, 0, duplicated);
    onUpdateSections(newSections);
    onSelectSection(duplicated.id);
  };

  const handleDeleteSection = (id) => {
    if (sections.length <= 1) {
      alert("Cannot delete the only remaining section on the page.");
      return;
    }
    sounds.playLaser();
    const newSections = sections.filter((s) => s.id !== id);
    onUpdateSections(newSections);
    onSelectSection(newSections[0].id);
  };

  const handleSaveToLocalStorage = () => {
    sounds.playSuccess();
    localStorage.setItem('vexo_custom_layout', JSON.stringify(sections));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleExportJSON = () => {
    sounds.playBlip(900);
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sections, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "staport_vexo_layout.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportSubmit = () => {
    try {
      const parsed = JSON.parse(importJsonText);
      if (Array.isArray(parsed) && parsed.length > 0) {
        onUpdateSections(parsed);
        onSelectSection(parsed[0].id);
        setShowImportModal(false);
        sounds.playSuccess();
      } else {
        alert("Invalid layout JSON format. Expected an array of sections.");
      }
    } catch {
      alert("Failed to parse JSON. Please check syntax.");
    }
  };

  return (
    <>
      {/* Desktop-Only Warning for small screens */}
      <div className="elementor-mobile-warning show-mobile-only">
        <div className="warning-card">
          <IconMonitor size={32} className="text-accent mb-2" />
          <h3 className="font-display mb-1">DESKTOP WORKSPACE ENGINE</h3>
          <p className="text-xs text-muted mb-3">
            Elementor visual builder is engineered for desktop monitors (&gt;= 1024px) for side-by-side widget palette and real-time styling controls.
          </p>
          <button className="btn btn-primary w-full text-xs" onClick={onClose}>
            BACK TO LIVE VIEW
          </button>
        </div>
      </div>

      {/* ELEMENTOR TOP BAR */}
      <div className="elementor-top-bar">
        <div className="top-bar-left flex-align gap-3">
          <div className="elementor-brand flex-align gap-2">
            <span className="elementor-logo-badge">E</span>
            <span className="mono font-bold text-xs">VEXO STUDIO // ELEMENTOR</span>
          </div>

          <div className="mode-switch-group">
            <button 
              className={`mode-btn ${!previewMode ? 'active' : ''}`}
              onClick={() => {
                sounds.playBlip(800);
                onTogglePreviewMode(false);
              }}
            >
              <IconEdit size={13} />
              <span>EDIT CANVAS</span>
            </button>
            <button 
              className={`mode-btn ${previewMode ? 'active' : ''}`}
              onClick={() => {
                sounds.playBlip(800);
                onTogglePreviewMode(true);
              }}
            >
              <IconEye size={13} />
              <span>PREVIEW LIVE</span>
            </button>
          </div>
        </div>

        {/* Viewport switchers */}
        <div className="top-bar-center flex-align gap-1">
          <button 
            className={`viewport-btn ${viewportMode === 'desktop' ? 'active' : ''}`}
            onClick={() => {
              sounds.playBlip(750);
              onChangeViewport('desktop');
            }}
            title="Desktop 100%"
          >
            <IconMonitor size={15} />
          </button>
          <button 
            className={`viewport-btn ${viewportMode === 'tablet' ? 'active' : ''}`}
            onClick={() => {
              sounds.playBlip(750);
              onChangeViewport('tablet');
            }}
            title="Tablet 768px"
          >
            <IconTablet size={15} />
          </button>
          <button 
            className={`viewport-btn ${viewportMode === 'mobile' ? 'active' : ''}`}
            onClick={() => {
              sounds.playBlip(750);
              onChangeViewport('mobile');
            }}
            title="Mobile 390px (1GB phone profile)"
          >
            <IconPhone size={15} />
          </button>
        </div>

        {/* Action buttons */}
        <div className="top-bar-right flex-align gap-2">
          <button 
            className="btn btn-cyber py-1 px-3 text-xs"
            onClick={handleExportJSON}
            title="Export layout as JSON file"
          >
            <IconDownload size={13} />
            <span className="mono">EXPORT</span>
          </button>

          <button 
            className="btn btn-cyber py-1 px-3 text-xs"
            onClick={() => setShowImportModal(true)}
            title="Import layout from JSON"
          >
            <span className="mono">IMPORT</span>
          </button>

          <button 
            className="btn btn-primary py-1 px-3 text-xs"
            onClick={handleSaveToLocalStorage}
            title="Save custom layout to LocalStorage"
          >
            {saveSuccess ? (
              <>
                <IconCheck size={13} />
                <span className="mono">SAVED!</span>
              </>
            ) : (
              <span className="mono">PUBLISH</span>
            )}
          </button>

          <button 
            className="btn-ghost p-1 text-dim" 
            onClick={onClose}
            title="Exit Studio"
          >
            <IconClose size={18} />
          </button>
        </div>
      </div>

      {/* ELEMENTOR DOCK PANEL (LEFT SIDEBAR) */}
      {!previewMode && (
        <aside className="elementor-sidebar-dock">
          {/* Panel Tab Selector */}
          <div className="sidebar-tabs">
            <button 
              className={`sidebar-tab ${activeTab === 'widgets' ? 'active' : ''}`}
              onClick={() => {
                sounds.playBlip(700);
                setActiveTab('widgets');
              }}
              title="Add Elements / Widgets"
            >
              <IconPlus size={14} />
              <span>ELEMENTS</span>
            </button>
            <button 
              className={`sidebar-tab ${activeTab === 'inspector' ? 'active' : ''}`}
              onClick={() => {
                sounds.playBlip(700);
                setActiveTab('inspector');
              }}
              title="Style & Content Inspector"
            >
              <IconSliders size={14} />
              <span>STYLE</span>
            </button>
            <button 
              className={`sidebar-tab ${activeTab === 'navigator' ? 'active' : ''}`}
              onClick={() => {
                sounds.playBlip(700);
                setActiveTab('navigator');
              }}
              title="Layers / Navigator Tree"
            >
              <IconLayers size={14} />
              <span>LAYERS</span>
            </button>
          </div>

          {/* TAB 1: WIDGET LIBRARY */}
          {activeTab === 'widgets' && (
            <div className="sidebar-scrollable-body">
              <div className="sidebar-header-title mono text-xs mb-3">
                // CLICK WIDGET TO INSERT ON PAGE
              </div>
              <div className="widgets-grid">
                {widgetTemplates.map((widget) => {
                  const Icon = widget.icon;
                  return (
                    <div 
                      key={widget.type}
                      className="widget-card"
                      onClick={() => handleAddWidget(widget)}
                    >
                      <div className="widget-icon">
                        <Icon size={20} />
                      </div>
                      <div className="widget-title font-display">{widget.title}</div>
                      <div className="widget-desc">{widget.desc}</div>
                      <span className="widget-add-pill mono text-xs">+ INSERT</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: STYLE & CONTENT INSPECTOR */}
          {activeTab === 'inspector' && (
            <div className="sidebar-scrollable-body">
              {currentSection ? (
                <div className="inspector-content">
                  <div className="selected-sec-badge flex-align justify-between mb-3">
                    <span className="mono text-xs text-accent">ACTIVE: {currentSection.type.toUpperCase()}</span>
                    <span className="text-dim text-xs mono">#{currentSection.id.slice(-6)}</span>
                  </div>

                  {/* Section Title */}
                  {currentSection.title !== undefined && (
                    <div className="form-group mb-3">
                      <label className="form-label">HEADLINE / TITLE</label>
                      <input 
                        type="text" 
                        className="cyber-input text-xs"
                        value={currentSection.title}
                        onChange={(e) => handleUpdateCurrentSection({ title: e.target.value })}
                      />
                    </div>
                  )}

                  {/* Subtitle / Description */}
                  {currentSection.subtitle !== undefined && (
                    <div className="form-group mb-3">
                      <label className="form-label">SUBTITLE / PARAGRAPH</label>
                      <textarea 
                        rows={3} 
                        className="cyber-input text-xs"
                        value={currentSection.subtitle}
                        onChange={(e) => handleUpdateCurrentSection({ subtitle: e.target.value })}
                      />
                    </div>
                  )}

                  {/* Badge */}
                  {currentSection.badge !== undefined && (
                    <div className="form-group mb-3">
                      <label className="form-label">HUD BADGE TEXT</label>
                      <input 
                        type="text" 
                        className="cyber-input text-xs"
                        value={currentSection.badge}
                        onChange={(e) => handleUpdateCurrentSection({ badge: e.target.value })}
                      />
                    </div>
                  )}

                  {/* Buttons */}
                  {currentSection.primaryBtn !== undefined && (
                    <div className="form-group mb-3">
                      <label className="form-label">PRIMARY BUTTON LABEL</label>
                      <input 
                        type="text" 
                        className="cyber-input text-xs"
                        value={currentSection.primaryBtn}
                        onChange={(e) => handleUpdateCurrentSection({ primaryBtn: e.target.value })}
                      />
                    </div>
                  )}

                  {/* Image Source & Presets */}
                  {(currentSection.heroImage !== undefined || currentSection.image !== undefined) && (
                    <div className="form-group mb-3">
                      <label className="form-label">MEDIA / IMAGE URL</label>
                      <input 
                        type="text" 
                        className="cyber-input text-xs mb-2"
                        value={currentSection.heroImage || currentSection.image || ''}
                        onChange={(e) => {
                          const key = currentSection.heroImage ? 'heroImage' : 'image';
                          handleUpdateCurrentSection({ [key]: e.target.value });
                        }}
                      />
                      <div className="form-label text-xs mb-1">PRESET HIGH-TECH ASSETS:</div>
                      <div className="preset-asset-pills">
                        {imagePresets.map((p) => (
                          <button
                            key={p.name}
                            type="button"
                            className="preset-pill"
                            onClick={() => {
                              sounds.playBlip(900);
                              const key = currentSection.heroImage ? 'heroImage' : 'image';
                              handleUpdateCurrentSection({ [key]: p.url });
                            }}
                          >
                            {p.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STYLING CONTROLS */}
                  <div className="inspector-divider pt-3 mt-3">
                    <span className="mono text-xs text-accent">// VISUAL STYLING ENGINE</span>
                  </div>

                  {/* Padding */}
                  <div className="form-group mt-3 mb-3">
                    <label className="form-label">SECTION PADDING</label>
                    <div className="tier-pills">
                      {['small', 'medium', 'large'].map((pad) => (
                        <button
                          key={pad}
                          type="button"
                          className={`tier-pill ${currentSection.style?.padding === pad ? 'active' : ''}`}
                          onClick={() => handleUpdateStyle('padding', pad)}
                        >
                          {pad.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Alignment */}
                  <div className="form-group mb-4">
                    <label className="form-label">TEXT ALIGNMENT</label>
                    <div className="tier-pills">
                      {['left', 'center'].map((align) => (
                        <button
                          key={align}
                          type="button"
                          className={`tier-pill ${currentSection.style?.align === align ? 'active' : ''}`}
                          onClick={() => handleUpdateStyle('align', align)}
                        >
                          {align.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Section Controls Toolbar */}
                  <div className="inspector-actions pt-2">
                    <div className="flex-align gap-2 mb-2">
                      <button 
                        className="btn btn-cyber flex-1 text-xs"
                        onClick={() => handleMoveSection(currentSection.id, 'up')}
                      >
                        <IconArrowUp size={13} /> MOVE UP
                      </button>
                      <button 
                        className="btn btn-cyber flex-1 text-xs"
                        onClick={() => handleMoveSection(currentSection.id, 'down')}
                      >
                        <IconArrowDown size={13} /> MOVE DOWN
                      </button>
                    </div>

                    <div className="flex-align gap-2">
                      <button 
                        className="btn btn-cyber flex-1 text-xs"
                        onClick={() => handleDuplicateSection(currentSection.id)}
                      >
                        <IconCopy size={13} /> DUPLICATE
                      </button>
                      <button 
                        className="btn btn-cyber flex-1 text-xs text-danger"
                        onClick={() => handleDeleteSection(currentSection.id)}
                      >
                        <IconTrash size={13} /> DELETE
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-muted text-xs mono">
                  Select any section on the canvas to inspect and edit properties.
                </div>
              )}
            </div>
          )}

          {/* TAB 3: NAVIGATOR (LAYERS) */}
          {activeTab === 'navigator' && (
            <div className="sidebar-scrollable-body">
              <div className="sidebar-header-title mono text-xs mb-3">
                // PAGE LAYERS ({sections.length} SECTIONS)
              </div>
              <div className="navigator-tree">
                {sections.map((sec, idx) => (
                  <div 
                    key={sec.id}
                    className={`nav-item ${selectedSectionId === sec.id ? 'active' : ''}`}
                    onClick={() => {
                      sounds.playBlip(750);
                      onSelectSection(sec.id);
                    }}
                  >
                    <div className="flex-align gap-2">
                      <span className="mono text-xs text-dim">{String(idx + 1).padStart(2, '0')}</span>
                      <span className="mono text-xs font-bold">{sec.type.toUpperCase()}</span>
                    </div>

                    <div className="nav-item-actions flex-align gap-1">
                      <button 
                        className="nav-action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMoveSection(sec.id, 'up');
                        }}
                        title="Move Up"
                      >
                        <IconArrowUp size={12} />
                      </button>
                      <button 
                        className="nav-action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMoveSection(sec.id, 'down');
                        }}
                        title="Move Down"
                      >
                        <IconArrowDown size={12} />
                      </button>
                      <button 
                        className="nav-action-btn text-danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSection(sec.id);
                        }}
                        title="Delete Section"
                      >
                        <IconTrash size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      )}

      {/* Import JSON Modal */}
      {showImportModal && (
        <div className="modal-overlay" onClick={() => setShowImportModal(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="mono text-xs text-accent">[IMPORT SITE LAYOUT JSON]</span>
              <button className="btn-ghost p-1" onClick={() => setShowImportModal(false)}>
                <IconClose size={16} />
              </button>
            </div>
            <div className="modal-body">
              <textarea 
                rows={8}
                className="cyber-input mono text-xs mb-3"
                placeholder="Paste valid StaPort layout JSON here..."
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
              />
              <button className="btn btn-primary w-full" onClick={handleImportSubmit}>
                LOAD LAYOUT ONTO CANVAS
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .elementor-top-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 48px;
          background: #090b10;
          border-bottom: 1px solid var(--accent);
          z-index: 1100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.8);
        }

        .elementor-logo-badge {
          width: 22px;
          height: 22px;
          border-radius: 4px;
          background: #e21b55;
          color: #ffffff;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
        }

        .mode-switch-group {
          display: flex;
          background: rgba(255,255,255,0.05);
          border-radius: var(--radius-xs);
          padding: 2px;
        }

        .mode-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          font-size: 11px;
          font-family: var(--font-mono);
          color: var(--text-muted);
          border-radius: var(--radius-xs);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .mode-btn.active {
          background: var(--accent);
          color: var(--accent-text);
          font-weight: 700;
        }

        .viewport-btn {
          padding: 6px 10px;
          color: var(--text-muted);
          border-radius: var(--radius-xs);
          cursor: pointer;
        }

        .viewport-btn.active {
          color: var(--accent);
          background: var(--accent-subtle);
        }

        .elementor-sidebar-dock {
          position: fixed;
          top: 48px;
          left: 0;
          width: 330px;
          height: calc(100vh - 48px);
          background: #0b0e14;
          border-right: 1px solid var(--border-mid);
          z-index: 1050;
          display: flex;
          flex-direction: column;
          box-shadow: 8px 0 30px rgba(0,0,0,0.6);
        }

        .sidebar-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          border-bottom: 1px solid var(--border-dim);
          background: #07090e;
        }

        .sidebar-tab {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 12px 6px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          border-bottom: 2px solid transparent;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .sidebar-tab.active {
          color: var(--accent);
          border-bottom-color: var(--accent);
          background: var(--accent-subtle);
          font-weight: 700;
        }

        .sidebar-scrollable-body {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
        }

        .widgets-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
        }

        .widget-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-dim);
          border-radius: var(--radius-sm);
          padding: 12px;
          cursor: pointer;
          transition: all var(--transition-fast);
          position: relative;
        }

        .widget-card:hover {
          border-color: var(--accent);
          background: var(--accent-subtle);
          transform: translateY(-2px);
        }

        .widget-icon {
          color: var(--accent);
          margin-bottom: 6px;
        }

        .widget-title {
          font-size: 13px;
          font-weight: 700;
          color: #ffffff;
        }

        .widget-desc {
          font-size: 11px;
          color: var(--text-muted);
          margin-top: 2px;
          line-height: 1.4;
        }

        .widget-add-pill {
          display: inline-block;
          margin-top: 8px;
          color: var(--accent);
          font-weight: 700;
        }

        .preset-asset-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .preset-pill {
          padding: 4px 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border-dim);
          border-radius: var(--radius-xs);
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          cursor: pointer;
        }

        .preset-pill:hover {
          border-color: var(--accent);
          color: var(--accent);
        }

        .navigator-tree {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border-dim);
          border-radius: var(--radius-xs);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .nav-item.active {
          border-color: var(--accent);
          background: var(--accent-subtle);
        }

        .nav-action-btn {
          padding: 4px;
          color: var(--text-muted);
          cursor: pointer;
        }

        .nav-action-btn:hover {
          color: var(--text-main);
        }

        .text-danger { color: #f87171 !important; }

        .elementor-mobile-warning {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.9);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .warning-card {
          background: var(--bg-surface);
          border: 1px solid var(--accent);
          padding: 24px;
          border-radius: var(--radius-md);
          text-align: center;
          max-width: 340px;
        }

        @media (min-width: 1024px) {
          .show-mobile-only { display: none !important; }
        }
      `}</style>
    </>
  );
};
