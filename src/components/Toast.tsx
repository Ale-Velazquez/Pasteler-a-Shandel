import React from 'react';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#ffffff] text-[#211a18] p-4 rounded-2xl shadow-2xl border border-[#ede0dc] flex items-center gap-3 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              toast.type === 'error'
                ? 'bg-[#ffdad6] text-[#ba1a1a]'
                : toast.type === 'info'
                ? 'bg-[#fedcc9] text-[#72594b]'
                : 'bg-[#ffdadb] text-[#94464f]'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">
              {toast.type === 'error'
                ? 'error'
                : toast.type === 'info'
                ? 'info'
                : 'check_circle'}
            </span>
          </div>
          <div className="flex flex-col flex-1 pr-1">
            <span className="font-semibold text-sm text-[#211a18] leading-snug">
              {toast.title}
            </span>
            <span className="text-xs text-[#544344] mt-0.5 leading-relaxed">
              {toast.message}
            </span>
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-[#867273] hover:text-[#211a18] p-1 rounded-full transition-colors"
            aria-label="Cerrar notificación"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      ))}
    </div>
  );
};
