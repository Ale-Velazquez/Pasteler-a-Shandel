import React, { useState } from 'react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onCancel: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onCancel }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      // Authorized store credentials verification (for review demonstration)
      const validEmail = email.trim().toLowerCase() === 'admin@pasteleriashandel.com' || email.trim().toLowerCase() === 'admin';
      const validPass = password.trim() === 'shandel2024' || password.trim() === 'admin';

      if (validEmail && validPass) {
        setIsLoading(false);
        onLoginSuccess();
      } else {
        setIsLoading(false);
        setError('Credenciales incorrectas. Verifica el usuario o contraseña de administrador.');
      }
    }, 400);
  };

  const handleQuickFill = () => {
    setEmail('admin@pasteleriashandel.com');
    setPassword('shandel2024');
    setError('');
  };

  return (
    <div className="w-full min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-[#ede0dc] relative">
        <button
          onClick={onCancel}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f9ebe7] hover:bg-[#ede0dc] flex items-center justify-center text-[#211a18] transition-colors"
          title="Regresar al catálogo"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        <div className="flex flex-col items-center text-center gap-2 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#ffdadb] text-[#94464f] flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[28px]">lock</span>
          </div>
          <span className="text-[10px] font-bold tracking-widest text-[#72594b] uppercase mt-1">
            Pastelería Shandel Atelier
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#211a18]">
            Panel de Administración
          </h2>
          <p className="text-xs text-[#544344] max-w-xs leading-relaxed">
            Área protegida exclusivamente para el administrador autorizado de la tienda.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-[#ffdad6] border border-[#ffb4ab] text-xs text-[#93000a] flex items-center gap-2 animate-in fade-in">
            <span className="material-symbols-outlined text-[18px] shrink-0">
              error
            </span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#211a18]">
              Correo o usuario autorizado
            </label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@pasteleriashandel.com"
              className="h-11 px-3.5 rounded-xl bg-[#fff1ed] text-xs text-[#211a18] border border-[#ede0dc] focus:outline-none focus:ring-2 focus:ring-[#94464f]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#211a18]">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="h-11 px-3.5 rounded-xl bg-[#fff1ed] text-xs text-[#211a18] border border-[#ede0dc] focus:outline-none focus:ring-2 focus:ring-[#94464f]"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 mt-2 rounded-full bg-[#94464f] hover:bg-[#772f39] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {isLoading ? (
              <span className="material-symbols-outlined text-[18px] animate-spin">
                progress_activity
              </span>
            ) : (
              <span className="material-symbols-outlined text-[18px]">
                login
              </span>
            )}
            <span>{isLoading ? 'Verificando...' : 'Iniciar Sesión'}</span>
          </button>
        </form>

        {/* Demo Quick-fill box */}
        <div className="mt-6 pt-5 border-t border-[#ede0dc] flex flex-col gap-2 bg-[#fff8f6] p-3.5 rounded-2xl border border-dashed border-[#ede0dc]">
          <span className="text-[11px] font-semibold text-[#72594b] flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-[#94464f]">
              key
            </span>
            Credenciales de demostración:
          </span>
          <p className="text-[11px] text-[#544344]">
            Usuario: <code>admin@pasteleriashandel.com</code><br/>
            Contraseña: <code>shandel2024</code>
          </p>
          <button
            type="button"
            onClick={handleQuickFill}
            className="text-[11px] font-semibold text-[#94464f] hover:underline self-start mt-0.5"
          >
            Rellenar automáticamente
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={onCancel}
            className="text-xs text-[#867273] hover:text-[#211a18] transition-colors"
          >
            ← Volver a la vista pública de clientes
          </button>
        </div>
      </div>
    </div>
  );
};
