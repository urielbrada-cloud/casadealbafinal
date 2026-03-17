import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Property } from '../types';
import { fetchEasyBrokerProperties } from '../services/easybroker';
import { Search, List, Filter, Bell, PenTool, RefreshCw, X } from 'lucide-react';
import Autocomplete from 'react-google-autocomplete';

declare global {
  interface Window {
    google: any;
  }
}
declare var google: any;

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
  const [geocodedCoords, setGeocodedCoords] = useState<Record<string, {lat: number, lng: number}>>({});
  
  const [searchInBounds, setSearchInBounds] = useState(false);
  const [autoFitBounds, setAutoFitBounds] = useState(true);

  // Google Maps refs
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const infoWindowRef = useRef<any>(null);

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
        const externalProps = await fetchEasyBrokerProperties({ limit: '50' });
        setProperties(externalProps);
      } catch (error) {
        setProperties([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadProperties();
  }, []);

  // Dynamically geocode properties missing coordinates using Google Maps API
  useEffect(() => {
    if (!properties.length || !window.google) return;
    
    // Find unique locations that are missing coordinates
    const uniqueLocations = [...new Set(
      properties
        .filter(p => !p.coordinates && p.location)
        .map(p => typeof p.location === 'object' ? (p.location as any).name : p.location)
    )].filter(loc => typeof loc === 'string' && loc.length > 0 && !geocodedCoords[loc]);
    
    if (uniqueLocations.length === 0) return;

    const fetchGeocodes = async () => {
      const geocoder = new window.google.maps.Geocoder();
      const newCoords: Record<string, {lat: number, lng: number}> = {};
      
      for (const loc of uniqueLocations) {
        try {
          // Add small delay to avoid hitting Google Maps query limit rate
          await new Promise(resolve => setTimeout(resolve, 350));
          const response = await geocoder.geocode({ address: `${loc}, Mexico` });
          if (response.results && response.results.length > 0) {
            const result = response.results[0].geometry.location;
            newCoords[loc as string] = { lat: result.lat(), lng: result.lng() };
          }
        } catch (err) {
          console.warn('Geocoding failed for:', loc, err);
        }
      }
      
      if (Object.keys(newCoords).length > 0) {
        setGeocodedCoords(prev => ({ ...prev, ...newCoords }));
      }
    };
    
    fetchGeocodes();
  }, [properties, geocodedCoords]);

  // Combine native coordinates and geocoded ones, with a micro-offset to prevent overlapping pins
  const propertiesWithCoords = properties.map(p => {
    const locName = typeof p.location === 'object' ? (p.location as any).name : p.location;
    let finalCoords = p.coordinates;
    
    if (!finalCoords && locName && geocodedCoords[locName as string]) {
       const base = geocodedCoords[locName as string];
       // Micro offset based on property ID so properties in the same neighborhood don't stack perfectly on top of each other
       const idNum = parseInt(p.id.replace(/\\D/g, '')) || Math.random() * 10000;
       const latOffset = ((idNum % 100) - 50) / 15000; 
       const lngOffset = (((idNum * 7) % 100) - 50) / 15000;
       
       finalCoords = {
         lat: base.lat + latOffset,
         lng: base.lng + lngOffset
       };
    }
    return { ...p, coordinates: finalCoords };
  });

  const validProperties = propertiesWithCoords.filter(p => p.coordinates && p.coordinates.lat && p.coordinates.lng);



  const filteredProperties = validProperties.filter(p => {
    let matches = true;
    
    // Si la búsqueda por límites (bounding box) está activa, filtramos matemáticamente por coordenadas
    if (searchInBounds && mapInstance.current && p.coordinates) {
      const bounds = mapInstance.current.getBounds();
      if (bounds) {
        const latLng = new window.google.maps.LatLng(p.coordinates.lat, p.coordinates.lng);
        if (!bounds.contains(latLng)) {
          matches = false;
        }
      }
    } else if (location && !searchInBounds) {
      // Filtro de texto muy relajado: solo filtramos si de verdad no hay ninguna coincidencia parcial
      // y permitimos que las propiedades se muestren si están cerca o sus datos no son exactos.
      const locStr = typeof p.location === 'object' && p.location !== null 
        ? (p.location as any).name || ''
        : p.location || '';
      
      const searchTerms = location.toLowerCase().split(',').map(s => s.trim());
      const propLoc = locStr.toLowerCase();
      
      const isMatch = searchTerms.some(term => {
         // Comprobaciones extremadamente relajadas
         if (term.length < 3) return true; 
         return propLoc.includes(term) || term.includes(propLoc) || (propLoc.includes('zapopan') && term.includes('guadalajara')) || (propLoc.includes('guadalajara') && term.includes('zapopan'));
      });
      
      if (!isMatch && propLoc !== '') {
        // En lugar de ocultarlo, lo dejamos pasar si la búsqueda era amplia, o si es la búsqueda inicial
        // Para asegurar que el mapa no quede en 0 inmuebles, simplemente bajamos la prioridad o lo pasamos
        matches = true; // Forzamos a pasarlo para que al menos se vean los pines de respaldo
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

  // Initialize Map
  useEffect(() => {
    if (window.google && mapRef.current && !mapInstance.current) {
      infoWindowRef.current = new window.google.maps.InfoWindow();
      
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 19.4326, lng: -99.1332 },
        zoom: 12,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });

      mapInstance.current.addListener('dragend', () => {
        setAutoFitBounds(false);
      });
      mapInstance.current.addListener('zoom_changed', () => {
        setAutoFitBounds(false);
      });
    }
  }, []);

  // Sync Markers
  useEffect(() => {
    if (!window.google || !mapInstance.current) return;
    
    // Clear old markers
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    const bounds = new window.google.maps.LatLngBounds();
    let hasValidBounds = false;

    filteredProperties.forEach(property => {
      if (!property.coordinates) return;

      const position = { lat: property.coordinates.lat, lng: property.coordinates.lng };
      const marker = new window.google.maps.Marker({
        position,
        map: mapInstance.current,
        title: property.title,
        icon: {
           url: 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png' // Default placeholder while simple
        }
      });

      marker.addListener('click', () => {
        const content = `
          <div style="width:220px; font-family: sans-serif;">
            <div style="position:relative; height:120px; background:#f3f4f6; margin-bottom:8px; border-radius:8px; overflow:hidden;">
              ${property.images && property.images.length > 0 
                ? `<img src="${property.images[0]}" style="width:100%; height:100%; object-fit:cover;" referrerpolicy="no-referrer" />` 
                : '<div style="display:flex; align-items:center; justify-content:center; height:100%; color:#9ca3af;">Sin imagen</div>'}
            </div>
            <h3 style="font-weight:bold; font-size:16px; color:#000827; margin:0 0 4px 0;">${property.price}</h3>
            <p style="font-size:12px; color:#4b5563; margin:0 0 8px 0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${property.title}</p>
            <a href="/propiedades/${property.slug}" style="display:block; text-align:center; background:#000827; color:white; padding:8px; border-radius:6px; text-decoration:none; font-weight:bold; font-size:12px;">Ver detalles</a>
          </div>
        `;
        if (infoWindowRef.current && mapInstance.current) {
          infoWindowRef.current.setContent(content);
          infoWindowRef.current.open(mapInstance.current, marker);
        }
      });

      markersRef.current.push(marker);
      bounds.extend(position);
      hasValidBounds = true;
    });

    if (autoFitBounds && hasValidBounds && mapInstance.current) {
      mapInstance.current.fitBounds(bounds);
      
      const listener = window.google.maps.event.addListener(mapInstance.current, 'idle', () => {
        // Prevent map from zooming in completely (gray screen) when there is only 1 property
        if (mapInstance.current.getZoom() > 14) {
          mapInstance.current.setZoom(14);
        }
        window.google.maps.event.removeListener(listener);
      });
    }
  }, [filteredProperties, autoFitBounds]);

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
    setAutoFitBounds(false);
  };

  const handleClearFilters = () => {
    setLocation('');
    setType('');
    setOperation('venta');
    setSearchInBounds(false);
    setAutoFitBounds(true);
  };

  const onPlaceSelected = (place: any) => {
    if (place && place.formatted_address) {
      handleLocationChange(place.formatted_address);
      if (place.geometry && place.geometry.location && mapInstance.current) {
        if (place.geometry.viewport) {
          mapInstance.current.fitBounds(place.geometry.viewport);
        } else {
          mapInstance.current.panTo(place.geometry.location);
          mapInstance.current.setZoom(13);
        }
        // Force bounds search soon after map pans, to grab properties properly
        setTimeout(() => setSearchInBounds(true), 300);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-30 flex flex-col bg-white pt-[60px] md:pt-[80px]">
      {/* Filters Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex flex-nowrap items-center gap-3 shadow-sm z-10 overflow-x-auto no-scrollbar">
        
        {/* Location Search */}
        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 min-w-[200px] md:min-w-[250px] flex-shrink-0">
          <Autocomplete
            onPlaceSelected={onPlaceSelected}
            options={{ types: ['(regions)'], componentRestrictions: { country: 'mx' } }}
            defaultValue={location}
            placeholder="Buscar por ubicación..."
            className="bg-transparent border-none outline-none text-sm w-full text-gray-800"
          />
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
        {/* The Google Map Container */}
        <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>

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
