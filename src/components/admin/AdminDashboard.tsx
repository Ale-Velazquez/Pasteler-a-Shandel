import React, { useState } from 'react';
import { Product, Category, StoreSettings, QuoteRequest } from '../../types';
import { ProductManagement } from './ProductManagement';
import { CategoryManagement } from './CategoryManagement';
import { StoreSettingsView } from './StoreSettingsView';
import { QuoteRequestsView } from './QuoteRequestsView';

interface AdminDashboardProps {
  products: Product[];
  categories: Category[];
  settings: StoreSettings;
  quotes: QuoteRequest[];
  onLogout: () => void;
  onViewPublicCatalog: () => void;
  onCreateProduct: () => void;
  onEditProduct: (p: Product) => void;
  onPreviewProduct: (p: Product) => void;
  onTogglePublish: (id: string) => void;
  onToggleBestseller: (id: string) => void;
  onDeleteProduct: (p: Product) => void;
  onSaveCategory: (cat: Category) => void;
  onDeleteCategory: (id: string) => void;
  onToggleHideCategory: (id: string) => void;
  onMoveCategoryOrder: (id: string, dir: 'up' | 'down') => void;
  onSaveSettings: (settings: StoreSettings) => void;
  onToggleQuoteStatus: (id: string) => void;
}

