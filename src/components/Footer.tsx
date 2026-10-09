import React from 'react';
import { StoreSettings } from '../types';

interface FooterProps {
  settings: StoreSettings;
  onOpenQuoteModal: () => void;
  onNavigate: (tab: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onOpenQuoteModal, onNavigate }) => {
  return (
    <footer className="w-full bg-[#f9ebe7] shadow-[0_-1px_12px_rgba(74,53,40,0.03)] border-t border-[#ede0dc]">
      <div className="max-w-[1320px] mx-auto px-4 lg:px-8 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Col 1: Identity */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <img
              alt="Shandel Logotipo Repostería"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1WlftEts0iwivCd9a1Pkqx96PrnEW1TH6CjehnF3od1Vk_fFrGTy6S21UoWmCuECaXVifv4_Ux7uofZaj2hRC9Xc4Gas9oBWoMQ846e3zhN-dNs2smQFG_kJDtC4Tkb6txkZ2MmizVhCVFgkWG6EhKS22h4c5oVruNhiCfkHmOts0eiQwRaTw40zEEt-h5SbXDP4WzNewl16NgW69osYoYLWBaa7Zmlgd9G9n6ELQgUEu6Nm1mpWhwZYiU"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold text-[#94464f] leading-none">
                Shandel
              </span>
              <span className="text-[10px] text-[#72594b] tracking-widest uppercase font-semibold">
                Haute Pâtisserie
              </span>
            </div>
          </div>
          <p className="text-xs text-[#544344] leading-relaxed mt-1">
            Atelier de alta repostería artesanal franco-mexicana. Creaciones sensoriales
            confeccionadas con ingredientes nobles, amor al detalle y celebración del momento dulce.
          </p>
          <div className="flex items-center gap-1.5 text-[#775a00] pt-2">
            <span className="material-symbols-outlined text-[19px]">verified</span>
            <span className="text-[11px] tracking-wider uppercase text-[#775a00] font-bold">
              Sello Artesanal de Calidad
            </span>
          </div>
        </div>

        {/* Col 2: Horarios */}
        <div className="flex flex-col gap-3">
          <h4 className="font-serif text-base font-semibold text-[#72594b]">
            Horarios de Atención
          </h4>
          <div className="flex flex-col gap-2 text-xs text-[#544344]">
            <div>
              <span className="font-semibold text-[#211a18] block">Martes a Sábado:</span>
              <p>{settings.hoursTuesdaySaturday}</p>
            </div>
            <div>
              <span className="font-semibold text-[#211a18] block">Domingos:</span>
              <p>{settings.hoursSunday}</p>
            </div>
            <div>
              <span className="font-semibold text-[#94464f] block">Lunes:</span>
              <p>{settings.hoursMonday}</p>
            </div>
          </div>
        </div>

        {/* Col 3: Canal de Pedidos */}
        <div className="flex flex-col gap-3">
          <h4 className="font-serif text-base font-semibold text-[#72594b]">
            Canal de Pedidos
          </h4>
          <p className="text-xs text-[#544344] leading-relaxed">
            Atención personalizada para cotizaciones, detalles de sabor y seguimiento de entregas:
          </p>
          <div className="flex flex-col gap-2 pt-1 text-xs">
            <a
              className="inline-flex items-center gap-1.5 text-[#94464f] font-semibold hover:underline transition-colors"
              href={`https://wa.me/525548192030?text=${encodeURIComponent('Hola Pastelería Shandel, me gustaría consultar la disponibilidad de un pastel de su catálogo digital.')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              WhatsApp: {settings.whatsappNumber}
            </a>
            <div className="inline-flex items-center gap-1.5 text-[#72594b]">
              <span className="material-symbols-outlined text-[18px]">call</span>
              Taller Boutique: {settings.boutiquePhone}
            </div>
            <div className="inline-flex items-center gap-1.5 text-[#544344]">
              <span className="material-symbols-outlined text-[18px]">mail</span>
              {settings.email}
            </div>
          </div>
        </div>

        {/* Col 4: Políticas de Anticipación */}
        <div className="flex flex-col gap-3">
          <h4 className="font-serif text-base font-semibold text-[#72594b]">
            Políticas de Anticipación
          </h4>
          <div className="p-3.5 rounded-2xl bg-[#ffffff] border border-[#ede0dc] flex flex-col gap-2 text-xs text-[#544344]">
            <p>
              <strong className="text-[#211a18]">{settings.policyStandard.split(':')[0]}:</strong>{' '}
              {settings.policyStandard.split(':')[1] || 'Mínimo 48 horas de anticipación.'}
            </p>
            <p>
              <strong className="text-[#211a18]">{settings.policyCustom.split(':')[0]}:</strong>{' '}
              {settings.policyCustom.split(':')[1] || 'Recomendado de 15 a 30 días previos.'}
            </p>
            <span className="text-[10px] text-[#775a00] uppercase tracking-wider font-bold pt-1 border-t border-[#f9ebe7]">
              Cupos limitados por fecha
            </span>
          </div>
          <button
            onClick={onOpenQuoteModal}
            className="mt-1 w-full py-2 px-3 rounded-full bg-[#fedcc9] text-[#785f50] hover:bg-[#ffdadb] hover:text-[#94464f] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">draw</span>
            <span>Solicitar cotización especial</span>
          </button>
        </div>
      </div>

      {/* Sub-footer Bar */}
      <div className="bg-[#ede0dc]/50 py-4 px-4 lg:px-8 border-t border-[#ede0dc]">
        <div className="max-w-[1320px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#544344]">
          <div
            className="cursor-default select-none"
            onDoubleClick={() => onNavigate('admin')}
            title=""
          >
            © {new Date().getFullYear()} Pastelería Shandel Atelier. Tradición, arte y repostería fina.
          </div>
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => onNavigate('como-hacer-pedidos')}
              className="hover:text-[#94464f] transition-colors cursor-pointer"
            >
              Cómo hacer pedidos
            </button>
            <span className="text-[#867273]">Precios demostrativos es-MX</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
