
import React, { useState, useEffect } from 'react';
import { Shield, FileText, Cookie, ChevronRight, Lock } from 'lucide-react';

type Section = 'privacy' | 'terms' | 'cookies';

const LegalPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('privacy');

  const scrollToSection = (id: Section) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Header offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="pt-24 md:pt-32 pb-[14px] px-[14px] min-h-screen max-w-[100vw] flex flex-col bg-background">
      <div className="relative w-full h-full rounded-3xl md:rounded-[3rem] overflow-hidden bg-[#f8f9fa] py-8 md:py-12 px-4 md:px-12 lg:px-20 shadow-2xl font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-16 border-b border-gray-200 pb-8">
            <span className="text-accent text-xs font-bold uppercase tracking-widest mb-3 block">Marco Legal & Transparencia</span>
            <h1 className="font-serif text-5xl md:text-6xl text-primary tracking-tight">Legal & Compliance</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* SIDEBAR NAVIGATION (Sticky) */}
            <div className="lg:col-span-3">
                <div className="sticky top-32 space-y-2">
                    <button 
                        onClick={() => scrollToSection('privacy')}
                        className={`w-full text-left px-6 py-4 rounded-xl flex items-center justify-between group transition-all duration-300 ${activeSection === 'privacy' ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-white/50'}`}
                    >
                        <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-3">
                            <Shield size={16} className={activeSection === 'privacy' ? 'text-accent' : 'text-gray-400'} /> 
                            Privacidad
                        </span>
                        {activeSection === 'privacy' && <ChevronRight size={14} />}
                    </button>

                    <button 
                        onClick={() => scrollToSection('terms')}
                        className={`w-full text-left px-6 py-4 rounded-xl flex items-center justify-between group transition-all duration-300 ${activeSection === 'terms' ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-white/50'}`}
                    >
                        <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-3">
                            <FileText size={16} className={activeSection === 'terms' ? 'text-accent' : 'text-gray-400'} /> 
                            Términos de Uso
                        </span>
                        {activeSection === 'terms' && <ChevronRight size={14} />}
                    </button>

                    <button 
                        onClick={() => scrollToSection('cookies')}
                        className={`w-full text-left px-6 py-4 rounded-xl flex items-center justify-between group transition-all duration-300 ${activeSection === 'cookies' ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-white/50'}`}
                    >
                        <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-3">
                            <Cookie size={16} className={activeSection === 'cookies' ? 'text-accent' : 'text-gray-400'} /> 
                            Cookies
                        </span>
                        {activeSection === 'cookies' && <ChevronRight size={14} />}
                    </button>
                </div>
            </div>

            {/* CONTENT AREA */}
            <div className="lg:col-span-9 space-y-24">
                
                {/* 1. POLITICA DE PRIVACIDAD */}
                <section id="privacy" className="scroll-mt-32 bg-white p-8 md:p-16 rounded-[2rem] shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary">
                            <Shield size={24} />
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl text-primary">Política de Privacidad</h2>
                    </div>
                    
                    <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-primary prose-p:text-gray-500 prose-p:leading-relaxed prose-a:text-accent">
                        <p className="font-bold text-primary">Última actualización: Febrero 2025</p>
                        <p>
                            En <strong>Casa de Alba Real Estate</strong> (en adelante "La Inmobiliaria"), entendemos que la privacidad es el máximo lujo. Nos comprometemos a proteger la confidencialidad y seguridad de los datos personales de nuestros clientes, inversionistas y visitantes, en estricto apego a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).
                        </p>

                        <h3>1. Responsable de los Datos</h3>
                        <p>
                            Casa de Alba, con domicilio operativo en Puerta de Hierro, Zapopan, Jalisco, es responsable de recabar sus datos personales, del uso que se le dé a los mismos y de su protección.
                        </p>

                        <h3>2. Datos que Recabamos</h3>
                        <p>Para la prestación de nuestros servicios de intermediación inmobiliaria, comercialización y consultoría, podemos recabar:</p>
                        <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-gray-600">
                            <li><strong>Datos de Identificación:</strong> Nombre completo, identificación oficial, CURP, RFC.</li>
                            <li><strong>Datos de Contacto:</strong> Correo electrónico, número telefónico (móvil/fijo), domicilio.</li>
                            <li><strong>Datos Patrimoniales:</strong> Información sobre propiedades de su interés, presupuesto de inversión, capacidad de crédito (únicamente para procesos de cierre).</li>
                        </ul>

                        <h3>3. Finalidad del Tratamiento</h3>
                        <p>Sus datos serán utilizados para:</p>
                        <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-gray-600">
                            <li>Proveer los servicios inmobiliarios solicitados (compra, venta, renta, avalúo).</li>
                            <li>Informar sobre cambios en el inventario o nuevos desarrollos (preventas exclusivas).</li>
                            <li>Dar cumplimiento a obligaciones contraídas con nuestros clientes (contratos).</li>
                            <li>Fines mercadotécnicos, publicitarios o de prospección comercial (Newsletter, The Vault).</li>
                        </ul>

                        <h3>4. Derechos ARCO</h3>
                        <p>
                            Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o bases de datos (Cancelación); así como oponerse al uso de sus datos personales para fines específicos (Oposición).
                        </p>
                        <p>
                            Para ejercer cualquiera de los derechos ARCO, favor de enviar una solicitud a: <a href="mailto:legal@casadealba.com">legal@casadealba.com</a>.
                        </p>
                    </div>
                </section>

                {/* 2. TÉRMINOS DE USO */}
                <section id="terms" className="scroll-mt-32 bg-white p-8 md:p-16 rounded-[2rem] shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary">
                            <FileText size={24} />
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl text-primary">Términos y Condiciones</h2>
                    </div>

                    <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-primary prose-p:text-gray-500 prose-p:leading-relaxed">
                        <h3>1. Aceptación de los Términos</h3>
                        <p>
                            Al acceder y utilizar este sitio web, usted acepta estar sujeto a los siguientes términos y condiciones. Si no está de acuerdo con alguno de estos términos, le rogamos no utilizar nuestra plataforma.
                        </p>

                        <h3>2. Propiedad Intelectual</h3>
                        <p>
                            Todo el contenido mostrado en este sitio, incluyendo pero no limitado a textos, gráficos, logotipos, imágenes de propiedades, videos, clips de audio y software, es propiedad exclusiva de <strong>Casa de Alba</strong> o de sus respectivos propietarios que nos han otorgado licencia para su uso. Está estrictamente prohibida la reproducción, distribución o transmisión de cualquier material sin nuestro consentimiento previo por escrito.
                        </p>

                        <h3>3. Exención de Responsabilidad sobre Propiedades</h3>
                        <p>
                            La información referente a las propiedades (precios, disponibilidad, metros cuadrados, imágenes) es proporcionada a título informativo y está sujeta a cambios sin previo aviso.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-gray-600">
                            <li><strong>Precios:</strong> Los precios mostrados pueden variar debido a la plusvalía, tipo de cambio o decisión del propietario.</li>
                            <li><strong>Disponibilidad:</strong> Aunque actualizamos nuestro inventario constantemente, no garantizamos que todas las propiedades mostradas estén disponibles en tiempo real.</li>
                            <li><strong>Renders:</strong> Las imágenes generadas por computadora (Renders) en desarrollos en preventa son ilustrativas y pueden diferir del producto final entregado.</li>
                        </ul>

                        <h3>4. Uso Prohibido</h3>
                        <p>
                            Usted acuerda no utilizar el sitio para ningún propósito ilegal. Se prohíbe el uso de sistemas automatizados (bots) para extraer datos de nuestro inventario sin autorización.
                        </p>
                    </div>
                </section>

                {/* 3. POLÍTICA DE COOKIES */}
                <section id="cookies" className="scroll-mt-32 bg-white p-8 md:p-16 rounded-[2rem] shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary">
                            <Cookie size={24} />
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl text-primary">Uso de Cookies</h2>
                    </div>

                    <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-primary prose-p:text-gray-500 prose-p:leading-relaxed">
                        <p>
                            Utilizamos cookies y tecnologías similares para mejorar su experiencia de navegación, analizar el tráfico del sitio y personalizar el contenido.
                        </p>

                        <h3>¿Qué son las cookies?</h3>
                        <p>
                            Las cookies son pequeños archivos de texto que los sitios web almacenan en su dispositivo para recordar sus preferencias y mejorar la funcionalidad.
                        </p>

                        <h3>Tipos de Cookies que utilizamos</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                <h4 className="font-serif text-primary text-xl mb-2">Esenciales</h4>
                                <p className="text-sm text-gray-600">Necesarias para el funcionamiento técnico del sitio (ej. recordar sus filtros de búsqueda o sesión).</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                <h4 className="font-serif text-primary text-xl mb-2">Analíticas</h4>
                                <p className="text-sm text-gray-600">Nos ayudan a entender cómo interactúan los visitantes con el sitio (Google Analytics).</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                <h4 className="font-serif text-primary text-xl mb-2">Publicidad</h4>
                                <p className="text-sm text-gray-600">Utilizadas para mostrarle anuncios relevantes de nuestras propiedades en otros sitios web.</p>
                            </div>
                        </div>

                        <h3>Control de Cookies</h3>
                        <p>
                            Puede configurar su navegador para rechazar todas las cookies o para indicar cuándo se envía una cookie. Sin embargo, si no acepta cookies, es posible que no pueda utilizar algunas partes de nuestro servicio (como el Guardado de Favoritos o el acceso a The Vault).
                        </p>
                    </div>
                </section>

                <div className="text-center pt-8 border-t border-gray-200">
                    <p className="text-gray-400 text-xs">
                        Para cualquier duda legal, contáctenos en <span className="text-primary font-bold">legal@casadealba.com</span>
                    </p>
                </div>

            </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default LegalPage;
