import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Property } from '../types';
import { getProperties } from '../data/mockData';
import { fetchEasyBrokerProperties } from '../services/easybroker';
import { Search, List, Filter, Bell, PenTool, RefreshCw, X } from 'lucide-react';
import Autocomplete from 'react-google-autocomplete';

// We will define custom markers with price labels
const createPriceIcon = (price: string = '') => {
  // Extract a short version of the price, e.g., "$35,000" -> "35K"
  const numericPrice = price ? price.replace(/[^0-9]/g, '') : '';
  let shortPrice = price || '';
  if (numericPrice.length > 3) {
    const num = parseInt(numericPrice);
    if (num >= 1000000) {
      shortPrice = '$' + (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      shortPrice = '$' + Math.floor(num / 1000) + 'K';
    }
  } else if (shortPrice.length > 12) {
    shortPrice = 'Consultar';
  }

  return L.divIcon({
    className: 'custom-price-marker',
    html: `<div class="bg-[#FF5A36] text-white font-bold text-xs px-2 py-1 rounded-full shadow-md border-2 border-white whitespace-nowrap relative">
             ${shortPrice}
             <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#FF5A36]"></div>
           </div>`,
    iconSize: [60, 30],
    iconAnchor: [30, 30],
    popupAnchor: [0, -30]
  });
};

const MapBounds: React.FC<{ properties: Property[], active: boolean }> = ({ properties, active }) => {
  const map = useMap();
  useEffect(() => {
    if (!active) return;
    const validProps = properties.filter(p => p.coordinates && p.coordinates.lat && p.coordinates.lng);
    if (validProps.length > 0) {
      const bounds = L.latLngBounds(validProps.map(p => [p.coordinates!.lat, p.coordinates!.lng]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }
  }, [properties, map, active]);
  return null;
};

const MapEvents: React.FC<{ onBoundsChange: (bounds: L.LatLngBounds) => void }> = ({ onBoundsChange }) => {
  const map = useMap();
  
  useEffect(() => {
    if (!map) return;
    const handleMoveEnd = () => {
      onBoundsChange(map.getBounds());
    };
    map.on('moveend', handleMoveEnd);
    return () => {
      map.off('moveend', handleMoveEnd);
    };
  }, [map, onBoundsChange]);
  
  return null;
};

const MapSearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [operation, setOperation] = useState(searchParams.get('operation') || 'venta');
  const [type, setType] = useState(searchParams.get('type') || '');
  const [gmapsError, setGmapsError] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const [mapBounds, setMapBounds] = useState<L.LatLngBounds | null>(null);
  const [searchInBounds, setSearchInBounds] = useState(false);
  const [autoFitBounds, setAutoFitBounds] = useState(true);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  useEffect(() => {
    const handleGmapsError = () => setGmapsError(true);
    window.addEventListener('gmaps-auth-failure', handleGmapsError);
    return () => window.removeEventListener('gmaps-auth-failure', handleGmapsError);
  }, []);
  
  useEffect(() => {
    const loadProperties = async () => {
      setIsLoading(true);
      try {
        const localProps = getProperties();
        const externalProps = await fetchEasyBrokerProperties({ limit: '50' });
        setProperties([...localProps, ...externalProps]);
      } catch (error) {
        setProperties(getProperties());
      } finally {
        setIsLoading(false);
      }
    };
    loadProperties();
  }, []);

  const validProperties = properties.filter(p => p.coordinates && p.coordinates.lat && p.coordinates.lng);

  const filteredProperties = validProperties.filter(p => {
    let matches = true;
    
    if (searchInBounds && mapBounds && p.coordinates) {
      const latLng = L.latLng(p.coordinates.lat, p.coordinates.lng);
      if (!mapBounds.contains(latLng)) {
        matches = false;
      }
    } else if (location && !searchInBounds) {
      const locStr = typeof p.location === 'object' && p.location !== null 
        ? (p.location as any).name || ''
        : p.location || '';
      
      const searchTerms = location.toLowerCase().split(',').map(s => s.trim());
      const propLoc = locStr.toLowerCase();
      
      const isMatch = searchTerms.some(term => propLoc.includes(term) || term.includes(propLoc));
      
      if (!isMatch && propLoc !== '') {
        matches = false;
      }
    }

    if (type) {
      if (p.type.toLowerCase() !== type.toLowerCase() && !(type === 'residential' && p.type === 'residential')) {
        matches = false;
      }
    }

    if (operation) {
      if (operation === 'renta') {
        if (!p.price || (!p.price.includes('/') && !p.price.toLowerCase().includes('mes'))) {
          matches = false;
        }
      } else {
        if (p.price && (p.price.includes('/') || p.price.toLowerCase().includes('mes'))) {
          matches = false;
        }
      }
    }

    return matches;
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (operation) params.set('operation', operation);
    if (location && !searchInBounds) params.set('location', location);
    if (type) params.set('type', type);
    navigate(`/mapa?${params.toString()}`, { replace: true });
  }, [location, operation, type, navigate, searchInBounds]);

  const handleSearchInArea = () => {
    setSearchInBounds(true);
    setAutoFitBounds(false);
    setLocation('');
    setToastMessage('Mostrando propiedades en esta zona');
  };

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
    setSearchInBounds(false);
    setAutoFitBounds(true);
  };

  const handleClearFilters = () => {
    setLocation('');
    setType('');
    setOperation('venta');
    setSearchInBounds(false);
    setAutoFitBounds(true);
  };

  return (
    <div className="fixed inset-0 z-30 flex flex-col bg-white pt-[60px] md:pt-[80px]">
      {/* Filters Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex flex-nowrap items-center gap-3 shadow-sm z-10 overflow-x-auto no-scrollbar">
        
        {/* Location Search */}
        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 min-w-[200px] md:min-w-[250px] flex-shrink-0">
          {import.meta.env.VITE_GOOGLE_MAPS_API_KEY && !gmapsError ? (
            <Autocomplete
              apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
              onPlaceSelected={(place) => {
                if (place && place.formatted_address) handleLocationChange(place.formatted_address);
              }}
              options={{ types: ['(regions)'], componentRestrictions: { country: 'mx' } }}
              defaultValue={location}
              placeholder="Buscar por ubicación..."
              className="bg-transparent border-none outline-none text-sm w-full text-gray-800"
            />
          ) : (
            <input 
              type="text" 
              placeholder="Buscar por ubicación..." 
              value={location}
              onChange={(e) => handleLocationChange(e.target.value)}
              className="bg-transparent border-none outline-none text-sm w-full text-gray-800"
            />
          )}
          <Search size={16} className="text-gray-400 ml-2" />
        </div>

        {/* Operation Filter */}
        <select 
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 outline-none appearance-none cursor-pointer hover:bg-gray-50 flex-shrink-0"
        >
          <option value="venta">Comprar</option>
          <option value="renta">Rentar</option>
        </select>

        {/* Type Filter */}
        <select 
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 outline-none appearance-none cursor-pointer hover:bg-gray-50 flex-shrink-0"
        >
          <option value="">Tipo de inmueble</option>
          <option value="Casa">Casa</option>
          <option value="Departamento">Departamento</option>
          <option value="Terreno">Terreno</option>
        </select>

        {/* More Filters */}
        <button 
          onClick={() => setToastMessage('Filtros avanzados próximamente')}
          className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 flex-shrink-0"
        >
          <Filter size={16} />
          <span className="hidden md:inline">Más filtros</span>
        </button>

        <div className="flex-1"></div>

        {/* Create Alert */}
        <button 
          onClick={() => setToastMessage('Alerta creada para esta búsqueda')}
          className="hidden md:flex items-center gap-2 bg-white border border-[#FF5A36] text-[#FF5A36] rounded-lg px-4 py-2 text-sm font-bold hover:bg-[#FF5A36]/5 transition-colors flex-shrink-0"
        >
          Crear alerta <Bell size={16} />
        </button>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative min-h-0 w-full h-full">
        <MapContainer 
          center={[19.4326, -99.1332]} 
          zoom={12} 
          zoomControl={false}
          className="w-full h-full z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          <ZoomControl position="bottomleft" />
          <MapEvents onBoundsChange={setMapBounds} />
          <MapBounds properties={filteredProperties} active={autoFitBounds} />
          
          {filteredProperties.map(property => (
            <Marker 
              key={property.id} 
              position={[property.coordinates!.lat, property.coordinates!.lng]}
              icon={createPriceIcon(property.price)}
            >
              <Popup className="property-popup custom-popup">
                <div className="w-64 overflow-hidden rounded-xl shadow-lg bg-white">
                  <div className="relative h-40 bg-gray-100">
                    {property.images && property.images.length > 0 ? (
                      <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">Sin imagen</div>
                    )}
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-primary">
                      {property.type}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-primary mb-1">{property.price}</h3>
                    <p className="text-sm text-gray-600 truncate mb-2">{property.title}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                      {property.bedrooms && <span>{property.bedrooms} recs</span>}
                      {property.bathrooms && <span>{property.bathrooms} baños</span>}
                      {property.constructionArea && <span>{property.constructionArea}</span>}
                    </div>
                    <button 
                      onClick={() => navigate(`/propiedades/${property.slug}`)}
                      className="w-full bg-primary text-white text-sm font-bold py-2 rounded-lg hover:bg-accent transition-colors"
                    >
                      Ver detalles
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Floating UI Elements */}
        
        {/* Results count overlay */}
        <div className="absolute top-4 left-4 bg-white px-3 md:px-4 py-2 rounded-full shadow-md border border-gray-100 flex items-center gap-2 md:gap-3 z-[1000]">
          <span className="text-xs md:text-sm font-medium text-gray-800">
            {isLoading ? 'Buscando...' : `${filteredProperties.length} inmuebles`}
          </span>
          <button 
            onClick={handleClearFilters}
            className="text-gray-400 hover:text-gray-600"
            title="Limpiar filtros"
          >
            <X size={14} className="md:w-4 md:h-4" />
          </button>
        </div>

        {/* List View Toggle */}
        <button 
          onClick={() => navigate('/propiedades' + window.location.search)}
          className="absolute top-4 right-4 bg-white px-3 md:px-4 py-2 rounded-full shadow-md border border-gray-100 flex items-center gap-2 z-[1000] hover:bg-gray-50 transition-colors"
        >
          <span className="hidden md:inline text-sm font-bold text-gray-800">Ver listado</span>
          <List size={16} className="md:w-[18px] md:h-[18px]" />
        </button>

        {/* Bottom Actions */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-[1000] w-[90%] md:w-auto justify-center">
          <button 
            onClick={() => setToastMessage('Funcionalidad de dibujar zona próximamente')}
            className="bg-white px-3 md:px-4 py-2 md:py-3 rounded-full shadow-lg border border-gray-100 flex items-center gap-2 hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            <span className="hidden sm:inline text-xs md:text-sm font-bold text-gray-800">Dibujar zona</span>
            <PenTool size={16} className="text-gray-500" />
          </button>
          <button 
            onClick={handleSearchInArea}
            className="bg-white px-3 md:px-4 py-2 md:py-3 rounded-full shadow-lg border border-gray-100 flex items-center gap-2 hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            <span className="text-xs md:text-sm font-bold text-gray-800">Buscar en esta zona</span>
            <RefreshCw size={16} className="text-gray-500" />
          </button>
        </div>

        {/* Toast Message */}
        {toastMessage && (
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl z-[1000] animate-fadeIn">
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapSearchPage;
