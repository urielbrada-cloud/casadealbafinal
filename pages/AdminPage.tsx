
import React, { useState, useEffect } from 'react';
import { getProperties, saveProperties } from '../data/mockData';
import { Property, PropertyType } from '../types';
import { Trash2, Edit, Plus, X, Save, Lock, LayoutDashboard, Home, LogOut, Download, AlertCircle, AlertTriangle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [properties, setProperties] = useState<Property[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState<Partial<Property>>({
    title: '',
    location: '',
    price: '',
    type: 'residential',
    description: '',
    bedrooms: 0,
    bathrooms: 0,
    parking: 0,
    constructionArea: '',
    images: [],
    features: [],
  });

  useEffect(() => {
    // Load properties if authenticated
    if (isAuthenticated) {
      setProperties(getProperties());
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple mock auth
      setIsAuthenticated(true);
    } else {
      alert('Contraseña incorrecta');
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta propiedad?')) {
      const updated = properties.filter(p => p.id !== id);
      setProperties(updated);
      saveProperties(updated);
    }
  };

  // NEW: Delete All Functionality
  const handleDeleteAll = () => {
    if (confirm('PELIGRO: ¿Estás seguro de eliminar TODAS las propiedades? Esta acción no se puede deshacer.')) {
        if(confirm('Por favor confirma una vez más que deseas borrar todo el inventario.')) {
            setProperties([]);
            saveProperties([]);
        }
    }
  };

  const handleEdit = (prop: Property) => {
    setEditingId(prop.id);
    setFormData(prop);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      title: '',
      location: '',
      price: '',
      type: 'residential',
      description: '',
      bedrooms: 0,
      bathrooms: 0,
      parking: 0,
      constructionArea: '',
      images: ['https://picsum.photos/id/10/1200/800'], // Default image
      features: [],
      isFeatured: false
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.price) return alert('Título y Precio son obligatorios');

    let updatedList = [...properties];

    if (editingId) {
      // Update existing
      updatedList = updatedList.map(p => p.id === editingId ? { ...p, ...formData } as Property : p);
    } else {
      // Create new
      const newProp: Property = {
        ...formData as Property,
        id: Math.random().toString(36).substr(2, 9),
        slug: formData.title!.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        priceRaw: parseInt(formData.price!.replace(/[^0-9]/g, '')) || 0,
        features: formData.features || [],
        images: formData.images && formData.images.length > 0 ? formData.images : ['https://picsum.photos/id/10/1200/800']
      };
      updatedList.push(newProp);
    }

    setProperties(updatedList);
    saveProperties(updatedList);
    setShowModal(false);
  };

  // Function to download current data as JSON
  const handleExport = () => {
    const dataStr = JSON.stringify(properties, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `casa-alba-data-${new Date().toISOString().slice(0,10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
           <div className="flex justify-center mb-6">
              <Logo className="text-primary h-8" />
           </div>
           <h2 className="font-serif text-2xl text-primary mb-2">Panel Administrativo</h2>
           <p className="text-gray-500 mb-8 text-sm">Ingrese sus credenciales para gestionar el contenido.</p>
           
           <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                 <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                 <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-accent transition-colors"
                 />
              </div>
              <button type="submit" className="w-full bg-accent text-white py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-primary transition-colors">
                 Acceder
              </button>
           </form>
           <div className="mt-6">
             <Link to="/" className="text-xs text-gray-400 hover:text-primary">Volver al Sitio</Link>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white hidden md:flex flex-col">
         <div className="p-6 border-b border-gray-800">
            <Logo className="text-white h-6" />
         </div>
         <nav className="flex-1 p-4 space-y-2">
            <div className="px-4 py-3 bg-accent rounded-xl flex items-center gap-3 cursor-pointer">
               <Home size={18} />
               <span className="font-bold text-sm">Propiedades</span>
            </div>
            <div className="px-4 py-3 hover:bg-white/5 rounded-xl flex items-center gap-3 cursor-pointer text-gray-400 hover:text-white transition-colors">
               <LayoutDashboard size={18} />
               <span className="font-bold text-sm">Blog (Próximamente)</span>
            </div>
         </nav>
         <div className="p-4 border-t border-gray-800 space-y-4">
            {/* Export Button */}
            <button onClick={handleExport} className="w-full flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest p-3 rounded-lg transition-colors">
               <Download size={16} /> Respaldar Datos
            </button>

            {/* Delete All Button - Red */}
            <button onClick={handleDeleteAll} className="w-full flex items-center gap-2 bg-red-500/10 hover:bg-red-500/80 text-red-400 hover:text-white text-xs font-bold uppercase tracking-widest p-3 rounded-lg transition-colors border border-red-500/20">
               <AlertTriangle size={16} /> Borrar Todo
            </button>

            <button onClick={() => navigate('/')} className="w-full flex items-center gap-2 text-gray-400 hover:text-white text-xs font-bold uppercase tracking-widest p-2">
               <LogOut size={16} /> Salir al Sitio
            </button>
         </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
         
         {/* Warning Banner */}
         <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 md:mb-8 flex items-start gap-3">
            <AlertCircle className="text-blue-500 shrink-0 mt-0.5" size={20} />
            <div>
               <h4 className="text-blue-800 font-bold text-sm mb-1">Modo Local Activo</h4>
               <p className="text-blue-600 text-xs leading-relaxed">
                  Los cambios que realices aquí se guardan solo en este navegador. 
                  Para guardar tu trabajo permanentemente, usa el botón <strong>"Respaldar Datos"</strong> en la barra lateral.
               </p>
            </div>
         </div>

         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
            <h1 className="font-serif text-2xl md:text-3xl text-primary">Gestión de Propiedades</h1>
            <button 
               onClick={handleAddNew}
               className="w-full md:w-auto bg-accent text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest hover:bg-primary transition-colors shadow-lg"
            >
               <Plus size={16} /> Nueva Propiedad
            </button>
         </div>

         {/* Mobile Sidebar Actions */}
         <div className="md:hidden flex flex-col gap-2 mb-8 border-b border-gray-200 pb-6">
            <button onClick={handleExport} className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-primary text-xs font-bold uppercase tracking-widest p-3 rounded-lg transition-colors">
               <Download size={16} /> Respaldar Datos
            </button>
            <button onClick={handleDeleteAll} className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold uppercase tracking-widest p-3 rounded-lg transition-colors border border-red-200">
               <AlertTriangle size={16} /> Borrar Todo
            </button>
            <button onClick={() => navigate('/')} className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-primary text-xs font-bold uppercase tracking-widest p-3">
               <LogOut size={16} /> Salir al Sitio
            </button>
         </div>

         {/* Property Table */}
         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
               <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                     <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 tracking-widest">Imagen</th>
                     <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 tracking-widest">Título</th>
                     <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 tracking-widest">Ubicación</th>
                     <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 tracking-widest">Precio</th>
                     <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 tracking-widest text-right">Acciones</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {properties.map(prop => (
                     <tr key={prop.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                           <img src={prop.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover bg-gray-200" />
                        </td>
                        <td className="px-6 py-4 font-medium text-primary">{prop.title}</td>
                        <td className="px-6 py-4 text-gray-500 text-sm">
                           {typeof prop.location === 'object' && prop.location !== null 
                             ? (prop.location as any).name || '' 
                             : prop.location}
                        </td>
                        <td className="px-6 py-4 text-accent font-bold text-sm">{prop.price}</td>
                        <td className="px-6 py-4 text-right">
                           <div className="flex justify-end gap-2">
                              <button onClick={() => handleEdit(prop)} className="p-2 text-gray-400 hover:text-primary hover:bg-gray-200 rounded-lg transition-colors">
                                 <Edit size={16} />
                              </button>
                              <button onClick={() => handleDelete(prop.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                 <Trash2 size={16} />
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
            {properties.length === 0 && (
               <div className="p-12 text-center text-gray-400 flex flex-col items-center">
                  <p className="mb-4">No hay propiedades registradas.</p>
                  <p className="text-xs text-gray-300">Usa el botón "Nueva Propiedad" para comenzar.</p>
               </div>
            )}
         </div>
      </main>

      {/* Modal Form */}
      {showModal && (
         <div className="fixed inset-0 bg-primary/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
               <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
                  <h3 className="font-serif text-2xl text-primary">{editingId ? 'Editar Propiedad' : 'Nueva Propiedad'}</h3>
                  <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-primary"><X size={24} /></button>
               </div>
               
               <div className="p-8 space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-400">Título</label>
                        <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-accent" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-400">Precio (Texto)</label>
                        <input type="text" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-accent" placeholder="$00,000,000 MXN" />
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-400">Ubicación</label>
                        <input type="text" value={typeof formData.location === 'object' && formData.location !== null ? (formData.location as any).name || '' : formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-accent" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-400">Tipo</label>
                        <select 
                           value={formData.type} 
                           onChange={e => setFormData({...formData, type: e.target.value as PropertyType})}
                           className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-accent"
                        >
                           <option value="residential">Residencial</option>
                           <option value="commercial">Comercial</option>
                           <option value="land">Terreno</option>
                        </select>
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase text-gray-400">Descripción</label>
                     <textarea rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-accent"></textarea>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-400">Recámaras</label>
                        <input type="number" value={formData.bedrooms} onChange={e => setFormData({...formData, bedrooms: parseInt(e.target.value)})} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-accent" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-400">Baños</label>
                        <input type="number" value={formData.bathrooms} onChange={e => setFormData({...formData, bathrooms: parseFloat(e.target.value)})} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-accent" />
                     </div>
                     <div className="space-y-2">
                         <label className="text-xs font-bold uppercase text-gray-400">Cocheras</label>
                         <input type="number" value={formData.parking} onChange={e => setFormData({...formData, parking: parseInt(e.target.value)})} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-accent" />
                     </div>
                     <div className="space-y-2">
                         <label className="text-xs font-bold uppercase text-gray-400">m² Constr.</label>
                         <input type="text" value={formData.constructionArea} onChange={e => setFormData({...formData, constructionArea: e.target.value})} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-accent" />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase text-gray-400">Imagen Principal (URL)</label>
                     <input type="text" value={formData.images?.[0] || ''} onChange={e => setFormData({...formData, images: [e.target.value]})} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-accent" placeholder="https://..." />
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100 flex justify-end gap-4">
                     <button onClick={() => setShowModal(false)} className="px-6 py-3 text-gray-500 font-bold uppercase text-xs hover:bg-gray-100 rounded-xl transition-colors">Cancelar</button>
                     <button onClick={handleSave} className="bg-primary text-white px-8 py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-accent transition-colors shadow-lg flex items-center gap-2">
                        <Save size={16} /> Guardar
                     </button>
                  </div>

               </div>
            </div>
         </div>
      )}

    </div>
  );
};

export default AdminPage;
