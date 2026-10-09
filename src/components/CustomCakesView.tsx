import React from 'react';

interface CustomCakesViewProps {
  onOpenCustomQuote: () => void;
}

export const CustomCakesView: React.FC<CustomCakesViewProps> = ({ onOpenCustomQuote }) => {
  return (
    <div className="w-full max-w-[1320px] mx-auto px-4 lg:px-8 pt-8 pb-20 flex flex-col gap-12">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-[#fff1ed] p-8 lg:p-14 border border-[#ede0dc] overflow-hidden">
        <div className="max-w-2xl flex flex-col gap-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f9ebe7] text-[#94464f] text-[11px] font-bold uppercase tracking-wider self-start">
            <span className="material-symbols-outlined text-[16px]">draw</span>
            Diseños de Autor & Nupciales
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#211a18] leading-tight">
            Personalizados y Bodas
          </h1>
          <p className="text-xs sm:text-sm text-[#544344] leading-relaxed">
            En Pastelería Shandel concebimos cada pastel para eventos como una pieza escultórica comestible. Trabajamos con texturas de acuarela, láminas de oro de 24 quilates, flores naturales orgánicas y macarons a juego.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onOpenCustomQuote}
              className="py-3.5 px-7 rounded-full bg-[#94464f] hover:bg-[#772f39] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">edit_note</span>
              <span>Solicitar cotización personalizada</span>
            </button>
            <a
              href="https://wa.me/525548192030"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-6 rounded-full bg-white hover:bg-[#f9ebe7] text-[#72594b] text-xs font-bold transition-colors border border-[#ede0dc] flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[#94464f] text-[18px]">chat</span>
              <span>Asesoría por WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#ffdadb]/40 blur-3xl pointer-events-none"></div>
      </div>

      {/* Process 4 Steps */}
      <div className="flex flex-col gap-6">
        <h2 className="font-serif text-2xl font-bold text-[#211a18] text-center">
          El Proceso de Creación a Medida
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-2xl bg-white border border-[#ede0dc] shadow-xs flex flex-col gap-2">
            <span className="w-8 h-8 rounded-full bg-[#ffdadb] text-[#94464f] flex items-center justify-center font-serif text-sm font-bold">
              1
            </span>
            <h4 className="font-serif text-base font-bold text-[#211a18]">
              Inspiración & Paleta
            </h4>
            <p className="text-xs text-[#544344] leading-relaxed">
              Nos compartes tus referencias, temática de la fiesta, vestidos o flores del evento.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#ede0dc] shadow-xs flex flex-col gap-2">
            <span className="w-8 h-8 rounded-full bg-[#fedcc9] text-[#72594b] flex items-center justify-center font-serif text-sm font-bold">
              2
            </span>
            <h4 className="font-serif text-base font-bold text-[#211a18]">
              Elección de Rellenos
            </h4>
            <p className="text-xs text-[#544344] leading-relaxed">
              Para pasteles de 2 o más pisos puedes alternar combinaciones de sabor por nivel.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#ede0dc] shadow-xs flex flex-col gap-2">
            <span className="w-8 h-8 rounded-full bg-[#ffdf98] text-[#775a00] flex items-center justify-center font-serif text-sm font-bold">
              3
            </span>
            <h4 className="font-serif text-base font-bold text-[#211a18]">
              Reserva de Fecha
            </h4>
            <p className="text-xs text-[#544344] leading-relaxed">
              Confirmamos cupo en agenda con anticipación de 15 a 30 días para eventos mayores.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#ede0dc] shadow-xs flex flex-col gap-2">
            <span className="w-8 h-8 rounded-full bg-[#ede0dc] text-[#544344] flex items-center justify-center font-serif text-sm font-bold">
              4
            </span>
            <h4 className="font-serif text-base font-bold text-[#211a18]">
              Elaboración & Montaje
            </h4>
            <p className="text-xs text-[#544344] leading-relaxed">
              Horneado fresco horas antes del evento y entrega con cuidado térmico garantizado.
            </p>
          </div>
        </div>
      </div>

      {/* Flavor Combinations Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ede0dc] shadow-xs flex flex-col gap-4">
        <h3 className="font-serif text-xl font-bold text-[#211a18]">
          Combinaciones Emblemáticas para Eventos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-[#fff8f6] border border-[#ede0dc]">
            <h5 className="font-semibold text-xs text-[#94464f] uppercase tracking-wider">
              Nupcial Clásico
            </h5>
            <p className="text-xs text-[#211a18] font-bold mt-1">
              Vainilla de Papantla & Frambuesa Silvestre
            </p>
            <p className="text-[11px] text-[#544344] mt-1">
              Bizcocho aireado con compota ácida de frambuesa fresca y cobertura de buttercream suizo.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#fff8f6] border border-[#ede0dc]">
            <h5 className="font-semibold text-xs text-[#94464f] uppercase tracking-wider">
              Gourmet Intenso
            </h5>
            <p className="text-xs text-[#211a18] font-bold mt-1">
              Chocolate Criollo 70% & Praliné de Avellanas
            </p>
            <p className="text-[11px] text-[#544344] mt-1">
              Ganache untuoso con tropezones crocantes de avellana caramelizada y licor suave.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#fff8f6] border border-[#ede0dc]">
            <h5 className="font-semibold text-xs text-[#94464f] uppercase tracking-wider">
              Contemporáneo
            </h5>
            <p className="text-xs text-[#211a18] font-bold mt-1">
              Zanahoria Especiada & Mascarpone al Limón
            </p>
            <p className="text-[11px] text-[#544344] mt-1">
              Nueces tostadas, canela de Ceilán y un balance sutil con toque cítrico en el betún.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
