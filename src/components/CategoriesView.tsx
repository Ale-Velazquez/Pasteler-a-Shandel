import React from 'react';
import { Category, Product } from '../types';

interface CategoriesViewProps {
  categories: Category[];
  products: Product[];
  onSelectCategory: (catId: string) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  categories,
  products,
  onSelectCategory,
}) => {
  return (
    <div className="w-full max-w-[1320px] mx-auto px-4 lg:px-8 pt-8 pb-20">
      <div className="flex flex-col gap-2 max-w-2xl mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f3e5e2] text-[#72594b] text-[11px] font-bold uppercase tracking-wider self-start">
          <span className="material-symbols-outlined text-[16px] text-[#94464f]">
            category
          </span>
          Especialidades del Atelier
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#211a18]">
          Categorías de Repostería
        </h1>
        <p className="text-xs sm:text-sm text-[#544344] leading-relaxed">
          Explora nuestras colecciones temáticas. Desde los pasteles tradicionales que perfuman los cumpleaños familiares hasta las piezas esculturales de boda con pisos de altura.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const categoryProducts = products.filter(
            (p) => p.isPublished && p.categoryId === cat.id
          );

          return (
            <div
              key={cat.id}
              className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-[#ede0dc] flex flex-col group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#f9ebe7]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#211a18]/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#ffdadb] block">
                      {cat.subtitle}
                    </span>
                    <h3 className="font-serif text-xl font-bold leading-tight">
                      {cat.name}
                    </h3>
                  </div>
                  <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold">
                    {categoryProducts.length} recetas
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-[#72594b] font-semibold">
                    Creaciones en esta categoría:
                  </span>
                  <ul className="flex flex-col gap-1.5 text-xs text-[#544344]">
                    {categoryProducts.slice(0, 3).map((p) => (
                      <li key={p.id} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#94464f]"></span>
                        <span className="truncate">{p.name}</span>
                      </li>
                    ))}
                    {categoryProducts.length > 3 && (
                      <li className="text-[11px] text-[#867273] italic">
                        + {categoryProducts.length - 3} creaciones más
                      </li>
                    )}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className="w-full py-2.5 px-4 rounded-full bg-[#f9ebe7] hover:bg-[#94464f] hover:text-white text-[#211a18] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                >
                  <span>Explorar categoría</span>
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
