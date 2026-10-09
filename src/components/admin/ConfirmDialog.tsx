import React from 'react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDangerous?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  isDangerous = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#211a18]/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#ede0dc] relative animate-in zoom-in-95 duration-200 flex flex-col gap-4 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center ${
            isDangerous
              ? 'bg-[#ffdad6] text-[#ba1a1a]'
              : 'bg-[#ffdadb] text-[#94464f]'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">
            {isDangerous ? 'warning' : 'help'}
          </span>
        </div>

        <div>
          <h3 className="font-serif text-lg font-bold text-[#211a18]">
            {title}
          </h3>
          <p className="text-xs text-[#544344] mt-1.5 leading-relaxed">
            {message}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="py-2.5 px-4 rounded-full bg-[#f9ebe7] hover:bg-[#ede0dc] text-[#211a18] text-xs font-semibold transition-colors cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`py-2.5 px-4 rounded-full text-white text-xs font-bold transition-colors cursor-pointer shadow-xs ${
              isDangerous
                ? 'bg-[#ba1a1a] hover:bg-[#93000a]'
                : 'bg-[#94464f] hover:bg-[#772f39]'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
