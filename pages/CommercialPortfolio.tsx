import React from 'react';
import { PROPERTIES } from '../data/mockData';
import PropertyCard from '../components/PropertyCard';

const CommercialPortfolio: React.FC = () => {
  const commercialProps = PROPERTIES.filter(p => p.type === 'commercial');

  return (
    <div className="min-h-screen bg-[#0B1120] text-white pt-32 pb-24 px-6 relative overflow-hidden">
       {/* Background Subtle Corporate Gradient */}
       <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
       
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="border-b border-gray-800 pb-8 mb-16 flex flex-col md:flex-row justify-between items-end">
          <div>
            <h1 className="font-serif text-5xl md:text-6xl mb-2 tracking-tight-heading text-white">Comercial e Industrial</h1>
            <p className="text-gray-400 text-lg max-w-xl">Activos de alto rendimiento para el inversionista institucional. Oficinas, almacenes y reservas territoriales.</p>
          </div>
          <div className="mt-8 md:mt-0">
            <button className="bg-white text-primary px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Descargar Portafolio PDF
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {commercialProps.map(prop => (
             <div key={prop.id} className="opacity-100 hover:scale-[1.01] transition-transform duration-500">
               <PropertyCard property={prop} variant="landscape"/>
             </div>
          ))}
        </div>

        <div className="mt-24 bg-gradient-to-br from-[#151e32] to-[#0f172a] rounded-3xl p-12 text-center border border-gray-800 relative overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/5 to-transparent opacity-50" />
           <div className="relative z-10">
                <h2 className="font-serif text-3xl mb-4 tracking-tight text-white">¿Busca tierra industrial off-market?</h2>
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                    Manejamos un inventario privado de reservas territoriales en El Salto, Tlaquepaque y Lagos de Moreno aptos para proyectos BTS (Build-to-Suit).
                </p>
                <button className="text-accent border border-accent px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-colors">
                    Contactar Equipo Industrial
                </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CommercialPortfolio;