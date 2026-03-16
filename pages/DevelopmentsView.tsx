
import React, { useState, useEffect } from 'react';
import { DEVELOPMENTS } from '../data/mockData';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, DollarSign, Star, LayoutTemplate } from 'lucide-react';
import FloatingSearch from '../components/FloatingSearch';

const DevelopmentsView: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // Simulación de carga para mostrar los Skeletons
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 segundos de skeleton para apreciar el efecto
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-24 md:pt-32 pb-[14px] px-[14px] min-h-screen max-w-[100vw] flex flex-col bg-background">
      <div className="relative w-full h-full rounded-3xl md:rounded-[3rem] overflow-hidden bg-[#f8f9fa] py-8 md:py-12 px-4 md:px-12 lg:px-20 shadow-2xl">
        
        {/* HEADER SIMPLE */}
        <div className="max-w-7xl mx-auto mb-12 md:mb-16 text-center md:text-left">
           <span className="text-accent text-xs font-bold uppercase tracking-widest mb-3 block">Colección Exclusiva</span>
           <h1 className="font-serif text-4xl md:text-6xl text-primary tracking-tight mb-4">
              Desarrollos <span className="text-gray-400 italic font-light">& Preventas</span>
           </h1>
           <p className="text-gray-500 max-w-2xl text-base md:text-lg font-light mx-auto md:mx-0">
              Invierta en el futuro. Proyectos arquitectónicos seleccionados por su plusvalía y diseño excepcional.
           </p>
        </div>

        <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
          {loading ? (
            // --- SKELETON LOADING STATE ---
            <>
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            // --- REAL CONTENT STATE ---
            DEVELOPMENTS.map((dev) => (
              <div 
                key={dev.id} 
                className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 group animate-fadeInUp"
              >
                <div className="flex flex-col lg:flex-row min-h-[500px]">
                  
                  {/* IMAGE BOX (55%) */}
                  <div className="w-full lg:w-[55%] relative overflow-hidden h-[300px] lg:h-auto">
                     <div className="absolute top-6 left-6 z-20">
                        <span className="bg-white/90 backdrop-blur px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest text-primary shadow-lg">
                          En Construcción
                        </span>
                     </div>
                     
                     <Link to={`/desarrollos/${dev.slug}`} className="block h-full w-full">
                       <img 
                         src={dev.images[0]} 
                         alt={dev.name} 
                         loading="lazy"
                         className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                       />
                       <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500"></div>
                     </Link>
                  </div>

                  {/* CONTENT BOX (45%) */}
                  <div className="w-full lg:w-[45%] p-8 md:p-12 flex flex-col justify-center relative bg-white">
                     
                     <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">
                        <MapPin size={14} className="text-accent" /> {dev.location}
                     </div>

                     <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4 leading-none">
                        {dev.name}
                     </h2>
                     
                     <p className="font-serif text-xl text-accent italic mb-6">
                        {dev.tagline}
                     </p>

                     <div className="h-px w-20 bg-gray-200 mb-6"></div>

                     <p className="text-gray-500 font-light leading-relaxed mb-8 text-sm md:text-base line-clamp-3">
                        {dev.description}
                     </p>

                     {/* Grid de Datos "Harmónico" */}
                     <div className="grid grid-cols-2 gap-4 mb-10">
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                           <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase mb-1">
                              <DollarSign size={12}/> Desde
                           </div>
                           <div className="text-primary font-bold text-sm md:text-base">{dev.startingPrice}</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                           <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase mb-1">
                              <Calendar size={12}/> Entrega
                           </div>
                           <div className="text-primary font-bold text-sm md:text-base">{dev.completionDate}</div>
                        </div>
                     </div>

                     <div className="mt-auto">
                        <Link 
                          to={`/desarrollos/${dev.slug}`} 
                          className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-accent transition-all duration-300 shadow-lg"
                        >
                          Ver Disponibilidad <ArrowRight size={16} />
                        </Link>
                     </div>

                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER MESSAGE */}
        <div className="text-center mt-20">
           <p className="text-gray-400 text-sm">Mostrando {DEVELOPMENTS.length} proyectos icónicos.</p>
        </div>
      </div>
      <FloatingSearch />
    </div>
  );
};

// --- COMPONENTE SKELETON (Estilizado Armónicamente) ---
const SkeletonCard = () => (
  <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 mb-12">
    <div className="flex flex-col lg:flex-row min-h-[500px]">
      
      {/* Skeleton Image - Gray Shimmer Block */}
      <div className="w-full lg:w-[55%] h-[300px] lg:h-auto bg-gray-200 relative overflow-hidden">
         {/* Shimmer Effect */}
         <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
         
         {/* Badge Skeleton */}
         <div className="absolute top-6 left-6 w-32 h-8 bg-gray-300 rounded-lg"></div>
      </div>

      {/* Skeleton Content - Structured Blocks */}
      <div className="w-full lg:w-[45%] p-8 md:p-12 flex flex-col justify-center relative">
         
         {/* Location Tag */}
         <div className="w-32 h-4 bg-gray-200 rounded mb-6 animate-pulse"></div>
         
         {/* Title Big Block */}
         <div className="w-3/4 h-12 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
         
         {/* Subtitle Italic Block */}
         <div className="w-1/2 h-6 bg-gray-100 rounded mb-8 animate-pulse"></div>

         {/* Divider */}
         <div className="h-px w-20 bg-gray-100 mb-8"></div>

         {/* Paragraph Lines */}
         <div className="space-y-3 mb-10">
            <div className="w-full h-3 bg-gray-100 rounded animate-pulse"></div>
            <div className="w-full h-3 bg-gray-100 rounded animate-pulse"></div>
            <div className="w-2/3 h-3 bg-gray-100 rounded animate-pulse"></div>
         </div>

         {/* Grid Boxes Skeleton */}
         <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="h-20 bg-gray-50 rounded-xl border border-gray-100 p-4">
               <div className="w-12 h-3 bg-gray-200 rounded mb-2"></div>
               <div className="w-24 h-5 bg-gray-300 rounded"></div>
            </div>
            <div className="h-20 bg-gray-50 rounded-xl border border-gray-100 p-4">
               <div className="w-12 h-3 bg-gray-200 rounded mb-2"></div>
               <div className="w-24 h-5 bg-gray-300 rounded"></div>
            </div>
         </div>

         {/* Button Skeleton */}
         <div className="w-full md:w-48 h-12 bg-gray-800/10 rounded-xl animate-pulse mt-auto"></div>
      </div>
    </div>
  </div>
);

export default DevelopmentsView;
