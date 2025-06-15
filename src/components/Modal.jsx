import { useEffect } from 'react';
import Button from './Button';
import './Modal.css';

const Modal = ({ isOpen, onClose, title, children, showCloseButton = true }) => {
  // Cerrar modal con la tecla Escape
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-container">
        <div className="modal-header">
          {title && <h2 className="modal-title">{title}</h2>}
          {showCloseButton && (
            <Button
              onClick={onClose}
              variant="ghost"
              size="small"
              className="modal-close-button"
              aria-label="Cerrar modal"
            >
              ✕
            </Button>
          )}
        </div>
        
        <div className="modal-content">
          <div className="modal-form-wrapper">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;