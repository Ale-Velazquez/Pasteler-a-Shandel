import React, { useState, useMemo } from 'react';
import { Product, Category } from '../../types';

interface ProductManagementProps {
  products: Product[];
  categories: Category[];
  onCreateProduct: () => void;
  onEditProduct: (product: Product) => void;
  onPreviewProduct: (product: Product) => void;
  onTogglePublish: (productId: string) => void;
  onToggleBestseller: (productId: string) => void;
  onDeleteProduct: (product: Product) => void;
}

export const ProductManagement: React.FC<ProductManagementProps> = ({
  products,
  categories,
  onCreateProduct,
  onEditProduct,
  onPreviewProduct,
  onTogglePublish,
  onToggleBestseller,
  onDeleteProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'hidden'>('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCat !== 'all' && p.categoryId !== selectedCat) return false;
      if (statusFilter === 'published' && !p.isPublished) return false;
      if (statusFilter === 'hidden' && p.isPublished) return false;

      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [products, selectedCat, statusFilter, searchTerm]);

  return (
    <div className="flex flex-col gap-5">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-xl font-bold text-[#211a18]">
            Catálogo & Vitrina de Productos
          </h3>
          <p className="text-xs text-[#544344]">
            Administra precios, descripciones, porciones, sabores y visibilidad para tus clientes.
          </p>
        </div>

        <button
          onClick={onCreateProduct}
          className="py-2.5 px-5 rounded-full bg-[#94464f] hover:bg-[#772f39] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 self-start cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          <span>Crear Nuevo Pastel</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#ede0dc] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
        {/* Search */}
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#867273] text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre o receta..."
            className="w-full h-9 pl-9 pr-3 rounded-xl bg-[#fff1ed] border border-[#ede0dc] text-[#211a18] focus:outline-none focus:ring-1 focus:ring-[#94464f]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Dropdown */}
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="h-9 px-3 rounded-xl bg-[#fff1ed] border border-[#ede0dc] text-[#211a18] font-semibold focus:outline-none cursor-pointer"
          >
            <option value="all">Todas las categorías</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e: any) => setStatusFilter(e.target.value)}
            className="h-9 px-3 rounded-xl bg-[#fff1ed] border border-[#ede0dc] text-[#211a18] font-semibold focus:outline-none cursor-pointer"
          >
            <option value="all">Todos los estados</option>
            <option value="published">Solo publicados</option>
            <option value="hidden">Solo ocultos</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex bg-[#fff1ed] rounded-xl border border-[#ede0dc] p-0.5">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg ${
                viewMode === 'table'
                  ? 'bg-white text-[#94464f] shadow-xs'
                  : 'text-[#867273]'
              }`}
              title="Vista en tabla"
            >
              <span className="material-symbols-outlined text-[17px]">
                table_rows
              </span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg ${
                viewMode === 'grid'
                  ? 'bg-white text-[#94464f] shadow-xs'
                  : 'text-[#867273]'
              }`}
              title="Vista en tarjetas"
            >
              <span className="material-symbols-outlined text-[17px]">
                grid_view
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Counter */}
      <div className="flex items-center justify-between text-xs text-[#72594b] px-1">
        <span>
          Mostrando <strong>{filteredProducts.length}</strong> de {products.length} productos registrados
        </span>
        <span className="text-[11px] text-[#867273]">
          Precios demostrativos ($MXN)
        </span>
      </div>

      {/* Product List Content */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-[#ede0dc] flex flex-col items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[36px] text-[#867273]">
            inventory_2
          </span>
          <h4 className="font-serif text-lg font-bold text-[#211a18]">
            No se encontraron productos
          </h4>
          <p className="text-xs text-[#544344]">
            Ajusta los filtros o crea una nueva creación de repostería.
          </p>
        </div>
      ) : viewMode === 'table' ? (
        /* Table View */
        <div className="bg-white rounded-2xl border border-[#ede0dc] overflow-x-auto shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#fff8f6] border-b border-[#ede0dc] text-[#72594b] uppercase font-bold text-[10px] tracking-wider">
                <th className="py-3.5 px-4">Producto</th>
                <th className="py-3.5 px-3">Categoría</th>
                <th className="py-3.5 px-3">Precio</th>
                <th className="py-3.5 px-3">Porciones / Anticipación</th>
                <th className="py-3.5 px-3 text-center">Estado</th>
                <th className="py-3.5 px-3 text-center">Destacado</th>
                <th className="py-3.5 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ede0dc]/60">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-[#fff1ed]/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-11 h-11 rounded-xl object-cover bg-[#f9ebe7] shrink-0"
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="font-serif font-bold text-sm text-[#211a18] truncate max-w-[200px]">
                          {p.name}
                        </span>
                        {p.tag && (
                          <span className="text-[10px] text-[#94464f] font-semibold">
                            {p.tag}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-[#544344]">
                    {p.category}
                  </td>
                  <td className="py-3 px-3 font-serif font-bold text-sm text-[#94464f]">
                    ${p.price.toFixed(2)} MXN
                  </td>
                  <td className="py-3 px-3 text-[#544344]">
                    <div>{p.servingsText}</div>
                    <div className="text-[10px] text-[#867273]">
                      {p.anticipationLabel}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      type="button"
                      onClick={() => onTogglePublish(p.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors cursor-pointer ${
                        p.isPublished
                          ? 'bg-[#e8f5e9] text-[#2e7d32] hover:bg-[#c8e6c9]'
                          : 'bg-[#fedcc9] text-[#785f50] hover:bg-[#ffdadb]'
                      }`}
                      title="Haz clic para cambiar visibilidad"
                    >
                      {p.isPublished ? '● Publicado' : '○ Oculto'}
                    </button>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      type="button"
                      onClick={() => onToggleBestseller(p.id)}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        p.isBestseller
                          ? 'text-[#775a00] hover:text-[#94464f]'
                          : 'text-[#867273]/40 hover:text-[#775a00]'
                      }`}
                      title={p.isBestseller ? 'Quitar de más vendidos' : 'Marcar como más vendido'}
                    >
                      <span
                        className="material-symbols-outlined text-[19px]"
                        style={{
                          fontVariationSettings: p.isBestseller
                            ? "'FILL' 1"
                            : "'FILL' 0",
                        }}
                      >
                        star
                      </span>
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onPreviewProduct(p)}
                        className="p-1.5 rounded-lg text-[#775a00] hover:bg-[#fff1ed] transition-colors"
                        title="Vista previa pública"
                      >
                        <span className="material-symbols-outlined text-[17px]">
                          visibility
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onEditProduct(p)}
                        className="p-1.5 rounded-lg text-[#211a18] hover:bg-[#fff1ed] transition-colors"
                        title="Editar información"
                      >
                        <span className="material-symbols-outlined text-[17px]">
                          edit
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteProduct(p)}
                        className="p-1.5 rounded-lg text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors"
                        title="Eliminar producto"
                      >
                        <span className="material-symbols-outlined text-[17px]">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-[#ede0dc] overflow-hidden shadow-xs flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] bg-[#f9ebe7]">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
                <span
                  className={`absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs ${
                    p.isPublished
                      ? 'bg-[#2e7d32] text-white'
                      : 'bg-[#72594b] text-white'
                  }`}
                >
                  {p.isPublished ? 'Publicado' : 'Oculto'}
                </span>
                {p.tag && (
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-white/90 text-[#94464f] text-[10px] font-bold">
                    {p.tag}
                  </span>
                )}
              </div>

              <div className="p-4 flex flex-col flex-1 justify-between gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-[#72594b] uppercase font-bold">
                    {p.category}
                  </span>
                  <h4 className="font-serif text-base font-bold text-[#211a18] mt-0.5 leading-snug">
                    {p.name}
                  </h4>
                  <p className="text-[11px] text-[#544344] line-clamp-2 mt-1">
                    {p.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#ede0dc] flex items-center justify-between">
                  <span className="font-serif text-base font-bold text-[#94464f]">
                    ${p.price.toFixed(2)} MXN
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onPreviewProduct(p)}
                      className="p-1.5 rounded-lg text-[#775a00] hover:bg-[#fff1ed]"
                      title="Vista previa"
                    >
                      <span className="material-symbols-outlined text-[17px]">
                        visibility
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onEditProduct(p)}
                      className="p-1.5 rounded-lg text-[#211a18] hover:bg-[#fff1ed]"
                      title="Editar"
                    >
                      <span className="material-symbols-outlined text-[17px]">
                        edit
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteProduct(p)}
                      className="p-1.5 rounded-lg text-[#ba1a1a] hover:bg-[#ffdad6]"
                      title="Eliminar"
                    >
                      <span className="material-symbols-outlined text-[17px]">
                        delete
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
