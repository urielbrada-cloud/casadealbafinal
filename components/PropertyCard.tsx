
import React, { useState, useEffect } from 'react';
import { Property } from '../types';
import { Link } from 'react-router-dom';
import { MapPin, BedDouble, Bath, Maximize, ChevronLeft, ChevronRight, Car, X, Share, Check, Play, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PropertyCardProps {
  property: Property;
  variant?: 'portrait' | 'landscape';
}

const mapTypeToSpanish = (type: string) => {
  switch(type) {
    case 'residential': return 'Residencial';
    case 'commercial': return 'Comercial';
    case 'development': return 'Desarrollo';
    default: return type;
  }
};

const getOperationLabel = (price: string = '') => {
  if (!price) return 'Venta';
  if (price.toLowerCase().includes('mes') || price.includes('/')) {
    return 'Renta';
  }
  return 'Venta';
};

const PropertyCard: React.FC<PropertyCardProps> = ({ property, variant = 'portrait' }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isExpanded]);

  const operation = getOperationLabel(property.price);
  const isRent = operation === 'Renta';

  const handleCardClick = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) {
      e.preventDefault();
      setIsExpanded(true);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!property.images || property.images.length === 0) return;
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!property.images || property.images.length === 0) return;
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        url: `${window.location.origin}/propiedades/${property.slug}`
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/propiedades/${property.slug}`);
      alert('Enlace copiado al portapapeles');
    }
  };

  return (
    <div 
      className="group block h-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        layoutId={`card-container-${property.id}`}
        className="bg-white rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 h-full flex flex-col border border-gray-100/50"
      >
        
        {/* IMAGE SLIDER AREA */}
        <div className={`relative overflow-hidden bg-gray-200 ${variant === 'landscape' ? 'aspect-[16/9]' : 'aspect-[4/5] md:aspect-[3/4]'}`}>
          
          {/* Skeleton Loader behind image */}
          <div className="absolute inset-0 bg-gray-200 animate-pulse z-0" />

          <Link to={`/propiedades/${property.slug}`} onClick={handleCardClick} className="block w-full h-full relative z-10">
            <motion.img 
              layoutId={`card-image-${property.id}`}
              src={property.images && property.images.length > 0 ? property.images[currentImageIndex] : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800'} 
              alt={property.title} 
              loading="lazy"
              referrerPolicy="no-referrer"
              onLoad={() => setIsImageLoaded(true)}
              onError={(e) => {
                setIsImageLoaded(true);
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800'; // Fallback
              }}
              className={`w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          </Link>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-60 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none z-10" />
          
          {/* Navigation Arrows */}
          <div className={`absolute inset-0 flex items-center justify-between px-3 transition-opacity duration-300 z-20 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
             <button 
                onClick={prevImage}
                className="bg-white/90 hover:bg-white text-primary p-2 rounded-full shadow-lg backdrop-blur-sm transition-all transform hover:scale-110 active:scale-95"
             >
               <ChevronLeft size={16} strokeWidth={2.5} />
             </button>
             <button 
                onClick={nextImage}
                className="bg-white/90 hover:bg-white text-primary p-2 rounded-full shadow-lg backdrop-blur-sm transition-all transform hover:scale-110 active:scale-95"
             >
               <ChevronRight size={16} strokeWidth={2.5} />
             </button>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 pointer-events-none">
             {property.images && property.images.slice(0, 5).map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1 rounded-full shadow-sm transition-all duration-300 ${idx === currentImageIndex ? 'w-6 bg-white' : 'w-2 bg-white/40'}`} 
                />
             ))}
          </div>
          
          {/* Top Tags */}
          <div className="absolute top-4 left-4 right-4 flex justify-between z-20 pointer-events-none">
             <div className="flex gap-2">
                <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full text-white shadow-lg backdrop-blur-md ${isRent ? 'bg-accent/90' : 'bg-primary/90'}`}>
                  {operation}
                </span>
             </div>
          </div>
        </div>
        
        {/* CONTENT */}
        <Link to={`/propiedades/${property.slug}`} onClick={handleCardClick} className="flex flex-col flex-grow p-4 md:p-6 relative">
          <div className="mb-1 flex justify-between items-start">
             <span className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2 block">{mapTypeToSpanish(property.type)}</span>
             <p className="font-serif text-lg md:text-xl text-primary tracking-tight">{property.price}</p>
          </div>
          
          <h3 className="font-serif text-xl md:text-2xl text-primary leading-tight mb-2 group-hover:text-accent transition-colors duration-300">
            {property.title}
          </h3>
          
          <div className="flex items-center gap-1.5 text-gray-500 text-xs md:text-sm mb-4 md:mb-6">
            <MapPin size={14} className="text-gray-400 shrink-0" />
            <span className="truncate">
              {typeof property.location === 'object' && property.location !== null 
                ? (property.location as any).name || '' 
                : property.location}
            </span>
          </div>
          
          <div className="mt-auto flex items-center justify-between text-gray-400 text-xs md:text-sm pt-4 border-t border-gray-100">
            <div className="flex gap-3 md:gap-4">
                {property.bedrooms && (
                  <div className="flex items-center gap-1.5" title="Recámaras">
                    <BedDouble size={16} strokeWidth={2} />
                    <span className="font-medium text-gray-600">{property.bedrooms}</span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center gap-1.5" title="Baños">
                    <Bath size={16} strokeWidth={2} />
                    <span className="font-medium text-gray-600">{property.bathrooms}</span>
                  </div>
                )}
                {property.parking && (
                  <div className="flex items-center gap-1.5" title="Estacionamiento">
                    <Car size={16} strokeWidth={2} />
                    <span className="font-medium text-gray-600">{property.parking}</span>
                  </div>
                )}
            </div>
            <div className="flex items-center gap-1.5" title="Construcción">
              <Maximize size={16} strokeWidth={2} />
              <span className="font-medium text-gray-600">{property.constructionArea}</span>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* MOBILE EXPANDED VIEW */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            layoutId={`card-container-${property.id}`}
            className="fixed inset-0 z-[100] bg-white overflow-y-auto"
            style={{ borderRadius: 0 }}
          >
            <motion.div 
              className="relative w-full h-[50vh]"
              drag="y"
              dragDirectionLock
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.8}
              onDragEnd={(e, info) => {
                if (info.offset.y > 100 || info.velocity.y > 500) {
                  setIsExpanded(false);
                }
              }}
            >
              <div 
                className="w-full h-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar overscroll-x-contain"
                onScroll={(e) => {
                  const scrollLeft = e.currentTarget.scrollLeft;
                  const width = e.currentTarget.clientWidth;
                  const newIndex = Math.round(scrollLeft / width);
                  if (newIndex !== currentImageIndex) {
                    setCurrentImageIndex(newIndex);
                  }
                }}
              >
                {property.images && property.images.length > 0 ? (
                  property.images.map((img, idx) => (
                    <motion.img 
                      key={idx}
                      layoutId={idx === 0 ? `card-image-${property.id}` : undefined} 
                      src={img} 
                      className="w-full h-full object-cover shrink-0 snap-center pointer-events-none" 
                      alt={`${property.title} - ${idx + 1}`}
                      loading={idx === 0 ? "eager" : "lazy"}
                      referrerPolicy="no-referrer"
                      decoding="async"
                    />
                  ))
                ) : (
                  <motion.img 
                    layoutId={`card-image-${property.id}`} 
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800" 
                    className="w-full h-full object-cover shrink-0 snap-center pointer-events-none" 
                    alt={property.title}
                    loading="eager"
                    decoding="async"
                  />
                )}
              </div>
              
              {/* Dots */}
            {property.images && property.images.length > 1 && (
              <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-1.5 z-10 pointer-events-none">
                {property.images.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 pointer-events-auto ${idx === currentImageIndex ? 'w-4 bg-primary' : 'w-1.5 bg-gray-300'}`}
                  />
                ))}
              </div>
            )}
              <button 
                onClick={() => setIsExpanded(false)} 
                className="absolute top-6 left-4 bg-white p-2 rounded-full shadow-md z-10"
              >
                <ChevronLeft size={20} className="text-primary" />
              </button>
              <div className="absolute top-6 right-4 flex gap-2 z-10">
                <button onClick={handleShare} className="bg-white p-2 rounded-full shadow-md">
                  <Share size={20} className="text-primary" />
                </button>
              </div>
            </motion.div>
            
            <div className="bg-white rounded-t-3xl -mt-6 relative z-10 p-6 pb-32">
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PropertyCard;
