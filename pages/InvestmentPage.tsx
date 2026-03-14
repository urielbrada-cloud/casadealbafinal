
import React, { useState } from 'react';
import { submitContactForm } from '../services/contact';
import { Lock, TrendingUp, ShieldCheck, X, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

const InvestmentPage: React.FC = () => {
  const [showAccessForm, setShowAccessForm] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Prevent scroll when modal is open
  React.useEffect(() => {
    if (showAccessForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showAccessForm]);

  // Reset form when modal closes
  React.useEffect(() => {
      if (!showAccessForm) {
          setTimeout(() => setFormStatus('idle'), 300);
      }
  }, [showAccessForm]);

  const handleRequestAccess = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    const formData = new FormData(e.currentTarget);
    
    try {
      await submitContactForm(formData, 'vault-access');
      setFormStatus('success');
    } catch (error) {
      alert("Error al enviar solicitud.");
      setFormStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-primary text-white pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-accent rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-block p-4 bg-white/5 rounded-full mb-8 backdrop-blur-sm border border-white/10">
          <Lock size={32} className="text-accent" />
        </div>
        <h1 className="font-serif text-5xl md:text-7xl mb-6 tracking-tight-heading">The Vault</h1>
        <p className="text-gray-400 text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
          Acceso a nuestra colección privada de activos off-market, oportunidades distress y preventas de alto ROI. Esta sección está restringida a inversionistas acreditados.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-left">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-accent/50 transition-colors">
             <TrendingUp className="text-accent mb-4" size={24} />
             <h3 className="font-serif text-xl mb-2 tracking-tight">Alto Rendimiento</h3>
             <p className="text-gray-500 text-sm">Proyectos residenciales e industriales con rendimientos anuales proyectados superiores al 12%.</p>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-accent/50 transition-colors">
             <ShieldCheck className="text-accent mb-4" size={24} />
             <h3 className="font-serif text-xl mb-2 tracking-tight">Activos Seguros</h3>
             <p className="text-gray-500 text-sm">Propiedades con estatus legal verificado e historial de propiedad claro.</p>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-accent/50 transition-colors">
             <Lock className="text-accent mb-4" size={24} />
             <h3 className="font-serif text-xl mb-2 tracking-tight">Off-Market</h3>
             <p className="text-gray-500 text-sm">La exclusividad es clave. Navegue por un inventario que nunca aparecerá en portales públicos.</p>
          </div>
        </div>

        <div className="bg-white text-primary p-8 md:p-12 rounded-2xl shadow-2xl max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl mb-4 tracking-tight">Solicitar Acceso</h2>
          <p className="text-gray-500 mb-6 text-sm">Por favor verifique sus credenciales para entrar a The Vault.</p>
          <form className="space-y-4">
             <input type="email" placeholder="Correo Corporativo" className="w-full bg-gray-100 p-4 rounded-xl outline-none focus:ring-2 focus:ring-accent transition-all" />
             <input type="password" placeholder="Código de Acceso (Opcional)" className="w-full bg-gray-100 p-4 rounded-xl outline-none focus:ring-2 focus:ring-accent transition-all" />
             <button type="button" className="w-full bg-accent text-white font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-primary transition-colors shadow-lg">
               Desbloquear
             </button>
          </form>
          <div className="mt-6 pt-6 border-t border-gray-100">
             <p className="text-xs text-gray-400">
                ¿No tiene un código? 
                <button 
                  onClick={() => setShowAccessForm(true)} 
                  className="underline hover:text-accent font-bold ml-1 transition-colors"
                >
                  Solicite ingreso a nuestro equipo.
                </button>
             </p>
          </div>
        </div>
      </div>

      {/* --- ACCESS REQUEST MODAL --- */}
      {showAccessForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#0B1120]/90 backdrop-blur-sm transition-opacity" onClick={() => setShowAccessForm(false)}></div>
            <div className="bg-white w-full max-w-lg rounded-3xl p-8 md:p-12 relative z-10 animate-fadeInUp shadow-2xl">
                <button onClick={() => setShowAccessForm(false)} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20} className="text-gray-400"/></button>
                
                {formStatus === 'success' ? (
                    <div className="text-center py-10 animate-fadeIn">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
                            <CheckCircle2 size={40} />
                        </div>
                        <h3 className="font-serif text-3xl text-primary mb-4">Solicitud Recibida</h3>
                        <p className="text-gray-500 mb-8 max-w-xs mx-auto leading-relaxed">
                            Un asesor senior validará sus credenciales y se pondrá en contacto en menos de 24 horas.
                        </p>
                        <button 
                            onClick={() => setShowAccessForm(false)}
                            className="bg-primary text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-accent transition-colors"
                        >
                            Cerrar
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="mb-8 text-center">
                            <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                                <Lock size={24} />
                            </div>
                            <span className="text-accent text-[10px] font-bold uppercase tracking-widest block mb-2">The Vault Access</span>
                            <h3 className="font-serif text-3xl text-primary leading-none">Solicitud de Ingreso</h3>
                        </div>

                        <form 
                            name="vault-access" 
                            method="POST" 
                            data-netlify="true" 
                            className="space-y-6" 
                            onSubmit={handleRequestAccess}
                        >
                            <input type="hidden" name="form-name" value="vault-access" />

                            <div className="space-y-4">
                                <div className="relative group">
                                    <input type="text" name="name" required disabled={formStatus === 'submitting'} className="peer w-full border-b border-gray-200 py-3 text-primary outline-none focus:border-accent bg-transparent placeholder-transparent transition-colors disabled:opacity-50" id="accessName" placeholder="Nombre" />
                                    <label htmlFor="accessName" className="absolute left-0 -top-3.5 text-xs text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-accent font-bold uppercase tracking-widest">Nombre Completo</label>
                                </div>
                                
                                <div className="relative group">
                                    <input type="email" name="email" required disabled={formStatus === 'submitting'} className="peer w-full border-b border-gray-200 py-3 text-primary outline-none focus:border-accent bg-transparent placeholder-transparent transition-colors disabled:opacity-50" id="accessEmail" placeholder="Email" />
                                    <label htmlFor="accessEmail" className="absolute left-0 -top-3.5 text-xs text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-accent font-bold uppercase tracking-widest">Correo Corporativo</label>
                                </div>
                                
                                <div className="relative group">
                                    <input type="tel" name="phone" required disabled={formStatus === 'submitting'} className="peer w-full border-b border-gray-200 py-3 text-primary outline-none focus:border-accent bg-transparent placeholder-transparent transition-colors disabled:opacity-50" id="accessPhone" placeholder="Phone" />
                                    <label htmlFor="accessPhone" className="absolute left-0 -top-3.5 text-xs text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-accent font-bold uppercase tracking-widest">Teléfono / WhatsApp</label>
                                </div>
                            </div>
                            
                            <div className="pt-2">
                                <label className="text-[10px] font-bold uppercase text-gray-400 mb-2 block tracking-widest">Perfil de Inversión</label>
                                <select name="profile" disabled={formStatus === 'submitting'} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-primary font-medium outline-none focus:border-accent appearance-none cursor-pointer hover:bg-gray-100 transition-colors disabled:opacity-50">
                                    <option value="individual">Inversionista Individual</option>
                                    <option value="family-office">Family Office</option>
                                    <option value="developer">Desarrollador</option>
                                    <option value="fund">Fondo de Inversión</option>
                                    <option value="other">Otro</option>
                                </select>
                            </div>

                            <button 
                                type="submit" 
                                disabled={formStatus === 'submitting'}
                                className="w-full bg-primary text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-accent transition-colors shadow-lg flex items-center justify-center gap-2 mt-4 group disabled:opacity-70"
                            >
                                {formStatus === 'submitting' ? (
                                    <>Procesando <Loader2 size={16} className="animate-spin"/></>
                                ) : (
                                    <>Enviar Solicitud <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></>
                                )}
                            </button>
                            
                            <p className="text-[10px] text-center text-gray-400 leading-relaxed max-w-xs mx-auto">
                                El acceso a The Vault está reservado para inversionistas calificados. Nuestro comité revisará su perfil en un lapso de 24 horas.
                            </p>
                        </form>
                    </>
                )}
            </div>
        </div>
      )}

    </div>
  );
};

export default InvestmentPage;