export type AdminTab = 'resumen' | 'productos' | 'categorias' | 'cotizaciones' | 'configuracion';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  categories,
  settings,
  quotes,
  onLogout,
  onViewPublicCatalog,
  onCreateProduct,
  onEditProduct,
  onPreviewProduct,
  onTogglePublish,
  onToggleBestseller,
  onDeleteProduct,
  onSaveCategory,
  onDeleteCategory,
  onToggleHideCategory,
  onMoveCategoryOrder,
  onSaveSettings,
  onToggleQuoteStatus,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('resumen');

  const totalProducts = products.length;
  const publishedProducts = products.filter((p) => p.isPublished).length;
  const hiddenProducts = products.filter((p) => !p.isPublished).length;
  const activeCategories = categories.filter((c) => !c.isHidden).length;
  const pendingQuotes = quotes.filter((q) => q.status === 'pendiente').length;

  return (
    <div className="w-full min-h-screen bg-[#fff8f6] pb-24">
      {/* Top Admin Sub-bar */}
      <div className="bg-white border-b border-[#ede0dc] shadow-xs sticky top-20 z-30">
        <div className="max-w-[1320px] mx-auto px-4 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2e7d32]"></span>
            <span className="text-xs font-bold text-[#211a18] uppercase tracking-wider">
              Panel Administrativo Privado · Pastelería Shandel
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onViewPublicCatalog}
              className="py-1.5 px-3.5 rounded-full bg-[#fff1ed] hover:bg-[#ede0dc] text-[#72594b] text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">visibility</span>
              <span>Ver Catálogo Público</span>
            </button>
            <button
              onClick={onLogout}
              className="py-1.5 px-3.5 rounded-full bg-[#ffdad6] hover:bg-[#ffb4ab] text-[#ba1a1a] text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              <span>Salir</span>
            </button>
          </div>
        </div>

        {/* Tab Selector Navigation */}
        <div className="max-w-[1320px] mx-auto px-4 lg:px-8 flex items-center gap-2 overflow-x-auto scrollbar-none border-t border-[#ede0dc]/60 pt-1 pb-1">
          <button
            onClick={() => setActiveTab('resumen')}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'resumen'
                ? 'bg-[#94464f] text-white shadow-xs'
                : 'text-[#544344] hover:bg-[#f9ebe7]'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">dashboard</span>
            <span>Resumen</span>
          </button>

          <button
            onClick={() => setActiveTab('productos')}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'productos'
                ? 'bg-[#94464f] text-white shadow-xs'
                : 'text-[#544344] hover:bg-[#f9ebe7]'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">cake</span>
            <span>Gestión de Productos ({totalProducts})</span>
          </button>

          <button
            onClick={() => setActiveTab('categorias')}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'categorias'
                ? 'bg-[#94464f] text-white shadow-xs'
                : 'text-[#544344] hover:bg-[#f9ebe7]'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">category</span>
            <span>Categorías ({categories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('cotizaciones')}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'cotizaciones'
                ? 'bg-[#94464f] text-white shadow-xs'
                : 'text-[#544344] hover:bg-[#f9ebe7]'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">request_quote</span>
            <span>Cotizaciones</span>
            {pendingQuotes > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-[#fedcc9] text-[#785f50] text-[10px] font-bold">
                {pendingQuotes}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('configuracion')}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'configuracion'
                ? 'bg-[#94464f] text-white shadow-xs'
                : 'text-[#544344] hover:bg-[#f9ebe7]'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">settings</span>
            <span>Configuración de Tienda</span>
          </button>
        </div>
      </div>

      {/* Main Admin Content Body */}
      <div className="max-w-[1320px] mx-auto px-4 lg:px-8 pt-8">
        {activeTab === 'resumen' && (
          <div className="flex flex-col gap-8">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-[#ede0dc] shadow-xs flex flex-col gap-1">
                <span className="text-[10px] text-[#72594b] uppercase font-bold tracking-wider">
                  Total Productos
                </span>
                <span className="font-serif text-3xl font-bold text-[#211a18]">
                  {totalProducts}
                </span>
                <span className="text-[11px] text-[#867273]">Recetas activas</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#ede0dc] shadow-xs flex flex-col gap-1">
                <span className="text-[10px] text-[#2e7d32] uppercase font-bold tracking-wider">
                  Publicados
                </span>
                <span className="font-serif text-3xl font-bold text-[#2e7d32]">
                  {publishedProducts}
                </span>
                <span className="text-[11px] text-[#867273]">En vitrina digital</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#ede0dc] shadow-xs flex flex-col gap-1">
                <span className="text-[10px] text-[#72594b] uppercase font-bold tracking-wider">
                  Ocultos
                </span>
                <span className="font-serif text-3xl font-bold text-[#72594b]">
                  {hiddenProducts}
                </span>
                <span className="text-[11px] text-[#867273]">Borradores</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#ede0dc] shadow-xs flex flex-col gap-1">
                <span className="text-[10px] text-[#775a00] uppercase font-bold tracking-wider">
                  Categorías
                </span>
                <span className="font-serif text-3xl font-bold text-[#775a00]">
                  {activeCategories}
                </span>
                <span className="text-[11px] text-[#867273]">Colecciones</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#ede0dc] shadow-xs flex flex-col gap-1 col-span-2 md:col-span-1">
                <span className="text-[10px] text-[#94464f] uppercase font-bold tracking-wider">
                  Cotizaciones
                </span>
                <span className="font-serif text-3xl font-bold text-[#94464f]">
                  {pendingQuotes}
                </span>
                <span className="text-[11px] text-[#867273]">Pendientes de respuesta</span>
              </div>
            </div>

            {/* Quick Actions Shortcuts */}
            <div className="p-6 rounded-3xl bg-[#fff1ed] border border-[#ede0dc] flex flex-col gap-4">
              <h3 className="font-serif text-lg font-bold text-[#211a18]">
                Acciones Rápidas
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <button
                  onClick={onCreateProduct}
                  className="p-4 rounded-2xl bg-white hover:bg-[#f9ebe7] border border-[#ede0dc] text-left transition-all shadow-xs flex items-center gap-3 cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#ffdadb] text-[#94464f] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[22px]">add</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-xs text-[#211a18]">Nuevo Producto</h5>
                    <p className="text-[10px] text-[#544344]">Crear pastel o tarta</p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('categorias')}
                  className="p-4 rounded-2xl bg-white hover:bg-[#f9ebe7] border border-[#ede0dc] text-left transition-all shadow-xs flex items-center gap-3 cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#fedcc9] text-[#72594b] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[22px]">category</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-xs text-[#211a18]">Administrar Categorías</h5>
                    <p className="text-[10px] text-[#544344]">Reordenar y crear</p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('configuracion')}
                  className="p-4 rounded-2xl bg-white hover:bg-[#f9ebe7] border border-[#ede0dc] text-left transition-all shadow-xs flex items-center gap-3 cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#ffdf98] text-[#775a00] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[22px]">store</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-xs text-[#211a18]">Configurar Tienda</h5>
                    <p className="text-[10px] text-[#544344]">WhatsApp y horarios</p>
                  </div>
                </button>

                <button
                  onClick={onViewPublicCatalog}
                  className="p-4 rounded-2xl bg-white hover:bg-[#f9ebe7] border border-[#ede0dc] text-left transition-all shadow-xs flex items-center gap-3 cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#ede0dc] text-[#544344] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[22px]">preview</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-xs text-[#211a18]">Ver Catálogo</h5>
                    <p className="text-[10px] text-[#544344]">Vista de clientes</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Quick overview of latest products */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-[#211a18]">
                  Últimos Productos Editados
                </h3>
                <button
                  onClick={() => setActiveTab('productos')}
                  className="text-xs text-[#94464f] font-semibold hover:underline"
                >
                  Ver todos los {totalProducts} productos →
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-[#ede0dc] divide-y divide-[#ede0dc]/60 shadow-xs">
                {products.slice(0, 5).map((p) => (
                  <div
                    key={p.id}
                    className="p-3.5 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-10 h-10 rounded-xl object-cover bg-[#f9ebe7] shrink-0"
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="font-serif font-bold text-sm text-[#211a18] truncate">
                          {p.name}
                        </span>
                        <span className="text-[11px] text-[#72594b]">
                          {p.category} · ${p.price.toFixed(2)} MXN
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.isPublished
                            ? 'bg-[#e8f5e9] text-[#2e7d32]'
                            : 'bg-[#fedcc9] text-[#785f50]'
                        }`}
                      >
                        {p.isPublished ? 'Publicado' : 'Oculto'}
                      </span>
                      <button
                        onClick={() => onEditProduct(p)}
                        className="p-1.5 rounded-lg bg-[#fff1ed] hover:bg-[#ede0dc] text-[#211a18]"
                        title="Editar"
                      >
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'productos' && (
          <ProductManagement
            products={products}
            categories={categories}
            onCreateProduct={onCreateProduct}
            onEditProduct={onEditProduct}
            onPreviewProduct={onPreviewProduct}
            onTogglePublish={onTogglePublish}
            onToggleBestseller={onToggleBestseller}
            onDeleteProduct={onDeleteProduct}
          />
        )}

        {activeTab === 'categorias' && (
          <CategoryManagement
            categories={categories}
            products={products}
            onSaveCategory={onSaveCategory}
            onDeleteCategory={onDeleteCategory}
            onToggleHideCategory={onToggleHideCategory}
            onMoveCategoryOrder={onMoveCategoryOrder}
          />
        )}

        {activeTab === 'cotizaciones' && (
          <QuoteRequestsView
            quotes={quotes}
            onToggleQuoteStatus={onToggleQuoteStatus}
          />
        )}

        {activeTab === 'configuracion' && (
          <StoreSettingsView
            settings={settings}
            onSaveSettings={onSaveSettings}
          />
        )}
      </div>
    </div>
  );
};
