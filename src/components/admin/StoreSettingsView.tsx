import React, { useState } from 'react';
import { StoreSettings } from '../../types';

interface StoreSettingsViewProps {
  settings: StoreSettings;
  onSaveSettings: (newSettings: StoreSettings) => void;
}

export const StoreSettingsView: React.FC<StoreSettingsViewProps> = ({
  settings,
  onSaveSettings,
}) => {
  const [formData, setFormData] = useState<StoreSettings>({ ...settings });
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h3 className="font-serif text-xl font-bold text-[#211a18]">
          Configuración General de la Tienda
        </h3>
        <p className="text-xs text-[#544344]">
          Personaliza los canales de atención al cliente, horarios de la pastelería y políticas visibles en el catálogo.
        </p>
      </div>

      {isSaved && (
        <div className="p-3.5 rounded-2xl bg-[#e8f5e9] border border-[#c8e6c9] text-xs text-[#2e7d32] font-semibold flex items-center gap-2 animate-in fade-in">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>Configuración guardada exitosamente y actualizada en el catálogo público.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-xs bg-white p-6 rounded-3xl border border-[#ede0dc] shadow-xs">
        {/* Identidad */}
        <div className="flex flex-col gap-3">
          <span className="font-bold text-[#94464f] uppercase tracking-wider text-[10px]">
            Identidad & Lema
          </span>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-[#211a18]">Nombre de la pastelería</label>
            <input
              type="text"
              value={formData.storeName}
              onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
              className="h-10 px-3 rounded-xl bg-[#fff1ed] border border-[#ede0dc] text-[#211a18]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-[#211a18]">Mensaje comercial / Lema</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="h-10 px-3 rounded-xl bg-[#fff1ed] border border-[#ede0dc] text-[#211a18]"
            />
          </div>
        </div>

        {/* Canales de Contacto */}
        <div className="flex flex-col gap-3 pt-3 border-t border-[#ede0dc]">
          <span className="font-bold text-[#94464f] uppercase tracking-wider text-[10px]">
            Canales de Atención & Pedidos
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#211a18]">WhatsApp de Pedidos</label>
              <input
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className="h-10 px-3 rounded-xl bg-[#fff1ed] border border-[#ede0dc] text-[#211a18]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#211a18]">Teléfono Taller Boutique</label>
              <input
                type="text"
                value={formData.boutiquePhone}
                onChange={(e) => setFormData({ ...formData, boutiquePhone: e.target.value })}
                className="h-10 px-3 rounded-xl bg-[#fff1ed] border border-[#ede0dc] text-[#211a18]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-[#211a18]">Correo electrónico</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="h-10 px-3 rounded-xl bg-[#fff1ed] border border-[#ede0dc] text-[#211a18]"
            />
          </div>
        </div>

        {/* Horarios */}
        <div className="flex flex-col gap-3 pt-3 border-t border-[#ede0dc]">
          <span className="font-bold text-[#94464f] uppercase tracking-wider text-[10px]">
            Horarios de Boutique
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#211a18]">Martes a Sábado</label>
              <input
                type="text"
                value={formData.hoursTuesdaySaturday}
                onChange={(e) => setFormData({ ...formData, hoursTuesdaySaturday: e.target.value })}
                className="h-10 px-3 rounded-xl bg-[#fff1ed] border border-[#ede0dc] text-[#211a18]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#211a18]">Domingos</label>
              <input
                type="text"
                value={formData.hoursSunday}
                onChange={(e) => setFormData({ ...formData, hoursSunday: e.target.value })}
                className="h-10 px-3 rounded-xl bg-[#fff1ed] border border-[#ede0dc] text-[#211a18]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#211a18]">Lunes</label>
              <input
                type="text"
                value={formData.hoursMonday}
                onChange={(e) => setFormData({ ...formData, hoursMonday: e.target.value })}
                className="h-10 px-3 rounded-xl bg-[#fff1ed] border border-[#ede0dc] text-[#211a18]"
              />
            </div>
          </div>
        </div>

        {/* Políticas de Anticipación */}
        <div className="flex flex-col gap-3 pt-3 border-t border-[#ede0dc]">
          <span className="font-bold text-[#94464f] uppercase tracking-wider text-[10px]">
            Políticas de Anticipación
          </span>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-[#211a18]">Pasteles de línea estándar</label>
            <input
              type="text"
              value={formData.policyStandard}
              onChange={(e) => setFormData({ ...formData, policyStandard: e.target.value })}
              className="h-10 px-3 rounded-xl bg-[#fff1ed] border border-[#ede0dc] text-[#211a18]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-[#211a18]">Eventos y bodas a medida</label>
            <input
              type="text"
              value={formData.policyCustom}
              onChange={(e) => setFormData({ ...formData, policyCustom: e.target.value })}
              className="h-10 px-3 rounded-xl bg-[#fff1ed] border border-[#ede0dc] text-[#211a18]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="py-3 px-6 rounded-full bg-[#94464f] hover:bg-[#772f39] text-white font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
        >
          <span className="material-symbols-outlined text-[18px]">save</span>
          <span>Guardar Configuración</span>
        </button>
      </form>
    </div>
  );
};
