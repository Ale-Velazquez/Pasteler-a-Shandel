import { useState, useEffect } from 'react';
import { Product, Category, CartItem, QuoteRequest, StoreSettings, ViewTab } from './types';
import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_SETTINGS,
  INITIAL_QUOTES,
} from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { CatalogView } from './components/CatalogView';
import { CategoriesView } from './components/CategoriesView';
import { CustomCakesView } from './components/CustomCakesView';
import { HowToOrderView } from './components/HowToOrderView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CustomQuoteModal } from './components/CustomQuoteModal';
import { SelectionDrawer } from './components/SelectionDrawer';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ProductFormModal } from './components/admin/ProductFormModal';
import { ProductPreviewModal } from './components/admin/ProductPreviewModal';
import { ConfirmDialog } from './components/admin/ConfirmDialog';
import { Toast, ToastMessage } from './components/Toast';

export default function App() {
  // 1. Persistent State Initialization with localStorage
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('shandel_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem('shandel_categories');
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('shandel_settings');
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  const [quotes, setQuotes] = useState<QuoteRequest[]>(() => {
    try {
      const saved = localStorage.getItem('shandel_quotes');
      return saved ? JSON.parse(saved) : INITIAL_QUOTES;
    } catch {
      return INITIAL_QUOTES;
    }
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('shandel_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage on state changes
  useEffect(() => {
    try {
      localStorage.setItem('shandel_products', JSON.stringify(products));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('shandel_categories', JSON.stringify(categories));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem('shandel_settings', JSON.stringify(settings));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem('shandel_quotes', JSON.stringify(quotes));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [quotes]);

  useEffect(() => {
    try {
      localStorage.setItem('shandel_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [cartItems]);

  // 2. Navigation & User Flow States
  const [currentTab, setCurrentTab] = useState<ViewTab>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      const search = window.location.search;
      if (hash === '#admin' || search.includes('admin=true')) {
        return 'admin';
      }
    }
    return 'inicio';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCatalogCategory, setSelectedCatalogCategory] = useState('all');

  // Handle URL hash changes & keyboard shortcuts (Alt+A or Ctrl+Shift+A) for admin access
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setCurrentTab('admin');
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret administrator shortcut: Alt+A or Ctrl+Shift+A
      if ((e.altKey && (e.key === 'a' || e.key === 'A')) || (e.ctrlKey && e.shiftKey && (e.key === 'a' || e.key === 'A'))) {
        e.preventDefault();
        setCurrentTab('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // When search query is exactly "/admin" or "admin:login", redirect to admin view
  useEffect(() => {
    if (searchQuery.trim().toLowerCase() === '/admin' || searchQuery.trim().toLowerCase() === 'admin:login') {
      setCurrentTab('admin');
      setSearchQuery('');
    }
  }, [searchQuery]);

  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem('shandel_admin_logged') === 'true';
    } catch {
      return false;
    }
  });

  // Modal & Drawer States
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isSelectionDrawerOpen, setIsSelectionDrawerOpen] = useState(false);

  // Admin Modal States
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [productToPreview, setProductToPreview] = useState<Product | null>(null);

  // Confirm Dialog State
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    isDangerous?: boolean;
    onConfirm: () => void;
  } | null>(null);

  // Toast Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // 3. Cart & Selection Handlers
  const handleAddToCart = (
    product: Product,
    quantity: number,
    selectedSize: string,
    selectedFlavor: string,
    dedication?: string
  ) => {
    const sizeOption = product.sizes.find((s) => s.name === selectedSize);
    const unitPrice = product.price + (sizeOption ? sizeOption.priceModifier : 0);

    const existingIndex = cartItems.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.selectedSize === selectedSize &&
        item.selectedFlavor === selectedFlavor &&
        item.dedication === dedication
    );

    if (existingIndex >= 0) {
      setCartItems((prev) => {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      });
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        product,
        quantity,
        selectedSize,
        selectedFlavor,
        dedication,
        unitPrice,
      };
      setCartItems((prev) => [...prev, newItem]);
    }

    addToast(
      'Añadido a Mi Selección',
      `${product.name} (${quantity} pza${quantity > 1 ? 's' : ''}) agregado exitosamente.`
    );
  };

  const handleQuickAdd = (product: Product) => {
    const defaultSize = product.sizes[0]?.name || product.servingsText;
    const defaultFlavor = product.flavors[0] || 'Original de la casa';
    handleAddToCart(product, 1, defaultSize, defaultFlavor);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
    addToast('Producto removido', 'Se ha eliminado la delicia de tu selección.', 'info');
  };

  const handleClearCart = () => {
    setCartItems([]);
    addToast('Selección vaciada', 'Se han retirado todos los productos de tu lista.', 'info');
  };

  // 4. Custom Quote Submissions
  const handleSubmitQuote = (quoteData: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>) => {
    const newQuote: QuoteRequest = {
      ...quoteData,
      id: `quote-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'pendiente',
    };
    setQuotes((prev) => [newQuote, ...prev]);
    addToast(
      'Solicitud recibida',
      'Nuestro maestro repostero revisará los detalles y te responderá a la brevedad.'
    );
  };

  // 5. Admin Actions
  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem('shandel_admin_logged', 'true');
    addToast('Sesión iniciada', 'Bienvenido al panel administrativo de Pastelería Shandel.');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('shandel_admin_logged');
    setCurrentTab('inicio');
    addToast('Sesión cerrada', 'Has salido del panel de administración seguro.', 'info');
  };

  const handleCreateProduct = () => {
    setProductToEdit(null);
    setIsProductFormOpen(true);
  };

  const handleEditProduct = (prod: Product) => {
    setProductToEdit(prod);
    setIsProductFormOpen(true);
  };

  const handleSaveProduct = (prodData: Product) => {
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === prodData.id);
      if (exists) {
        return prev.map((p) => (p.id === prodData.id ? prodData : p));
      } else {
        return [prodData, ...prev];
      }
    });
    setIsProductFormOpen(false);
    setProductToEdit(null);
    addToast('Producto guardado', `${prodData.name} actualizado correctamente en el catálogo.`);
  };

  const handleDeleteProductPrompt = (product: Product) => {
    setConfirmDialog({
      isOpen: true,
      title: '¿Eliminar producto?',
      message: `¿Estás seguro de que deseas eliminar permanentemente "${product.name}" del catálogo? Esta acción no se puede deshacer.`,
      isDangerous: true,
      onConfirm: () => {
        setProducts((prev) => prev.filter((p) => p.id !== product.id));
        setConfirmDialog(null);
        addToast('Producto eliminado', `"${product.name}" ha sido eliminado del catálogo.`, 'info');
      },
    });
  };

  const handleTogglePublish = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const nextState = !p.isPublished;
          addToast(
            nextState ? 'Producto publicado' : 'Producto oculto',
            `"${p.name}" ahora está ${nextState ? 'visible para clientes' : 'oculto en borrador'}.`
          );
          return { ...p, isPublished: nextState };
        }
        return p;
      })
    );
  };

  const handleToggleBestseller = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const nextState = !p.isBestseller;
          addToast(
            nextState ? 'Marcado como más vendido' : 'Removido de más vendidos',
            `"${p.name}" ${nextState ? 'aparecerá en la sección de favoritos' : 'desmarcado'}.`
          );
          return { ...p, isBestseller: nextState };
        }
        return p;
      })
    );
  };

  const handleSaveCategory = (catData: Category) => {
    setCategories((prev) => {
      const exists = prev.some((c) => c.id === catData.id);
      if (exists) {
        return prev.map((c) => (c.id === catData.id ? catData : c));
      } else {
        return [...prev, catData];
      }
    });
    addToast('Categoría guardada', `Categoría "${catData.name}" actualizada con éxito.`);
  };

  const handleDeleteCategory = (catId: string) => {
    const category = categories.find((c) => c.id === catId);
    if (!category) return;

    const assignedCount = products.filter((p) => p.categoryId === catId).length;
    if (assignedCount > 0) {
      addToast(
        'No se puede eliminar',
        `Esta categoría tiene ${assignedCount} productos asociados. Reasigna los productos primero.`,
        'error'
      );
      return;
    }

    setConfirmDialog({
      isOpen: true,
      title: '¿Eliminar categoría?',
      message: `¿Estás seguro de que deseas eliminar la categoría "${category.name}"?`,
      isDangerous: true,
      onConfirm: () => {
        setCategories((prev) => prev.filter((c) => c.id !== catId));
        setConfirmDialog(null);
        addToast('Categoría eliminada', `La categoría ha sido eliminada.`, 'info');
      },
    });
  };

  const handleToggleHideCategory = (catId: string) => {
    setCategories((prev) =>
      prev.map((c) => {
        if (c.id === catId) {
          const next = !c.isHidden;
          addToast(
            next ? 'Categoría oculta' : 'Categoría visible',
            `"${c.name}" ${next ? 'ha sido ocultada de la navegación' : 'está visible de nuevo'}.`
          );
          return { ...c, isHidden: next };
        }
        return c;
      })
    );
  };

  const handleMoveCategoryOrder = (catId: string, direction: 'up' | 'down') => {
    setCategories((prev) => {
      const index = prev.findIndex((c) => c.id === catId);
      if (index < 0) return prev;
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;

      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
    addToast('Orden actualizado', 'Se reorganizó el orden de categorías.');
  };

  const handleSaveSettings = (newSettings: StoreSettings) => {
    setSettings(newSettings);
    addToast('Configuración guardada', 'Los horarios y datos de contacto han sido actualizados.');
  };

  const handleToggleQuoteStatus = (quoteId: string) => {
    setQuotes((prev) =>
      prev.map((q) => {
        if (q.id === quoteId) {
          const nextStatus = q.status === 'pendiente' ? 'atendido' : 'pendiente';
          return { ...q, status: nextStatus };
        }
        return q;
      })
    );
    addToast('Estado actualizado', 'La solicitud de cotización ha cambiado de estatus.');
  };

  // Category navigation from home or categories view
  const handleSelectCategoryFromView = (catId: string) => {
    setSelectedCatalogCategory(catId);
    setCurrentTab('catalogo-completo');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fff8f6] font-sans text-[#211a18] antialiased">
      {/* Administrator Active Toolbar: ONLY rendered when authorized admin is logged in */}
      {isAdminLoggedIn && currentTab !== 'admin' && (
        <div className="bg-[#211a18] text-white px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2 z-50 sticky top-0 border-b border-[#362f2d]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2e7d32]"></span>
            <span className="font-semibold text-xs">
              Modo Administrador Autorizado (Edición Activa)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCreateProduct()}
              className="px-2.5 py-1 bg-[#94464f] hover:bg-[#772f39] text-white rounded-md text-[11px] font-bold flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">add</span>
              <span>Nuevo Pastel</span>
            </button>
            <button
              onClick={() => setCurrentTab('admin')}
              className="px-2.5 py-1 bg-white/20 hover:bg-white/30 text-white rounded-md text-[11px] font-semibold cursor-pointer"
            >
              Abrir Panel Completo
            </button>
            <button
              onClick={handleAdminLogout}
              className="px-2.5 py-1 bg-[#ba1a1a] hover:bg-[#93000a] text-white rounded-md text-[11px] font-semibold cursor-pointer"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}

      {/* Main Sticky Header */}
      <Header
        currentTab={currentTab}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsSelectionDrawerOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isAdminLoggedIn={isAdminLoggedIn}
        onAdminLogout={handleAdminLogout}
      />

      {/* Main View Router */}
      <main className="flex-1 w-full pt-20">
        {currentTab === 'inicio' && (
          <HomeView
            categories={categories.filter((c) => !c.isHidden)}
            featuredProducts={products.filter((p) => p.isPublished && (p.isFeatured || p.isBestseller))}
            onSelectProduct={setSelectedProductForDetail}
            onQuickAdd={handleQuickAdd}
            onSelectCategory={handleSelectCategoryFromView}
            onOpenCustomQuote={() => setIsQuoteModalOpen(true)}
            onExploreCatalog={() => setCurrentTab('catalogo-completo')}
          />
        )}

        {currentTab === 'catalogo-completo' && (
          <CatalogView
            products={products}
            categories={categories}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCatalogCategory}
            onSelectCategory={setSelectedCatalogCategory}
            onSelectProduct={setSelectedProductForDetail}
            onQuickAdd={handleQuickAdd}
            onOpenCustomQuote={() => setIsQuoteModalOpen(true)}
            isAdminLoggedIn={isAdminLoggedIn}
            onEditProduct={handleEditProduct}
          />
        )}

        {currentTab === 'categorias' && (
          <CategoriesView
            categories={categories.filter((c) => !c.isHidden)}
            products={products}
            onSelectCategory={handleSelectCategoryFromView}
          />
        )}

        {currentTab === 'personalizados' && (
          <CustomCakesView onOpenCustomQuote={() => setIsQuoteModalOpen(true)} />
        )}

        {(currentTab === 'como-ordenar' || currentTab === 'como-hacer-pedidos') && (
          <HowToOrderView
            onOpenCustomQuote={() => setIsQuoteModalOpen(true)}
            onExploreCatalog={() => setCurrentTab('catalogo-completo')}
          />
        )}

        {currentTab === 'admin' && (
          isAdminLoggedIn ? (
            <AdminDashboard
              products={products}
              categories={categories}
              settings={settings}
              quotes={quotes}
              onLogout={handleAdminLogout}
              onViewPublicCatalog={() => setCurrentTab('catalogo-completo')}
              onCreateProduct={handleCreateProduct}
              onEditProduct={handleEditProduct}
              onPreviewProduct={(p) => setProductToPreview(p)}
              onTogglePublish={handleTogglePublish}
              onToggleBestseller={handleToggleBestseller}
              onDeleteProduct={handleDeleteProductPrompt}
              onSaveCategory={handleSaveCategory}
              onDeleteCategory={handleDeleteCategory}
              onToggleHideCategory={handleToggleHideCategory}
              onMoveCategoryOrder={handleMoveCategoryOrder}
              onSaveSettings={handleSaveSettings}
              onToggleQuoteStatus={handleToggleQuoteStatus}
            />
          ) : (
            <AdminLogin
              onLoginSuccess={handleAdminLogin}
              onCancel={() => setCurrentTab('inicio')}
            />
          )
        )}
      </main>

      {/* Main Footer (shown in client views) */}
      {currentTab !== 'admin' && (
        <Footer
          settings={settings}
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
          onNavigate={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        onAddToCart={handleAddToCart}
        onOpenCustomQuote={() => setIsQuoteModalOpen(true)}
      />

      <CustomQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        onSubmitQuote={handleSubmitQuote}
      />

      <SelectionDrawer
        isOpen={isSelectionDrawerOpen}
        onClose={() => setIsSelectionDrawerOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Admin Modals */}
      <ProductFormModal
        isOpen={isProductFormOpen}
        productToEdit={productToEdit}
        categories={categories}
        onClose={() => {
          setIsProductFormOpen(false);
          setProductToEdit(null);
        }}
        onSave={handleSaveProduct}
        onPreview={(p) => setProductToPreview(p)}
      />

      <ProductPreviewModal
        product={productToPreview}
        onClose={() => setProductToPreview(null)}
        onPublishToggle={handleTogglePublish}
      />

      {/* Confirmation Dialog */}
      {confirmDialog && (
        <ConfirmDialog
          isOpen={confirmDialog.isOpen}
          title={confirmDialog.title}
          message={confirmDialog.message}
          isDangerous={confirmDialog.isDangerous}
          onConfirm={confirmDialog.onConfirm}
          onCancel={() => setConfirmDialog(null)}
        />
      )}

      {/* Toast Feedback Notification System */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
