
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProperties } from '../data/mockData';
import { fetchEasyBrokerProperty } from '../services/easybroker';
import { supabase } from '../lib/supabase';
import { 
  MapPin, BedDouble, Bath, Maximize, ArrowLeft, Check, Car, 
  Share2, MessageCircle, Camera, 
  LandPlot, School, ShoppingBag, HeartPulse, TreePine, ChevronRight, ChevronLeft, Play, X, Navigation, CheckCircle2, Loader2
} from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import PropertyMap from '../components/PropertyMap';
import { Property } from '../types';
import { motion, AnimatePresence } from 'motion/react';

const PropertyDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [property, setProperty] = useState<Property | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  
  // Gallery & Lightbox State
  const [showGallery, setShowGallery] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    
    const loadProperty = async () => {
      // Load all properties for suggestions
      let props: Property[] = [];
      if (supabase) {
        const { data } = await supabase.from('properties').select('*');
        if (data && data.length > 0) {
          props = data as Property[];
        } else {
          props = getProperties();
        }
      } else {
        props = getProperties();
      }
      setAllProperties(props);

      // 1. Try fetching from Supabase
      if (supabase) {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('slug', slug)
          .single();
          
        if (!error && data) {
          setProperty(data as Property);
          setLoading(false);
          return;
        }
      }

      // 2. Check local mock data
      const found = props.find(p => p.slug === slug);
      if (found) {
        setProperty(found);
        setLoading(false);
        return;
      }

      // 3. If not found locally, try to fetch from EasyBroker API
      if (slug) {
        const externalProp = await fetchEasyBrokerProperty(slug.toUpperCase());
        if (externalProp) {
          setProperty(externalProp);
          setLoading(false);
          return;
        }
      }

      setProperty(undefined);
      setLoading(false);
    };

    loadProperty();
  }, [slug]);

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
  }, [showGallery, property]);



  if (loading) {
    return <DetailSkeleton />;
  }

  if (!property) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <h2 className="font-serif text-3xl tracking-tight">Propiedad no encontrada</h2>
        <Link to="/propiedades" className="text-accent underline mt-4">Volver a la Colección</Link>
      </div>
    );
  }

  // --- LIGHTBOX ACTIONS ---
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setShowGallery(true);
  };

  const nextLightboxImage = () => {
    if (!property || !property.images || property.images.length === 0) return;
    setLightboxIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevLightboxImage = () => {
    if (!property || !property.images || property.images.length === 0) return;
    setLightboxIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  // Filter relevant amenities
  const suggestions = allProperties.filter(p => p.id !== property.id).slice(0, 5);

  const handleShare = () => {
     navigator.clipboard.writeText(window.location.href);
     // Use a simpler feedback mechanism or a small toast if possible, 
     // but alert is acceptable for share action in this context as fallback
     // ideally replace with a custom tooltip
     const btn = document.getElementById('share-btn');
     if(btn) {
         const original = btn.innerHTML;
         btn.innerHTML = '<span class="text-xs font-bold text-accent">¡Copiado!</span>';
         setTimeout(() => btn.innerHTML = original, 2000);
     }
  };



  // --- MAP LINKS HELPER ---
  const locationString = typeof property.location === 'object' && property.location !== null 
    ? (property.location as any).name || '' 
    : property.location;

  const mapQuery = property.coordinates 
    ? `${property.coordinates.lat},${property.coordinates.lng}` 
    : locationString;

  const externalMapUrl = property.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
  const embedMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <>
      <MobilePropertyDetail property={property} handleShare={handleShare} />
      
      <div className="hidden md:flex pt-24 md:pt-32 pb-[14px] px-[14px] min-h-screen max-w-[100vw] flex-col bg-background">
        <div className="relative w-full h-full rounded-3xl md:rounded-[3rem] overflow-hidden bg-white py-8 md:py-12 px-4 md:px-12 lg:px-20 shadow-2xl">
        
        {/* 1. TOP NAVIGATION ROW */}
      <div className="max-w-[1920px] mx-auto px-2 md:px-12 mb-6 flex justify-between items-center">
         <Link to="/propiedades" className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-primary transition-colors">
            <div className="bg-gray-50 p-2.5 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                <ArrowLeft size={16} className="text-primary"/>
            </div>
            <span>Regresar a Resultados</span>
         </Link>

         <button id="share-btn" onClick={handleShare} className="p-2.5 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors shadow-sm min-w-[40px] flex items-center justify-center">
            <Share2 size={18} />
         </button>
      </div>

      {/* 2. HERO GALLERY SECTION */}
      <div className="max-w-[1920px] mx-auto mb-12 relative px-0 md:px-12">
          
          {/* --- DESKTOP: BENTO GRID (EXACT LAYOUT) --- */}
          <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-4 h-[650px] w-full">
             
             {/* Main Image (Left Half) */}
             <div 
                className="col-span-2 row-span-2 relative rounded-3xl overflow-hidden cursor-pointer group shadow-sm"
                onClick={() => openLightbox(0)}
             >
                <img 
                  src={property.images && property.images.length > 0 ? property.images[0] : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800'} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  alt="Vista Principal" 
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                
                {/* Botón Ver Video (Estilo Botón Flotante) */}
                <button className="absolute bottom-6 left-6 bg-white text-primary px-6 py-3 rounded-full flex items-center gap-3 text-xs font-bold uppercase tracking-widest shadow-xl hover:scale-105 transition-transform z-20">
                     <Play size={14} fill="currentColor" /> Ver Video
                </button>
             </div>

             {/* Small Images (Right Side) */}
             <div className="col-span-1 row-span-1 relative rounded-3xl overflow-hidden cursor-pointer group shadow-sm" onClick={() => openLightbox(1)}>
                  <img src={property.images && property.images.length > 1 ? property.images[1] : 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800'} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Vista 2"/>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"/>
             </div>

             <div className="col-span-1 row-span-1 relative rounded-3xl overflow-hidden cursor-pointer group shadow-sm" onClick={() => openLightbox(2)}>
                  <img src={property.images && property.images.length > 2 ? property.images[2] : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800'} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Vista 3"/>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"/>
             </div>

             <div className="col-span-1 row-span-1 relative rounded-3xl overflow-hidden cursor-pointer group shadow-sm" onClick={() => openLightbox(3)}>
                  <img src={property.images && property.images.length > 3 ? property.images[3] : 'https://images.unsplash.com/photo-1600607687931-ceeb66d18f51?auto=format&fit=crop&q=80&w=800'} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Vista 4"/>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"/>
             </div>

             {/* Last Image with Overlay (View Gallery) */}
             <div className="col-span-1 row-span-1 relative rounded-3xl overflow-hidden cursor-pointer group shadow-sm" onClick={() => openLightbox(0)}>
                  <img src={property.images && property.images.length > 4 ? property.images[4] : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800'} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Vista 5"/>
                  
                  {/* Dark Overlay with Counter */}
                  <div className="absolute inset-0 bg-primary/60 backdrop-blur-[1px] group-hover:bg-primary/50 transition-colors flex flex-col items-center justify-center text-white">
                      <span className="font-serif text-5xl mb-2">+{property.images ? property.images.length : 0}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                        <Camera size={16} /> Ver Galería
                      </span>
                  </div>
             </div>
          </div>
      </div>

      {/* 3. MAIN CONTENT SPLIT */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* LEFT COLUMN: INFO & SPECS */}
        <div className="lg:col-span-7 space-y-10">
           
           {/* Header Info */}
           <div className="border-b border-gray-300 pb-8">
               <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-md shadow-sm">
                       {property.type === 'residential' ? 'Residencial' : property.type}
                    </span>
                    {property.isFeatured && (
                        <span className="px-3 py-1 bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest rounded-md">
                        Selección Exclusiva
                        </span>
                    )}
                </div>
                <h1 className="font-serif text-4xl md:text-6xl text-primary tracking-tight-heading leading-tight mb-4">
                    {property.title}
                </h1>
                <div className="flex flex-col md:flex-row md:items-center gap-4 text-gray-500">
                    <div className="flex items-center gap-2">
                        <MapPin size={18} className="text-accent" /> 
                        <span className="text-base font-medium">{locationString}</span>
                    </div>
                </div>
           </div>

           {/* Price & Primary Specs */}
           <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-white/50">
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Precio de Lista</p>
              <p className="font-serif text-5xl md:text-6xl text-primary tracking-tight mb-8">{property.price}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
                  <SpecItem icon={<Maximize size={24}/>} label="Construcción" value={property.constructionArea} />
                  {property.landArea && <SpecItem icon={<LandPlot size={24}/>} label="Terreno" value={property.landArea} />}
                  <SpecItem icon={<BedDouble size={24}/>} label="Recámaras" value={property.bedrooms} />
                  <SpecItem icon={<Bath size={24}/>} label="Baños" value={property.bathrooms} />
                  <SpecItem icon={<Car size={24}/>} label="Estacionamiento" value={property.parking} />
              </div>
           </div>

           {/* Description */}
           <div className="prose prose-lg prose-headings:font-serif prose-p:text-gray-600 prose-p:font-light prose-p:leading-relaxed max-w-none">
             <h3 className="text-3xl text-primary mb-6">Descripción</h3>
             <p className="whitespace-pre-line">{property.description}</p>
           </div>

           {/* Amenities */}
           <div>
             <h3 className="font-serif text-3xl mb-8 tracking-tight text-primary">Características & Amenidades</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-8 h-8 rounded-full bg-surface-light flex items-center justify-center text-primary">
                        <Check size={14} strokeWidth={3} />
                    </div>
                    <span className="text-gray-700 font-medium">{feat}</span>
                  </div>
                ))}
             </div>
           </div>

           {/* Map & Location Section */}
           <div>
              <div className="flex items-center gap-3 mb-8">
                 <h3 className="font-serif text-3xl tracking-tight text-primary m-0">Ubicación y Entorno</h3>
                 <div className="h-[1px] flex-grow bg-gray-200"></div>
              </div>
              
              <div className="bg-white p-2 rounded-3xl shadow-lg border border-gray-100 mb-8 overflow-hidden relative group cursor-pointer" onClick={() => setShowMap(true)}>
                   <div className="w-full h-[400px] rounded-[1.5rem] overflow-hidden relative z-10">
                      <PropertyMap 
                        properties={[property]} 
                        center={property.coordinates ? [property.coordinates.lat, property.coordinates.lng] : undefined}
                        interactive={false}
                      />
                      {/* Transparent overlay to capture clicks */}
                      <div className="absolute inset-0 z-20 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                   </div>
                
                {/* External Link Button Overlay */}
                <div className="absolute bottom-6 right-6 z-30">
                     <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(externalMapUrl, '_blank');
                        }}
                        className="bg-white text-primary px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-lg hover:bg-accent hover:text-white transition-colors flex items-center gap-2"
                     >
                        <MapPin size={14} /> Abrir en Google Maps
                     </button>
                </div>
              </div>

              {/* POINTS OF INTEREST LIST - Explicitly Rendered */}
              {property.pointsOfInterest && property.pointsOfInterest.length > 0 && (
                 <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mt-8">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-accent mb-6 flex items-center gap-2">
                        <Navigation size={14} /> Cercanías
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                        {property.pointsOfInterest.map((poi, idx) => (
                        <div key={idx} className="flex items-start gap-4 group">
                            <div className="mt-1">
                                <POIIcon category={poi.category} />
                            </div>
                            <div>
                                <p className="font-bold text-primary text-sm group-hover:text-accent transition-colors">{poi.name}</p>
                                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                    <span className="bg-gray-100 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">{mapPOICategory(poi.category)}</span>
                                    <span className="text-gray-300">•</span>
                                    <span className="text-primary font-bold">{poi.distance}</span>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                 </div>
              )}
           </div>

        </div>

        {/* RIGHT COLUMN: STICKY SIDEBAR */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-28 space-y-6">
             
             {/* Main CTA Card */}
             <div className="bg-primary text-white p-8 md:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden isolate">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 -z-10"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/20 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2 -z-10"></div>
                
                <h3 className="font-serif text-3xl mb-2 tracking-tight">¿Le interesa esta propiedad?</h3>
                <p className="text-white/70 text-sm mb-8 font-light">
                    Agende una visita privada o solicite la ficha técnica detallada para evaluación.
                </p>
                
                <div className="space-y-4">
                    <button 
                        onClick={() => {
                            const currentUrl = window.location.href;
                            const message = `Hola me interesa esta propiedad ${currentUrl}`;
                            window.open(`https://wa.me/523322275000?text=${encodeURIComponent(message)}`, '_blank');
                        }}
                        className="w-full bg-white text-primary font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-accent hover:text-white transition-all duration-300 text-xs shadow-lg transform active:scale-95"
                    >
                        Reservar Cita
                    </button>
                    
                    <button 
                        onClick={() => {
                            const currentUrl = window.location.href;
                            const message = `Hola me interesa esta propiedad ${currentUrl}`;
                            window.open(`https://wa.me/523322275000?text=${encodeURIComponent(message)}`, '_blank');
                        }}
                        className="w-full border border-white/30 text-white font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-white/10 transition-all duration-300 text-xs"
                    >
                        Solicitar Ficha Técnica
                    </button>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 text-center">
                    <a 
                       href="https://wa.me/523322275000"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="inline-flex items-center gap-2 text-[#25D366] font-bold text-sm hover:text-white transition-colors p-2 rounded-lg hover:bg-[#25D366]/20"
                    >
                        <MessageCircle size={20} /> Hablar por WhatsApp
                    </a>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* SUGGESTIONS CAROUSEL (CAROUSEL ON BOTH MOBILE AND DESKTOP) */}
      <section className="mt-32 pt-24 border-t border-gray-200 bg-surface-light">
          <div className="max-w-7xl mx-auto px-6">
              <div className="flex justify-between items-end mb-12">
                  <div>
                    <h2 className="font-serif text-4xl text-primary tracking-tight">Podría Interesarle</h2>
                    <p className="text-gray-500 mt-2">Propiedades similares en nuestra colección exclusiva.</p>
                  </div>
                  <Link to="/propiedades" className="hidden md:block text-xs font-bold uppercase tracking-widest text-accent hover:text-primary transition-colors">
                      Ver todo el inventario
                  </Link>
              </div>
              
              <div className="
                  flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 px-6 -mx-6 md:mx-0 md:px-0
                  no-scrollbar
              ">
                  {suggestions.map(s => (
                      <div key={s.id} className="
                          snap-center shrink-0 w-[85vw] md:w-[400px] h-[500px]
                      ">
                        <PropertyCard property={s} />
                      </div>
                  ))}
              </div>
          </div>
      </section>



      {/* FULL GALLERY LIGHTBOX (SINGLE IMAGE) */}
      {showGallery && (
          <div className="fixed inset-0 z-[100] bg-black/95 animate-fadeIn flex items-center justify-center">
              {/* Close Button */}
              <button 
                  onClick={() => setShowGallery(false)} 
                  className="absolute top-6 right-6 z-20 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
              >
                  <X size={24} />
              </button>
              
              {/* Image Counter */}
              <div className="absolute top-6 left-6 z-20 text-white font-serif text-xl tracking-tight">
                  {lightboxIndex + 1} <span className="text-gray-500 text-sm font-sans mx-2">/</span> {property.images ? property.images.length : 0}
              </div>

              {/* Navigation Left */}
              <button 
                  onClick={prevLightboxImage}
                  className="absolute left-4 md:left-8 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors z-20 group"
              >
                  <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
              </button>

              {/* Navigation Right */}
              <button 
                  onClick={nextLightboxImage}
                  className="absolute right-4 md:right-8 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors z-20 group"
              >
                  <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Main Image */}
              <div className="w-full h-full flex items-center justify-center p-4 md:p-12">
                  <img 
                      src={property.images && property.images.length > 0 ? property.images[lightboxIndex] : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800'} 
                      alt={`Gallery view ${lightboxIndex + 1}`} 
                      className="max-h-full max-w-full object-contain rounded-sm shadow-2xl"
                  />
              </div>

              {/* Thumbnails Strip (Optional visual context) */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex gap-2 p-2 bg-black/50 backdrop-blur rounded-full">
                  {property.images && property.images.map((_, idx) => (
                      <div 
                          key={idx}
                          onClick={() => setLightboxIndex(idx)}
                          className={`w-2 h-2 rounded-full cursor-pointer transition-all ${idx === lightboxIndex ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/50'}`}
                      />
                  ))}
              </div>
          </div>
      )}

      {/* FULL SCREEN MAP MODAL */}
      <AnimatePresence>
        {showMap && (
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col"
          >
            <div className="flex justify-between items-center p-6 bg-white shadow-sm z-10">
              <h3 className="font-serif text-2xl text-primary tracking-tight">Ubicación: {property.title}</h3>
              <button 
                onClick={() => setShowMap(false)}
                className="p-2 bg-gray-100 rounded-full text-primary hover:bg-gray-200 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-grow relative">
              <PropertyMap 
                properties={[property]} 
                center={property.coordinates ? [property.coordinates.lat, property.coordinates.lng] : undefined}
                interactive={true}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      </div>
    </div>
    </>
  );
};

// ... (Subcomponents unchanged)
const SpecItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number | undefined }) => {
    if (!value) return null;
    return (
        <div className="flex flex-col gap-2">
            <div className="text-gray-300">{icon}</div>
            <div>
                <p className="font-bold text-xl text-primary">{value}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</p>
            </div>
        </div>
    );
};

const POIIcon = ({ category }: { category: string }) => {
    const iconClass = "text-primary group-hover:text-accent transition-colors";
    const bgClass = "bg-gray-50 p-3 rounded-full shrink-0 group-hover:bg-white border border-transparent group-hover:border-gray-100 transition-all shadow-sm";
    switch(category) {
        case 'school': return <div className={bgClass}><School size={20} className={iconClass}/></div>;
        case 'shopping': return <div className={bgClass}><ShoppingBag size={20} className={iconClass}/></div>;
        case 'hospital': return <div className={bgClass}><HeartPulse size={20} className={iconClass}/></div>;
        case 'tourism': return <div className={bgClass}><TreePine size={20} className={iconClass}/></div>;
        default: return <div className={bgClass}><MapPin size={20} className={iconClass}/></div>;
    }
};

const mapPOICategory = (cat: string) => {
    const map: Record<string, string> = {
        school: 'Educación',
        shopping: 'Lifestyle',
        hospital: 'Salud',
        office: 'Corporativo',
        tourism: 'Turismo'
    };
    return map[cat] || cat;
};

const MobilePropertyDetail = ({ property, handleShare }: { property: Property, handleShare: () => void }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  
  const operation = property.price.toLowerCase().includes('renta') || property.price.toLowerCase().includes('mes') ? 'Renta' : 'Venta';

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.clientWidth;
    const newIndex = Math.round(scrollLeft / width);
    if (newIndex !== currentImageIndex) {
      setCurrentImageIndex(newIndex);
    }
  };

  return (
    <div className="md:hidden bg-white min-h-screen pb-32">
      <div className="relative w-full h-[50vh]">
        <div 
          className="w-full h-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar overscroll-x-contain"
          onScroll={handleScroll}
        >
          {property.images && property.images.length > 0 ? (
            property.images.map((img, idx) => (
              <img 
                key={idx}
                src={img} 
                className="w-full h-full object-cover shrink-0 snap-center" 
                alt={`${property.title} - ${idx + 1}`}
                loading={idx === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            ))
          ) : (
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800" 
              className="w-full h-full object-cover shrink-0 snap-center" 
              alt={property.title}
              loading="eager"
              decoding="async"
            />
          )}
        </div>
        
        {/* Pagination Dots */}
        {property.images && property.images.length > 1 && (
          <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 z-10">
            {property.images.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'}`} 
              />
            ))}
          </div>
        )}

        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-4 bg-white p-2 rounded-full shadow-md z-10"
        >
          <ChevronLeft size={20} className="text-primary" />
        </button>
        <div className="absolute top-6 right-4 flex gap-2 z-10">
          <button onClick={handleShare} className="bg-white p-2 rounded-full shadow-md">
            <Share2 size={20} className="text-primary" />
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-t-3xl -mt-6 relative z-10 p-6">
        <h2 className="text-2xl font-serif font-bold text-primary mb-2 text-pretty">{property.title}</h2>
        <p className="text-gray-500 text-sm mb-6 text-pretty">{typeof property.location === 'object' && property.location !== null ? (property.location as any).name : property.location}</p>
        
        {/* Features */}
        <div className="flex gap-6 mb-8 border-y border-gray-100 py-6 overflow-x-auto hide-scrollbar">
          {property.bedrooms && (
            <div className="flex flex-col items-center min-w-[60px]">
              <BedDouble size={24} className="text-gray-400 mb-2" />
              <span className="text-xs font-medium text-gray-600">{property.bedrooms} Rec</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex flex-col items-center min-w-[60px]">
              <Bath size={24} className="text-gray-400 mb-2" />
              <span className="text-xs font-medium text-gray-600">{property.bathrooms} Baños</span>
            </div>
          )}
          {property.parking && (
            <div className="flex flex-col items-center min-w-[60px]">
              <Car size={24} className="text-gray-400 mb-2" />
              <span className="text-xs font-medium text-gray-600">{property.parking} Est</span>
            </div>
          )}
          <div className="flex flex-col items-center min-w-[60px]">
            <Maximize size={24} className="text-gray-400 mb-2" />
            <span className="text-xs font-medium text-gray-600">{property.constructionArea}</span>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-serif text-xl text-primary mb-4">Acerca de esta propiedad</h3>
          <p className="text-gray-600 text-sm leading-relaxed text-pretty">
            {property.description}
          </p>
        </div>

        {/* Amenities */}
        {property.amenities && property.amenities.length > 0 && (
          <div className="mb-8">
            <h3 className="font-serif text-xl text-primary mb-4">Amenidades</h3>
            <div className="grid grid-cols-2 gap-4">
              {property.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                  <Check size={16} className="text-accent shrink-0" />
                  <span className="truncate">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video */}
        {property.videoUrl && (
          <div className="mb-8">
            <h3 className="font-serif text-xl text-primary mb-4">Recorrido Virtual</h3>
            <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100 shadow-sm relative">
              <iframe 
                src={property.videoUrl.replace('watch?v=', 'embed/')} 
                className="w-full h-full absolute inset-0" 
                allowFullScreen 
                loading="lazy"
                title="Recorrido Virtual"
              />
            </div>
          </div>
        )}

        {/* Map */}
        <div className="mb-8">
          <h3 className="font-serif text-xl text-primary mb-4">Ubicación</h3>
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 relative shadow-sm">
            <iframe 
              src={`https://maps.google.com/maps?q=${encodeURIComponent(typeof property.location === 'object' && property.location !== null ? (property.location as any).name : property.location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              className="w-full h-full border-0 absolute inset-0"
              loading="lazy"
              title="Mapa de ubicación"
            />
          </div>
          <a 
            href={property.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(typeof property.location === 'object' && property.location !== null ? (property.location as any).name : property.location)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center gap-2 text-accent text-sm font-bold uppercase tracking-widest hover:underline"
          >
            <Navigation size={16} />
            Abrir en Google Maps
          </a>
        </div>

        {/* Agent */}
        <div className="mb-8 p-6 bg-gray-50 rounded-2xl flex items-center gap-4 border border-gray-100">
          <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden shrink-0">
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200" alt="Agente" className="w-full h-full object-cover" loading="lazy" decoding="async" />
          </div>
          <div>
            <p className="font-bold text-primary">Casa de Alba</p>
            <p className="text-sm text-gray-500">Agente Inmobiliario</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 pb-8 flex justify-between items-center z-[101]">
        <div>
          <p className="text-lg font-bold text-primary">{property.price}</p>
          <p className="text-xs text-gray-500">{operation}</p>
        </div>
        <a 
          href={`https://wa.me/523322275000?text=${encodeURIComponent(`Hola me interesa esta propiedad: ${property.title}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#FF5A36] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg"
        >
          Agendar cita por WhatsApp
        </a>
      </div>
    </div>
  );
};

// --- SKELETON LOADER ---
const DetailSkeleton = () => (
    <div className="bg-white min-h-screen pt-28 pb-24 px-6">
        <div className="max-w-7xl mx-auto mb-8 animate-pulse">
            <div className="h-4 w-32 bg-gray-200 rounded mb-6"></div>
            <div className="h-12 w-3/4 bg-gray-200 rounded mb-4"></div>
            <div className="h-6 w-48 bg-gray-200 rounded"></div>
        </div>
        
        <div className="max-w-7xl mx-auto mb-12">
            <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[500px] rounded-3xl overflow-hidden">
                 <div className="col-span-2 row-span-2 bg-gray-200 animate-pulse"></div>
                 <div className="col-span-1 row-span-1 bg-gray-200 animate-pulse"></div>
                 <div className="col-span-1 row-span-1 bg-gray-200 animate-pulse"></div>
                 <div className="col-span-1 row-span-1 bg-gray-200 animate-pulse"></div>
                 <div className="col-span-1 row-span-1 bg-gray-200 animate-pulse"></div>
            </div>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7 space-y-8">
                <div className="h-64 bg-gray-100 rounded-3xl animate-pulse"></div>
                <div className="space-y-4">
                    <div className="h-4 w-full bg-gray-100 rounded"></div>
                    <div className="h-4 w-full bg-gray-100 rounded"></div>
                    <div className="h-4 w-2/3 bg-gray-100 rounded"></div>
                </div>
            </div>
            <div className="lg:col-span-5">
                <div className="h-96 bg-gray-100 rounded-3xl animate-pulse"></div>
            </div>
        </div>
    </div>
);

export default PropertyDetail;
