
import React, { Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

// Lazy loaded components
const HomePage = React.lazy(() => import('./pages/HomePage'));
const SearchResults = React.lazy(() => import('./pages/SearchResults'));
const PropertyDetail = React.lazy(() => import('./pages/PropertyDetail'));
const DevelopmentsView = React.lazy(() => import('./pages/DevelopmentsView'));
const DevelopmentDetail = React.lazy(() => import('./pages/DevelopmentDetail'));
const CommercialPortfolio = React.lazy(() => import('./pages/CommercialPortfolio'));
const InvestmentPage = React.lazy(() => import('./pages/InvestmentPage'));
const BlogList = React.lazy(() => import('./pages/BlogList'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const AdminPage = React.lazy(() => import('./pages/AdminPage'));
const LegalPage = React.lazy(() => import('./pages/LegalPage'));
const MapSearchPage = React.lazy(() => import('./pages/MapSearchPage'));

// Simple loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-12 h-12 border-4 border-gray-200 border-t-accent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <HashRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Admin Route outside of Layout (Stand-alone interface) */}
          <Route path="/admin" element={<AdminPage />} />
          
          {/* Main Application Routes */}
          <Route path="*" element={
            <Layout>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/propiedades" element={<SearchResults />} />
                  <Route path="/mapa" element={<MapSearchPage />} />
                  <Route path="/propiedades/:slug" element={<PropertyDetail />} />
                  <Route path="/desarrollos" element={<DevelopmentsView />} />
                  <Route path="/desarrollos/:slug" element={<DevelopmentDetail />} /> 
                  <Route path="/comercial" element={<CommercialPortfolio />} />
                  <Route path="/servicios" element={<ServicesPage />} />
                  <Route path="/inversion" element={<InvestmentPage />} />
                  <Route path="/journal" element={<BlogList />} />
                  <Route path="/journal/:slug" element={<BlogPost />} />
                  <Route path="/nosotros" element={<AboutPage />} />
                  <Route path="/legal" element={<LegalPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </Layout>
          } />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
