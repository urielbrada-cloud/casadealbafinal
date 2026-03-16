
import React, { useState, useEffect } from 'react';
import SmartSearch from '../components/SmartSearch';
import FloatingSearch from '../components/FloatingSearch';
import PropertyCard from '../components/PropertyCard';
import { useProperties } from '../hooks/useProperties';
import { BLOG_POSTS, DEVELOPMENTS } from '../data/mockData';
import { Property } from '../types';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Building2, Megaphone, Key, TrendingUp, HardHat, Scale, Building, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- CONFIGURACIÓN DEL HERO SLIDER ---
const HERO_IMAGES = [
  'https://lh3.googleusercontent.com/d/139pJ7EwmqcEscmetvxfTkBJPGh22CJ32', // Interior Doble Altura
  'https://lh3.googleusercontent.com/d/1-GofpkZneXkMYG0FgXxe2J99a7KNHDEk', // Landmark View
  'https://lh3.googleusercontent.com/d/11Rlk0EKXdC3VaDNgHY5FDOYz0RvAPkNX', // Nautica Exterior
  'https://lh3.googleusercontent.com/d/1YJaE4fFl1svjPBTgxvvpX5thgbjoXZEY'  // Roof Garden
];

// --- DATOS DE SERVICIOS PARA EL HOME ---
const SERVICES_PREVIEW = [
  {
    id: 's1',
    title: 'Marketing & Branding',
    desc: 'Estrategias 360° para desarrollos, desde el naming hasta el sold-out.',
    icon: <Megaphone size={32} />,
    link: '/servicios'
  },
  {
    id: 's2',
    title: 'Comercialización Elite',
    desc: 'Posicionamiento de activos ante una red global de compradores calificados.',
    icon: <Key size={32} />,
    link: '/servicios'
  },
  {
    id: 's3',
    title: 'Proyectos de Inversión',
    desc: 'Oportunidades en tierra y preventas con altos retornos proyectados.',
    icon: <TrendingUp size={32} />,
    link: '/inversion'
  },
  {
    id: 's4',
    title: 'Construcción',
    desc: 'Arquitectura a la medida (Build-to-suit) y gestión de obra.',
    icon: <HardHat size={32} />,
    link: '/servicios'
  },
  {
    id: 's5',
    title: 'Property Management',
    desc: 'Administración de rentas vacacionales y mantenimiento de activos.',
    icon: <Building size={32} />,
    link: '/servicios'
  },
  {
    id: 's6',
    title: 'Legal & Fiscal',
    desc: 'Blindaje patrimonial, estructuración de fideicomisos y estrategia fiscal.',
    icon: <Scale size={32} />,
    link: '/legal'
  }
];

