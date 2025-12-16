import { useBookStore } from '../store/bookStore';

const Toast = () => {
  const toast = useBookStore((state) => state.toast);
  const hideToast = useBookStore((state) => state.hideToast);

  if (!toast.isVisible) return null;

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
  };

  return (
    <div className="toast-container">
      <div className={`toast ${toast.type}`} role="alert" aria-live="polite">
        <span className="toast-icon" aria-hidden="true">
          {icons[toast.type]}
        </span>
        <span className="toast-message">{toast.message}</span>
        <button 
          className="toast-close" 
          onClick={hideToast}
          aria-label="Dismiss notification"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast;
