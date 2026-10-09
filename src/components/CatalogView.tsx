import React, { useState, useMemo } from 'react';
import { Product, Category, PortionType, AnticipationType } from '../types';

interface CatalogViewProps {
  products: Product[];
  categories: Category[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onOpenCustomQuote: () => void;
  isAdminLoggedIn?: boolean;
  onEditProduct?: (product: Product) => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  products,
  categories,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  onQuickAdd,
  onOpenCustomQuote,
  isAdminLoggedIn = false,
  onEditProduct,
}) => {
  // Sort State
  const [sortBy, setSortBy] = useState<'populares' | 'precio-menor' | 'precio-mayor' | 'alfabetico'>('populares');

  // Portion Filters
  const [selectedPortions, setSelectedPortions] = useState<PortionType[]>([]);

  // Anticipation Filter
  const [selectedAnticipation, setSelectedAnticipation] = useState<'all' | AnticipationType>('all');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Toggle portion filter
  const handleTogglePortion = (portion: PortionType) => {
    setSelectedPortions((prev) =>
      prev.includes(portion)
        ? prev.filter((p) => p !== portion)
        : [...prev, portion]
    );
    setCurrentPage(1);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedPortions([]);
    setSelectedAnticipation('all');
    onSelectCategory('all');
    onSearchChange('');
    setCurrentPage(1);
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Must be published in client view
      if (!p.isPublished) return false;

      // Category filter
      if (selectedCategory !== 'all') {
        if (p.categoryId !== selectedCategory) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesCategory = p.category.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesFlavor = p.flavors.some((f) => f.toLowerCase().includes(query));
        if (!matchesName && !matchesCategory && !matchesDesc && !matchesFlavor) {
          return false;
        }
      }

      // Portion filter
      if (selectedPortions.length > 0) {
        if (!selectedPortions.includes(p.portionType)) return false;
      }

      // Anticipation filter
      if (selectedAnticipation !== 'all') {
        if (p.anticipation !== selectedAnticipation) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'precio-menor') return a.price - b.price;
      if (sortBy === 'precio-mayor') return b.price - a.price;
      if (sortBy === 'alfabetico') return a.name.localeCompare(b.name);
      // 'populares' default: bestsellers/featured first
      if (a.isBestseller && !b.isBestseller) return -1;
      if (!a.isBestseller && b.isBestseller) return 1;
      return 0;
    });
  }, [products, selectedCategory, searchQuery, selectedPortions, selectedAnticipation, sortBy]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  // Counts for portion categories
  const portionCounts = useMemo(() => {
    const published = products.filter((p) => p.isPublished);
    return {
      individual: published.filter((p) => p.portionType === 'individual').length,
      mediano: published.filter((p) => p.portionType === 'mediano').length,
      familiar: published.filter((p) => p.portionType === 'familiar').length,
      eventos: published.filter((p) => p.portionType === 'eventos').length,
    };
  }, [products]);

  return (
    <div className="w-full max-w-[1320px] mx-auto px-4 lg:px-8 pt-6 pb-20">
      {/* 1. Header Banner */}
      <header className="flex flex-col gap-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f3e5e2] mb-2 text-[#72594b]">
              <span className="material-symbols-outlined text-[16px] text-[#94464f]">
                bakery_dining
              </span>
              <span className="text-[11px] tracking-wider uppercase font-semibold">
                Haute Pâtisserie Artesanal
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#211a18] tracking-tight">
              Catálogo de Productos
            </h1>
            <p className="text-xs sm:text-sm text-[#544344] mt-1.5 leading-relaxed">
              Explora nuestra selección completa de pasteles, tartas y repostería fina. Consulta tamaños, porciones y disponibilidad para tus celebraciones.
            </p>
          </div>

          {/* Quick Summary Micro-Stats */}
          <div className="hidden lg:flex items-center gap-6 bg-white p-4 rounded-2xl shadow-xs border border-[#ede0dc]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#f9ebe7] flex items-center justify-center text-[#94464f]">
                <span className="material-symbols-outlined text-[20px]">schedule</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#544344] uppercase tracking-wider font-semibold">
                  Anticipación
                </span>
                <span className="text-xs font-bold text-[#211a18]">
                  Desde 0 a 72 hrs
                </span>
              </div>
            </div>
            <div className="h-8 w-px bg-[#ede0dc]"></div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#f9ebe7] flex items-center justify-center text-[#775a00]">
                <span className="material-symbols-outlined text-[20px]">stars</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#544344] uppercase tracking-wider font-semibold">
                  Garantía
                </span>
                <span className="text-xs font-bold text-[#211a18]">
                  100% Mantequilla Pura
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar & Sort Dropdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
          <div className="lg:col-span-8 bg-white p-1.5 rounded-full shadow-xs border border-[#ede0dc] flex items-center gap-2">
            <div className="pl-3 flex items-center text-[#72594b]">
              <span className="material-symbols-outlined text-[22px]">search</span>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Buscar por nombre (ej. Red Velvet, Cheesecake, Ópera)..."
              className="flex-1 bg-transparent px-2 text-xs text-[#211a18] placeholder:text-[#867273] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="text-[#867273] hover:text-[#211a18] p-1 text-xs"
              >
                Limpiar
              </button>
            )}
            <button
              type="button"
              className="bg-[#94464f] hover:bg-[#772f39] text-white text-xs font-bold px-5 py-2.5 rounded-full transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <span>Buscar</span>
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </button>
          </div>

          <div className="lg:col-span-4 flex items-center justify-between sm:justify-end gap-2 bg-white px-4 py-2 rounded-full shadow-xs border border-[#ede0dc]">
            <label
              htmlFor="sort-select"
              className="text-xs font-semibold text-[#72594b] whitespace-nowrap flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[17px]">sort</span>
              <span>Ordenar por:</span>
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-transparent text-xs text-[#211a18] font-bold focus:outline-none cursor-pointer pr-1 py-1"
            >
              <option value="populares">Más populares</option>
              <option value="precio-menor">Precio: Menor a mayor</option>
              <option value="precio-mayor">Precio: Mayor a menor</option>
              <option value="alfabetico">Nombre A-Z</option>
            </select>
          </div>
        </div>
      </header>

      {/* 2. Category Filter Pills */}
      <section className="mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            type="button"
            onClick={() => {
              onSelectCategory('all');
              setCurrentPage(1);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs transition-all whitespace-nowrap border cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#d47a83] text-[#551520] font-bold border-[#d47a83] shadow-xs'
                : 'bg-white hover:bg-[#f9ebe7] text-[#544344] border-[#ede0dc]'
            }`}
          >
            <span>Todos</span>
            <span className="bg-white/90 text-[#211a18] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#ede0dc]">
              {products.filter((p) => p.isPublished).length}
            </span>
          </button>

          {categories
            .filter((c) => !c.isHidden)
            .map((cat) => {
              const catCount = products.filter(
                (p) => p.isPublished && p.categoryId === cat.id
              ).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    onSelectCategory(cat.id);
                    setCurrentPage(1);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs transition-all whitespace-nowrap border cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#d47a83] text-[#551520] font-bold border-[#d47a83] shadow-xs'
                      : 'bg-white hover:bg-[#f9ebe7] text-[#544344] border-[#ede0dc]'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="bg-[#f9ebe7] text-[#544344] text-[10px] font-medium px-2 py-0.5 rounded-full">
                    {catCount}
                  </span>
                </button>
              );
            })}
        </div>
      </section>

      {/* 3. Main Content: Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sidebar Filter */}
        <aside className="lg:col-span-3 flex flex-col gap-4 bg-white p-5 rounded-2xl shadow-xs border border-[#ede0dc]">
          <div className="flex items-center justify-between border-b border-[#ede0dc] pb-3">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#94464f] text-[19px]">
                tune
              </span>
              <h3 className="font-serif text-base font-bold text-[#211a18]">
                Refinar búsqueda
              </h3>
            </div>
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs text-[#72594b] hover:text-[#94464f] underline cursor-pointer"
            >
              Limpiar
            </button>
          </div>

          {/* Portion Range */}
          <div className="flex flex-col gap-2 pt-1">
            <span className="text-xs font-bold text-[#211a18] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[17px] text-[#72594b]">
                groups
              </span>
              Rango de porciones
            </span>
            <div className="flex flex-col gap-1.5 mt-1">
              <label className="flex items-center gap-2.5 cursor-pointer p-1.5 rounded-lg hover:bg-[#fff1ed] transition-colors">
                <input
                  type="checkbox"
                  checked={selectedPortions.includes('individual')}
                  onChange={() => handleTogglePortion('individual')}
                  className="accent-[#94464f] w-4 h-4 rounded cursor-pointer"
                />
                <div className="flex justify-between w-full text-xs text-[#211a18]">
                  <span>
                    Individual{' '}
                    <span className="text-[#544344] text-[11px]">(1-2 pers)</span>
                  </span>
                  <span className="text-[#72594b] font-medium">
                    {portionCounts.individual}
                  </span>
                </div>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer p-1.5 rounded-lg hover:bg-[#fff1ed] transition-colors">
                <input
                  type="checkbox"
                  checked={selectedPortions.includes('mediano')}
                  onChange={() => handleTogglePortion('mediano')}
                  className="accent-[#94464f] w-4 h-4 rounded cursor-pointer"
                />
                <div className="flex justify-between w-full text-xs text-[#211a18]">
                  <span>
                    Mediano{' '}
                    <span className="text-[#544344] text-[11px]">(8-10 pers)</span>
                  </span>
                  <span className="text-[#72594b] font-medium">
                    {portionCounts.mediano}
                  </span>
                </div>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer p-1.5 rounded-lg hover:bg-[#fff1ed] transition-colors">
                <input
                  type="checkbox"
                  checked={selectedPortions.includes('familiar')}
                  onChange={() => handleTogglePortion('familiar')}
                  className="accent-[#94464f] w-4 h-4 rounded cursor-pointer"
                />
                <div className="flex justify-between w-full text-xs text-[#211a18]">
                  <span>
                    Familiar{' '}
                    <span className="text-[#544344] text-[11px]">(12-16 pers)</span>
                  </span>
                  <span className="text-[#72594b] font-medium">
                    {portionCounts.familiar}
                  </span>
                </div>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer p-1.5 rounded-lg hover:bg-[#fff1ed] transition-colors">
                <input
                  type="checkbox"
                  checked={selectedPortions.includes('eventos')}
                  onChange={() => handleTogglePortion('eventos')}
                  className="accent-[#94464f] w-4 h-4 rounded cursor-pointer"
                />
                <div className="flex justify-between w-full text-xs text-[#211a18]">
                  <span>
                    Eventos{' '}
                    <span className="text-[#544344] text-[11px]">(20+ pers)</span>
                  </span>
                  <span className="text-[#72594b] font-medium">
                    {portionCounts.eventos}
                  </span>
                </div>
              </label>
            </div>
          </div>

          <div className="w-full h-px bg-[#ede0dc]"></div>

          {/* Anticipation radio */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[#211a18] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[17px] text-[#72594b]">
                hourglass_bottom
              </span>
              Tiempo de anticipación
            </span>
            <div className="flex flex-col gap-1.5 mt-1">
              <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-[#fff1ed] transition-colors">
                <input
                  type="radio"
                  name="anticipation"
                  checked={selectedAnticipation === 'all'}
                  onChange={() => {
                    setSelectedAnticipation('all');
                    setCurrentPage(1);
                  }}
                  className="accent-[#94464f] w-4 h-4 cursor-pointer"
                />
                <span className="text-xs text-[#211a18]">Todas las opciones</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-[#fff1ed] transition-colors">
                <input
                  type="radio"
                  name="anticipation"
                  checked={selectedAnticipation === 'today'}
                  onChange={() => {
                    setSelectedAnticipation('today');
                    setCurrentPage(1);
                  }}
                  className="accent-[#94464f] w-4 h-4 cursor-pointer"
                />
                <div className="flex items-center gap-1.5 text-xs text-[#211a18]">
                  <span className="w-2 h-2 rounded-full bg-[#2e7d32]"></span>
                  <span>Disponible hoy</span>
                </div>
              </label>

              <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-[#fff1ed] transition-colors">
                <input
                  type="radio"
                  name="anticipation"
                  checked={selectedAnticipation === '24h'}
                  onChange={() => {
                    setSelectedAnticipation('24h');
                    setCurrentPage(1);
                  }}
                  className="accent-[#94464f] w-4 h-4 cursor-pointer"
                />
                <div className="flex items-center gap-1.5 text-xs text-[#211a18]">
                  <span className="w-2 h-2 rounded-full bg-[#b78e18]"></span>
                  <span>Anticipación 24 hrs</span>
                </div>
              </label>

              <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-[#fff1ed] transition-colors">
                <input
                  type="radio"
                  name="anticipation"
                  checked={selectedAnticipation === '48h'}
                  onChange={() => {
                    setSelectedAnticipation('48h');
                    setCurrentPage(1);
                  }}
                  className="accent-[#94464f] w-4 h-4 cursor-pointer"
                />
                <div className="flex items-center gap-1.5 text-xs text-[#211a18]">
                  <span className="w-2 h-2 rounded-full bg-[#72594b]"></span>
                  <span>Anticipación 48 hrs o más</span>
                </div>
              </label>
            </div>
          </div>

          {/* Atelier Advice Callout in Sidebar */}
          <div className="p-3.5 rounded-xl bg-[#fff1ed] mt-2 flex flex-col gap-1.5 border border-[#ede0dc]">
            <div className="flex items-center gap-1 text-[#94464f]">
              <span className="material-symbols-outlined text-[17px]">info</span>
              <span className="text-[10px] uppercase tracking-wider font-bold">
                Nota del Atelier
              </span>
            </div>
            <p className="text-[11px] text-[#544344] leading-relaxed">
              Las creaciones con decoraciones artísticas florales o de más de dos pisos requieren confirmación de fecha con el maestro repostero.
            </p>
          </div>
        </aside>

        {/* Right Product Grid */}
        <section className="lg:col-span-9 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs text-[#72594b]">
              Mostrando {paginatedProducts.length} de {filteredProducts.length} creaciones artesanales
            </span>
            <span className="text-[11px] bg-[#f3e5e2] px-3 py-1 rounded-full text-[#211a18] font-semibold self-start sm:self-auto border border-[#ede0dc]">
              Precios en Pesos Mexicanos (MXN)
            </span>
          </div>

          {paginatedProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center flex flex-col items-center justify-center gap-3 border border-[#ede0dc] shadow-xs">
              <div className="w-16 h-16 rounded-full bg-[#f9ebe7] text-[#94464f] flex items-center justify-center">
                <span className="material-symbols-outlined text-[32px]">search_off</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#211a18]">
                No encontramos productos con estos filtros
              </h3>
              <p className="text-xs text-[#544344] max-w-md">
                Prueba buscando otro término o restablece los filtros para ver el catálogo completo de alta pastelería.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-2 px-5 py-2.5 rounded-full bg-[#94464f] text-white text-xs font-bold hover:bg-[#772f39] transition-colors cursor-pointer shadow-xs"
              >
                Restablecer filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {paginatedProducts.map((product) => {
                const isCustomCategory = product.categoryId === 'personalizados';

                return (
                  <article
                    key={product.id}
                    className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 group border border-[#ede0dc]"
                  >
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#f9ebe7]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Status badge */}
                      {product.anticipation === 'today' ? (
                        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#e8f5e9] text-[#2e7d32] text-[10px] font-bold flex items-center gap-1 shadow-xs border border-[#c8e6c9]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2e7d32]"></span>
                          Disponible para hoy
                        </span>
                      ) : (
                        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[#72594b] text-[10px] font-semibold flex items-center gap-1 shadow-xs border border-[#ede0dc]">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              product.anticipation === '24h'
                                ? 'bg-[#b78e18]'
                                : 'bg-[#72594b]'
                            }`}
                          ></span>
                          {product.anticipationLabel}
                        </span>
                      )}

                      <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-[#72594b] text-[10px] font-medium border border-[#ede0dc]">
                        {product.servingsText}
                      </span>

                      {/* Direct Edit Button: Only visible when Administrator is authenticated */}
                      {isAdminLoggedIn && onEditProduct && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditProduct(product);
                          }}
                          className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-[#94464f] hover:bg-[#772f39] text-white text-[10px] font-bold shadow-md flex items-center gap-1 cursor-pointer z-10"
                          title="Editar pastel directamente"
                        >
                          <span className="material-symbols-outlined text-[14px]">edit</span>
                          <span>Editar</span>
                        </button>
                      )}
                    </div>

                    <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                      <div>
                        <span className="text-[10px] text-[#72594b] uppercase tracking-widest font-semibold block">
                          {product.category}
                        </span>
                        <h4 className="font-serif text-base font-bold text-[#211a18] mt-1 group-hover:text-[#94464f] transition-colors leading-snug">
                          {product.name}
                        </h4>
                        <p className="text-xs text-[#544344] line-clamp-2 mt-1 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#ede0dc]/60 flex flex-col gap-2.5">
                        <div className="flex items-baseline justify-between">
                          <span className="text-[10px] text-[#867273]">
                            {isCustomCategory ? 'Precio demo base' : 'Precio demo'}
                          </span>
                          <span className="font-serif text-lg font-bold text-[#94464f]">
                            ${product.price.toFixed(2)}{' '}
                            <span className="text-xs font-sans font-normal text-[#72594b]">
                              MXN
                            </span>
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => onSelectProduct(product)}
                            className="w-full py-2 px-2 rounded-full bg-[#f9ebe7] hover:bg-[#ede0dc] text-[#211a18] text-xs font-semibold transition-colors text-center cursor-pointer"
                          >
                            Ver detalles
                          </button>
                          {isCustomCategory ? (
                            <button
                              type="button"
                              onClick={onOpenCustomQuote}
                              className="w-full py-2 px-2 rounded-full bg-[#72594b] hover:bg-[#211a18] text-white text-xs font-bold transition-colors text-center shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[15px]">
                                edit_note
                              </span>
                              <span>Cotizar</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => onQuickAdd(product)}
                              className="w-full py-2 px-2 rounded-full bg-[#94464f] hover:bg-[#772f39] text-white text-xs font-bold transition-colors text-center shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[15px]">
                                add_shopping_cart
                              </span>
                              <span>Seleccionar</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* 4. Information Alert Box */}
          <div className="mt-2 flex items-center gap-3 p-4 rounded-2xl bg-[#fff1ed] border border-[#ede0dc] shadow-xs">
            <div className="w-9 h-9 rounded-full bg-[#ffdadb] flex items-center justify-center text-[#94464f] shrink-0">
              <span className="material-symbols-outlined text-[20px]">info</span>
            </div>
            <div className="flex flex-col">
              <p className="text-xs text-[#211a18] font-bold">
                Catálogo visual para cotizaciones y consultas. Todos los precios mostrados son de demostración ($MXN).
              </p>
              <p className="text-[11px] text-[#544344]">
                El precio final puede ajustarse según porciones adicionales, rellenos prémium o elementos de montaje personalizado.
              </p>
            </div>
          </div>

          {/* 5. Pagination */}
          {totalPages > 1 && (
            <nav
              aria-label="Paginación de catálogo"
              className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 pb-4"
            >
              <span className="text-xs text-[#72594b]">
                Página <strong className="text-[#211a18]">{currentPage}</strong> de{' '}
                <strong className="text-[#211a18]">{totalPages}</strong> ({filteredProducts.length} delicias en total)
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3.5 py-1.5 rounded-full text-xs bg-white text-[#544344] hover:text-[#211a18] hover:bg-[#f9ebe7] border border-[#ede0dc] transition-all flex items-center gap-1 shadow-xs disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    chevron_left
                  </span>
                  <span>Anterior</span>
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                        currentPage === pageNum
                          ? 'bg-[#94464f] text-white shadow-xs'
                          : 'bg-white hover:bg-[#f9ebe7] text-[#544344] border border-[#ede0dc]'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3.5 py-1.5 rounded-full text-xs bg-white text-[#211a18] hover:bg-[#f9ebe7] border border-[#ede0dc] transition-all flex items-center gap-1 shadow-xs disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                >
                  <span>Siguiente</span>
                  <span className="material-symbols-outlined text-[16px]">
                    chevron_right
                  </span>
                </button>
              </div>
            </nav>
          )}
        </section>
      </div>
    </div>
  );
};
