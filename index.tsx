import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Global handler for Google Maps API authentication failures
(window as any).gm_authFailure = () => {
  console.error("Google Maps API authentication failed.");
  window.dispatchEvent(new Event('gmaps-auth-failure'));
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);