
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle, Search } from 'lucide-react';
import Logo from './Logo';
import LogoMobile from './LogoMobile';
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
    const base = "fixed top-0 left-0 right-0 z-40 transition-all duration-500 pl-[16px] pr-4 md:px-6 lg:px-12 flex items-center justify-between h-[52px] md:h-auto";
    
    if (isHomePage) {
      return isScrolled 
        ? `${base} py-0 md:py-3 bg-white/95 backdrop-blur-md shadow-sm text-primary`
        : `${base} py-0 md:pt-8 md:pb-6 bg-transparent`;
    }
    
    // Non-home pages
    return `${base} py-0 md:py-3 bg-white/95 backdrop-blur-md shadow-sm text-primary`;
  };

  const linkBaseClass = `text-[11px] font-bold uppercase tracking-widest transition-colors flex items-center gap-1 whitespace-nowrap ${
    isTransparent ? 'text-white drop-shadow-md hover:opacity-80' : 'text-primary hover:text-accent'
  }`;

  // Logic to show search bar: Always on inner pages, or on Home when scrolled
  const showHeaderSearch = !isHomePage || isScrolled;

  return (
    <>
      <header className={getHeaderClass()}>
        
        {/* GRUPO IZQUIERDO: LOGO */}
        <div className="flex items-center shrink-0">
          <Link 
            to="/" 
            className="z-50 group shrink-0 flex items-center"
          >
            <Logo className={`hidden md:block h-[48px] w-auto transition-colors duration-300 ${isTransparent ? 'text-white drop-shadow-md group-hover:opacity-80' : 'text-primary group-hover:text-accent'}`} />
            <LogoMobile className={`md:hidden w-[47px] h-[57px] transition-all duration-300 ${isTransparent ? 'text-white drop-shadow-md group-hover:opacity-80 ml-[6px] mt-[40px] mb-[1px]' : 'text-primary group-hover:text-accent -mt-[4px] -ml-[5px] mb-[1px]'}`} />
          </Link>
          
          {/* SEARCH BAR - COMPACT NEXT TO LOGO (DESKTOP ONLY) */}
          <div className={`
              hidden md:block transition-all duration-500 ease-in-out transform origin-left
              ${showHeaderSearch 
                ? 'w-[320px] opacity-100 translate-x-0 scale-100 pointer-events-auto ml-6' 
                : 'w-0 opacity-0 -translate-x-4 scale-95 pointer-events-none overflow-hidden ml-0'}
          `}>
            <SmartSearch variant="header" />
          </div>
        </div>

        {/* GRUPO DERECHO: ACCIONES Y MENÚ */}
        <div className="flex items-center gap-2 md:gap-6 lg:gap-8 shrink-0">
          
          {/* Desktop Nav - Dropdown Menu */}
          <div 
            className="hidden xl:flex items-center relative"
            onMouseEnter={() => setIsDesktopMenuOpen(true)}
            onMouseLeave={() => setIsDesktopMenuOpen(false)}
          >
            {/* Dropdown Content (Deploys to the left) */}
            <div className={`
              absolute right-full top-1/2 -translate-y-1/2 pr-6
              transition-all duration-500 ease-in-out transform origin-right
              ${isDesktopMenuOpen 
                ? 'opacity-100 translate-x-0 scale-100 pointer-events-auto' 
                : 'opacity-0 translate-x-8 scale-95 pointer-events-none'}
            `}>
              <div className="bg-white/95 backdrop-blur-md shadow-xl rounded-full py-3 px-8 flex flex-row gap-6 border border-gray-100 items-center whitespace-nowrap">
                <Link to="/propiedades" onClick={() => setIsDesktopMenuOpen(false)} className="text-[11px] font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors">Propiedades</Link>
                <Link to="/desarrollos" onClick={() => setIsDesktopMenuOpen(false)} className="text-[11px] font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors">Desarrollos</Link>
                <Link to="/servicios" onClick={() => setIsDesktopMenuOpen(false)} className="text-[11px] font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors">Servicios</Link>
                <Link to="/journal" onClick={() => setIsDesktopMenuOpen(false)} className="text-[11px] font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors">Editorial</Link>
                <Link to="/nosotros" onClick={() => setIsDesktopMenuOpen(false)} className="text-[11px] font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors">Nosotros</Link>
              </div>
            </div>

            <button className={`${linkBaseClass} py-2 hidden md:flex items-center gap-2 relative z-10`}>
              Explorar
            </button>
          </div>
          
          {/* Action Buttons */}
          <div className={`flex items-center gap-1 md:gap-4 transition-all duration-300 ${isTransparent ? 'ml-[4px] mr-[13px] -mb-[38px]' : ''}`}>
            
            {/* WhatsApp Button (Mobile Icon / Desktop Full) */}
            <a 
              href="https://wa.me/523322275000" 
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center transition-all duration-300 ${
                isTransparent && !isMobileMenuOpen ? 'text-white drop-shadow-md hover:opacity-80' : 'text-[#25D366] hover:opacity-80'
              } md:bg-[#25D366] md:text-white md:px-5 md:py-2.5 md:rounded-full md:text-[10px] md:font-bold md:uppercase md:tracking-widest md:hover:bg-[#128C7E] md:shadow-lg md:hover:shadow-xl md:hover:-translate-y-0.5 md:gap-2 w-10 h-10 md:w-auto md:h-auto rounded-full`}
              aria-label="WhatsApp"
            >
              <MessageCircle size={20} fill="currentColor" className="md:w-4 md:h-4" />
              <span className="hidden md:inline">WhatsApp</span>
            </a>

            {/* Mobile Menu Button */}
            <button 
              className={`relative z-50 focus:outline-none p-2 flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                isTransparent && !isMobileMenuOpen ? 'text-white drop-shadow-md hover:bg-white/20' : 'text-primary hover:bg-gray-100'
              } ${isMobileMenuOpen ? '!text-primary' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menú"
            >
              <span className="text-[11px] font-bold uppercase tracking-widest hidden xl:block mr-2">Explorar</span>
              {isMobileMenuOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Full Screen Fixed (Deploys downwards) */}
      <div 
        className={`fixed inset-0 z-[60] bg-white transition-all duration-500 ease-in-out xl:hidden flex flex-col ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
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
