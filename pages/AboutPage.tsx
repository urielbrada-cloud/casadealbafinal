
import React from 'react';
import { useTeam } from '../hooks/useTeam';
import { Quote, Star, ArrowRight } from 'lucide-react';

const AboutPage: React.FC = () => {
  const { team: TEAM, loading } = useTeam();

  return (
    <div className="pt-24 md:pt-32 pb-[14px] px-[14px] min-h-screen max-w-[100vw] flex flex-col bg-background">
      <div className="relative w-full h-full rounded-3xl md:rounded-[3rem] overflow-hidden bg-white py-8 md:py-12 px-0 md:px-0 lg:px-0 shadow-2xl">
      
      {/* 1. HERO - Editorial Typography & Architecture */}
      <section className="pt-20 md:pt-40 pb-12 md:pb-20 px-4 md:px-6 max-w-[1920px] mx-auto">
         <div className="max-w-7xl mx-auto">
            <div className="border-b border-primary/10 pb-8 md:pb-12 mb-12 md:mb-16 animate-fadeIn">
                <span className="block text-accent text-xs font-bold uppercase tracking-[0.3em] mb-4 md:mb-6">Nuestra Esencia</span>
                <h1 className="font-serif text-5xl md:text-8xl lg:text-[7.5rem] leading-[0.9] tracking-tighter text-primary">
                   El arte de <br/>
                   <span className="italic font-light text-gray-500 font-serif">vivir bien.</span>
                </h1>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                <div className="lg:col-span-4 lg:sticky lg:top-32 self-start animate-fadeInUp delay-100">
                   <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-600">
                      Casa de Alba no es una inmobiliaria tradicional. Somos una consultora de patrimonio dedicada a la arquitectura, el diseño y la rentabilidad financiera.
                   </p>
                   <div className="w-16 h-[1px] bg-accent mt-8"></div>
                </div>
                
                <div className="lg:col-span-8 relative group overflow-hidden rounded-sm animate-fadeInUp delay-200">
                   <div className="aspect-[16/9] w-full overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop"
                        loading="lazy"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.5s] ease-in-out transform group-hover:scale-105"
                        alt="Luxury Architecture"
                      />
                   </div>
                   <div className="absolute inset-0 bg-primary/5 mix-blend-multiply pointer-events-none"></div>
                </div>
            </div>
         </div>
      </section>

      {/* 2. FOUNDER - Asymmetrical Layout */}
      <section className="py-32 px-6 max-w-[1920px] mx-auto overflow-hidden">
         <div className="max-w-7xl mx-auto relative">
             {/* Background Decorative Text */}
             <div className="absolute -top-20 -left-20 text-[12rem] font-serif text-white opacity-40 pointer-events-none select-none z-0 hidden lg:block leading-none">
                 ALBA
             </div>

             <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-center relative z-10">
                <div className="w-full md:w-5/12 relative">
                   <div className="relative z-10 w-full aspect-[3/4] overflow-hidden rounded-sm shadow-2xl bg-gray-200">
                      <img 
                        src="https://lh3.googleusercontent.com/d/1hx7vxWDh9y4zmAIAOudQw5HJaIeS6jV1" 
                        alt="Uriel De Alba"
                        loading="lazy"
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      />
                   </div>
                   {/* Gold Box Decoration */}
                   <div className="absolute -bottom-6 -right-6 w-full h-full border border-accent/30 z-0 hidden md:block"></div>
                </div>
                
                <div className="w-full md:w-7/12 md:pl-8">
                   <Quote className="text-accent mb-8" size={48} strokeWidth={1} />
                   <h2 className="font-serif text-3xl md:text-5xl leading-[1.1] mb-10 text-primary">
                      "Innovar no es una opción, es una respuesta urgente a un mercado que exige más que una simple transacción."
                   </h2>
                   <div className="space-y-6 text-gray-600 font-light text-lg leading-loose text-justify md:text-left">
                      <p>
                         Casa de Alba nace este año con una visión disruptiva, detectando una necesidad crítica en el sector inmobiliario: la falta de una comercialización estratégica real. No somos una agencia del pasado; somos la respuesta al futuro del Real Estate en Guadalajara.
                      </p>
                      <p>
                         Aunque nuestra firma es joven, nacemos grandes. Contamos con el respaldo operativo y la solidez de aliados comerciales de primer nivel, lo que nos permite gestionar patrimonios con la experiencia de veteranos y la energía de la innovación.
                      </p>
                      <p>
                         Mi compromiso como Fundador es transformar la manera en que se mueven los activos inmobiliarios, ofreciendo certeza, análisis financiero y una ejecución impecable.
                      </p>
                   </div>
                   <div className="mt-12 flex items-center gap-4">
                      <div className="h-[1px] w-12 bg-primary"></div>
                      <div>
                          <p className="font-serif text-2xl text-primary italic">Uriel De Alba</p>
                          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mt-1">Fundador & CEO</p>
                      </div>
                   </div>
                </div>
             </div>
         </div>
      </section>

      {/* 3. MANIFESTO - Dark Mode Contrast */}
      <section className="bg-[#0B1120] text-white py-32 px-6 rounded-[3rem] my-12 mx-4 md:mx-8 shadow-2xl">
         <div className="max-w-7xl mx-auto">
             <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/10 pb-8">
                <h2 className="font-serif text-5xl md:text-7xl">Manifiesto</h2>
                <p className="text-white/50 max-w-sm text-right md:text-left mt-6 md:mt-0 font-light">
                   Los pilares innegociables sobre los que construimos nuestra nueva visión.
                </p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
                {[
                   { title: "Innovación", desc: "Rompemos los esquemas tradicionales. Utilizamos tecnología y marketing de alto impacto para dar a cada propiedad el protagonismo que merece." },
                   { title: "Respaldo", desc: "Nuestra juventud es nuestra fuerza, pero nuestras alianzas son nuestra garantía. Operamos con una red de socios comerciales de probada trayectoria." },
                   { title: "Gestión", desc: "No solo vendemos propiedades; gestionamos patrimonios. Analizamos tendencias y datos para asegurar que cada movimiento sea financieramente inteligente." }
                ].map((item, idx) => (
                   <div key={idx} className="group relative pl-8 border-l border-white/20 hover:border-accent transition-colors duration-500">
                      <span className="text-accent text-xs font-bold mb-6 block tracking-widest opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 transform duration-300">0{idx + 1}</span>
                      <h3 className="font-serif text-3xl lg:text-4xl mb-6 text-white group-hover:text-accent transition-colors duration-300">{item.title}</h3>
                      <p className="text-white/60 font-light leading-relaxed text-sm lg:text-base">
                         {item.desc}
                      </p>
                   </div>
                ))}
             </div>
         </div>
      </section>

      {/* 4. TEAM - Clean Minimalist Grid */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
         <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <div>
                <span className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Nuestro Talento</span>
                <h2 className="font-serif text-5xl text-primary">Mentes Maestras</h2>
            </div>
            <button 
                onClick={() => {
                    const message = `Hola me interesa unirme al equipo de Casa de Alba`;
                    window.open(`https://wa.me/523322275000?text=${encodeURIComponent(message)}`, '_blank');
                }}
                className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors mt-8 md:mt-0"
            >
               Unirse al equipo <ArrowRight size={14}/>
            </button>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((member) => (
               <div key={member.id} className="group cursor-pointer">
                  <div className="w-full aspect-[3/4] overflow-hidden mb-6 relative bg-gray-200">
                     <img 
                        src={member.image} 
                        alt={member.name} 
                        loading="lazy"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                     />
                     {/* Elegant Hover Overlay */}
                     <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                        <span className="text-white text-xs font-bold uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Ver Perfil</span>
                     </div>
                  </div>
                  <h3 className="font-serif text-2xl text-primary group-hover:text-accent transition-colors">{member.name}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-2 mb-3">{member.role}</p>
                  <p className="text-sm text-gray-500 font-light leading-relaxed line-clamp-3">
                     {member.bio}
                  </p>
               </div>
            ))}
             
             {/* Hiring Card Minimal - TRIGGER FORM */}
             <div 
                onClick={() => {
                    const message = `Hola me interesa unirme al equipo de Casa de Alba`;
                    window.open(`https://wa.me/523322275000?text=${encodeURIComponent(message)}`, '_blank');
                }}
                className="w-full aspect-[3/4] bg-white border border-dashed border-gray-300 flex flex-col items-center justify-center p-8 text-center hover:border-accent hover:bg-white transition-all duration-300 cursor-pointer group"
             >
                  <h3 className="font-serif text-2xl mb-3 text-primary">¿Eres excepcional?</h3>
                  <p className="text-sm text-gray-500 mb-8 font-light leading-relaxed">Buscamos agentes con los más altos estándares éticos y comerciales.</p>
                  <span className="text-accent text-[10px] font-bold uppercase tracking-widest group-hover:underline decoration-accent underline-offset-4">Aplicar Ahora</span>
             </div>
         </div>
         
         <div className="md:hidden mt-12 text-center">
            <button 
                onClick={() => {
                    const message = `Hola me interesa unirme al equipo de Casa de Alba`;
                    window.open(`https://wa.me/523322275000?text=${encodeURIComponent(message)}`, '_blank');
                }}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors"
            >
               Unirse al equipo <ArrowRight size={14}/>
            </button>
         </div>
      </section>

      {/* 5. FEATURED TESTIMONIAL - High Impact */}
      <section className="bg-white py-32 px-6 border-t border-gray-100">
         <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 flex justify-center text-accent">
                <Star className="w-6 h-6 fill-current" />
                <Star className="w-6 h-6 fill-current" />
                <Star className="w-6 h-6 fill-current" />
                <Star className="w-6 h-6 fill-current" />
                <Star className="w-6 h-6 fill-current" />
            </div>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight mb-12 text-primary tracking-tight">
               "La atención al detalle y el conocimiento del mercado de Casa de Alba es incomparable. Entendieron no solo lo que buscaba, sino <span className="text-accent italic">cómo quería vivir</span>."
            </h2>
            <div className="flex flex-col items-center gap-2">
               <p className="font-bold text-primary text-sm uppercase tracking-widest">Roberto Martínez</p>
               <p className="text-xs text-gray-400 font-serif italic">Inversionista Inmobiliario & Desarrollador</p>
            </div>
         </div>
      </section>



      </div>
    </div>
  );
};

export default AboutPage;
