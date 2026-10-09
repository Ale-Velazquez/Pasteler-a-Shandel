import React from 'react';
import { Product } from '../../types';

interface ProductPreviewModalProps {
  product: Product | null;
  onClose: () => void;
  onPublishToggle?: (productId: string) => void;
}

export const ProductPreviewModal: React.FC<ProductPreviewModalProps> = ({
  product,
  onClose,
  onPublishToggle,
}) => {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#211a18]/70 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#ede0dc] relative my-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f9ebe7] hover:bg-[#ede0dc] flex items-center justify-center text-[#211a18] transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[#ede0dc] pb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#775a00] text-[20px]">
                visibility
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#775a00]">
                Vista Previa de Publicación
              </span>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                product.isPublished
                  ? 'bg-[#e8f5e9] text-[#2e7d32]'
                  : 'bg-[#fff1ed] text-[#72594b]'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  product.isPublished ? 'bg-[#2e7d32]' : 'bg-[#72594b]'
                }`}
              ></span>
              {product.isPublished ? 'Producto Publicado' : 'Producto Oculto (Borrador)'}
            </span>
          </div>

          <p className="text-xs text-[#544344]">
            Así verán los clientes este producto en el catálogo digital interactivo:
          </p>

          {/* Public Preview Card Replica */}
          <div className="bg-[#fff8f6] p-4 rounded-2xl border border-[#ede0dc] flex flex-col sm:flex-row gap-5 items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-full sm:w-48 aspect-square rounded-xl object-cover bg-white shadow-xs"
            />
            <div className="flex flex-col flex-1 gap-2">
              <span className="text-[10px] uppercase font-bold text-[#72594b] tracking-wider">
                {product.category}
              </span>
              <h3 className="font-serif text-xl font-bold text-[#211a18] leading-tight">
                {product.name}
              </h3>
              <p className="text-xs text-[#544344] leading-relaxed">
                {product.detailedDescription || product.description}
              </p>

              <div className="flex items-center gap-3 py-2 px-3 bg-white rounded-xl border border-[#ede0dc] mt-1 text-xs">
                <div>
                  <span className="text-[10px] text-[#72594b] block">Precio:</span>
                  <span className="font-serif font-bold text-[#94464f] text-base">
                    ${product.price.toFixed(2)} MXN
                  </span>
                </div>
                <div className="w-px h-6 bg-[#ede0dc]"></div>
                <div>
                  <span className="text-[10px] text-[#72594b] block">Porciones:</span>
                  <span className="font-semibold text-[#211a18]">
                    {product.servingsText}
                  </span>
                </div>
                <div className="w-px h-6 bg-[#ede0dc]"></div>
                <div>
                  <span className="text-[10px] text-[#72594b] block">Anticipación:</span>
                  <span className="font-semibold text-[#211a18]">
                    {product.anticipationLabel}
                  </span>
                </div>
              </div>

              {product.flavors && product.flavors.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  <span className="text-[10px] font-semibold text-[#72594b] mr-1">
                    Sabores:
                  </span>
                  {product.flavors.map((f) => (
                    <span
                      key={f}
                      className="px-2 py-0.5 rounded-full bg-white text-[10px] text-[#544344] border border-[#ede0dc]"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-[#867273]">
              ID: <code>{product.id}</code>
            </span>
            <div className="flex gap-2">
              {onPublishToggle && (
                <button
                  type="button"
                  onClick={() => onPublishToggle(product.id)}
                  className={`py-2 px-4 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                    product.isPublished
                      ? 'bg-[#fff1ed] text-[#72594b] hover:bg-[#ede0dc]'
                      : 'bg-[#2e7d32] text-white hover:bg-[#1b5e20]'
                  }`}
                >
                  {product.isPublished ? 'Ocultar del Catálogo' : 'Publicar Ahora'}
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="py-2 px-4 rounded-full bg-[#94464f] text-white text-xs font-bold hover:bg-[#772f39] transition-colors cursor-pointer"
              >
                Cerrar vista previa
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
