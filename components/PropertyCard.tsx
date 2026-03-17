
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


  const operation = getOperationLabel(property.price);
  const isRent = operation === 'Renta';

  const handleCardClick = (e: React.MouseEvent) => {
    // Let normal Link handle navigation on all devices
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
    </div>
  );
};

export default PropertyCard;