const HomePage: React.FC = () => {
  // Use the smart hook that decides between Supabase and Mock Data
  const { properties, loading, source } = useProperties();
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [commercialProperties, setCommercialProperties] = useState<Property[]>([]);
  
  // State for Hero Slider
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // Auto-advance Hero Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!loading && properties.length > 0) {
      setFeaturedProperties(properties.filter(p => p.isFeatured).slice(0, 5));
      setCommercialProperties(properties.filter(p => p.type === 'commercial'));
    }
  }, [properties, loading]);

  const featuredPosts = BLOG_POSTS; 
  
  // State for Developments Slider
  const [currentDevIndex, setCurrentDevIndex] = useState(0);

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDevIndex((prev) => (prev + 1) % DEVELOPMENTS.length);
    }, 6000); // Change every 6 seconds
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentDevIndex((prev) => (prev + 1) % DEVELOPMENTS.length);
  };

  const prevSlide = () => {
    setCurrentDevIndex((prev) => (prev - 1 + DEVELOPMENTS.length) % DEVELOPMENTS.length);
  };

  return (
    <div className="w-full">
      {/* Hero Section (Bento Box Style) */}
      <section className="relative p-[14px] ml-0 rounded-none max-w-[100vw] h-[100svh] md:h-[963.293px] min-h-[650px] flex flex-col">
         {/* Bento Box Container */}
         <div className="relative w-full h-full rounded-3xl md:rounded-[3rem] overflow-hidden flex flex-col justify-center items-center shadow-2xl">
           {/* Hero Slider Background */}
           <div className="absolute inset-0 z-0 overflow-hidden bg-gray-900">
             {HERO_IMAGES.map((img, index) => (
               <div
                 key={index}
                 className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                   index === currentHeroIndex ? 'opacity-100' : 'opacity-0'
                 }`}
               >
                 <img
                   src={img}
                   alt="Luxury Property"
                   className="w-full h-full object-cover"
                 />
                 {/* Overlays */}
                 <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
                 <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent h-[30%]" />
                 <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
               </div>
             ))}
           </div>

           <div className="relative z-10 w-full max-w-5xl h-full grid grid-rows-[50fr_50fr] md:grid-rows-[61.8fr_38.2fr]">
             {/* Espacio libre para la fotografía */}
             <div className="w-full h-full pointer-events-none"></div>
             
             {/* Contenido y Buscador */}
             <div className="w-full h-full flex flex-col justify-end px-4 sm:px-8 md:px-12 lg:px-20 pb-8 md:pb-16">
               <div className="w-full animate-fadeIn flex flex-col items-center text-center">
                 <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white mb-3 md:mb-4 leading-[1.1] tracking-tight-heading drop-shadow-2xl">
                   Encuentra tu espacio <br/> <span className="italic font-light text-white/90">extraordinario.</span>
                 </h1>
                 <p className="text-white/90 text-sm sm:text-base md:text-lg font-light mb-6 md:mb-8 drop-shadow-md max-w-xl">
                   La plataforma líder para propiedades de lujo, diseñada para aquellos que aprecian el diseño y la exclusividad.
                 </p>
               </div>
               <div className="w-full max-w-5xl animate-fadeInUp">
                 <div className="hidden md:block">
                   <SmartSearch variant="hero" />
                 </div>
                 <div className="md:hidden">
                   <FloatingSearch inline />
                 </div>
               </div>
             </div>
           </div>
         </div>
      </section>

      {/* Featured Properties - Magnetic Carousel */}
      <section className="relative p-[14px] ml-0 rounded-none max-w-[100vw] flex flex-col bg-background">
        <div className="relative w-full h-full rounded-3xl md:rounded-[3rem] overflow-hidden bg-white py-12 md:py-24 shadow-2xl">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4">
            <div>
              <h2 className="font-serif text-4xl text-primary mb-2 tracking-tight-heading">Colección Signature</h2>
              <div className="flex items-center gap-3">
                 <p className="text-gray-500 max-w-md">Residencias curadas elegidas por su carácter único.</p>
                 {/* Indicator showing if data is coming from DB or Mock */}
                 {source === 'supabase' && (
                   <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold flex items-center gap-1 border border-green-200">
                     <Database size={10} /> Live Data
                   </span>
                 )}
              </div>
            </div>
            <Link to="/propiedades" className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent hover:text-primary transition-colors">
              Ver Colección Completa <ArrowRight size={14} />
            </Link>
          </div>
          
          {/* Carousel Container */}
          <div className="
              flex 
              gap-6 
              overflow-x-auto 
              snap-x snap-mandatory 
              pb-12 
              px-6
              max-w-7xl mx-auto
              no-scrollbar
          ">
            {loading ? (
               /* Simple Skeleton for Loading */
               [1,2,3].map(i => (
                  <div key={i} className="snap-center shrink-0 w-[85vw] md:w-[45vw] lg:w-[calc(33.333%-1rem)] h-[500px] bg-gray-200 rounded-[1.5rem] animate-pulse"></div>
               ))
            ) : (
              featuredProperties.map(prop => (
                  <div 
                      key={prop.id} 
                      className="
                          snap-center 
                          shrink-0 
                          w-[85vw]                      
                          md:w-[45vw]                   
                          lg:w-[calc(33.333%-1rem)]     
                      "
                  >
                      <PropertyCard property={prop} />
                  </div>
              ))
            )}
            
            {/* "See More" Card for Carousel continuity */}
            {!loading && (
              <div className="
                  snap-center 
                  shrink-0 
                  w-[85vw] 
                  md:w-[45vw] 
                  lg:w-[calc(33.333%-1rem)] 
                  flex items-center justify-center 
                  bg-gray-50 rounded-2xl border border-dashed border-gray-300 
                  group cursor-pointer hover:bg-gray-100 transition-colors
              ">
                  <Link to="/propiedades" className="text-center p-8 w-full h-full flex flex-col justify-center items-center">
                      <span className="block font-serif text-2xl text-primary mb-2">Ver Todo</span>
                      <span className="text-accent text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 group-hover:gap-4 transition-all">
                          Explorar Inventario <ArrowRight size={14} />
                      </span>
                  </Link>
              </div>
            )}
          </div>
          
          <div className="mt-4 text-center md:hidden px-6">
            <Link to="/propiedades" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent">
              Ver Colección Completa <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial/Journal Carousel Section */}
      <section className="relative p-[14px] ml-0 rounded-none max-w-[100vw] flex flex-col bg-background">
        <div className="relative w-full h-full rounded-3xl md:rounded-[3rem] overflow-hidden bg-white py-12 md:py-24 shadow-2xl">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4">
             <div>
                <h2 className="font-serif text-4xl text-primary mb-2 tracking-tight-heading">Editorial</h2>
                <p className="text-gray-500 max-w-md">Perspectivas del mercado de lujo, tendencias y estilo de vida.</p>
             </div>
             <Link to="/journal" className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent hover:text-primary transition-colors">
                Leer Todos <ArrowRight size={14} />
             </Link>
          </div>

          {/* Carousel Container */}
          <div className="
              flex 
              gap-6 
              overflow-x-auto 
              snap-x snap-mandatory 
              pb-12 
              px-6
              max-w-7xl mx-auto
              no-scrollbar
          ">
             {featuredPosts.map(post => (
               <div 
                  key={post.id} 
                  className="
                    snap-center 
                    shrink-0 
                    w-[85vw] 
                    md:w-[45vw] 
                    lg:w-[calc(33.333%-1rem)] 
                    h-full
                  "
               >
                  <Link to={`/journal/${post.slug}`} className="group block h-full">
                    <div className="bg-surface-light rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col transform hover:-translate-y-1">
                      {/* Image Container */}
                      <div className="h-64 overflow-hidden relative">
                        <img 
                          src={post.coverImage} 
                          alt={post.title} 
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-300" />
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/95 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full text-primary shadow-sm">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-8 flex flex-col flex-grow">
                        <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-4">
                          <span className="text-xs text-gray-400 font-medium">{post.date}</span>
                          <div className="bg-white rounded-full p-1.5 text-primary group-hover:bg-accent group-hover:text-white transition-colors">
                             <ArrowUpRight size={16} />
                          </div>
                        </div>
                        
                        <h3 className="font-serif text-2xl mb-3 text-primary group-hover:text-accent transition-colors duration-300 tracking-tight leading-tight">
                          {post.title}
                        </h3>
                        
                        <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed mb-4">
                          {post.excerpt}
                        </p>
                        
                        <span className="mt-auto text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-primary transition-colors">
                          Por {post.author}
                        </span>
                      </div>
                    </div>
                  </Link>
               </div>
             ))}

             {/* See More Card for Editorial */}
             <div className="
                snap-center 
                shrink-0 
                w-[85vw] 
                md:w-[45vw] 
                lg:w-[calc(33.333%-1rem)] 
                flex items-center justify-center 
                bg-gray-50 rounded-2xl border border-dashed border-gray-300 
                group cursor-pointer hover:bg-gray-100 transition-colors
             ">
                <Link to="/journal" className="text-center p-8 w-full h-full flex flex-col justify-center items-center">
                    <span className="block font-serif text-2xl text-primary mb-2">Más Artículos</span>
                    <span className="text-accent text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 group-hover:gap-4 transition-all">
                        Ir al Blog <ArrowRight size={14} />
                    </span>
                </Link>
             </div>
          </div>

          <div className="mt-4 text-center md:hidden px-6">
            <Link to="/journal" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent">
              Leer Todos <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Developments - Full Screen Slider */}
      <section className="relative p-[14px] ml-0 rounded-none max-w-[100vw] h-[100svh] md:h-[963.293px] min-h-[650px] flex flex-col bg-background">
        <div className="relative w-full h-full rounded-3xl md:rounded-[3rem] overflow-hidden bg-primary text-white shadow-2xl">
          {DEVELOPMENTS.map((dev, index) => (
            <div
              key={dev.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentDevIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {/* Background Image & Overlays */}
              <div className="absolute inset-0">
                 <img 
                   src={dev.images[0]} 
                   alt={dev.name} 
                   className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-out ${index === currentDevIndex ? 'scale-110' : 'scale-100'}`}
                 />
                 {/* Dark overlay for readability */}
                 <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60" />
              </div>

              {/* Content Centered */}
              <div className="relative h-full flex flex-col justify-center items-center text-center px-6 max-w-6xl mx-auto pt-20">
                 <div className={`transition-all duration-1000 delay-300 transform ${index === currentDevIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                     <span className="inline-block px-4 py-1.5 border border-white/30 rounded-full text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
                        Preventa Exclusiva
                     </span>
                 </div>
                 
                 <h2 className={`font-serif text-5xl md:text-[81px] mb-4 md:mb-6 text-white tracking-tight-heading leading-none transition-all duration-1000 delay-500 transform ${index === currentDevIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    {dev.name}
                 </h2>
                 
                 <p className={`font-serif italic text-xl md:text-3xl text-accent mb-6 md:mb-10 max-w-3xl transition-all duration-1000 delay-700 transform ${index === currentDevIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    {dev.tagline}
                 </p>
                 
                 <div className={`flex flex-col md:flex-row gap-4 md:gap-12 items-center justify-center mb-12 text-xs font-bold uppercase tracking-widest text-gray-300 transition-all duration-1000 delay-900 transform ${index === currentDevIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <span>{dev.location}</span>
                    <span className="hidden md:block w-1 h-1 bg-accent rounded-full"></span>
                    <span>Entrega: {dev.completionDate}</span>
                    <span className="hidden md:block w-1 h-1 bg-accent rounded-full"></span>
                    <span>Desde {dev.startingPrice}</span>
                 </div>
                 
                 <div className={`transition-all duration-1000 delay-1000 transform ${index === currentDevIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                   <Link
                     to={`/desarrollos/${dev.slug}`}
                     className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-primary rounded-full text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300 shadow-2xl hover:shadow-[0_0_30px_rgba(226,92,33,0.4)]"
                   >
                     Explorar Proyecto
                     <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                   </Link>
                 </div>
              </div>
            </div>
          ))}

          {/* Navigation Controls */}
          <button 
            onClick={prevSlide} 
            className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-primary transition-all backdrop-blur-sm group hidden md:block"
          >
            <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={nextSlide} 
            className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-primary transition-all backdrop-blur-sm group hidden md:block"
          >
            <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-4">
             {DEVELOPMENTS.map((_, idx) => (
               <button
                 key={idx}
                 onClick={() => setCurrentDevIndex(idx)}
                 className={`h-1 rounded-full transition-all duration-500 ease-out ${idx === currentDevIndex ? 'w-16 bg-accent' : 'w-8 bg-white/30 hover:bg-white/70'}`}
                 aria-label={`Go to slide ${idx + 1}`}
               />
             ))}
          </div>
        </div>
      </section>

      {/* Commercial Properties - Carousel */}
      {/* Commercial Portfolio Section */}
      <section className="relative p-[14px] ml-0 rounded-none max-w-[100vw] flex flex-col bg-background">
        <div className="relative w-full h-full rounded-3xl md:rounded-[3rem] overflow-hidden bg-[#0B1120] py-12 md:py-24 shadow-2xl">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#1e293b] via-[#0B1120] to-[#0B1120] opacity-40" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4">
            <div>
              <span className="text-accent text-xs font-bold uppercase tracking-widest mb-2 block flex items-center gap-2"><Building2 size={12}/> Inversión B2B</span>
              <h2 className="font-serif text-4xl text-white mb-2 tracking-tight-heading">Portafolio Comercial</h2>
              <p className="text-gray-400 max-w-md">Activos estratégicos, oficinas y naves industriales para el inversionista global.</p>
            </div>
            <Link to="/comercial" className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-accent transition-colors">
              Ver Portafolio <ArrowRight size={14} />
            </Link>
          </div>
          
          <div className="
              relative z-10
              flex 
              gap-6 
              overflow-x-auto 
              snap-x snap-mandatory 
              pb-12 
              px-6
              max-w-7xl mx-auto
              no-scrollbar
          ">
             {commercialProperties.map(prop => (
               <div key={prop.id} className="snap-center shrink-0 w-[85vw] md:w-[400px]">
                 <PropertyCard property={prop} variant="landscape" />
               </div>
             ))}
            
             {/* See More Card */}
             <div className="
                snap-center 
                shrink-0 
                w-[85vw] 
                md:w-[400px] 
                flex items-center justify-center 
                bg-white/5 rounded-2xl border border-dashed border-white/20 
                group cursor-pointer hover:bg-white/10 transition-colors
             ">
                <Link to="/comercial" className="text-center p-8 w-full h-full flex flex-col justify-center items-center">
                    <span className="block font-serif text-2xl text-white mb-2">Ver Portafolio</span>
                    <span className="text-accent text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 group-hover:gap-4 transition-all">
                        Ir a Comercial <ArrowRight size={14} />
                    </span>
                </Link>
             </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section - Grid */}
      <section className="relative p-[14px] ml-0 rounded-none max-w-[100vw] flex flex-col bg-background">
        <div className="relative w-full h-full rounded-3xl md:rounded-[3rem] overflow-hidden bg-gray-50 py-12 md:py-24 shadow-2xl">
           <div className="max-w-7xl mx-auto px-6">
               <div className="text-center mb-16">
                   <span className="text-accent text-xs font-bold uppercase tracking-widest mb-2 block">Soluciones Integrales</span>
                   <h2 className="font-serif text-4xl text-primary tracking-tight">Servicios 360°</h2>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {SERVICES_PREVIEW.map(service => (
                       <Link to={service.link} key={service.id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100">
                           <div className="w-14 h-14 bg-surface-light rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                               {service.icon}
                           </div>
                           <h3 className="font-serif text-xl text-primary mb-3 group-hover:text-accent transition-colors">{service.title}</h3>
                           <p className="text-sm text-gray-500 font-light leading-relaxed mb-6">
                               {service.desc}
                           </p>
                           <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-primary transition-colors">
                               Conocer Más <ArrowRight size={12} />
                           </div>
                       </Link>
                   ))}
               </div>
               
               <div className="mt-12 text-center">
                   <Link to="/servicios" className="inline-block border border-primary text-primary px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-colors">
                       Explorar Todos los Servicios
                   </Link>
               </div>
           </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
