import React, { useState } from 'react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    quantity: number,
    selectedSize: string,
    selectedFlavor: string,
    dedication?: string
  ) => void;
  onOpenCustomQuote: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenCustomQuote,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedFlavor, setSelectedFlavor] = useState(
    product.flavors[0] || 'Original de la casa'
  );
  const [dedication, setDedication] = useState('');

  const currentSizeOption = product.sizes[selectedSizeIndex] || {
    name: product.servingsText,
    servings: product.servingsText,
    priceModifier: 0,
  };

  const calculatedUnitPrice = product.price + currentSizeOption.priceModifier;
  const totalPrice = calculatedUnitPrice * quantity;

  const handleAdd = () => {
    onAddToCart(
      product,
      quantity,
      currentSizeOption.name,
      selectedFlavor,
      dedication.trim() || undefined
    );
    onClose();
  };

  const handleWhatsAppInquiry = () => {
    const text = `Hola Pastelería Shandel! Me interesa consultar disponibilidad para:\n- Pastel: ${product.name}\n- Tamaño: ${currentSizeOption.name}\n- Sabor: ${selectedFlavor}\n- Cantidad: ${quantity}\n${dedication ? `- Dedicatoria: "${dedication}"\n` : ''}- Precio demo de referencia: $${totalPrice.toFixed(2)} MXN\n¿Tienen cupo disponible en su taller?`;
    window.open(`https://wa.me/525548192030?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#211a18]/60 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#ffffff] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 border border-[#ede0dc] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#f9ebe7] hover:bg-[#ede0dc] flex items-center justify-center text-[#211a18] transition-colors"
          aria-label="Cerrar ventana de detalles"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="flex flex-col gap-5">
          {/* Header Badge */}
          <div className="flex items-center gap-2 text-[#94464f] text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[17px]">
              restaurant_menu
            </span>
            <span>Ficha del Maestro Pastelero · {product.category}</span>
          </div>

          {/* Visual Showcase Split */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
            <div className="sm:col-span-5 relative rounded-2xl overflow-hidden aspect-square bg-[#f9ebe7] shadow-inner">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.tag && (
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#94464f] text-white text-[10px] font-bold shadow-md">
                  {product.tag}
                </span>
              )}
            </div>

            <div className="sm:col-span-7 flex flex-col gap-2.5">
              <h2 className="font-serif text-2xl font-bold text-[#211a18] leading-tight">
                {product.name}
              </h2>
              <p className="text-xs text-[#544344] leading-relaxed">
                {product.detailedDescription || product.description}
              </p>

              {/* Price and Servings Strip */}
              <div className="flex items-center gap-4 py-2.5 px-3.5 rounded-xl bg-[#fff1ed] border border-[#ede0dc] mt-1">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-semibold text-[#72594b] tracking-wider">
                    Precio Estimado
                  </span>
                  <span className="font-serif text-xl font-bold text-[#94464f]">
                    ${calculatedUnitPrice.toFixed(2)}{' '}
                    <span className="text-xs font-sans font-normal text-[#72594b]">
                      MXN
                    </span>
                  </span>
                </div>
                <div className="w-px h-8 bg-[#ede0dc]"></div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-semibold text-[#72594b] tracking-wider">
                    Rendimiento
                  </span>
                  <span className="text-sm font-semibold text-[#211a18]">
                    {currentSizeOption.servings || product.servingsText}
                  </span>
                </div>
              </div>

              {/* Anticipation Indicator */}
              <div className="flex items-center gap-2 text-xs text-[#72594b] mt-1">
                <span className="material-symbols-outlined text-[17px] text-[#94464f]">
                  schedule
                </span>
                <span>{product.anticipationLabel}</span>
              </div>
            </div>
          </div>

          {/* Customization Options */}
          <div className="flex flex-col gap-3.5 pt-2 border-t border-[#ede0dc]">
            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#211a18] flex items-center justify-between">
                  <span>Seleccionar Tamaño / Porciones</span>
                  <span className="text-[11px] font-normal text-[#72594b]">
                    Ajusta porciones deseadas
                  </span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.sizes.map((size, idx) => (
                    <button
                      key={size.name}
                      type="button"
                      onClick={() => setSelectedSizeIndex(idx)}
                      className={`text-left p-2.5 rounded-xl border text-xs transition-all flex items-center justify-between ${
                        selectedSizeIndex === idx
                          ? 'border-[#94464f] bg-[#ffdadb]/40 text-[#211a18] font-semibold'
                          : 'border-[#ede0dc] bg-white text-[#544344] hover:bg-[#fff1ed]'
                      }`}
                    >
                      <span>{size.name}</span>
                      {size.priceModifier !== 0 && (
                        <span className="text-[10px] text-[#94464f]">
                          {size.priceModifier > 0 ? `+` : ''}$
                          {size.priceModifier.toFixed(2)}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Flavor Selector */}
            {product.flavors && product.flavors.length > 0 && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#211a18]">
                  Sabor o Relleno Artesanal
                </label>
                <select
                  value={selectedFlavor}
                  onChange={(e) => setSelectedFlavor(e.target.value)}
                  className="h-10 px-3 rounded-xl bg-[#fff1ed] border border-[#ede0dc] text-xs text-[#211a18] focus:outline-none focus:ring-2 focus:ring-[#94464f] cursor-pointer"
                >
                  {product.flavors.map((flavor) => (
                    <option key={flavor} value={flavor}>
                      {flavor}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Placa de Dedicatoria */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#211a18] flex items-center justify-between">
                <span>Dedicatoria en Placa de Chocolate (Opcional)</span>
                <span className="text-[11px] text-[#867273]">Sin costo extra</span>
              </label>
              <input
                type="text"
                value={dedication}
                onChange={(e) => setDedication(e.target.value)}
                maxLength={45}
                placeholder="Ej. ¡Feliz Cumpleaños Sofía!"
                className="h-9 px-3 rounded-xl bg-[#fff1ed] border border-[#ede0dc] text-xs text-[#211a18] placeholder:text-[#867273] focus:outline-none focus:ring-2 focus:ring-[#94464f]"
              />
            </div>

            {/* Quantity Stepper & Total */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#211a18]">
                  Piezas:
                </span>
                <div className="flex items-center bg-[#f9ebe7] rounded-full p-1 border border-[#ede0dc]">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#211a18] hover:bg-[#ede0dc] text-sm font-bold shadow-xs"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-[#211a18]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#211a18] hover:bg-[#ede0dc] text-sm font-bold shadow-xs"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-[#72594b] block">Total de esta pieza</span>
                <span className="font-serif text-lg font-bold text-[#94464f]">
                  ${totalPrice.toFixed(2)} MXN
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
            <button
              onClick={handleAdd}
              className="py-3 px-4 rounded-full bg-[#94464f] hover:bg-[#772f39] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                add_shopping_cart
              </span>
              <span>Añadir a Mi Selección</span>
            </button>
            <button
              onClick={handleWhatsAppInquiry}
              className="py-3 px-4 rounded-full bg-[#fedcc9] hover:bg-[#ffdadb] text-[#785f50] hover:text-[#94464f] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Consultar por WhatsApp</span>
            </button>
          </div>

          {/* Custom Cake Advice Footnote */}
          <div className="flex items-center justify-between text-[11px] text-[#867273] pt-1 border-t border-[#ede0dc]/60">
            <span>*Datos y precios de demostración en pesos mexicanos.</span>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenCustomQuote();
              }}
              className="text-[#94464f] font-semibold hover:underline"
            >
              ¿Deseas diseño temático a medida?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
