import React from 'react';
import { Product, Category } from '../types';

interface HomeViewProps {
  categories: Category[];
  featuredProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onSelectCategory: (categoryId: string) => void;
  onOpenCustomQuote: () => void;
  onExploreCatalog: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  categories,
  featuredProducts,
  onSelectProduct,
  onQuickAdd,
  onSelectCategory,
  onOpenCustomQuote,
  onExploreCatalog,
}) => {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <section className="relative w-full overflow-hidden bg-[#fff1ed] pt-8 pb-16 lg:py-20 border-b border-[#ede0dc]/60">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#ffdadb]/30 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-20 w-80 h-80 rounded-full bg-[#ffdf98]/20 blur-3xl pointer-events-none"></div>

        <div className="max-w-[1320px] mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Hero Left Column */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#f9ebe7] text-[#72594b] text-[11px] font-semibold uppercase tracking-widest shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#94464f]"></span>
                Atelier de Repostería Franco-Mexicana
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#211a18] leading-[1.12]">
                Momentos especiales,{' '}
                <span className="text-[#94464f] italic block sm:inline">
                  hechos más dulces
                </span>
              </h1>

              <p className="text-sm sm:text-base text-[#544344] max-w-xl leading-relaxed">
                Pastelería artesanal elaborada con ingredientes nobles, técnicas tradicionales y dedicación en cada detalle. Explora nuestras creaciones para cumpleaños, celebraciones y antojos cotidianos.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onExploreCatalog}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#94464f] text-white text-xs font-bold shadow-md hover:bg-[#772f39] transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                >
                  <span>Explorar catálogo</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
                <button
                  type="button"
                  onClick={onOpenCustomQuote}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#72594b] hover:text-[#211a18] text-xs font-bold shadow-xs hover:bg-[#f3e5e2] transition-all duration-200 border border-[#ede0dc] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[#94464f] text-[18px]">
                    auto_awesome
                  </span>
                  <span>Pasteles personalizados</span>
                </button>
              </div>

              {/* Value Badges */}
              <div className="pt-5 flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white shadow-xs border border-[#ede0dc] text-[#544344] text-xs font-medium">
                  <span className="material-symbols-outlined text-[#94464f] text-[18px]">
                    workspace_premium
                  </span>
                  <span>Elaboración artesanal</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white shadow-xs border border-[#ede0dc] text-[#544344] text-xs font-medium">
                  <span className="material-symbols-outlined text-[#775a00] text-[18px]">
                    eco
                  </span>
                  <span>Ingredientes naturales</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white shadow-xs border border-[#ede0dc] text-[#544344] text-xs font-medium">
                  <span className="material-symbols-outlined text-[#72594b] text-[18px]">
                    schedule
                  </span>
                  <span>Pedidos con 48h de anticipación</span>
                </div>
              </div>
            </div>

            {/* Hero Right Column: Visual Showcase */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              <div className="relative mx-auto w-full max-w-[440px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-[#f9ebe7] border-4 border-white">
                <img
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  alt="Gâteau Velours Royal con frutos rojos frescos y mascarpone"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFNkNOPgbJ6uXR1JwlWBgO3pQQoWYOcb6JpbaUTCOC9UE_jz9SiauQV9mXqF1iPHGlO6dxuxjoKKrv_bXT6XTiqMqFkianpxgwFueBqb91plt7aMeaLumkp6rCZpLpb1cHnuLhxyYitA83S_G77irtCvfEus-B5JT833xJQ-I_w51wzVBRBoZMdnf2abw0I_2vruZi7fHzsZ0qjHEag5Rnl6bkNIAQww4hI3tjbx8leMYp-jb82YDv"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#211a18]/70 via-transparent to-transparent pointer-events-none"></div>

                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-between border border-white/80">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-[#94464f] font-bold">
                      Obra Insignia
                    </span>
                    <span className="font-serif text-lg font-bold text-[#211a18] leading-snug">
                      Gâteau Velours Royal
                    </span>
                    <span className="text-xs text-[#72594b]">
                      Frutos rojos frescos & mascarpone
                    </span>
                  </div>
                  <div className="w-11 h-11 rounded-full bg-[#ffdadb] flex items-center justify-center text-[#94464f] shadow-xs flex-shrink-0">
                    <span className="material-symbols-outlined text-[22px]">cake</span>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-3 -left-3 hidden sm:flex items-center gap-3 p-3 rounded-2xl bg-white shadow-xl border border-[#ede0dc]">
                <div className="w-9 h-9 rounded-xl bg-[#ffdf98] flex items-center justify-center text-[#775a00]">
                  <span className="material-symbols-outlined text-[19px]">star</span>
                </div>
                <div className="flex flex-col pr-1">
                  <span className="font-bold text-xs text-[#211a18] leading-tight">
                    100% Fresco
                  </span>
                  <span className="text-[10px] text-[#72594b]">Horneado por orden</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Categorías Destacadas */}
      <section className="w-full py-16 bg-[#fff8f6]">
        <div className="max-w-[1320px] mx-auto px-4 lg:px-8 flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#94464f] font-bold">
                Nuestras Especialidades
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#211a18] mt-1">
                Explora por Categoría
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#544344] max-w-md leading-relaxed">
              Cada receta se concibe como una pieza única con manteca pura, vainilla mexicana de Papantla y chocolates de origen seleccionado.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-[#ede0dc] text-left cursor-pointer"
              >
                <div className="relative w-full aspect-square overflow-hidden bg-[#f9ebe7]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#211a18]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-3.5 flex flex-col items-center text-center">
                  <span className="font-semibold text-xs text-[#211a18] group-hover:text-[#94464f] transition-colors line-clamp-1">
                    {cat.name}
                  </span>
                  <span className="text-[10px] text-[#72594b] mt-0.5">
                    {cat.subtitle}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Los Más Solicitados */}
      <section className="w-full py-16 bg-[#fff1ed] border-y border-[#ede0dc]/60">
        <div className="max-w-[1320px] mx-auto px-4 lg:px-8 flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[#94464f] text-xs font-bold mb-1">
                <span className="material-symbols-outlined text-[17px]">verified</span>
                Favoritos de la Temporada
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#211a18]">
                Los Más Solicitados
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#544344] max-w-sm leading-relaxed">
              Recetas icónicas horneadas día con día, apreciadas por su balance sutil entre dulzor y textura.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-[#ede0dc]"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#f9ebe7]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.tag && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#94464f] text-white text-[10px] font-bold shadow-md">
                      {product.tag}
                    </span>
                  )}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-xs text-[#72594b] text-[10px] font-medium flex items-center gap-1 shadow-xs">
                    <span className="material-symbols-outlined text-[13px]">groups</span>
                    {product.servingsText}
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#72594b] font-semibold">
                      {product.category}
                    </span>
                    <h3 className="font-serif text-base font-bold text-[#211a18] mt-1 group-hover:text-[#94464f] transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#544344] mt-2 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#ede0dc]/60">
                    <div className="flex items-baseline justify-between mb-3">
                      <span className="font-serif text-lg font-bold text-[#94464f]">
                        ${product.price.toFixed(2)}{' '}
                        <span className="text-xs font-sans font-normal text-[#72594b]">
                          MXN
                        </span>
                      </span>
                      <span className="text-[10px] text-[#867273]">
                        {product.anticipationLabel}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectProduct(product)}
                        className="w-full py-2.5 px-2 rounded-full bg-[#f9ebe7] text-[#211a18] text-xs font-semibold hover:bg-[#ede0dc] transition-colors text-center cursor-pointer"
                      >
                        Ver detalles
                      </button>
                      <button
                        type="button"
                        onClick={() => onQuickAdd(product)}
                        className="w-full py-2.5 px-2 rounded-full bg-[#ffdadb] text-[#772f39] hover:bg-[#94464f] hover:text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[15px]">
                          add_shopping_cart
                        </span>
                        <span>Agregar</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 text-[#867273] text-[11px] pt-2">
            <span className="material-symbols-outlined text-[15px]">info</span>
            <span>
              *Precios e información en formato de demostración (es-MX). Sujetos a confirmación de fecha y disponibilidad.
            </span>
          </div>
        </div>
      </section>

      {/* 4. ¿Cómo Ordenar en Shandel? */}
      <section className="w-full py-20 bg-[#fff8f6]">
        <div className="max-w-[1320px] mx-auto px-4 lg:px-8 flex flex-col gap-12">
          <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
            <span className="text-[11px] uppercase tracking-widest text-[#94464f] font-bold">
              Proceso Fácil & Transparente
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#211a18] mt-2">
              ¿Cómo ordenar en Shandel?
            </h2>
            <p className="text-sm text-[#544344] mt-3 leading-relaxed">
              Combinamos la calidez de la pastelería de barrio con la comodidad digital. Ordena en 3 sencillos pasos:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-start bg-[#fff1ed] p-7 rounded-3xl shadow-xs border border-[#ede0dc] hover:bg-[#f9ebe7] transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#ffdadb] text-[#94464f] flex items-center justify-center font-serif text-xl font-bold mb-5 shadow-xs">
                1
              </div>
              <h3 className="font-serif text-lg font-bold text-[#211a18] mb-2">
                Explora y elige tus favoritos
              </h3>
              <p className="text-xs text-[#544344] leading-relaxed">
                Revisa nuestro catálogo en línea, consulta los perfiles de sabor, porciones sugeridas y el tiempo de anticipación indicado para cada pieza.
              </p>
              <div className="mt-5 flex items-center gap-1.5 text-[#94464f] text-xs font-semibold">
                <span className="material-symbols-outlined text-[17px]">
                  fact_check
                </span>
                <span>Fichas técnicas detalladas</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-start bg-[#fff1ed] p-7 rounded-3xl shadow-xs border border-[#ede0dc] hover:bg-[#f9ebe7] transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#fedcc9] text-[#72594b] flex items-center justify-center font-serif text-xl font-bold mb-5 shadow-xs">
                2
              </div>
              <h3 className="font-serif text-lg font-bold text-[#211a18] mb-2">
                Prepara tu solicitud
              </h3>
              <p className="text-xs text-[#544344] leading-relaxed">
                Añade las opciones deseadas a "Mi Selección" sin necesidad de crear contraseñas ni registrar tarjetas. Ajusta cantidades y dedicatorias deseadas.
              </p>
              <div className="mt-5 flex items-center gap-1.5 text-[#72594b] text-xs font-semibold">
                <span className="material-symbols-outlined text-[17px]">
                  shopping_bag
                </span>
                <span>Sin registros forzados</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-start bg-[#fff1ed] p-7 rounded-3xl shadow-xs border border-[#ede0dc] hover:bg-[#f9ebe7] transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#ffdf98] text-[#775a00] flex items-center justify-center font-serif text-xl font-bold mb-5 shadow-xs">
                3
              </div>
              <h3 className="font-serif text-lg font-bold text-[#211a18] mb-2">
                Envía tu consulta directa
              </h3>
              <p className="text-xs text-[#544344] leading-relaxed">
                Tu selección se envía directamente a nuestro equipo vía WhatsApp o llamada telefónica. Confirmamos disponibilidad de fecha y resolvemos dudas al instante.
              </p>
              <div className="mt-5 flex items-center gap-1.5 text-[#775a00] text-xs font-semibold">
                <span className="material-symbols-outlined text-[17px]">chat</span>
                <span>Respuesta en menos de 2 horas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Banner de Personalización & Atención Directa */}
      <section className="w-full py-16 bg-[#f3e5e2] relative overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-4 lg:px-8">
          <div className="relative rounded-3xl bg-white p-6 sm:p-10 lg:p-14 shadow-xl border border-[#ede0dc] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 flex flex-col gap-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f9ebe7] text-[#94464f] text-xs font-semibold self-start">
                  <span className="material-symbols-outlined text-[16px]">palette</span>
                  Servicio de Alta Pastelería a Medida
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211a18]">
                  ¿Buscas un diseño único para tu evento?
                </h2>
                <p className="text-xs sm:text-sm text-[#544344] max-w-2xl leading-relaxed">
                  Diseñamos pasteles temáticos, mesas de postres para bodas, quinceañeras y aniversarios corporativos. Trabajamos mano a mano con tus colores, flores y sabores favoritos para materializar tu visión.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onOpenCustomQuote}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#94464f] text-white text-xs font-bold shadow-md hover:bg-[#772f39] transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[19px]">draw</span>
                    <span>Solicitar cotización personalizada</span>
                  </button>
                  <a
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#f9ebe7] text-[#72594b] hover:text-[#211a18] text-xs font-bold hover:bg-[#ede0dc] transition-colors"
                    href="https://wa.me/525548192030"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="material-symbols-outlined text-[#94464f] text-[19px]">
                      chat
                    </span>
                    <span>Chatear por WhatsApp</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-4 bg-[#fff1ed] p-6 rounded-2xl border border-[#ede0dc]">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#94464f] text-[22px] mt-0.5">
                    info
                  </span>
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#211a18]">
                      Atención Directa & Cercana
                    </h4>
                    <p className="text-xs text-[#544344] mt-1 leading-relaxed">
                      Catálogo de consulta interactivo. Las solicitudes de pedido son confirmadas directamente por nuestro equipo maestro pastelero para garantizar fechas y personalizaciones exactas.
                    </p>
                  </div>
                </div>
                <div className="pt-2 bg-white p-3 rounded-xl border border-[#ede0dc] flex items-center justify-between text-xs">
                  <span className="text-[#72594b]">Anticipación sugerida para bodas:</span>
                  <span className="font-bold text-[#94464f]">15 a 30 días</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
