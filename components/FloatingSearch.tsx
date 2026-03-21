import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Search, SlidersHorizontal, X, MapPin, Home, DollarSign, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import Autocomplete from 'react-google-autocomplete';

const PROPERTY_TYPES = [
  "Casa", "Departamento", "Terreno / Lote", "Casa en condominio", "Local comercial",
  "Bodega comercial", "Oficina", "Desarrollo vertical", "Rancho", "Villa"
];

interface FloatingSearchProps {
  inline?: boolean;
}

const FloatingSearch: React.FC<FloatingSearchProps> = ({ inline = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeStep, setActiveStep] = useState<'operation' | 'location' | 'type' | 'price'>('location');
  
  const [operation, setOperation] = useState<'venta' | 'renta'>('venta');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('Casa');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [gmapsError, setGmapsError] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const handleGmapsError = () => setGmapsError(true);
    window.addEventListener('gmaps-auth-failure', handleGmapsError);
    return () => window.removeEventListener('gmaps-auth-failure', handleGmapsError);
  }, []);

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setIsExpanded(false);
      setActiveStep('location');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.append('operation', operation);
    if (location) params.append('location', location);
    if (propertyType) params.append('type', propertyType);
    if (priceMin) params.append('price_min', priceMin);
    if (priceMax) params.append('price_max', priceMax);
    navigate(`/propiedades?${params.toString()}`);
    setIsOpen(false);
  };

  const handleMapSearch = () => {
    const params = new URLSearchParams();
    params.append('operation', operation);
    if (propertyType) params.append('type', propertyType);
    if (priceMin) params.append('price_min', priceMin);
    if (priceMax) params.append('price_max', priceMax);
    navigate(`/mapa?${params.toString()}`);
    setIsOpen(false);
  };

  const clearAll = () => {
    setOperation('venta');
    setLocation('');
    setPropertyType('Casa');
    setPriceMin('');
    setPriceMax('');
    setActiveStep('location');
    setIsExpanded(false);
  };

  const handleStepClick = (step: 'operation' | 'location' | 'type' | 'price') => {
    setActiveStep(step);
    setIsExpanded(true);
  };

  return (
    <>
      {/* Floating Bar */}
      <div className={inline ? "w-full md:hidden" : "fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-md md:hidden"}>
        <div 
          onClick={() => setIsOpen(true)}
          className={`bg-white/70 backdrop-blur-2xl backdrop-saturate-150 border border-white/40 shadow-2xl rounded-full p-3 flex items-center justify-between cursor-pointer transition-transform active:scale-95 ${inline ? 'w-full' : ''}`}
          style={{
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)'
          }}
        >
          <div className="flex items-center gap-3 pl-2">
            <Search size={18} className="text-primary" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-800 leading-tight">¿Dónde buscas?</span>
              <span className="text-[10px] text-gray-500 leading-tight">Cualquier lugar • {operation === 'venta' ? 'Comprar' : 'Rentar'}</span>
            </div>
          </div>
          <div className="bg-white border border-gray-200 text-primary p-2 rounded-full shadow-sm">
            <SlidersHorizontal size={16} />
          </div>
        </div>
      </div>

      {/* Full Screen Modal for Search (Airbnb Style Layered Sheet) */}
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />

            {/* Bottom Sheet */}
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0, height: isExpanded ? '92vh' : '65vh' }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-[#f7f7f7] rounded-t-3xl flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.2)] overflow-hidden"
            >
              {/* Drag Handle */}
              <div 
                className="w-full pt-3 pb-1 flex justify-center cursor-grab active:cursor-grabbing"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
              </div>

              {/* Header */}
              <div className="px-4 pb-2 flex items-center justify-center relative bg-[#f7f7f7] z-10 shrink-0">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="absolute left-4 p-2 bg-white border border-gray-200 shadow-sm rounded-full text-primary"
                >
                  <X size={16} />
                </button>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setOperation('venta')}
                    className={`text-sm font-medium pb-1 border-b-2 transition-colors ${operation === 'venta' ? 'border-primary text-primary' : 'border-transparent text-gray-400'}`}
                  >
                    Comprar
                  </button>
                  <button 
                    onClick={() => setOperation('renta')}
                    className={`text-sm font-medium pb-1 border-b-2 transition-colors ${operation === 'renta' ? 'border-primary text-primary' : 'border-transparent text-gray-400'}`}
                  >
                    Rentar
                  </button>
                </div>
              </div>
              
              {/* Cards Container */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 pb-24">
                
                {/* Location Card */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden shrink-0">
                  {activeStep === 'location' ? (
                    <div className="p-6">
                      <h2 className="text-xl font-serif text-primary mb-4">Ingresa ubicaciones, colonias o calles</h2>
                      <div className="relative">
                        <MapPin size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        {/* El script de Google Maps ya se inyecta globalmente en index.html, por lo tanto siempre usamos Autocomplete a menos que falle explícitamente */}
                        {!gmapsError ? (
                          <Autocomplete
                            onPlaceSelected={(place) => {
                              if (place && place.formatted_address) {
                                setLocation(place.formatted_address);
                              } else if (place && place.name) {
                                setLocation(place.name);
                              }
                            }}
                            options={{
                              types: ['(regions)'],
                              componentRestrictions: { country: 'mx' },
                            }}
                            defaultValue={location}
                            onChange={(e: any) => setLocation(e.target.value)}
                            placeholder="Ingresa ubicaciones, colonias o calles"
                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-base outline-none focus:border-gray-400 focus:bg-white transition-colors"
                            onFocus={() => setIsExpanded(true)}
                            autoFocus
                            fallback={
                              <input 
                                type="text" 
                                placeholder="Ingresa ubicaciones, colonias o calles" 
                                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-base outline-none focus:border-gray-400 focus:bg-white transition-colors"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                onFocus={() => setIsExpanded(true)}
                                autoFocus
                              />
                            }
                          />
                        ) : (
                          <input 
                            type="text" 
                            placeholder="Ingresa ubicaciones, colonias o calles" 
                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-base outline-none focus:border-gray-400 focus:bg-white transition-colors"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            onFocus={() => setIsExpanded(true)}
                            autoFocus
                          />
                        )}
                      </div>

                      {/* Mini Map & Suggestions */}
                      <div className="mt-4">
                        {location.length === 0 && (
                          <div 
                            onClick={handleMapSearch}
                            className="w-full h-32 bg-gray-100 rounded-2xl overflow-hidden relative border border-gray-200 cursor-pointer group"
                          >
                             <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" alt="Map" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                             <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm flex items-center gap-2 text-primary font-medium text-sm">
                                   <MapPin size={16} />
                                   <span>Búsqueda por mapa</span>
                                </div>
                             </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div 
                      onClick={() => handleStepClick('location')}
                      className="p-4 px-6 flex items-center justify-between cursor-pointer"
                    >
                      <span className="text-sm text-gray-500 font-medium">Dónde</span>
                      <span className="text-sm text-primary font-medium">{location || 'Búsqueda flexible'}</span>
                    </div>
                  )}
                </div>

                {/* Property Type Card */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden shrink-0">
                  {activeStep === 'type' ? (
                    <div className="p-6">
                      <h2 className="text-xl font-serif text-primary mb-4">¿Qué tipo de inmueble?</h2>
                      <div className="flex flex-wrap gap-2">
                        {PROPERTY_TYPES.map(type => (
                          <button
                            key={type}
                            onClick={() => setPropertyType(type)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                              propertyType === type 
                                ? 'bg-primary text-white border-primary' 
                                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div 
                      onClick={() => handleStepClick('type')}
                      className="p-4 px-6 flex items-center justify-between cursor-pointer"
                    >
                      <span className="text-sm text-gray-500 font-medium">Inmueble</span>
                      <span className="text-sm text-primary font-medium">{propertyType || 'Cualquiera'}</span>
                    </div>
                  )}
                </div>

                {/* Price Card */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden shrink-0">
                  {activeStep === 'price' ? (
                    <div className="p-6">
                      <h2 className="text-xl font-serif text-primary mb-4">Rango de precio</h2>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1">Mínimo</label>
                          <div className="relative">
                            <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input 
                              type="number" 
                              placeholder="0" 
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-9 pr-3 text-base outline-none focus:border-gray-400 focus:bg-white"
                              value={priceMin}
                              onChange={(e) => setPriceMin(e.target.value)}
                              onFocus={() => setIsExpanded(true)}
                            />
                          </div>
                        </div>
                        <div className="w-4 h-[1px] bg-gray-300 mt-5"></div>
                        <div className="flex-1">
                          <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1">Máximo</label>
                          <div className="relative">
                            <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input 
                              type="number" 
                              placeholder="Sin límite" 
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-9 pr-3 text-base outline-none focus:border-gray-400 focus:bg-white"
                              value={priceMax}
                              onChange={(e) => setPriceMax(e.target.value)}
                              onFocus={() => setIsExpanded(true)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div 
                      onClick={() => handleStepClick('price')}
                      className="p-4 px-6 flex items-center justify-between cursor-pointer"
                    >
                      <span className="text-sm text-gray-500 font-medium">Precio</span>
                      <span className="text-sm text-primary font-medium">
                        {priceMin || priceMax ? `$${priceMin || '0'} - ${priceMax ? '$'+priceMax : 'Sin límite'}` : 'Cualquiera'}
                      </span>
                    </div>
                  )}
                </div>

              </div>

              {/* Footer Actions */}
              <div className="bg-white border-t border-gray-200 p-4 flex items-center justify-between shrink-0 pb-8">
                <button 
                  onClick={clearAll}
                  className="text-sm font-medium text-gray-800 underline underline-offset-2"
                >
                  Limpiar todo
                </button>
                <button 
                  onClick={handleSearch}
                  className="bg-accent text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg active:scale-95 transition-transform"
                >
                  <Search size={18} />
                  <span>Buscar</span>
                </button>
              </div>

            </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default FloatingSearch;
