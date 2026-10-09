export type PortionType = 'individual' | 'mediano' | 'familiar' | 'eventos';
export type AnticipationType = 'today' | '24h' | '48h' | '72h';

export interface ProductSizeOption {
  name: string;
  servings: string;
  priceModifier: number; // additional cost in MXN
}

export interface Product {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  tag?: string; // e.g. "Más vendido", "Recomendado", "Obra Insignia"
  description: string;
  detailedDescription: string;
  price: number;
  image: string;
  additionalImages?: string[];
  servingsText: string; // e.g. "10-12 porciones"
  portionType: PortionType;
  anticipation: AnticipationType;
  anticipationLabel: string; // e.g. "Disponible para hoy", "Anticipación 24 hrs"
  flavors: string[];
  sizes: ProductSizeOption[];
  isFeatured?: boolean;
  isBestseller?: boolean;
  isPublished: boolean;
  ingredients?: string[];
  allergens?: string[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  count: number;
  order: number;
  isHidden?: boolean;
}

export interface CartItem {
  id: string; // unique item cart id
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedFlavor: string;
  dedication?: string;
  unitPrice: number;
}

export interface QuoteRequest {
  id: string;
  clientName: string;
  phone: string;
  eventDate: string;
  guestsRange: string;
  themeDescription: string;
  createdAt: string;
  status: 'pendiente' | 'atendido';
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  whatsappNumber: string;
  boutiquePhone: string;
  email: string;
  hoursTuesdaySaturday: string;
  hoursSunday: string;
  hoursMonday: string;
  policyStandard: string;
  policyCustom: string;
  announcementNotice: string;
}

export type ViewTab = 'inicio' | 'catalogo-completo' | 'categorias' | 'personalizados' | 'como-hacer-pedidos' | 'como-ordenar' | 'admin';
