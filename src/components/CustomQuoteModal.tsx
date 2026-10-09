import React, { useState } from 'react';
import { QuoteRequest } from '../types';

interface CustomQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitQuote: (quote: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>) => void;
}

export const CustomQuoteModal: React.FC<CustomQuoteModalProps> = ({
  isOpen,
  onClose,
  onSubmitQuote,
}) => {
  if (!isOpen) return null;

  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [guestsRange, setGuestsRange] = useState('15 a 25 personas');
  const [themeDescription, setThemeDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !phone.trim() || !eventDate) return;

    onSubmitQuote({
      clientName: clientName.trim(),
      phone: phone.trim(),
      eventDate,
      guestsRange,
      themeDescription: themeDescription.trim(),
    });

    setIsSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = `Hola Pastelería Shandel! Quisiera una cotización de pastel personalizado:\n- Nombre: ${clientName}\n- Teléfono: ${phone}\n- Fecha de evento: ${eventDate}\n- Invitados aproximados: ${guestsRange}\n- Idea / Temática: ${themeDescription || 'A definir con el chef'}\n¿Tienen disponibilidad en agenda?`;
    window.open(`https://wa.me/525548192030?text=${encodeURIComponent(text)}`, '_blank');
    handleResetAndClose();
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setClientName('');
    setPhone('');
    setEventDate('');
    setGuestsRange('15 a 25 personas');
    setThemeDescription('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#211a18]/60 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={handleResetAndClose}
    >
      <div
        className="bg-[#ffffff] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8 border border-[#ede0dc] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#f9ebe7] hover:bg-[#ede0dc] flex items-center justify-center text-[#211a18] transition-colors"
          aria-label="Cerrar modal de cotización"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {!isSubmitted ? (
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#94464f]">
              Pastelería de Autor & Eventos
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#211a18] mt-1">
              Solicitud de Cotización Personalizada
            </h3>
            <p className="text-xs text-[#544344] mt-1.5 leading-relaxed">
              Comparte los detalles de tu celebración y un chef repostero se comunicará contigo vía WhatsApp o llamada para asesorarte.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#211a18]">
                    Tu nombre completo *
                  </label>
                  <input
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    required
                    type="text"
                    placeholder="Ej. Mariana González"
                    className="h-11 px-3.5 rounded-xl bg-[#fff1ed] text-[#211a18] text-xs focus:outline-none focus:ring-2 focus:ring-[#94464f] border border-[#ede0dc]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#211a18]">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    type="tel"
                    placeholder="55 1234 5678"
                    className="h-11 px-3.5 rounded-xl bg-[#fff1ed] text-[#211a18] text-xs focus:outline-none focus:ring-2 focus:ring-[#94464f] border border-[#ede0dc]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#211a18]">
                    Fecha estimada del evento *
                  </label>
                  <input
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                    type="date"
                    className="h-11 px-3.5 rounded-xl bg-[#fff1ed] text-[#211a18] text-xs focus:outline-none focus:ring-2 focus:ring-[#94464f] border border-[#ede0dc]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#211a18]">
                    Número estimado de personas
                  </label>
                  <select
                    value={guestsRange}
                    onChange={(e) => setGuestsRange(e.target.value)}
                    className="h-11 px-3.5 rounded-xl bg-[#fff1ed] text-[#211a18] text-xs focus:outline-none focus:ring-2 focus:ring-[#94464f] border border-[#ede0dc]"
                  >
                    <option value="15 a 25 personas">15 a 25 personas</option>
                    <option value="30 a 50 personas">30 a 50 personas</option>
                    <option value="50 a 100 personas">50 a 100 personas</option>
                    <option value="Más de 100 personas (Boda / Gala)">
                      Más de 100 personas (Boda / Gala)
                    </option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#211a18]">
                  Idea, temática o sabores preferidos
                </label>
                <textarea
                  value={themeDescription}
                  onChange={(e) => setThemeDescription(e.target.value)}
                  rows={3}
                  placeholder="Describe colores, estilo de decoración (acuarela, flores naturales, pisos), sabores favoritos o requerimientos dietéticos..."
                  className="p-3 rounded-xl bg-[#fff1ed] text-[#211a18] text-xs focus:outline-none focus:ring-2 focus:ring-[#94464f] border border-[#ede0dc] resize-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-[#fedcc9]/40 border border-[#fedcc9] text-xs text-[#72594b] flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#775a00] shrink-0">
                  info
                </span>
                <span>
                  Recomendamos solicitar cotizaciones con al menos <strong>15 días de anticipación</strong> para eventos y bodas para garantizar cupo de horneado.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 mt-1 rounded-full bg-[#94464f] hover:bg-[#772f39] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[19px]">send</span>
                <span>Enviar solicitud a taller</span>
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="flex flex-col items-center text-center py-4 gap-4 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-[#ffdadb] text-[#94464f] flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[34px]">
                check_circle
              </span>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#94464f]">
                ¡Solicitud Registrada con Éxito!
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#211a18] mt-1">
                Gracias, {clientName}
              </h3>
              <p className="text-xs text-[#544344] mt-2 max-w-md mx-auto leading-relaxed">
                Hemos recibido tu solicitud para el evento del <strong>{eventDate}</strong> ({guestsRange}). Nuestro maestro repostero revisará la disponibilidad de fecha y se comunicará al <strong>{phone}</strong> en menos de 2 horas hábiles.
              </p>
            </div>

            <div className="w-full bg-[#fff1ed] p-4 rounded-2xl border border-[#ede0dc] text-left text-xs text-[#544344] flex flex-col gap-1.5 mt-2">
              <div className="flex justify-between font-semibold text-[#211a18]">
                <span>Detalle de tu cotización:</span>
                <span className="text-[#94464f]">En revisión</span>
              </div>
              <p className="line-clamp-2 italic text-[#72594b]">
                "{themeDescription || 'Asesoría de diseño con chef pastelero'}"
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 w-full mt-2">
              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="flex-1 py-3 px-4 rounded-full bg-[#94464f] hover:bg-[#772f39] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Continuar por WhatsApp ahora</span>
              </button>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="py-3 px-5 rounded-full bg-[#f9ebe7] hover:bg-[#ede0dc] text-[#211a18] text-xs font-semibold transition-colors"
              >
                Volver al catálogo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
