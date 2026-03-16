
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Facebook } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {

  return (
    <div className="w-full bg-background p-[14px] pb-[14px] pt-0">
      <footer className="bg-primary text-white py-12 md:py-20 px-6 rounded-3xl md:rounded-[3rem] shadow-2xl relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#1e293b] via-[#0B1120] to-[#0B1120] opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
          <div className="md:col-span-1">
            <div className="mb-6">
              <Logo className="h-12 w-auto text-white" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Elevamos la experiencia inmobiliaria. Integramos análisis de mercado con una selección estratégica de propiedades residenciales y comerciales, diseñada para quienes buscan exclusividad y certeza patrimonial.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white hover:text-accent transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-white hover:text-accent transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-white hover:text-accent transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="font-bold uppercase tracking-widest text-xs text-gray-500 mb-6">Explorar</h3>
            <ul className="space-y-4 text-sm font-light">
              <li><Link to="/propiedades" className="hover:text-accent transition-colors">Residencias</Link></li>
              <li><Link to="/desarrollos" className="hover:text-accent transition-colors">Desarrollos</Link></li>
              <li><Link to="/comercial" className="hover:text-accent transition-colors">Comercial</Link></li>
              <li><Link to="/inversion" className="hover:text-accent transition-colors">The Vault</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold uppercase tracking-widest text-xs text-gray-500 mb-6">Compañía</h3>
            <ul className="space-y-4 text-sm font-light">
              <li><Link to="/nosotros" className="hover:text-accent transition-colors">Nosotros</Link></li>
              <li><Link to="/servicios" className="hover:text-accent transition-colors">Servicios</Link></li>
              <li><Link to="/journal" className="hover:text-accent transition-colors">Editorial</Link></li>
              <li><Link to="/legal" className="hover:text-accent transition-colors">Legal</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold uppercase tracking-widest text-xs text-gray-500 mb-6">Newsletter</h3>
            <p className="text-gray-400 text-xs mb-4">Únete a nuestra lista exclusiva para oportunidades off-market.</p>
            
            <button 
                onClick={() => {
                    const message = `Hola me interesa suscribirme al newsletter`;
                    window.open(`https://wa.me/523322275000?text=${encodeURIComponent(message)}`, '_blank');
                }}
                className="w-full bg-accent text-white text-[10px] font-bold uppercase tracking-[0.2em] py-3 rounded-xl hover:bg-white hover:text-primary transition-colors flex items-center justify-center gap-2"
            >
                Suscribirse por WhatsApp
            </button>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 relative z-10">
          <p>© 2026 Casa de Alba Bienes Raíces. Todos los derechos reservados</p>
          <p className="mt-2 md:mt-0">Diseñado para la excelencia.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
