/**
 * Modal Component
 * 
 * Reusable modal dialog component with:
 * - Backdrop overlay with click-to-close
 * - ESC key to close
 * - Body scroll lock when open
 * - Accessible ARIA attributes
 * - Smooth animations
 * 
 * @module components/Modal
 */

import { useEffect, type ReactNode } from "react";

/**
 * ModalProps Interface
 * 
 * @interface ModalProps
 * @property {boolean} isOpen - Controls modal visibility
 * @property {Function} onClose - Callback fired when modal should close
 * @property {string} title - Modal title displayed in header
 * @property {ReactNode} children - Modal content body
 * 
 */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

/**
 * Modal Component
 * 
 * Accessible modal dialog that:
 * - Prevents body scrolling when open
 * - Closes on ESC key press
 * - Closes on backdrop click
 * - Follows ARIA best practices
 * 
 * @param {ModalProps} props - Component props
 * @returns {JSX.Element | null} Modal dialog or null when closed
 */
const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Don't render if modal is closed
  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        // Only close if clicking the backdrop itself, not children
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 id="modal-title" className="text-xl font-semibold text-text-primary">{title}</h2>
          <button 
            className="p-1 text-text-muted hover:text-text-primary hover:bg-white/10 rounded-lg transition-all duration-150"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
