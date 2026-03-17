import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, X, ChevronDown, Check, Home, Building2, MapPin, DollarSign, Calendar, Maximize } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Autocomplete from 'react-google-autocomplete';

const PROPERTY_TYPES = [
  "Casa", "Departamento", "Terreno / Lote", "Casa en condominio", "Local comercial",
  "Bodega comercial", "Oficina", "Desarrollo vertical", "Rancho", "Villa"
];

const AGE_RANGES = ["En construcción", "Nuevo / Entrega Inmediata", "Menos de 5 años", "Hasta 10 años", "Hasta 20 años", "+20 años"];

const AMENITIES_GROUPS = {
  "Esenciales": ["Seguridad 24/7", "Cocina Integral", "Estacionamiento", "Aire Acondicionado", "Elevador", "Terraza"],
  "Lifestyle": ["Alberca", "Gimnasio", "Roof Garden", "Salón de Usos Múltiples", "Área Infantil", "Pet Friendly"],
  "Premium": ["Cine Privado", "Spa / Sauna", "Helipuerto", "Muelle", "Campo de Golf", "Smart Home"]
};

interface SmartSearchProps {
  variant?: 'hero' | 'header';
}

type TabType = 'operation' | 'location' | 'type' | 'price' | null;

const SmartSearch: React.FC<SmartSearchProps> = ({ variant = 'hero' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Essential State
  const [operation, setOperation] = useState<'venta' | 'renta'>('venta');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('Casa');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  // Advanced State
  const [beds, setBeds] = useState('');
  const [baths, setBaths] = useState('');
  const [parking, setParking] = useState('');
  const [areaMin, setAreaMin] = useState('');
  const [areaMax, setAreaMax] = useState('');
  const [age, setAge] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [gmapsError, setGmapsError] = useState(false);

  useEffect(() => {
    const handleGmapsError = () => setGmapsError(true);
    window.addEventListener('gmaps-auth-failure', handleGmapsError);
    return () => window.removeEventListener('gmaps-auth-failure', handleGmapsError);
  }, []);

  // Sync state with URL params on mount
  useEffect(() => {
    const op = searchParams.get('operation');
    if (op === 'venta' || op === 'renta') setOperation(op);

    const loc = searchParams.get('location');
    if (loc) setLocation(loc);

    const type = searchParams.get('type');
    if (type) setPropertyType(type);

    const pMin = searchParams.get('price_min');
    if (pMin) setPriceMin(pMin);

    const pMax = searchParams.get('price_max');
    if (pMax) setPriceMax(pMax);
  }, [searchParams]);

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setActiveTab(null);
      setShowAdvanced(false);
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isExpanded]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]);
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    params.append('operation', operation);
    if (location) params.append('location', location);
    if (propertyType) params.append('type', propertyType);
    if (priceMin) params.append('price_min', priceMin);
    if (priceMax) params.append('price_max', priceMax);
    navigate(`/propiedades?${params.toString()}`);
    setIsExpanded(false);
  };

  const handleMapSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    params.append('operation', operation);
    if (location) params.append('location', location);
    if (propertyType) params.append('type', propertyType);
    if (priceMin) params.append('price_min', priceMin);
    if (priceMax) params.append('price_max', priceMax);
    navigate(`/mapa?${params.toString()}`);
    setIsExpanded(false);
  };

  const expandAndSetTab = (tab: TabType) => {
    setIsExpanded(true);
    setActiveTab(tab);
  };

  // --- TRIGGER COMPONENTS ---

  const HeroTrigger = () => (
    <div className="w-full max-w-4xl relative h-[60px] md:h-[68px]">
      <AnimatePresence>
        {!isExpanded && (
          <motion.div 
            layoutId={`search-container-${variant}`}
            onClick={() => expandAndSetTab('location')}
            className="absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl flex items-center cursor-pointer transition-all duration-500 hover:bg-white/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)] group/container p-1.5"
          >
            {/* 1. UBICACIÓN SECTION */}
            <div 
              onClick={(e) => { e.stopPropagation(); expandAndSetTab('location'); }}
              className="flex-grow pl-8 py-3 pr-4 hover:bg-white/20 rounded-full transition-colors duration-300 relative group/item"
            >
              <motion.div layoutId={`search-loc-label-${variant}`} className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-0.5">Ubicación</motion.div>
              <motion.div layoutId={`search-loc-value-${variant}`} className={`text-sm truncate font-medium ${location ? 'text-white' : 'text-white/60'}`}>
                 {location || "¿Dónde quieres vivir?"}
              </motion.div>
              {/* Divider that hides on hover */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-white/20 group-hover/container:opacity-0 transition-opacity md:block hidden"></div>
            </div>

            {/* 2. TIPO SECTION (Desktop only) */}
            <div 
              onClick={(e) => { e.stopPropagation(); expandAndSetTab('type'); }}
              className="hidden md:block w-[28%] px-6 py-3 hover:bg-white/20 rounded-full transition-colors duration-300 relative group/item"
            >
              <motion.div layoutId={`search-type-label-${variant}`} className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-0.5">Inmueble</motion.div>
              <motion.div layoutId={`search-type-value-${variant}`} className="text-sm font-medium text-white truncate">
                 {propertyType || 'Cualquiera'}
              </motion.div>
              {/* Divider */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-white/20 group-hover/container:opacity-0 transition-opacity"></div>
            </div>

            {/* 3. OPERACIÓN SECTION (Desktop only) */}
            <div 
              onClick={(e) => { e.stopPropagation(); expandAndSetTab('operation'); }}
              className="hidden md:block w-[22%] px-6 py-3 hover:bg-white/20 rounded-full transition-colors duration-300 cursor-pointer"
            >
              <motion.div layoutId={`search-op-label-${variant}`} className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-0.5">Operación</motion.div>
              <motion.div layoutId={`search-op-value-${variant}-${operation}`} className="text-sm font-medium text-white">
                 {operation === 'venta' ? 'Comprar' : 'Rentar'}
              </motion.div>
            </div>

            {/* 4. SEARCH BUTTON */}
            <div className="pr-1 pl-2" onClick={(e) => { e.stopPropagation(); handleSearch(); }}>
              <motion.div layoutId={`search-btn-${variant}`} className="bg-accent hover:bg-accent/90 text-white h-12 w-12 md:w-auto md:px-6 rounded-full flex items-center justify-center gap-2 shadow-lg transition-all duration-300 hover:scale-105">
                 <Search size={20} strokeWidth={2.5} />
                 <span className="hidden md:inline font-bold text-xs uppercase tracking-widest">Buscar</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const HeaderTrigger = () => (
    <div className="w-full relative h-[42px] ml-[25px]">
      <AnimatePresence>
        {!isExpanded && (
          <motion.div 
            layoutId={`search-container-${variant}`}
            onClick={() => expandAndSetTab('location')}
            className="absolute inset-0 bg-white border border-gray-200 rounded-full px-2 py-1.5 flex items-center justify-between cursor-pointer shadow-sm hover:shadow-md transition-all"
          >
            <div className="px-3 border-r border-gray-200 flex-grow min-w-0">
               <motion.span layoutId={`search-loc-label-${variant}`} className="block text-[9px] font-bold uppercase tracking-widest text-primary">Ubicación</motion.span>
               <motion.span layoutId={`search-loc-value-${variant}`} className="block text-xs text-gray-500 truncate">{location || "Cualquiera"}</motion.span>
            </div>
            <div className="px-3 hidden sm:block shrink-0">
               <motion.span layoutId={`search-type-label-${variant}`} className="block text-[9px] font-bold uppercase tracking-widest text-primary">Tipo</motion.span>
               <motion.span layoutId={`search-type-value-${variant}`} className="block text-xs text-gray-500">{propertyType === 'Casa' ? 'Casa' : 'Otro'}</motion.span>
            </div>
            <motion.div layoutId={`search-btn-${variant}`} className="bg-accent text-white p-2 rounded-full ml-1 shrink-0">
              <Search size={14} strokeWidth={3} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // --- MODAL CONTENT (PORTAL) ---
  const modalContent = (
    <div className={`fixed inset-0 z-[9999] flex justify-center items-start pt-4 sm:pt-24 px-4 sm:px-6 pointer-events-none`}>
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div 
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-[#000827]/40 backdrop-blur-sm pointer-events-auto"
              onClick={() => setIsExpanded(false)}
            />

            {/* Main Container */}
            <div className="relative w-full max-w-4xl pointer-events-auto z-10 flex flex-col items-center">
              {/* The Pill */}
              <motion.div 
                key="search-pill"
                layoutId={`search-container-${variant}`}
                className="bg-white md:bg-gray-100 rounded-3xl md:rounded-full flex flex-col md:flex-row items-stretch md:items-center relative shadow-2xl border border-gray-200 p-4 md:p-2 gap-2 md:gap-0 w-full"
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
              >
                {/* Operación */}
                <div 
                  onClick={() => setActiveTab('operation')}
                  className={`flex-1 px-4 md:px-6 py-3 rounded-2xl md:rounded-full cursor-pointer transition-all ${activeTab === 'operation' ? 'bg-gray-100 md:bg-white shadow-none md:shadow-lg' : 'hover:bg-gray-50 md:hover:bg-gray-200'}`}
                >
                  <motion.div layoutId={`search-op-label-${variant}`} className="text-[10px] font-bold uppercase tracking-widest text-gray-800 mb-0.5">Operación</motion.div>
                  <motion.div layoutId={`search-op-value-${variant}-${operation}`} className="text-sm font-medium text-gray-500">
                    {operation === 'venta' ? 'Comprar' : 'Rentar'}
                  </motion.div>
                </div>

                <div className="hidden md:block w-[1px] h-8 bg-gray-300 mx-1"></div>
                <div className="md:hidden h-[1px] w-full bg-gray-100 my-1"></div>

                {/* Ubicación */}
                <div 
                  onClick={() => setActiveTab('location')}
                  className={`flex-[1.5] px-4 md:px-6 py-3 rounded-2xl md:rounded-full cursor-pointer transition-all ${activeTab === 'location' ? 'bg-gray-100 md:bg-white shadow-none md:shadow-lg' : 'hover:bg-gray-50 md:hover:bg-gray-200'}`}
                >
                  <motion.div layoutId={`search-loc-label-${variant}`} className="text-[10px] font-bold uppercase tracking-widest text-gray-800 mb-0.5">Ubicación</motion.div>
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
                      placeholder="¿Dónde buscas?"
                      className="bg-transparent border-none outline-none text-sm w-full text-gray-800 placeholder-gray-400 font-medium"
                      autoFocus={activeTab === 'location'}
                      fallback={
                        <input 
                          type="text" 
                          placeholder="¿Dónde buscas?" 
                          className="bg-transparent border-none outline-none text-sm w-full text-gray-800 placeholder-gray-400 font-medium"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          autoFocus={activeTab === 'location'}
                        />
                      }
                    />
                  ) : (
                    <input 
                      type="text" 
                      placeholder="¿Dónde buscas?" 
                      className="bg-transparent border-none outline-none text-sm w-full text-gray-800 placeholder-gray-400 font-medium"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      autoFocus={activeTab === 'location'}
                    />
                  )}
                </div>

                <div className="hidden md:block w-[1px] h-8 bg-gray-300 mx-1"></div>
                <div className="md:hidden h-[1px] w-full bg-gray-100 my-1"></div>

                {/* Inmueble */}
                <div 
                  onClick={() => setActiveTab('type')}
                  className={`flex-1 px-4 md:px-6 py-3 rounded-2xl md:rounded-full cursor-pointer transition-all ${activeTab === 'type' ? 'bg-gray-100 md:bg-white shadow-none md:shadow-lg' : 'hover:bg-gray-50 md:hover:bg-gray-200'}`}
                >
                  <motion.div layoutId={`search-type-label-${variant}`} className="text-[10px] font-bold uppercase tracking-widest text-gray-800 mb-0.5">Inmueble</motion.div>
                  <motion.div layoutId={`search-type-value-${variant}`} className="text-sm font-medium text-gray-500 truncate">
                    {propertyType || 'Cualquiera'}
                  </motion.div>
                </div>

                <div className="hidden md:block w-[1px] h-8 bg-gray-300 mx-1"></div>
                <div className="md:hidden h-[1px] w-full bg-gray-100 my-1"></div>

                {/* Precio & Botón */}
                <div 
                  onClick={() => setActiveTab('price')}
                  className={`flex-1 pl-4 md:pl-6 pr-2 py-2 rounded-2xl md:rounded-full cursor-pointer transition-all flex items-center justify-between ${activeTab === 'price' ? 'bg-gray-100 md:bg-white shadow-none md:shadow-lg' : 'hover:bg-gray-50 md:hover:bg-gray-200'}`}
                >
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-800 mb-0.5">Precio</div>
                    <div className="text-sm font-medium text-gray-500 truncate">
                      {priceMin || priceMax ? `$${priceMin || '0'} - $${priceMax || 'Max'}` : 'Cualquiera'}
                    </div>
                  </div>
                  <motion.button 
                    layoutId={`search-btn-${variant}`}
                    onClick={(e) => { e.stopPropagation(); handleSearch(); }}
                    className="bg-accent hover:bg-accent/90 text-white h-12 w-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 shrink-0 ml-2"
                  >
                    <Search size={20} strokeWidth={2.5} />
                  </motion.button>
                </div>
              </motion.div>

              {/* Dropdown Panel */}
              <div className="relative w-full">
                <AnimatePresence mode="wait">
                  {activeTab && (
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: -10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-0 left-0 right-0 mt-4 bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-gray-100 overflow-hidden max-h-[60vh] overflow-y-auto custom-scrollbar"
                    >
                      {/* Panel Content based on activeTab */}
                      {activeTab === 'operation' && (
                        <div className="flex gap-4 max-w-md mx-auto">
                          <button 
                            onClick={() => { setOperation('venta'); setActiveTab('location'); }} 
                            className={`flex-1 py-4 rounded-2xl border-2 transition-all font-bold tracking-wide ${operation === 'venta' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 hover:border-gray-300 text-gray-500'}`}
                          >
                            Comprar
                          </button>
                          <button 
                            onClick={() => { setOperation('renta'); setActiveTab('location'); }} 
                            className={`flex-1 py-4 rounded-2xl border-2 transition-all font-bold tracking-wide ${operation === 'renta' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 hover:border-gray-300 text-gray-500'}`}
                          >
                            Rentar
                          </button>
                        </div>
                      )}

                      {activeTab === 'location' && (
                        <div className="max-w-md mx-auto">
                          <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Ubicación</h4>
                          <p className="text-sm text-gray-500 mb-6">Empieza a escribir para ver sugerencias de ubicaciones, colonias o calles.</p>
                          
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
                      )}

                      {activeTab === 'type' && (
                        <div>
                          <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Tipo de Propiedad</h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {PROPERTY_TYPES.map(type => (
                              <button 
                                key={type} 
                                onClick={() => { setPropertyType(type); setActiveTab('price'); }} 
                                className={`p-4 rounded-2xl border-2 text-left transition-all ${propertyType === type ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 hover:border-gray-300 text-gray-600'}`}
                              >
                                <span className="font-medium text-sm">{type}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeTab === 'price' && (
                        <div className="max-w-xl mx-auto">
                          <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Rango de Precio ({operation === 'venta' ? 'MXN' : 'MXN / Mes'})</h4>
                          <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="w-full flex-1 border-2 border-gray-100 rounded-2xl px-4 py-3 focus-within:border-primary transition-all">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Mínimo</span>
                              <div className="flex items-center">
                                <span className="text-primary font-medium mr-1">$</span>
                                <input 
                                  type="number" 
                                  placeholder="0" 
                                  className="w-full bg-transparent border-none outline-none text-primary font-bold text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                  value={priceMin}
                                  onChange={(e) => setPriceMin(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="text-gray-300 font-bold hidden sm:block">-</div>
                            <div className="w-full flex-1 border-2 border-gray-100 rounded-2xl px-4 py-3 focus-within:border-primary transition-all">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Máximo</span>
                              <div className="flex items-center">
                                <span className="text-primary font-medium mr-1">$</span>
                                <input 
                                  type="number" 
                                  placeholder="Sin límite" 
                                  className="w-full bg-transparent border-none outline-none text-primary font-bold text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                  value={priceMax}
                                  onChange={(e) => setPriceMax(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Advanced Filters Toggle */}
                          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                            <button 
                              onClick={() => setShowAdvanced(!showAdvanced)}
                              className="text-primary font-bold text-sm hover:text-accent transition-colors underline decoration-primary/30 underline-offset-4 flex items-center justify-center gap-2 mx-auto"
                            >
                              <SlidersHorizontal size={16} />
                              {showAdvanced ? 'Ocultar filtros avanzados' : 'Mostrar filtros avanzados'}
                            </button>
                          </div>

                          {/* Advanced Filters */}
                          <AnimatePresence>
                            {showAdvanced && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="pt-6 grid grid-cols-2 gap-4">
                                   {/* Beds */}
                                    <div className="border-2 border-gray-100 rounded-2xl px-4 py-3">
                                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Recámaras</span>
                                      <select value={beds} onChange={e => setBeds(e.target.value)} className="bg-transparent text-primary font-bold w-full outline-none cursor-pointer">
                                            <option value="">Cualquiera</option>
                                            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}+</option>)}
                                      </select>
                                    </div>
                                    {/* Baths */}
                                    <div className="border-2 border-gray-100 rounded-2xl px-4 py-3">
                                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Baños</span>
                                      <select value={baths} onChange={e => setBaths(e.target.value)} className="bg-transparent text-primary font-bold w-full outline-none cursor-pointer">
                                            <option value="">Cualquiera</option>
                                            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}+</option>)}
                                      </select>
                                    </div>
                                </div>
                                
                                {/* Amenities Checkboxes */}
                                <div className="mt-6">
                                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Amenidades</h4>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-4">
                                     {Object.entries(AMENITIES_GROUPS).map(([group, amenities]) => (
                                        <div key={group}>
                                           <h5 className="text-[9px] font-bold uppercase text-accent mb-2 tracking-widest">{group}</h5>
                                           <div className="space-y-2">
                                             {amenities.map(amenity => (
                                               <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
                                                  <div className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all ${selectedAmenities.includes(amenity) ? 'bg-primary border-primary text-white' : 'border-gray-300 bg-white group-hover:border-primary'}`}>
                                                     {selectedAmenities.includes(amenity) && <Check size={10} strokeWidth={3} />}
                                                  </div>
                                                  <input type="checkbox" className="hidden" checked={selectedAmenities.includes(amenity)} onChange={() => toggleAmenity(amenity)} />
                                                  <span className={`text-xs ${selectedAmenities.includes(amenity) ? 'text-primary font-medium' : 'text-gray-500'}`}>{amenity}</span>
                                               </label>
                                             ))}
                                           </div>
                                        </div>
                                     ))}
                                  </div>
                               </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      {variant === 'hero' ? <HeroTrigger /> : <HeaderTrigger />}
      {createPortal(modalContent, document.body)}
    </>
  );
};

export default SmartSearch;
