
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Facebook, Check, Loader2 } from 'lucide-react';
import Logo from './Logo';
import { submitContactForm } from '../services/contact';

const Footer: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    const formData = new FormData(e.currentTarget);
    
    try {
      await submitContactForm(formData, 'newsletter');
      setStatus('success');
      (e.target as HTMLFormElement).reset();
      // Reset after 3 seconds so user can subscribe another email if needed
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      alert("Error al suscribirse. Intente nuevamente.");
      setStatus('idle');
    }
  };

  return (
    <footer className="bg-primary text-white py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
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
          
          {status === 'success' ? (
            <div className="flex items-center gap-2 text-accent animate-fadeIn py-2 border-b border-accent/50">
                <Check size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Suscripción Exitosa</span>
            </div>
          ) : (
            <form 
                name="newsletter" 
                method="POST" 
                data-netlify="true" 
                className="flex border-b border-gray-600 pb-2 relative"
                onSubmit={handleNewsletterSubmit}
            >
                <input type="hidden" name="form-name" value="newsletter" />
                <input type="hidden" name="bot-field" />
                <input 
                    type="email" 
                    name="email" 
                    required 
                    placeholder="CORREO ELECTRÓNICO" 
                    className="bg-transparent w-full outline-none text-white text-sm placeholder-gray-500 font-bold tracking-widest uppercase disabled:opacity-50"
                    disabled={status === 'submitting'}
                />
                <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className="text-accent text-xs font-bold uppercase tracking-widest hover:text-white transition-colors disabled:opacity-50"
                >
                    {status === 'submitting' ? <Loader2 size={16} className="animate-spin"/> : 'Unirse'}
                </button>
            </form>
          )}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
        <p>© 2026 Casa de Alba Bienes Raíces. Todos los derechos reservados</p>
        <p className="mt-2 md:mt-0">Diseñado para la excelencia.</p>
      </div>
    </footer>
  );
};

export default Footer;
