
import React from 'react';
import { Megaphone, Key, HardHat, TrendingUp, Scale, Building, Crown, PartyPopper, Users, Briefcase, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesPage: React.FC = () => {
  return (
    <div className="bg-[#f8f9fa] min-h-screen pt-32 pb-24 px-4 md:px-8">
      
      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto mb-20 text-center md:text-left">
         <span className="text-accent text-xs font-bold uppercase tracking-widest mb-3 block animate-fadeIn">Soluciones Integrales</span>
         <h1 className="font-serif text-5xl md:text-7xl text-primary tracking-tight mb-6 animate-fadeInUp">
            Más allá de la <span className="italic text-gray-400 font-light">transacción.</span>
         </h1>
         <p className="text-gray-500 max-w-2xl text-lg font-light animate-fadeInUp delay-100">
            Ofrecemos un ecosistema de servicios inmobiliarios diseñado para desarrolladores, inversionistas y propietarios que exigen excelencia en cada etapa del ciclo de vida del activo.
         </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* 1. MARKETING & DESARROLLOS (Destacado) */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-12 items-center animate-fadeInUp">
           <div className="w-full md:w-1/2">
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
                 <Megaphone size={14} /> Desarrolladores
              </div>
              <h2 className="font-serif text-4xl text-primary mb-6">Marketing Inmobiliario 360°</h2>
              <p className="text-gray-500 font-light leading-relaxed mb-8">
                 Transformamos planos en objetos de deseo. Nuestro equipo creativo y comercial acompaña al desarrollador desde la concepción de la marca hasta la entrega de la última unidad.
              </p>
              <ul className="space-y-4">
                 <ServiceItem icon={<Crown size={18}/>} title="Creación de Marca (Branding)" desc="Naming, identidad visual y narrativa del proyecto." />
                 <ServiceItem icon={<PartyPopper size={18}/>} title="Eventos de Lanzamiento" desc="Experiencias exclusivas para brokers y compradores VIP." />
                 <ServiceItem icon={<Users size={18}/>} title="Generación de Leads" desc="Estrategias digitales de alto impacto para captar clientes cualificados." />
              </ul>
           </div>
           <div className="w-full md:w-1/2 h-[400px] rounded-[2rem] overflow-hidden relative group">
              <img 
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop" 
                alt="Marketing Meeting" 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors"></div>
           </div>
        </div>

        {/* GRID DE SERVICIOS SECUNDARIOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* 2. COMERCIALIZACIÓN */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center text-primary mb-8">
                    <Key size={28} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-3xl text-primary mb-4">Comercialización Elite</h3>
                <p className="text-gray-500 font-light leading-relaxed mb-6 text-sm">
                    Ya sea venta o renta, posicionamos su propiedad ante la audiencia correcta. Utilizamos nuestra red de contactos globales y herramientas tecnológicas para cerrar tratos con rapidez y discreción.
                </p>
                <Link to="/nosotros" className="text-accent text-xs font-bold uppercase tracking-widest hover:underline">
                    Vender mi propiedad
                </Link>
            </div>

            {/* 3. INVERSIÓN */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="bg-green-50 w-14 h-14 rounded-2xl flex items-center justify-center text-primary mb-8">
                    <TrendingUp size={28} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-3xl text-primary mb-4">Proyectos de Inversión</h3>
                <p className="text-gray-500 font-light leading-relaxed mb-6 text-sm">
                    Estructuramos portafolios de inversión inmobiliaria con altos rendimientos. Identificamos oportunidades en tierra, preventas distressed y activos comerciales con flujos garantizados.
                </p>
                <Link to="/inversion" className="text-accent text-xs font-bold uppercase tracking-widest hover:underline">
                    Ver oportunidades
                </Link>
            </div>

            {/* 4. CONSTRUCCIÓN */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="bg-orange-50 w-14 h-14 rounded-2xl flex items-center justify-center text-primary mb-8">
                    <HardHat size={28} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-3xl text-primary mb-4">Construcción a la Medida</h3>
                <p className="text-gray-500 font-light leading-relaxed mb-6 text-sm">
                    Materializamos su visión. Desde la selección del terreno hasta la entrega de llaves, gestionamos proyectos arquitectónicos personalizados (Build-to-suit) cuidando cada detalle y presupuesto.
                </p>
            </div>

            {/* 5. PROPERTY MANAGEMENT */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="bg-purple-50 w-14 h-14 rounded-2xl flex items-center justify-center text-primary mb-8">
                    <Building size={28} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-3xl text-primary mb-4">Administración de Propiedades</h3>
                <p className="text-gray-500 font-light leading-relaxed mb-6 text-sm">
                    Maximizamos el valor de su activo sin que usted mueva un dedo. 
                    <br/><br/>
                    • <strong>Estancia Vacacional:</strong> Gestión tipo hotelera para Airbnb/VRBO.
                    <br/>
                    • <strong>Larga Estancia:</strong> Filtrado de inquilinos y mantenimiento.
                </p>
            </div>

        </div>

        {/* 6. LEGAL & FISCAL (Full width box) */}
        <div className="bg-primary text-white rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden">
             {/* Decoración de fondo */}
             <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] pointer-events-none"></div>

             <div className="relative z-10 flex flex-col md:flex-row gap-12 items-start">
                 <div className="md:w-1/3">
                    <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 backdrop-blur-md">
                        <Scale size={32} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif text-3xl md:text-4xl mb-4">Blindaje Patrimonial</h3>
                    <p className="text-white/60 font-light">
                        La seguridad legal es la base de cualquier inversión exitosa.
                    </p>
                 </div>
                 
                 <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-3 mb-3 text-accent">
                            <Scale size={20} />
                            <h4 className="font-bold uppercase tracking-widest text-xs">Asesoría Jurídica</h4>
                        </div>
                        <p className="text-sm text-gray-300 font-light leading-relaxed">
                            Revisión exhaustiva de títulos de propiedad, elaboración de contratos blindados, fideicomisos y resolución de controversias inmobiliarias.
                        </p>
                     </div>
                     <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-3 mb-3 text-accent">
                            <Briefcase size={20} />
                            <h4 className="font-bold uppercase tracking-widest text-xs">Estrategia Fiscal</h4>
                        </div>
                        <p className="text-sm text-gray-300 font-light leading-relaxed">
                            Optimización de impuestos en la compra-venta (ISR), estrategias de deducción para arrendadores y estructuración fiscal de desarrollos.
                        </p>
                     </div>
                 </div>
             </div>
        </div>

        {/* 7. CTA: VENDER PROPIEDAD */}
        <div className="bg-white rounded-[2.5rem] p-12 md:p-24 text-center shadow-xl border border-gray-100 mt-8 relative overflow-hidden group">
             {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 max-w-3xl mx-auto">
                <span className="inline-block py-1 px-3 rounded-full bg-surface-light border border-gray-200 text-accent text-[10px] font-bold uppercase tracking-widest mb-6">
                    Consignación de Propiedades
                </span>
                <h2 className="font-serif text-4xl md:text-6xl text-primary mb-6 tracking-tight">
                    ¿Listo para vender su propiedad?
                </h2>
                <p className="text-gray-500 text-lg font-light mb-10 leading-relaxed">
                    Confíe su patrimonio a los expertos. Ofrecemos una valuación comercial precisa y una estrategia de marketing global para encontrar al comprador ideal, en el menor tiempo posible.
                </p>
                
                <div className="flex flex-col md:flex-row justify-center gap-4">
                    <a 
                        href="https://wa.me/523322275000" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-3 bg-primary text-white px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-accent transition-all duration-300 shadow-lg hover:-translate-y-1 group"
                    >
                        Agendar Valuación Gratuita
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
                <p className="mt-6 text-gray-400 text-xs">
                    *Servicio exclusivo para propiedades residenciales Plus y Comerciales.
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

const ServiceItem: React.FC<{icon: React.ReactNode, title: string, desc: string}> = ({ icon, title, desc }) => (
    <li className="flex gap-4 items-start">
        <div className="mt-1 text-accent bg-accent/5 p-2 rounded-lg">{icon}</div>
        <div>
            <h4 className="font-bold text-primary text-sm mb-1">{title}</h4>
            <p className="text-xs text-gray-500">{desc}</p>
        </div>
    </li>
);

export default ServicesPage;
