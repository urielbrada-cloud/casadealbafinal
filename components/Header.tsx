
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import Logo from './Logo';
import SmartSearch from './SmartSearch';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloquear scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const isTransparent = isHomePage && !isScrolled;

  // Header Styling Logic
  const getHeaderClass = () => {
    const base = "fixed top-0 left-0 right-0 z-40 transition-all duration-500 px-4 md:px-6 lg:px-12 flex items-center justify-between";
    
    if (isHomePage) {
      return isScrolled 
        ? `${base} py-3 bg-white/95 backdrop-blur-md shadow-sm text-primary`
        : `${base} pt-8 pb-4 md:pt-10 md:pb-6 bg-transparent`;
    }
    
    // Non-home pages
    return `${base} py-3 bg-white/95 backdrop-blur-md shadow-sm text-primary`;
  };

  const linkBaseClass = `text-[11px] font-bold uppercase tracking-widest transition-colors flex items-center gap-1 whitespace-nowrap ${
    isTransparent ? 'text-white drop-shadow-md hover:opacity-80' : 'text-primary hover:text-accent'
  }`;

  // Logic to show search bar: Always on inner pages, or on Home when scrolled
  const showHeaderSearch = !isHomePage || isScrolled;

  return (
    <>
      <header className={getHeaderClass()}>
        
        {/* GRUPO IZQUIERDO: LOGO + BUSCADOR */}
        <div className="flex items-center gap-4 lg:gap-8 shrink-0">
          <Link 
            to="/" 
            className="z-50 group shrink-0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:transform-none pt-0 -mt-[18px] mb-[6px] ml-0"
          >
            <Logo className={`h-[62px] w-[177px] ml-[78px] mt-[16px] pl-0 transition-colors duration-300 ${isTransparent ? 'text-white drop-shadow-md group-hover:opacity-80' : 'text-primary group-hover:text-accent'}`} />
          </Link>
          
          {/* SEARCH BAR - COMPACT NEXT TO LOGO */}
          {/* Transition wrapper to slide/fade it in */}
          <div className={`
              hidden md:block transition-all duration-500 ease-in-out transform origin-left
              ${showHeaderSearch 
                ? 'w-[320px] opacity-100 translate-x-0 scale-100 pointer-events-auto ml-2' 
                : 'w-0 opacity-0 -translate-x-4 scale-95 pointer-events-none overflow-hidden ml-0'}
          `}>
            <SmartSearch variant="header" />
          </div>
        </div>

        {/* GRUPO DERECHO: MENÚ DE NAVEGACIÓN + ACCIONES */}
        <div className="flex items-center gap-6 lg:gap-8 shrink-0">
          
          {/* Desktop Nav - Dropdown Menu */}
          <div 
            className="hidden xl:block relative"
            onMouseEnter={() => setIsDesktopMenuOpen(true)}
            onMouseLeave={() => setIsDesktopMenuOpen(false)}
          >
            <button className={`${linkBaseClass} py-2 flex items-center gap-2`}>
              Explorar
            </button>
            
            {/* Dropdown Content */}
            <div className={`
              absolute top-full right-0 pt-4
              transition-all duration-500 ease-in-out transform origin-top-right
              ${isDesktopMenuOpen 
                ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
                : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'}
            `}>
              <div className="bg-white/95 backdrop-blur-md shadow-xl rounded-2xl py-6 px-8 min-w-[220px] flex flex-col gap-5 border border-gray-100">
                <Link to="/propiedades" onClick={() => setIsDesktopMenuOpen(false)} className="text-[11px] font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors">Propiedades</Link>
                <Link to="/desarrollos" onClick={() => setIsDesktopMenuOpen(false)} className="text-[11px] font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors">Desarrollos</Link>
                <Link to="/servicios" onClick={() => setIsDesktopMenuOpen(false)} className="text-[11px] font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors">Servicios</Link>
                <Link to="/journal" onClick={() => setIsDesktopMenuOpen(false)} className="text-[11px] font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors">Editorial</Link>
                <Link to="/nosotros" onClick={() => setIsDesktopMenuOpen(false)} className="text-[11px] font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors">Nosotros</Link>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <a 
              href="https://wa.me/523322275000" 
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex bg-[#25D366] text-white px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#128C7E] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 items-center gap-2 whitespace-nowrap"
            >
              <MessageCircle size={16} fill="currentColor" />
              WhatsApp
            </a>

            {/* Mobile Menu Button */}
            <button 
              className={`xl:hidden relative z-50 focus:outline-none p-2 transition-colors ${
                isTransparent && !isMobileMenuOpen ? 'text-white drop-shadow-md hover:opacity-80' : 'text-primary hover:text-accent'
              } ${isMobileMenuOpen ? '!text-primary' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Full Screen Fixed */}
      <div 
        className={`fixed inset-0 z-[60] bg-white transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) xl:hidden flex flex-col ${
          isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        {/* Mobile Header for Close Button alignment */}
        <div className="flex justify-between items-center px-4 py-4 border-b border-gray-100">
             <Logo className="h-8 w-auto text-primary" />
             <button 
               onClick={() => setIsMobileMenuOpen(false)}
               className="p-2 text-primary hover:text-accent transition-colors focus:outline-none"
             >
               <X size={24} strokeWidth={2} />
             </button>
        </div>

        {/* Mobile Links */}
        <div className="flex flex-col p-8 gap-8 overflow-y-auto h-full justify-center pb-24">
           <nav className="flex flex-col gap-6 text-center">
              {['Propiedades', 'Desarrollos', 'Servicios', 'Editorial', 'Nosotros'].map((item, idx) => (
                <Link 
                  key={item}
                  to={`/${item.toLowerCase() === 'editorial' ? 'journal' : item.toLowerCase()}`} 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className={`text-3xl md:text-5xl font-serif text-primary hover:text-accent transition-all duration-500 tracking-tight transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  {item}
                </Link>
              ))}
           </nav>

           <div className={`mt-12 max-w-sm mx-auto w-full transition-all duration-700 delay-500 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <a 
                href="https://wa.me/523322275000"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#25D366] text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest text-center shadow-lg flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} fill="currentColor" />
                WhatsApp Concierge
              </a>
           </div>
        </div>
      </div>
    </>
  );
};

export default Header;
