import React, { useState } from 'react';
import { ViewTab } from '../types';

interface HeaderProps {
  currentTab: ViewTab;
  onNavigate: (tab: ViewTab) => void;
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isAdminLoggedIn: boolean;
  onAdminLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  cartCount,
  onOpenCart,
  searchQuery,
  onSearchChange,
  isAdminLoggedIn,
  onAdminLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: ViewTab) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentTab !== 'catalogo-completo') {
      onNavigate('catalogo-completo');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#fff8f6]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(74,53,40,0.06)] border-b border-[#ede0dc]/60">
      <div className="h-20 max-w-[1320px] mx-auto px-4 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => handleNavClick('inicio')}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
          >
            <img
              alt="Shandel Logotipo Repostería"
              className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida/AEtjO1WlftEts0iwivCd9a1Pkqx96PrnEW1TH6CjehnF3od1Vk_fFrGTy6S21UoWmCuECaXVifv4_Ux7uofZaj2hRC9Xc4Gas9oBWoMQ846e3zhN-dNs2smQFG_kJDtC4Tkb6txkZ2MmizVhCVFgkWG6EhKS22h4c5oVruNhiCfkHmOts0eiQwRaTw40zEEt-h5SbXDP4WzNewl16NgW69osYoYLWBaa7Zmlgd9G9n6ELQgUEu6Nm1mpWhwZYiU"
              onError={(e) => {
                // Graceful fallback if image unavailable
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-semibold text-[#94464f] tracking-wide leading-none">
                Shandel
              </span>
              <span className="text-[10px] text-[#72594b] tracking-[0.2em] uppercase font-medium mt-0.5">
                Haute Pâtisserie
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1.5 ml-4">
            <button
              onClick={() => handleNavClick('inicio')}
              className={`px-4 py-2 transition-all text-xs font-semibold rounded-full ${
                currentTab === 'inicio'
                  ? 'bg-[#fedcc9] text-[#785f50] shadow-sm'
                  : 'text-[#544344] hover:text-[#211a18] hover:bg-[#f9ebe7]'
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => handleNavClick('catalogo-completo')}
              className={`px-4 py-2 transition-all text-xs font-semibold rounded-full ${
                currentTab === 'catalogo-completo'
                  ? 'bg-[#fedcc9] text-[#785f50] shadow-sm'
                  : 'text-[#544344] hover:text-[#211a18] hover:bg-[#f9ebe7]'
              }`}
            >
              Catálogo completo
            </button>
            <button
              onClick={() => handleNavClick('categorias')}
              className={`px-4 py-2 transition-all text-xs font-semibold rounded-full ${
                currentTab === 'categorias'
                  ? 'bg-[#fedcc9] text-[#785f50] shadow-sm'
                  : 'text-[#544344] hover:text-[#211a18] hover:bg-[#f9ebe7]'
              }`}
            >
              Categorías
            </button>
            <button
              onClick={() => handleNavClick('personalizados')}
              className={`px-4 py-2 transition-all text-xs font-semibold rounded-full ${
                currentTab === 'personalizados'
                  ? 'bg-[#fedcc9] text-[#785f50] shadow-sm'
                  : 'text-[#544344] hover:text-[#211a18] hover:bg-[#f9ebe7]'
              }`}
            >
              Personalizados y Bodas
            </button>
            <button
              onClick={() => handleNavClick('como-hacer-pedidos')}
              className={`px-4 py-2 transition-all text-xs font-semibold rounded-full ${
                currentTab === 'como-hacer-pedidos' || currentTab === 'como-ordenar'
                  ? 'bg-[#fedcc9] text-[#785f50] shadow-sm'
                  : 'text-[#544344] hover:text-[#211a18] hover:bg-[#f9ebe7]'
              }`}
            >
              Cómo hacer pedidos
            </button>
          </nav>
        </div>

        {/* Right Controls: Search, Cart, Admin & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative hidden md:flex items-center"
          >
            <span className="material-symbols-outlined absolute left-3 text-[#72594b] text-[19px] pointer-events-none">
              search
            </span>
            <input
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (currentTab !== 'catalogo-completo' && e.target.value.trim().length > 0) {
                  onNavigate('catalogo-completo');
                }
              }}
              className="h-10 pl-9 pr-3 w-44 lg:w-56 bg-[#ffffff] rounded-full text-xs text-[#211a18] placeholder:text-[#867273] focus:outline-none focus:ring-2 focus:ring-[#d47a83] border border-[#ede0dc] shadow-[0_2px_8px_rgba(74,53,40,0.04)] transition-all"
              placeholder="Buscar delicias, sabores..."
              type="text"
            />
          </form>

          {/* Mi Selección Button */}
          <button
            onClick={onOpenCart}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#fff1ed] hover:bg-[#f9ebe7] border border-[#ede0dc] transition-all cursor-pointer shadow-sm group"
            title="Ver selección de pedido"
          >
            <span className="material-symbols-outlined text-[#94464f] text-[20px] group-hover:scale-110 transition-transform">
              shopping_bag
            </span>
            <span className="text-xs font-semibold text-[#211a18] hidden sm:inline">
              Mi Selección
            </span>
            <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-full bg-[#ffdadb] text-[#772f39] text-[11px] font-bold min-w-[20px]">
              {cartCount}
            </span>
          </button>

          {/* Admin Access: Only visible when administrator is actively logged in */}
          {isAdminLoggedIn && (
            <div className="flex items-center gap-1.5 animate-in fade-in">
              <button
                onClick={() => handleNavClick('admin')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                  currentTab === 'admin'
                    ? 'bg-[#94464f] text-white shadow-sm'
                    : 'bg-[#f3e5e2] text-[#72594b] hover:bg-[#ede0dc]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  admin_panel_settings
                </span>
                <span className="hidden sm:inline">Panel Admin</span>
              </button>
              <button
                onClick={onAdminLogout}
                className="w-8 h-8 rounded-full bg-[#fff1ed] hover:bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center transition-colors cursor-pointer"
                title="Cerrar sesión de administrador"
              >
                <span className="material-symbols-outlined text-[17px]">
                  logout
                </span>
              </button>
            </div>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-10 h-10 rounded-full bg-[#f9ebe7] flex items-center justify-center text-[#211a18] hover:bg-[#ede0dc] transition-colors"
            aria-label="Menú principal"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#fff8f6] border-b border-[#ede0dc] px-5 py-4 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2">
          {/* Mobile search bar */}
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#72594b] text-[18px]">
              search
            </span>
            <input
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (currentTab !== 'catalogo-completo' && e.target.value.trim().length > 0) {
                  onNavigate('catalogo-completo');
                }
              }}
              placeholder="Buscar delicias, sabores..."
              className="w-full h-10 pl-9 pr-3 rounded-xl bg-white border border-[#ede0dc] text-xs text-[#211a18] focus:outline-none focus:ring-2 focus:ring-[#d47a83]"
            />
          </form>

          <div className="flex flex-col gap-1 pt-1">
            <button
              onClick={() => handleNavClick('inicio')}
              className={`text-left px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                currentTab === 'inicio'
                  ? 'bg-[#fedcc9] text-[#785f50] font-semibold'
                  : 'text-[#544344] hover:bg-[#f9ebe7]'
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => handleNavClick('catalogo-completo')}
              className={`text-left px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                currentTab === 'catalogo-completo'
                  ? 'bg-[#fedcc9] text-[#785f50] font-semibold'
                  : 'text-[#544344] hover:bg-[#f9ebe7]'
              }`}
            >
              Catálogo completo
            </button>
            <button
              onClick={() => handleNavClick('categorias')}
              className={`text-left px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                currentTab === 'categorias'
                  ? 'bg-[#fedcc9] text-[#785f50] font-semibold'
                  : 'text-[#544344] hover:bg-[#f9ebe7]'
              }`}
            >
              Categorías
            </button>
            <button
              onClick={() => handleNavClick('personalizados')}
              className={`text-left px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                currentTab === 'personalizados'
                  ? 'bg-[#fedcc9] text-[#785f50] font-semibold'
                  : 'text-[#544344] hover:bg-[#f9ebe7]'
              }`}
            >
              Personalizados y Bodas
            </button>
            <button
              onClick={() => handleNavClick('como-hacer-pedidos')}
              className={`text-left px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                currentTab === 'como-hacer-pedidos' || currentTab === 'como-ordenar'
                  ? 'bg-[#fedcc9] text-[#785f50] font-semibold'
                  : 'text-[#544344] hover:bg-[#f9ebe7]'
              }`}
            >
              Cómo hacer pedidos
            </button>
            {isAdminLoggedIn && (
              <button
                onClick={() => handleNavClick('admin')}
                className={`text-left px-3.5 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between ${
                  currentTab === 'admin'
                    ? 'bg-[#94464f] text-white font-semibold'
                    : 'text-[#72594b] hover:bg-[#f9ebe7]'
                }`}
              >
                <span>Panel de Administración</span>
                <span className="material-symbols-outlined text-[18px]">
                  dashboard
                </span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
