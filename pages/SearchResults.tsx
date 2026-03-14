
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { getProperties } from '../data/mockData';
import { fetchEasyBrokerProperties } from '../services/easybroker';
import { Property } from '../types';
import { SearchX, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);
  
  const [isLoading, setIsLoading] = useState(true);
  
  const locationFilter = searchParams.get('location');
  const typeFilter = searchParams.get('type');
  const operationFilter = searchParams.get('operation');

  // Load properties dynamically
  useEffect(() => {
    const loadProperties = async () => {
      setIsLoading(true);
      try {
        // Fetch local inventory
        const localProps = getProperties();
        
        // Fetch external inventory from EasyBroker
        const externalProps = await fetchEasyBrokerProperties({
          limit: '20', // Fetch up to 20 properties for demo
        });
        
        // Combine both
        setProperties([...localProps, ...externalProps]);
      } catch (error) {
        console.warn("Error loading properties:", error);
        setProperties(getProperties()); // Fallback to local
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProperties();
  }, []);

  // Propiedades sugeridas (Featured) para mostrar cuando no hay resultados
  const suggestedProperties = properties.filter(p => p.isFeatured).slice(0, 3);

  useEffect(() => {
    if (properties.length === 0) return;

    let results = properties;
    let activeFilters = false;

    if (locationFilter) {
      results = results.filter(p => p.location.toLowerCase().includes(locationFilter.toLowerCase()));
      activeFilters = true;
    }

    if (typeFilter) {
      results = results.filter(p => p.type.toLowerCase() === typeFilter.toLowerCase() || (typeFilter === 'residential' && p.type === 'residential'));
      activeFilters = true;
    } 

    if (operationFilter) {
      // Simple logic for demo purposes based on price string
      if (operationFilter === 'renta') {
        results = results.filter(p => p.price.includes('/') || p.price.toLowerCase().includes('mes'));
      } else {
        results = results.filter(p => !p.price.includes('/') && !p.price.toLowerCase().includes('mes'));
      }
      activeFilters = true;
    }

    setFilteredProperties(results);
    setIsFiltering(activeFilters);
  }, [locationFilter, typeFilter, operationFilter, properties]);

  const clearFilters = () => {
    navigate('/propiedades');
  };

  const hasResults = filteredProperties.length > 0;

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen max-w-7xl mx-auto">
      
      {/* HEADER */}
      <div className="mb-12 mt-4 border-b border-gray-200 pb-8 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <span className="text-accent text-xs font-bold uppercase tracking-widest mb-2 block">
            {isFiltering ? 'Resultados de Búsqueda' : 'Inventario Completo'}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-primary tracking-tight-heading leading-none">
            {isLoading ? 'Buscando propiedades...' : hasResults ? (
               locationFilter ? `Propiedades en ${locationFilter}` : 'Colección Exclusiva'
            ) : (
               'Sin coincidencias exactas'
            )}
          </h1>
        </div>
        
        {isFiltering && (
            <button 
              onClick={clearFilters}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-accent transition-colors"
            >
              <RotateCcw size={14} /> Limpiar Filtros
            </button>
        )}
      </div>

      {/* RESULTS GRID */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
        </div>
      ) : hasResults ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map(prop => (
            <div key={prop.id} className="animate-fadeInUp">
              <PropertyCard property={prop} />
            </div>
          ))}
        </div>
      ) : (
        /* EMPTY STATE & SUGGESTIONS */
        <div className="animate-fadeIn">
          
          {/* Message Box */}
          <div className="bg-gray-50 rounded-[2rem] p-12 text-center border border-gray-100 mb-20 max-w-3xl mx-auto">
            <div className="inline-flex bg-white p-4 rounded-full shadow-sm mb-6 text-gray-400">
              <SearchX size={32} strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-primary mb-4 tracking-tight">
              No encontramos propiedades con esos criterios específicos.
            </h3>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto leading-relaxed">
              Nuestro inventario off-market cambia diariamente. Le sugerimos ampliar su búsqueda o explorar nuestras recomendaciones destacadas.
            </p>
            <button 
              onClick={clearFilters}
              className="bg-primary text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-accent transition-colors shadow-lg"
            >
              Ver Todo el Inventario
            </button>
          </div>

          {/* Suggestions Section */}
          <div className="border-t border-gray-200 pt-16">
             <div className="flex items-center gap-3 mb-10">
                <Sparkles size={20} className="text-accent" />
                <h2 className="font-serif text-3xl text-primary tracking-tight">Sugerencias del Concierge</h2>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {suggestedProperties.map((prop, idx) => (
                   <div key={prop.id} style={{ animationDelay: `${idx * 100}ms` }} className="animate-fadeInUp">
                      <PropertyCard property={prop} />
                   </div>
                ))}
             </div>
             
             <div className="mt-12 text-center">
                <Link to="/desarrollos" className="inline-flex items-center gap-2 text-primary font-serif text-xl hover:text-accent transition-colors">
                   Explorar Nuevos Desarrollos <ArrowRight size={20} />
                </Link>
             </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default SearchResults;
