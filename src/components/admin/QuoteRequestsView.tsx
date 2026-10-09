import React from 'react';
import { QuoteRequest } from '../../types';

interface QuoteRequestsViewProps {
  quotes: QuoteRequest[];
  onToggleQuoteStatus: (quoteId: string) => void;
}

export const QuoteRequestsView: React.FC<QuoteRequestsViewProps> = ({
  quotes,
  onToggleQuoteStatus,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="font-serif text-xl font-bold text-[#211a18]">
          Solicitudes de Cotización de Clientes
        </h3>
        <p className="text-xs text-[#544344]">
          Consultas enviadas a través del formulario interactivo para pasteles personalizados y eventos.
        </p>
      </div>

      {quotes.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-[#ede0dc] flex flex-col items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[36px] text-[#867273]">
            inbox
          </span>
          <h4 className="font-serif text-lg font-bold text-[#211a18]">
            No hay cotizaciones pendientes
          </h4>
          <p className="text-xs text-[#544344]">
            Las consultas enviadas por los clientes aparecerán aquí automáticamente.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quotes.map((q) => (
            <div
              key={q.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 ${
                q.status === 'atendido'
                  ? 'bg-[#f3e5e2]/40 border-[#ede0dc]'
                  : 'bg-white border-[#fedcc9] shadow-xs'
              }`}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#72594b]">
                    Fecha recepción: {q.createdAt}
                  </span>
                  <button
                    onClick={() => onToggleQuoteStatus(q.id)}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                      q.status === 'atendido'
                        ? 'bg-[#e8f5e9] text-[#2e7d32]'
                        : 'bg-[#ffdadb] text-[#94464f]'
                    }`}
                  >
                    {q.status === 'atendido' ? '✓ Atendido' : '● Pendiente'}
                  </button>
                </div>

                <h4 className="font-serif text-lg font-bold text-[#211a18]">
                  {q.clientName}
                </h4>

                <div className="grid grid-cols-2 gap-2 text-xs py-1.5 px-3 bg-[#fff8f6] rounded-xl border border-[#ede0dc]">
                  <div>
                    <span className="text-[10px] text-[#867273] block">Teléfono / WhatsApp</span>
                    <span className="font-semibold text-[#211a18]">{q.phone}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#867273] block">Fecha de Evento</span>
                    <span className="font-semibold text-[#94464f]">{q.eventDate}</span>
                  </div>
                </div>

                <div className="text-xs text-[#544344]">
                  <span className="text-[11px] font-semibold text-[#211a18] block">
                    Personas: <span className="font-normal">{q.guestsRange}</span>
                  </span>
                  <p className="mt-1 p-2.5 rounded-xl bg-white border border-[#ede0dc] italic text-[#544344]">
                    "{q.themeDescription || 'Sin especificaciones detalladas'}"
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#ede0dc]">
                <button
                  onClick={() => onToggleQuoteStatus(q.id)}
                  className="text-xs text-[#72594b] hover:text-[#211a18] font-semibold underline"
                >
                  {q.status === 'atendido' ? 'Marcar como pendiente' : 'Marcar como resuelto'}
                </button>
                <a
                  href={`https://wa.me/52${q.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${q.clientName}! Te saluda el chef pastelero de Pastelería Shandel para revisar tu solicitud de cotización para el ${q.eventDate}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-3.5 rounded-full bg-[#94464f] hover:bg-[#772f39] text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[15px]">chat</span>
                  <span>Contactar</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
