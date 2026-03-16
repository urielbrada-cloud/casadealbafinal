
import React from 'react';
import { Lock, TrendingUp, ShieldCheck } from 'lucide-react';

const InvestmentPage: React.FC = () => {

  return (
    <div className="pt-24 md:pt-32 pb-[14px] px-[14px] min-h-screen max-w-[100vw] flex flex-col bg-background">
      <div className="relative w-full h-full rounded-3xl md:rounded-[3rem] overflow-hidden bg-primary text-white py-8 md:py-12 px-4 md:px-12 lg:px-20 shadow-2xl">
      {/* Background Effect */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-accent rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-block p-4 bg-white/5 rounded-full mb-6 md:mb-8 backdrop-blur-sm border border-white/10">
          <Lock size={32} className="text-accent" />
        </div>
        <h1 className="font-serif text-4xl md:text-7xl mb-4 md:mb-6 tracking-tight-heading">The Vault</h1>
        <p className="text-gray-400 text-base md:text-xl leading-relaxed mb-8 md:mb-12 max-w-2xl mx-auto">
          Acceso a nuestra colección privada de activos off-market, oportunidades distress y preventas de alto ROI. Esta sección está restringida a inversionistas acreditados.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16 text-left">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-accent/50 transition-colors">
             <TrendingUp className="text-accent mb-4" size={24} />
             <h3 className="font-serif text-xl mb-2 tracking-tight">Alto Rendimiento</h3>
             <p className="text-gray-500 text-sm">Proyectos residenciales e industriales con rendimientos anuales proyectados superiores al 12%.</p>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-accent/50 transition-colors">
             <ShieldCheck className="text-accent mb-4" size={24} />
             <h3 className="font-serif text-xl mb-2 tracking-tight">Activos Seguros</h3>
             <p className="text-gray-500 text-sm">Propiedades con estatus legal verificado e historial de propiedad claro.</p>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-accent/50 transition-colors">
             <Lock className="text-accent mb-4" size={24} />
             <h3 className="font-serif text-xl mb-2 tracking-tight">Off-Market</h3>
             <p className="text-gray-500 text-sm">La exclusividad es clave. Navegue por un inventario que nunca aparecerá en portales públicos.</p>
          </div>
        </div>

        <div className="bg-white text-primary p-6 md:p-12 rounded-2xl shadow-2xl max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl mb-2 md:mb-4 tracking-tight">Solicitar Acceso</h2>
          <p className="text-gray-500 mb-6 text-sm">Por favor contáctenos por WhatsApp para verificar sus credenciales y entrar a The Vault.</p>
          <button 
            onClick={() => {
                const message = `Hola me interesa acceder a The Vault para inversionistas`;
                window.open(`https://wa.me/523322275000?text=${encodeURIComponent(message)}`, '_blank');
            }}
            className="w-full bg-accent text-white font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-primary transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            <Lock size={16} /> Contactar por WhatsApp
          </button>
        </div>
      </div>



      </div>
    </div>
  );
};

export default InvestmentPage;
