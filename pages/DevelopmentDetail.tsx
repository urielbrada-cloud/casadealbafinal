
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDevelopments } from '../hooks/useDevelopments';
import {
  ArrowLeft, MapPin, Download,
  CheckCircle2, Star, ArrowRight, MessageCircle,
  X, ChevronLeft, ChevronRight, FileDown, ExternalLink
} from 'lucide-react';

const DevelopmentDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { developments, loading: devLoading } = useDevelopments();
  const development = developments.find(d => d.slug === slug);
  
  // Tabs State
  const [activeTab, setActiveTab] = useState<'concept' | 'amenities' | 'units'>('concept');
  
  // Gallery Lightbox State
  const [showGallery, setShowGallery] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Accordion State for Amenities
  const [activeAmenityIndex, setActiveAmenityIndex] = useState<number | null>(0);

  // Hero Slider State
  const [heroImageIndex, setHeroImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Hero Slider Auto-Advance
  useEffect(() => {
    if (!development || development.images.length <= 1) return;
    // Rotate through the first 5 images for the hero slider
    const sliderImagesCount = Math.min(development.images.length, 5);
    
    const interval = setInterval(() => {
        setHeroImageIndex((prev) => (prev + 1) % sliderImagesCount);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [development]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showGallery) return;
      if (e.key === 'Escape') setShowGallery(false);
      if (e.key === 'ArrowRight') nextLightboxImage();
      if (e.key === 'ArrowLeft') prevLightboxImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showGallery]);

  if (!development) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="font-serif text-3xl text-primary mb-4">Proyecto no encontrado</h1>
        <Link to="/desarrollos" className="text-accent text-xs font-bold uppercase tracking-widest border-b border-accent pb-1">
          Volver a Desarrollos
        </Link>
      </div>
    );
  }

  // Helper to assign images to text-only amenities for the visual carousel (Legacy Fallback)
  const getAmenityImage = (amenityName: string, index: number) => {
      const lower = amenityName.toLowerCase();
      if (lower.includes('pool') || lower.includes('alberca')) return 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop';
      if (lower.includes('gym') || lower.includes('gimnasio') || lower.includes('fitness')) return 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop';
      const fallbacks = [
          'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1600566752355-35792bedcfe1?q=80&w=800&auto=format&fit=crop'
      ];
      return fallbacks[index % fallbacks.length];
  };

  // --- ACTIONS ---

  const handleWhatsApp = (message: string) => {
      const text = encodeURIComponent(message);
      window.open(`https://wa.me/523322275000?text=${text}`, '_blank');
  };

  // --- LIGHTBOX LOGIC ---
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setShowGallery(true);
  };

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % development.images.length);
  };

  const prevLightboxImage = () => {
    setLightboxIndex((prev) => (prev - 1 + development.images.length) % development.images.length);
  };

  return (
    <div className="pt-32 pb-[14px] px-[14px] min-h-screen max-w-[100vw] flex flex-col bg-background">
      <div className="relative w-full h-full rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-white py-0 px-0 shadow-2xl font-sans">

      {/* 1. IMMERSIVE HERO SECTION (WITH SLIDER) */}
      <section className="relative h-screen w-full overflow-hidden">
        
        {/* Background Images Slider */}
        {development.images.slice(0, 5).map((img, idx) => (
            <div 
                key={idx}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === heroImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
                <img 
                    src={img} 
                    alt={`${development.name} cover ${idx+1}`} 
                    className="w-full h-full object-cover transform scale-105" // Slight zoom for parallax feel
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80"></div>
            </div>
        ))}

        {/* Navigation Overlay */}
        <div className="absolute top-20 md:top-24 left-0 w-full px-4 md:px-12 z-20 flex justify-between items-center">
            <Link to="/desarrollos" className="text-white/80 hover:text-white flex items-center gap-2 text-xs font-bold uppercase tracking-widest backdrop-blur-md bg-white/10 px-4 py-2 rounded-full transition-colors">
                <ArrowLeft size={14} /> Volver
            </Link>
            <span className="hidden md:block text-white/60 text-[10px] uppercase tracking-[0.2em] border border-white/20 px-3 py-1 rounded-full">
                Preventa Exclusiva
            </span>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 w-full px-4 md:px-12 pb-8 md:pb-24 z-20">
            <div className="max-w-5xl">
                <div className="mb-4 md:mb-6 flex flex-wrap gap-2 md:gap-4 animate-fadeInUp">
                    <span className="bg-accent text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md">
                        Entrega: {development.completionDate}
                    </span>
                    <span className="bg-white/20 backdrop-blur text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md flex items-center gap-2">
                        <MapPin size={12} /> {development.location}
                    </span>
                </div>
                
                <h1 className="font-serif text-4xl md:text-7xl lg:text-9xl text-white leading-none mb-4 md:mb-6 tracking-tight animate-fadeInUp delay-100">
                    {development.name}
                </h1>
                
                <p className="font-serif text-lg md:text-3xl text-white/90 italic max-w-2xl mb-8 md:mb-12 animate-fadeInUp delay-200">
                    "{development.tagline}"
                </p>

                <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp delay-300">
                    <button 
                        onClick={() => handleWhatsApp(`Hola me interesa descargar el brochure del desarrollo ${development.name}`)}
                        className="bg-white text-primary px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center gap-3"
                    >
                        <Download size={16} /> Descargar Brochure
                    </button>
                    <button 
                         onClick={() => handleWhatsApp(`Hola quiero mas información del desarrollo ${development.name}`)}
                         className="bg-transparent border border-white text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3"
                    >
                        <MessageCircle size={16} /> Solicitar Demo Ahora
                    </button>
                </div>
            </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <div className="bg-primary text-white py-12 px-6 border-b border-white/5">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="flex-1 px-8 text-center md:text-left">
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Precio Inicial</p>
                <p className="font-serif text-3xl">{development.startingPrice}</p>
            </div>
            <div className="flex-1 px-8 text-center md:text-left">
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Plusvalía Estimada</p>
                <p className="font-serif text-3xl text-green-400">+18% Anual</p>
            </div>
            <div className="flex-1 px-8 text-center md:text-left">
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Unidades</p>
                <p className="font-serif text-3xl">Colección Limitada</p>
            </div>
         </div>
      </div>

      {/* 3. STORYTELLING & CONCEPT */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
                <span className="text-accent text-xs font-bold uppercase tracking-widest mb-4 block">El Concepto</span>
                <h2 className="font-serif text-5xl text-primary mb-8 leading-tight">
                    Redefiniendo el horizonte de {development.location}.
                </h2>
                <p className="text-gray-500 text-lg font-light leading-relaxed mb-8 text-justify">
                    {development.description} Este desarrollo no es solo un lugar para habitar, es una declaración de principios. 
                    Arquitectura que desafía lo convencional, espacios diseñados para el bienestar integral y una ubicación 
                    que conecta con lo mejor de la ciudad.
                </p>
                <div className="border-l-4 border-accent pl-6 py-2">
                    <p className="font-serif italic text-xl text-primary mb-2">
                        "Diseñado para aquellos que entienden que el verdadero lujo es el tiempo y el espacio."
                    </p>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Arquitecto Principal</p>
                </div>
            </div>
            <div className="relative cursor-pointer group" onClick={() => openLightbox(0)}>
                <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gray-200 shadow-2xl relative">
                    <img 
                        src={development.images[1] || development.images[0]} 
                        alt="Concept Architecture" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                       <span className="bg-white/90 backdrop-blur px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
                          Ver Galería
                       </span>
                    </div>
                </div>
                <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden md:block pointer-events-none">
                     <div className="flex items-center gap-2 mb-2">
                         <Star className="text-accent fill-accent" size={16} />
                         <Star className="text-accent fill-accent" size={16} />
                         <Star className="text-accent fill-accent" size={16} />
                         <Star className="text-accent fill-accent" size={16} />
                         <Star className="text-accent fill-accent" size={16} />
                     </div>
                     <p className="text-primary font-serif text-lg leading-tight">Certificación LEED Gold en sustentabilidad.</p>
                </div>
            </div>
         </div>
      </section>

      {/* 4. INTERACTIVE TABS (Amenities & Lifestyle) */}
      <section className="bg-gray-50 py-24 overflow-hidden border-t border-gray-100">
          <div className="max-w-[1920px] mx-auto px-6">
              
              {/* UPDATED SELECTOR - RESPONSIVE SCROLL & SIZE */}
              <div className="flex justify-center mb-20 overflow-x-auto no-scrollbar">
                  <div className="inline-flex bg-white rounded-full p-2 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 whitespace-nowrap">
                      {(['concept', 'amenities', 'units'] as const).map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2.5 md:px-12 md:py-4 rounded-full text-[10px] md:text-sm font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                                activeTab === tab 
                                ? 'bg-primary text-white shadow-lg scale-105' 
                                : 'text-gray-400 hover:text-primary hover:bg-gray-50'
                            }`}
                          >
                            {tab === 'concept' ? 'Galería' : tab === 'amenities' ? 'Amenidades' : 'Tipologías'}
                          </button>
                      ))}
                  </div>
              </div>

              {/* TAB CONTENT: AMENITIES (EXPANDING CARDS CAROUSEL) */}
              {activeTab === 'amenities' && (
                  <div className="animate-fadeIn">
                      {development.amenityCategories && development.amenityCategories.length > 0 ? (
                          // --- EXPANDING CARDS LAYOUT ---
                          <div className="flex flex-col lg:flex-row h-auto lg:h-[700px] gap-4 lg:gap-4 w-full">
                              {development.amenityCategories.map((cat, idx) => (
                                  <div 
                                    key={idx} 
                                    // Mobile: Static height accordion/card. Desktop: Expanding flex.
                                    className={`
                                        relative rounded-[2rem] overflow-hidden cursor-pointer shadow-lg border border-gray-100
                                        transition-[flex-grow,opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                                        h-[400px] lg:h-auto
                                        lg:flex-1 lg:hover:flex-[3.5] group
                                        flex flex-col justify-end
                                    `}
                                    onMouseEnter={() => setActiveAmenityIndex(idx)}
                                  >
                                      {/* Background Image - Zooms on hover */}
                                      <div className="absolute inset-0">
                                          <img 
                                            src={cat.image} 
                                            alt={cat.title} 
                                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 grayscale group-hover:grayscale-0"
                                          />
                                          {/* Gradient Overlay */}
                                          <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/20 to-primary/90 transition-opacity duration-500 group-hover:via-primary/40 group-hover:to-primary/95"></div>
                                      </div>

                                      {/* Content Overlay */}
                                      <div className="relative z-10 p-8 md:p-12 w-full transform transition-all duration-500">
                                          
                                          {/* Vertical Text Label (Visible when collapsed on Desktop) */}
                                          <div className="lg:absolute lg:bottom-12 lg:left-1/2 lg:-translate-x-1/2 lg:group-hover:opacity-0 lg:group-hover:translate-y-8 transition-all duration-300">
                                              <h3 className="text-white/80 font-bold uppercase tracking-[0.3em] text-xs lg:-rotate-90 whitespace-nowrap hidden lg:block">
                                                  {cat.title}
                                              </h3>
                                          </div>

                                          {/* Expanded Content (Visible on Hover/Active or Mobile) */}
                                          <div className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:translate-y-4 lg:group-hover:translate-y-0 transition-all duration-500 delay-100">
                                              <h3 className="font-serif text-3xl md:text-4xl text-white mb-4 tracking-tight leading-none">
                                                  {cat.title}
                                              </h3>
                                              <div className="w-12 h-1 bg-accent rounded-full mb-6"></div>

                                              {/* The List - Scrollable on mobile if needed, expanded on desktop hover */}
                                              <div className="max-h-[150px] lg:max-h-0 lg:group-hover:max-h-[400px] overflow-y-auto lg:overflow-hidden transition-[max-height] duration-700 ease-in-out no-scrollbar">
                                                  <ul className="grid grid-cols-1 gap-3">
                                                      {cat.items.map((item, itemIdx) => (
                                                          <li key={itemIdx} className="text-white/90 text-sm font-light flex items-center gap-3 animate-fadeInUp" style={{animationDelay: `${itemIdx * 50}ms`}}>
                                                              <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"></div>
                                                              {item}
                                                          </li>
                                                      ))}
                                                  </ul>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      ) : (
                          // --- FALLBACK LEGACY CAROUSEL ---
                          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-12 -mx-6 px-6 md:mx-0 md:px-0 no-scrollbar">
                                {development.amenities.map((amenity, idx) => (
                                    <div key={idx} className="snap-center shrink-0 w-[280px] md:w-[350px] h-[450px] relative rounded-[2rem] overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300 bg-gray-200">
                                        <img src={getAmenityImage(amenity, idx)} alt={amenity} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 w-full p-8">
                                            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white mb-4 border border-white/30"><CheckCircle2 size={24} /></div>
                                            <h3 className="font-serif text-2xl text-white mb-2">{amenity}</h3>
                                        </div>
                                    </div>
                                ))}
                          </div>
                      )}
                  </div>
              )}

              {/* TAB CONTENT: UNITS CAROUSEL */}
              {activeTab === 'units' && (
                  <div className="animate-fadeIn">
                      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-12 -mx-6 px-6 md:mx-0 md:px-0 no-scrollbar">
                          {development.units && development.units.length > 0 ? (
                            development.units.map((unit, idx) => (
                              <div key={idx} className="snap-center shrink-0 w-[85vw] md:w-[400px] bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col">
                                  {/* Top Image Area */}
                                  <div 
                                    className="h-64 bg-gray-200 relative overflow-hidden group cursor-pointer"
                                    onClick={() => openLightbox(idx)} // Optional: Open lightbox for unit images too
                                  >
                                      <img 
                                        src={unit.image} 
                                        alt={unit.name} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                      />
                                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest text-primary shadow-sm">
                                          {unit.area}
                                      </div>
                                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                          <ExternalLink size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                      </div>
                                  </div>
                                  
                                  {/* Info Area */}
                                  <div className="p-8 flex-1 flex flex-col">
                                      <h3 className="font-serif text-2xl text-primary mb-1">{unit.name}</h3>
                                      <div className="text-gray-500 text-xs mb-6 flex gap-3">
                                          <span>{unit.bedrooms} Recámaras</span> • <span>{unit.bathrooms} Baños</span>
                                      </div>
                                      
                                      <div className="mt-auto">
                                          <p className="text-accent text-[10px] font-bold uppercase tracking-widest mb-1">Precio de Lista</p>
                                          <p className="font-serif text-3xl text-primary mb-6">{unit.price}</p>
                                          
                                          <button 
                                            onClick={() => handleWhatsApp(`Hola! quisiera cotizar una unidad ${unit.name} en el desarrollo ${development.name}`)}
                                            className="w-full bg-primary text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-accent transition-colors flex items-center justify-center gap-2"
                                          >
                                              <MessageCircle size={14}/> Solicitar Cotización
                                          </button>
                                      </div>
                                  </div>
                              </div>
                            ))
                          ) : (
                            <div className="w-full text-center py-12 text-gray-500">
                                No hay información de unidades disponible por el momento.
                            </div>
                          )}
                      </div>
                  </div>
              )}

              {/* TAB CONTENT: GALLERY GRID (RESPONSIVE) */}
              {activeTab === 'concept' && (
                  <div className="animate-fadeIn">
                      {/* MOBILE CAROUSEL */}
                      <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-8 -mx-6 px-6 no-scrollbar h-[400px]">
                          {development.images.map((img, idx) => (
                              <div 
                                key={idx} 
                                className="snap-center shrink-0 w-[85vw] h-full rounded-[2rem] overflow-hidden relative shadow-lg cursor-pointer"
                                onClick={() => openLightbox(idx)}
                              >
                                  <img src={img} loading="lazy" className="w-full h-full object-cover" alt={`Gallery ${idx + 1}`} />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                                  <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur p-2 rounded-full text-white">
                                      <ExternalLink size={20} />
                                  </div>
                              </div>
                          ))}
                      </div>

                      {/* DESKTOP BENTO GRID */}
                      <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
                          <div 
                            className="md:col-span-2 md:row-span-2 h-full rounded-2xl overflow-hidden relative group cursor-pointer"
                            onClick={() => openLightbox(0)}
                          >
                              <img src={development.images[0]} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Gallery 1" />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity"><ExternalLink size={32}/></span>
                              </div>
                          </div>
                          <div 
                            className="h-full rounded-2xl overflow-hidden relative group cursor-pointer"
                            onClick={() => openLightbox(1)}
                          >
                              <img src={development.images[1] || development.images[0]} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Gallery 2" />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity"><ExternalLink size={24}/></span>
                              </div>
                          </div>
                          <div 
                            className="h-full rounded-2xl overflow-hidden relative group hidden md:block cursor-pointer"
                            onClick={() => openLightbox(2)}
                          >
                              <img src={development.images[2 % development.images.length]} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Gallery 3" />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity"><ExternalLink size={24}/></span>
                              </div>
                          </div>
                      </div>
                  </div>
              )}
          </div>
      </section>

      {/* 5. LEAD GEN / CTA SECTION */}
      <section className="bg-primary py-24 px-6 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-md rounded-[3rem] p-8 md:p-16 border border-white/10 relative z-10">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                  <div className="md:w-1/2 text-white">
                      <span className="text-accent text-xs font-bold uppercase tracking-widest mb-4 block">Lista Cero / Friends & Family</span>
                      <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">
                          Asegura tu lugar como early access y elige primero al mejor precio.
                      </h2>
                      <p className="text-white/60 font-light leading-relaxed mb-8">
                          Regístrese ahora para acceder a precios de lista cero, selección prioritaria de unidades y esquemas de pago preferenciales para inversionistas fundadores.
                      </p>
                      <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-white/40">
                          <div className="flex -space-x-2">
                             {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-gray-600 border-2 border-primary"></div>)}
                          </div>
                          <span>+45 Inversionistas registrados</span>
                      </div>
                  </div>

                  <div className="md:w-1/2 w-full bg-white rounded-3xl p-8 shadow-2xl">
                      <h3 className="font-serif text-2xl text-primary mb-6">Solicitar Acceso</h3>
                      <p className="text-gray-500 mb-6 text-sm">
                          Contáctanos por WhatsApp para registrar tu interés y asegurar tu lugar en la lista cero.
                      </p>
                      <button 
                          onClick={() => handleWhatsApp(`Hola me interesa registrarme como early access para el desarrollo ${development.name}`)}
                          className="w-full bg-primary text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-accent transition-colors shadow-lg flex items-center justify-center gap-2"
                      >
                          <MessageCircle size={16} /> Contactar por WhatsApp
                      </button>
                  </div>
              </div>
          </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {showGallery && (
          <div className="fixed inset-0 z-[100] bg-black/95 animate-fadeIn flex items-center justify-center">
              <button onClick={() => setShowGallery(false)} className="absolute top-6 right-6 z-20 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors">
                  <X size={24} />
              </button>
              <div className="absolute top-6 left-6 z-20 text-white font-serif text-xl tracking-tight">
                  {lightboxIndex + 1} <span className="text-gray-500 text-sm font-sans mx-2">/</span> {development.images.length}
              </div>
              <button onClick={prevLightboxImage} className="absolute left-4 md:left-8 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors z-20 group">
                  <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
              </button>
              <button onClick={nextLightboxImage} className="absolute right-4 md:right-8 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors z-20 group">
                  <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="w-full h-full flex items-center justify-center p-4 md:p-12">
                  <img src={development.images[lightboxIndex]} alt={`Gallery view ${lightboxIndex + 1}`} className="max-h-full max-w-full object-contain rounded-sm shadow-2xl" />
              </div>
          </div>
      )}



      </div>
    </div>
  );
};

export default DevelopmentDetail;
