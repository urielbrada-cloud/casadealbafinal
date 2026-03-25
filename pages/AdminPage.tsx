
import React from 'react';
import { ExternalLink } from 'lucide-react';
import Logo from '../components/Logo';

const AdminPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <div className="flex justify-center mb-6">
          <Logo className="text-primary h-8" />
        </div>
        <h2 className="font-serif text-2xl text-primary mb-2">Panel Administrativo</h2>
        <p className="text-gray-500 mb-8 text-sm">
          La gestión de contenido se ha movido a una plataforma dedicada.
        </p>
        <a
          href="https://albaestates.mx"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-accent text-white px-8 py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-primary transition-colors shadow-lg"
        >
          Ir al CMS <ExternalLink size={16} />
        </a>
        <div className="mt-6">
          <a href="/" className="text-xs text-gray-400 hover:text-primary">Volver al Sitio</a>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
