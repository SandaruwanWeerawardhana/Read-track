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

  const iconColors = {
    success: 'text-emerald-500',
    error: 'text-red-500',
    info: 'text-blue-500',
  };

  return (
    <div className="fixed bottom-8 right-8 z-[1100]">
      <div className={`toast ${toast.type}`} role="alert" aria-live="polite">
        <span className={`text-xl ${iconColors[toast.type]}`} aria-hidden="true">
          {icons[toast.type]}
        </span>
        <span className="flex-1 text-[0.9375rem] text-text-primary">{toast.message}</span>
        <button 
          className="p-1 text-text-muted hover:text-text-primary hover:bg-white/10 rounded-lg transition-all duration-150"
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
