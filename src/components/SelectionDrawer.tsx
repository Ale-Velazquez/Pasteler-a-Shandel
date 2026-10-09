import React, { useState } from 'react';
import { CartItem } from '../types';

interface SelectionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

export const SelectionDrawer: React.FC<SelectionDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [generalNotes, setGeneralNotes] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const handleSendWhatsAppOrder = () => {
    if (items.length === 0) return;

    let message = `🧁 *CONSULTA DE PEDIDO — PASTELERÍA SHANDEL*\n`;
    if (customerName.trim()) {
      message += `*Cliente:* ${customerName.trim()}\n`;
    }
    if (preferredDate) {
      message += `*Fecha deseada:* ${preferredDate}\n`;
    }
    message += `\n*Delicias seleccionadas:*\n`;

    items.forEach((item, index) => {
      message += `${index + 1}. *${item.product.name}* (x${item.quantity})\n`;
      message += `   - Tamaño: ${item.selectedSize}\n`;
      message += `   - Sabor: ${item.selectedFlavor}\n`;
      if (item.dedication) {
        message += `   - Placa: "${item.dedication}"\n`;
      }
      message += `   - Precio unitario: $${item.unitPrice.toFixed(2)} MXN\n`;
      message += `   - Subtotal: $${(item.unitPrice * item.quantity).toFixed(2)} MXN\n\n`;
    });

    message += `*Total estimado de referencia:* $${subtotal.toFixed(2)} MXN\n`;
    if (generalNotes.trim()) {
      message += `*Notas adicionales:* ${generalNotes.trim()}\n`;
    }
    message += `\n_Agradezco confirmar disponibilidad de fecha y horarios de entrega._`;

    window.open(`https://wa.me/525548192030?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#211a18]/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#ffffff] h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-[#ede0dc] animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#ede0dc] flex items-center justify-between bg-[#fff8f6]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#94464f] text-[22px]">
              shopping_bag
            </span>
            <div className="flex flex-col">
              <h3 className="font-serif text-lg font-bold text-[#211a18]">
                Mi Selección
              </h3>
              <span className="text-[11px] text-[#72594b]">
                {items.length === 1 ? '1 delicia agregada' : `${items.length} delicias agregadas`}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f9ebe7] hover:bg-[#ede0dc] flex items-center justify-center text-[#211a18] transition-colors"
            aria-label="Cerrar panel de selección"
          >
            <span className="material-symbols-outlined text-[19px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12 gap-3 text-[#544344]">
              <div className="w-16 h-16 rounded-full bg-[#f9ebe7] flex items-center justify-center text-[#94464f]">
                <span className="material-symbols-outlined text-[32px]">
                  cake
                </span>
              </div>
              <h4 className="font-serif text-lg font-bold text-[#211a18]">
                Tu selección está vacía
              </h4>
              <p className="text-xs text-[#544344] max-w-xs leading-relaxed">
                Explora nuestro catálogo y agrega tus pasteles, tartas o cajas de repostería favoritas para preparar tu consulta.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2.5 rounded-full bg-[#94464f] text-white text-xs font-semibold hover:bg-[#772f39] transition-colors shadow-sm"
              >
                Explorar catálogo
              </button>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="flex flex-col gap-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl bg-[#fff8f6] border border-[#ede0dc] flex gap-3 relative group"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-xl object-cover bg-white shrink-0"
                    />
                    <div className="flex flex-col flex-1 min-w-0 pr-6">
                      <h4 className="font-serif text-sm font-bold text-[#211a18] truncate">
                        {item.product.name}
                      </h4>
                      <span className="text-[11px] text-[#72594b] truncate">
                        {item.selectedSize} · {item.selectedFlavor}
                      </span>
                      {item.dedication && (
                        <span className="text-[10px] text-[#94464f] italic truncate mt-0.5">
                          Placa: "{item.dedication}"
                        </span>
                      )}

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center bg-white rounded-lg border border-[#ede0dc] p-0.5">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-5 h-5 flex items-center justify-center text-xs font-bold text-[#211a18] hover:bg-[#f9ebe7] rounded"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-semibold text-[#211a18]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-5 h-5 flex items-center justify-center text-xs font-bold text-[#211a18] hover:bg-[#f9ebe7] rounded"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-xs font-bold text-[#94464f]">
                          ${(item.unitPrice * item.quantity).toFixed(2)} MXN
                        </span>
                      </div>
                    </div>

                    {/* Delete Item Button */}
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="absolute top-2.5 right-2.5 text-[#867273] hover:text-[#ba1a1a] p-1 rounded-full transition-colors"
                      title="Eliminar de mi selección"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        delete
                      </span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Inquiry Details Input */}
              <div className="p-3.5 rounded-2xl bg-[#fff1ed] border border-[#ede0dc] flex flex-col gap-2.5">
                <span className="text-xs font-bold text-[#211a18] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#94464f]">
                    person
                  </span>
                  Datos para tu consulta (Opcional)
                </span>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Tu nombre para atenderte"
                  className="h-8 px-2.5 rounded-lg bg-white border border-[#ede0dc] text-xs text-[#211a18] focus:outline-none focus:ring-1 focus:ring-[#94464f]"
                />
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  placeholder="Fecha estimada de entrega"
                  className="h-8 px-2.5 rounded-lg bg-white border border-[#ede0dc] text-xs text-[#211a18] focus:outline-none focus:ring-1 focus:ring-[#94464f]"
                />
                <textarea
                  value={generalNotes}
                  onChange={(e) => setGeneralNotes(e.target.value)}
                  rows={2}
                  placeholder="Notas especiales (horario, velitas, alérgenos)..."
                  className="p-2 rounded-lg bg-white border border-[#ede0dc] text-xs text-[#211a18] focus:outline-none focus:ring-1 focus:ring-[#94464f] resize-none"
                />
              </div>

              {/* Disclaimer Notice */}
              <div className="p-3 rounded-xl bg-[#f9ebe7] border border-[#ede0dc] text-[11px] text-[#544344] leading-relaxed flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#775a00] shrink-0 mt-0.5">
                  info
                </span>
                <span>
                  <strong>Catálogo visual para consultas:</strong> Todos los precios son de demostración. No se realizan cobros en esta pantalla; tu selección se remite directamente a nuestro chef pastelero vía WhatsApp para confirmar fecha.
                </span>
              </div>
            </>
          )}
        </div>

        {/* Footer actions */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#ede0dc] bg-[#fff8f6] flex flex-col gap-3">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-semibold text-[#72594b]">
                Total de referencia (demo):
              </span>
              <span className="font-serif text-2xl font-bold text-[#94464f]">
                ${subtotal.toFixed(2)}{' '}
                <span className="text-xs font-sans font-normal text-[#72594b]">
                  MXN
                </span>
              </span>
            </div>

            <button
              onClick={handleSendWhatsAppOrder}
              className="w-full py-3.5 rounded-full bg-[#94464f] hover:bg-[#772f39] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[19px]">chat</span>
              <span>Enviar consulta directa por WhatsApp</span>
            </button>

            <div className="flex items-center justify-between text-xs pt-1">
              <button
                onClick={onClearCart}
                className="text-[#867273] hover:text-[#ba1a1a] transition-colors"
              >
                Vaciar selección
              </button>
              <span className="text-[11px] text-[#867273]">
                Respuesta en menos de 2h
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
