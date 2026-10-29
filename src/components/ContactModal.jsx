import React, { useState } from 'react';
import { IconMail, IconClose, IconCheck, IconExternalLink } from './Icons';

export const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'Water Park & Pool',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: '', phone: '', email: '', category: 'Water Park & Pool', message: '' });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="font-heading text-lg">Contact Navkar Creative Arts</h3>
          <button className="btn-ghost p-1" onClick={onClose} aria-label="Close">
            <IconClose size={18} />
          </button>
        </div>

        <div className="modal-body">
          {submitted ? (
            <div className="text-center py-4">
              <div className="success-circle">
                <IconCheck size={32} />
              </div>
              <h3 className="font-heading text-xl mb-2">Thank You, {formData.name || 'Friend'}!</h3>
              <p className="text-secondary text-sm mb-4">
                We have received your requirements for <strong>{formData.category}</strong>. Our workshop team will get back to you with price estimates and catalogs within 2 hours.
              </p>
              <button className="btn btn-secondary w-full" onClick={handleReset}>
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p className="text-secondary text-sm mb-4">
                Have a project or need custom statues, water slides, or playground equipment? Reach out to us directly.
              </p>

              <div className="grid-2 gap-3 mb-3">
                <div className="form-group mb-0">
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Your Name" 
                    className="clean-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group mb-0">
                  <label className="form-label">Phone / WhatsApp</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="+91 98765 43210" 
                    className="clean-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Email Address</label>
                <input 
                  type="email" 
                  required 
                  placeholder="name@example.com" 
                  className="clean-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Product Category</label>
                <select 
                  className="clean-input"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Statues & Sculptures">Statues & Sculptures (Wildlife, Mascots, Murals)</option>
                  <option value="Water Park & Pool">Water Park & Pool (Slides, Pools, Mushrooms)</option>
                  <option value="Playground & Park">Playground & Park (Multi-Play, Benches, Dustbins)</option>
                </select>
              </div>

              <div className="form-group mb-4">
                <label className="form-label">Message / Dimensions Needed</label>
                <textarea 
                  rows={3} 
                  required 
                  placeholder="Tell us what you are looking for, approximate sizes, delivery location..."
                  className="clean-input"
                  style={{ resize: 'vertical' }}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-full py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Inquiry'}
              </button>
            </form>
          )}

          {/* Quick Direct Links */}
          <div className="contact-quick-links mt-4 pt-3">
            <div className="text-secondary text-xs font-semibold mb-2 uppercase">Or Contact Directly:</div>
            <div className="flex-align gap-2 flex-wrap">
              <a 
                href="https://wa.me/919820012345" 
                target="_blank" 
                rel="noreferrer" 
                className="btn-pill"
              >
                <span>WhatsApp: +91 98200 12345</span>
                <IconExternalLink size={12} />
              </a>
              <a 
                href="tel:+919820012345" 
                className="btn-pill"
              >
                <span>Call Us Now</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .flex-align { display: flex; align-items: center; }
        .flex-wrap { flex-wrap: wrap; }
        .gap-2 { gap: 8px; }
        .gap-3 { gap: 12px; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; }
        .w-full { width: 100%; }
        .p-1 { padding: 4px; }
        .mt-4 { margin-top: 16px; }
        .pt-3 { border-top: 1px solid var(--border-subtle); }
        .text-center { text-align: center; }
        .text-sm { font-size: 13.5px; }
        .text-xs { font-size: 11.5px; }
        .text-secondary { color: var(--text-secondary); }

        .success-circle {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: var(--accent-subtle);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }

        @media (max-width: 540px) {
          .grid-2 { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};
