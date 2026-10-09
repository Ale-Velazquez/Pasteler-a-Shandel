import React from 'react';

interface HowToOrderViewProps {
  onOpenCustomQuote: () => void;
  onExploreCatalog: () => void;
}

export const HowToOrderView: React.FC<HowToOrderViewProps> = ({
  onOpenCustomQuote,
  onExploreCatalog,
}) => {
  return (
    <div className="w-full max-w-[1320px] mx-auto px-4 lg:px-8 pt-8 pb-20 flex flex-col gap-10">
      <div className="max-w-2xl flex flex-col gap-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f3e5e2] text-[#72594b] text-[11px] font-bold uppercase tracking-wider self-start">
          <span className="material-symbols-outlined text-[16px] text-[#94464f]">
            help
          </span>
          Guía de Pedidos & Políticas
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#211a18]">
          ¿Cómo hacer pedidos en Pastelería Shandel?
        </h1>
        <p className="text-xs sm:text-sm text-[#544344] leading-relaxed">
          Diseñamos este catálogo interactivo para brindarte transparencia en tamaños, porciones y precios de referencia sin intermediarios molestos ni registro de tarjetas en línea.
        </p>
      </div>

      {/* 3 Step Card Process */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-[#ede0dc] shadow-xs flex flex-col gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#ffdadb] text-[#94464f] flex items-center justify-center font-serif text-lg font-bold">
            1
          </div>
          <h3 className="font-serif text-lg font-bold text-[#211a18]">
            Selecciona en el Catálogo
          </h3>
          <p className="text-xs text-[#544344] leading-relaxed">
            Revisa fotografías, número de porciones y sabores disponibles. Puedes pulsar "Añadir a Mi Selección" en cualquier pastel.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#ede0dc] shadow-xs flex flex-col gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#fedcc9] text-[#72594b] flex items-center justify-center font-serif text-lg font-bold">
            2
          </div>
          <h3 className="font-serif text-lg font-bold text-[#211a18]">
            Personaliza Placa & Porciones
          </h3>
          <p className="text-xs text-[#544344] leading-relaxed">
            Indica si requieres una dedicatoria en chocolate sin costo adicional y verifica el total estimado de referencia.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#ede0dc] shadow-xs flex flex-col gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#ffdf98] text-[#775a00] flex items-center justify-center font-serif text-lg font-bold">
            3
          </div>
          <h3 className="font-serif text-lg font-bold text-[#211a18]">
            Confirmación por WhatsApp
          </h3>
          <p className="text-xs text-[#544344] leading-relaxed">
            Envías tu lista de selección a nuestro taller. Coordinamos la fecha exacta, horario de recolección en boutique o entrega a domicilio.
          </p>
        </div>
      </div>

      {/* Policies Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-[#ede0dc] shadow-xs flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[#94464f]">
            <span className="material-symbols-outlined text-[20px]">schedule</span>
            <h4 className="font-serif text-lg font-bold text-[#211a18]">
              Tiempos de Anticipación
            </h4>
          </div>
          <div className="flex flex-col gap-2.5 text-xs text-[#544344] leading-relaxed">
            <p>
              • <strong>Pasteles de vitrina y disponibles hoy:</strong> Sujetos a existencias del día en boutique; recomendamos apartar por WhatsApp por la mañana.
            </p>
            <p>
              • <strong>Pasteles de línea (Cumpleaños y Cheesecakes):</strong> Mínimo 48 horas de anticipación para garantizar horneado fresco del día.
            </p>
            <p>
              • <strong>Pasteles de boda y personalizados de más de 2 pisos:</strong> Recomendado de 15 a 30 días antes del evento.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#ede0dc] shadow-xs flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[#72594b]">
            <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            <h4 className="font-serif text-lg font-bold text-[#211a18]">
              Entrega y Recolección
            </h4>
          </div>
          <div className="flex flex-col gap-2.5 text-xs text-[#544344] leading-relaxed">
            <p>
              • <strong>Recolección en Taller Boutique:</strong> Sin costo adicional, en horario habitual (Martes a Sábado 9:00 a 19:30 hrs, Domingos 10:00 a 16:00 hrs).
            </p>
            <p>
              • <strong>Envío con Cuidado Especial:</strong> Contamos con chofer especializado con aire acondicionado para traslado de piezas delicadas en la zona metropolitana.
            </p>
            <p>
              • <strong>Lunes cerrado:</strong> Día reservado para producción de bases y horneado maestro.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-3xl bg-[#fff1ed] border border-[#ede0dc] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <h3 className="font-serif text-xl font-bold text-[#211a18]">
            ¿Listo para descubrir nuestras creaciones?
          </h3>
          <p className="text-xs text-[#544344] mt-1">
            Explora el catálogo o solicita una cotización con un chef pastelero.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={onExploreCatalog}
            className="py-3 px-6 rounded-full bg-[#94464f] hover:bg-[#772f39] text-white text-xs font-bold transition-all shadow-sm"
          >
            Ver catálogo completo
          </button>
          <button
            onClick={onOpenCustomQuote}
            className="py-3 px-6 rounded-full bg-white hover:bg-[#f9ebe7] text-[#72594b] text-xs font-bold transition-all border border-[#ede0dc]"
          >
            Cotizar diseño personalizado
          </button>
        </div>
      </div>
    </div>
  );
};
